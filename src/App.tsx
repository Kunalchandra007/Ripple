/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Hero, About, Schedule, Gallery, Footer, EventsPage, SponsorsPage, type Page } from './components/RippleComponents';
import StarShowsPage from './components/StarShowsPage';

const LINEUP_UNLOCK_AT = new Date('2026-03-12T00:00:00+05:30').getTime();

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const isLineupUnlocked = now >= LINEUP_UNLOCK_AT;

  return (
    <>
      {loading ? (
        <div className="h-screen w-full bg-ripple-black flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
              filter: ["blur(0px)", "blur(4px)", "blur(0px)"]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-5xl sm:text-7xl preloader-font text-ripple-pink neon-glow-pink"
          >
            RIPPLE
          </motion.div>
        </div>
      ) : (
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
            ) : currentPage === 'lineup' ? (
              <motion.div
                key="lineup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {isLineupUnlocked ? (
                  <StarShowsPage onGetPass={() => setCurrentPage('br')} />
                ) : (
                  <LineupCountdown now={now} unlockAt={LINEUP_UNLOCK_AT} />
                )}
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

const LineupCountdown = ({ now, unlockAt }: { now: number; unlockAt: number }) => {
  const remaining = Math.max(0, unlockAt - now);
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <section className="min-h-[70vh] px-4 pt-32 pb-20 text-center flex flex-col items-center justify-center">
      <p className="text-cyan-300 tracking-[0.35em] text-xs sm:text-sm">STAR LINEUP UNLOCKS ON</p>
      <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black text-white">
        12 MARCH 2026, 12:00 AM IST
      </h1>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl">
        {[{ label: 'Days', value: days }, { label: 'Hours', value: hours }, { label: 'Minutes', value: minutes }, { label: 'Seconds', value: seconds }].map((item) => (
          <div key={item.label} className="rounded-2xl border border-cyan-300/30 bg-black/40 py-5 sm:py-6">
            <p className="text-3xl sm:text-5xl font-black text-cyan-200">{String(item.value).padStart(2, '0')}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

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
