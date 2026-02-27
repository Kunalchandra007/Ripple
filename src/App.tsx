/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Hero, About, Schedule, Gallery, Footer, EventsPage, SponsorsPage, type Page } from './components/RippleComponents';

const PRELOADER_TOTAL_MS = 2800;
const CONTENT_REVEAL_MS = 2350;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPreloaderFading, setIsPreloaderFading] = useState(false);
  const shouldRenderApp = isPreloaderFading || !showPreloader;

  useEffect(() => {
    const revealTimer = setTimeout(() => setIsPreloaderFading(true), CONTENT_REVEAL_MS);
    const hideTimer = setTimeout(() => setShowPreloader(false), PRELOADER_TOTAL_MS);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  return (
    <>
      {showPreloader && (
        <div className={`ripple-preloader ${isPreloaderFading ? 'ripple-preloader--fade' : ''}`} role="status" aria-live="polite">
          <div className="ripple-preloader__wave ripple-preloader__wave--1" />
          <div className="ripple-preloader__wave ripple-preloader__wave--2" />
          <div className="ripple-preloader__wave ripple-preloader__wave--3" />
          <div className="ripple-preloader__fill" />
          <h1 className="ripple-preloader__title">RIPPLE</h1>
        </div>
      )}

      {shouldRenderApp && (
      <div className={`min-h-screen bg-ripple-black selection:bg-ripple-pink selection:text-white app-content ${isPreloaderFading ? 'app-content--visible' : ''}`}>
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
                <Hero onGetTickets={() => setCurrentPage('br')} />
                
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

        <Footer onGetTickets={() => setCurrentPage('br')} />

        {/* Scroll Progress Bar */}
        <ScrollProgress />
      </div>
      )}
    </>
  );
}

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsDesktopPointer = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
    if (!supportsDesktopPointer) {
      return;
    }

    let rafId: number | null = null;
    let latestX = -999;
    let latestY = -999;

    const applyPosition = () => {
      rafId = null;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${latestX - 150}px, ${latestY - 150}px, 0)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyPosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{ transform: 'translate3d(-999px, -999px, 0)', willChange: 'transform' }}
      className="w-[300px] h-[300px] bg-ripple-pink/5 rounded-full blur-[100px] pointer-events-none"
    />
  );
};

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${currentProgress / 100})`;
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-white/5">
      <div
        ref={barRef}
        className="h-full bg-ripple-cyan shadow-[0_0_10px_#00f5ff]"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center', willChange: 'transform' }}
      />
    </div>
  );
}
