/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, PageId } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { WorksPage } from './pages/WorksPage';
import { StackPage } from './pages/StackPage';
import { AboutPage } from './pages/AboutPage';
import { FooterSection } from './components/FooterSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { CursorMeshFollower } from './components/gsap/CursorMeshFollower';
import { ScrollProgressBar } from './components/gsap/ScrollProgressBar';
import { ScrollToTop } from './components/gsap/ScrollToTop';
import { Project } from './types';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState<boolean>(false);
  // Initialize explicitly on home page
  const [activePage, setActivePage] = useState<PageId>('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync hash only on explicit user hash changes, defaulting to home
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'works' || hash === 'projects') {
        setActivePage('works');
      } else if (hash === 'stack' || hash === 'tech' || hash === 'skills') {
        setActivePage('stack');
      } else if (hash === 'about' || hash === 'story') {
        setActivePage('about');
      } else if (hash === 'home') {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Entrance animation trigger after 800ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntranceComplete(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="synapsex-app"
      className="w-full min-h-screen bg-black text-white selection:bg-white selection:text-black relative"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      {/* 1. Global Fixed Floating Navbar */}
      <Navbar
        entranceComplete={entranceComplete}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* 2. Main Multi-Page Routed View with Animated Transitions */}
      <main className="w-full min-h-screen">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="page-home"
              initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(3px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <HomePage
                entranceComplete={entranceComplete}
                onNavigate={handleNavigate}
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenContactModal={() => setIsContactModalOpen(true)}
              />
            </motion.div>
          )}

          {activePage === 'works' && (
            <motion.div
              key="page-works"
              initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(3px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <WorksPage
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenContactModal={() => setIsContactModalOpen(true)}
              />
            </motion.div>
          )}

          {activePage === 'stack' && (
            <motion.div
              key="page-stack"
              initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(3px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <StackPage
                onOpenContactModal={() => setIsContactModalOpen(true)}
              />
            </motion.div>
          )}

          {activePage === 'about' && (
            <motion.div
              key="page-about"
              initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(3px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <AboutPage
                onOpenContactModal={() => setIsContactModalOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Global Footer & Contact Section */}
      <FooterSection
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Global Scroll Animations & Scroll To Top */}
      <ScrollProgressBar />
      <ScrollToTop />

      {/* GSAP Cursor Mesh Follower */}
      <CursorMeshFollower />
    </div>
  );
}
