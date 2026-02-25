/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Hero, About, Schedule, Gallery, Footer, EventsPage, SponsorsPage, type Page } from './components/RippleComponents';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-ripple-black flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            filter: ["blur(0px)", "blur(4px)", "blur(0px)"]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-5xl sm:text-7xl font-display text-ripple-pink neon-glow-pink"
        >
          RIPPLE
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ripple-black selection:bg-ripple-pink selection:text-white">
      {/* Custom Cursor Glow */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
        <CursorGlow />
      </div>

      <Navbar currentPage={currentPage} setPage={setCurrentPage} />

      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onGetTickets={() => setCurrentPage('events')} />
              
              {/* Scrolling Background for About and Schedule */}
              <div className="relative">
                {/* Parallax Scrolling Background */}
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: 'url(https://res.cloudinary.com/dgmwtonil/image/upload/v1772029041/scrolling_ge2fny.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'scroll',
                    opacity: 0.3
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <About />
                  <Schedule />
                </div>
              </div>
              
              <Gallery />
            </motion.div>
          ) : currentPage === 'events' ? (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <EventsPage />
            </motion.div>
          ) : currentPage === 'sponsors' ? (
            <motion.div
              key="sponsors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SponsorsPage />
            </motion.div>
          ) : (
            <motion.div
              key="fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-32 sm:pt-40 pb-24 px-4 text-center"
            >
              <h1 className="text-4xl sm:text-6xl font-heading text-ripple-cyan mb-4">COMING SOON</h1>
              <p className="text-white/50 tracking-widest uppercase">The {currentPage} page is under construction.</p>
              <button 
                onClick={() => setCurrentPage('home')}
                className="mt-8 px-8 py-3 border border-ripple-pink text-ripple-pink font-heading text-xl tracking-widest hover:bg-ripple-pink hover:text-white transition-all"
              >
                BACK TO HOME
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Scroll Progress Bar */}
      <ScrollProgress />
    </div>
  );
}

const CursorGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.div
      animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      className="w-[300px] h-[300px] bg-ripple-pink/5 rounded-full blur-[100px] pointer-events-none"
    />
  );
};

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-white/5">
      <motion.div 
        className="h-full bg-ripple-cyan shadow-[0_0_10px_#00f5ff]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
