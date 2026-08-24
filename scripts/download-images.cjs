const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REMOTE_BASE_URL = 'https://timi-portfolio.onrender.com';

const ASSETS = [
  '/images/avatar.jpg',
  '/images/timi.jpeg',
  '/images/timi-optimized.webp',
  '/images/og/home.jpg',
  '/images/projects/mirola-ambassador.png',
  '/images/projects/resilient-solutions.png',
  '/images/projects/mirodata.png',
  '/images/projects/cleaner-spaces.png',
  '/images/projects/operational-excellence.png',
  '/images/projects/twist.png',
  '/images/projects/rebottle.png',
  '/images/projects/flower.png',
  '/images/projects/pmx.png',
  '/images/projects/ipanache.png',
  '/images/projects/heaven.png',
  '/images/projects/una.png',
  '/images/projects/ali.png',
  '/images/projects/5th.png',
  '/images/projects/dan.png',
  '/images/projects/tom.png',
  '/images/projects/project-01/beacon1.png',
  '/images/projects/project-01/beacon2.png',
  '/images/projects/project-01/beacon3.png',
  '/images/projects/project-01/beacon4.png',
  '/images/projects/project-01/cover-01.jpg',
  '/images/projects/project-01/cover-02.jpg',
  '/images/projects/project-01/image-03.jpg'
];

const CLOUDFRONT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

function downloadFile(relPath) {
  return new Promise((resolve) => {
    const targetUrl = REMOTE_BASE_URL + relPath;
    const destPath = path.join(process.cwd(), 'public', relPath);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    const req = https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          fs.writeFileSync(destPath, buffer);
          console.log(`[download-images] Saved: ${relPath} (${buffer.length} bytes)`);
          resolve(true);
        });
      } else {
        console.warn(`[download-images] Warning: ${relPath} returned HTTP ${res.statusCode}`);
        resolve(false);
      }
    });

    req.on('error', (err) => {
      console.error(`[download-images] Error fetching ${relPath}:`, err.message);
      resolve(false);
    });
  });
}

function ensurePingPongVideo() {
  const videoDir = path.join(process.cwd(), 'public', 'video');
  const videoPath = path.join(videoDir, 'hero-loop.mp4');
  const mobileVideoPath = path.join(videoDir, 'hero-loop-mobile.mp4');

  fs.mkdirSync(videoDir, { recursive: true });

  const has1080p = fs.existsSync(videoPath) && fs.statSync(videoPath).size > 100000;
  const has720p = fs.existsSync(mobileVideoPath) && fs.statSync(mobileVideoPath).size > 100000;

  if (has1080p && has720p) {
    console.log('[download-images] hero-loop videos already exist.');
    return;
  }

  try {
    if (!has1080p) {
      console.log('[download-images] Generating 1080p seamless ping-pong loop with ffmpeg...');
      execSync(
        `ffmpeg -y -i "${CLOUDFRONT_VIDEO_URL}" -filter_complex "[0:v]reverse[r];[0:v][r]concat=n=2:v=1[out]" -map "[out]" -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p -movflags +faststart "${videoPath}"`,
        { stdio: 'inherit' }
      );
    }
    if (!has720p) {
      console.log('[download-images] Generating mobile 720p seamless ping-pong loop with ffmpeg...');
      execSync(
        `ffmpeg -y -i "${videoPath}" -vf "scale=1280:-2" -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p -profile:v main -level 3.1 -movflags +faststart "${mobileVideoPath}"`,
        { stdio: 'inherit' }
      );
    }
    if (!fs.existsSync(path.join(videoDir, 'hero-poster.jpg'))) {
      execSync(`ffmpeg -y -i "${videoPath}" -vframes 1 -q:v 2 "${path.join(videoDir, 'hero-poster.jpg')}"`, { stdio: 'inherit' });
    }
    console.log('[download-images] hero-loop video assets verified successfully!');
  } catch (err) {
    console.warn('[download-images] FFmpeg error:', err.message);
  }
}

async function main() {
  console.log('[download-images] Fetching project images for build...');
  for (const asset of ASSETS) {
    await downloadFile(asset);
  }
  
  ensurePingPongVideo();
  
  console.log('[download-images] Finished downloading and preparing all assets.');
}

main().catch(err => {
  console.error('[download-images] Fatal error:', err);
});
