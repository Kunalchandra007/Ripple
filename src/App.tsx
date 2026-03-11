/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Hero, About, Schedule, Gallery, Footer, EventsPage, SponsorsPage, type Page } from './components/RippleComponents';
import StarShowsPage from './components/StarShowsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

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
                <StarShowsPage onGetPass={() => setCurrentPage('br')} />
              </motion.div>
            ) : currentPage === 'br' ? (
              <motion.div
                key="br"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <BRPage onBackHome={() => setCurrentPage('home')} />
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

const BRPage = ({ onBackHome }: { onBackHome: () => void }) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ripple-black px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,140,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,245,255,0.16),transparent_32%),linear-gradient(135deg,#040404_0%,#120010_48%,#020202_100%)]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-[8%] top-[16%] h-28 w-28 rounded-full border border-ripple-cyan/40 blur-[2px]" />
        <div className="absolute right-[10%] top-[24%] h-40 w-40 rounded-full border border-ripple-pink/30" />
        <div className="absolute bottom-[14%] left-[12%] h-52 w-52 rounded-full bg-ripple-pink/10 blur-3xl" />
        <div className="absolute bottom-[18%] right-[8%] h-56 w-56 rounded-full bg-ripple-cyan/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="font-heading text-lg uppercase tracking-[0.35em] text-white/60">
                Ripple 2026
              </p>
              <h1 className="font-display text-5xl uppercase leading-[0.88] text-white sm:text-7xl lg:text-[7rem]">
                Are You
                <span className="block text-ripple-pink drop-shadow-[0_0_24px_rgba(255,0,140,0.55)]">
                  Readddy!!!!
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
                The crowd is building, the lights are about to hit, and your BR entry is one click away.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://registration.rippleucms.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-ripple-pink px-8 py-4 font-heading text-2xl uppercase tracking-[0.18em] text-white shadow-[0_0_28px_rgba(255,0,140,0.45)] transition-all hover:-translate-y-1 hover:bg-[#ff2ca1]"
              >
                Register Now
              </a>
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-8 py-4 font-heading text-2xl uppercase tracking-[0.18em] text-white/85 transition-colors hover:border-ripple-cyan hover:text-ripple-cyan"
              >
                Back Home
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass relative overflow-hidden rounded-[2rem] border border-ripple-pink/20 p-6 sm:p-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,0,140,0.16),transparent_35%,rgba(0,245,255,0.08)_100%)]" />
            <div className="relative space-y-6">
              <div>
                <p className="font-heading text-base uppercase tracking-[0.35em] text-ripple-cyan">
                  Your Call To Enter
                </p>
                <h2 className="mt-3 font-heading text-4xl uppercase tracking-[0.12em] text-white sm:text-5xl">
                  Lock In Your Spot
                </h2>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-white/70 sm:text-lg">
                <p>
                  Letsssss goooo. The vibe is on, the energy is up, and your BR spot is waiting.
                </p>
                <p>
                  Tap register and get in before everyone else starts flooding the page.
                </p>
              </div>
              <a
                href="https://registration.rippleucms.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-heading text-2xl uppercase tracking-[0.18em] text-ripple-cyan transition-transform hover:translate-x-1"
              >
                Open Registration
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
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
