const https = require('https');
const fs = require('fs');
const path = require('path');

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

const VIDEO_ASSET = {
  path: '/video/hero-loop.mp4',
  remoteUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4'
};

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

async function main() {
  console.log('[download-images] Fetching project images for build...');
  for (const asset of ASSETS) {
    await downloadFile(asset);
  }
  
  const videoPath = path.join(process.cwd(), 'public', VIDEO_ASSET.path);
  if (!fs.existsSync(videoPath) || fs.statSync(videoPath).size === 0) {
    console.log('[download-images] Downloading fallback video asset...');
    await downloadFile(VIDEO_ASSET.path);
  }
  
  console.log('[download-images] Finished downloading all assets.');
}

main().catch(err => {
  console.error('[download-images] Fatal error:', err);
});
