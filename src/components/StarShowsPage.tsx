import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type StarShowsPageProps = {
  onGetPass: () => void;
};

type Wave = {
  id: string;
  day: string;
  subtitle: string;
  artist: string;
  slot: string;
  image: string;
  photos: string[];
  videos: string[];
  heroVideo: string;
};

const assetPath = (path: string) => encodeURI(path);

const WAVES: Wave[] = [
  {
    id: 'wave-1',
    day: 'DAY I',
    subtitle: 'The Opening Wave',
    artist: 'BYOB',
    slot: 'Friday • Main Stage',
    image: assetPath('/stars shows/Day1/DSC01410.JPG'),
    photos: [
      assetPath('/stars shows/Day1/DSC01410.JPG'),
      assetPath('/stars shows/Day1/Black BG logo.jpg')
    ],
    videos: [assetPath('/stars shows/Day1/1. Experience BYOB Live.mov')],
    heroVideo: '/ripplevdo.mp4',
  },
  {
    id: 'wave-2',
    day: 'DAY II',
    subtitle: 'The Midwave Pulse',
    artist: 'DJ Muneca',
    slot: 'Saturday • Main Stage',
    image: assetPath('/stars shows/Day2/IMG_6125.JPG.jpeg'),
    photos: [
      assetPath('/stars shows/Day2/IMG_6125.JPG.jpeg'),
      assetPath('/stars shows/Day2/IMG_6203.JPG.jpeg'),
      assetPath('/stars shows/Day2/IMG_7551.JPG.jpeg')
    ],
    videos: [],
    heroVideo: '/ripplevdo.mp4',
  },
  {
    id: 'wave-3',
    day: 'DAY III',
    subtitle: 'The Final Break',
    artist: 'VILEN',
    slot: 'Sunday • Main Stage',
    image: assetPath('/stars shows/Day3/Screenshot 2026-03-08 134901.jpg'),
    photos: [
      assetPath('/stars shows/Day3/Screenshot 2026-03-08 134901.jpg'),
      assetPath('/stars shows/Day3/Screenshot 2026-03-08 134741.jpg'),
      assetPath('/stars shows/Day3/Screenshot 2026-03-08 134823.jpg'),
      assetPath('/stars shows/Day3/Screenshot 2026-03-08 134847.jpg'),
      assetPath('/stars shows/Day3/Screenshot 2026-03-08 134948.jpg')
    ],
    videos: [],
    heroVideo: '/ripplevdo.mp4',
  }
];

const containerStyle: React.CSSProperties = { scrollBehavior: 'smooth' };

const videoProps = {
  autoPlay: true,
  loop: true,
  muted: true,
  playsInline: true
} as const;

export default function StarShowsPage({ onGetPass }: StarShowsPageProps) {
  const [activeWaveId, setActiveWaveId] = useState<string | null>(null);
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  const activeWave = useMemo(() => WAVES.find((wave) => wave.id === activeWaveId) || null, [activeWaveId]);

  useEffect(() => {
    if (!activeWaveId) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveWaveId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeWaveId]);

  return (
    <div className="bg-black text-white" style={containerStyle}>
      <section
        className="relative min-h-screen overflow-hidden"
        onMouseMove={(event) => {
          if (!window.matchMedia('(pointer: fine)').matches) {
            return;
          }
          const rect = event.currentTarget.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;
          setHeroOffset({ x: nx * 20, y: ny * 20 });
        }}
      >
        <motion.video
          {...videoProps}
          className="absolute inset-0 w-full h-full object-cover"
          src="/ripplevdo.mp4"
          animate={{ scale: 1.06, x: heroOffset.x, y: heroOffset.y }}
          transition={{ type: 'spring', stiffness: 42, damping: 22 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,88,130,0.25),rgba(0,0,0,0.8)_70%)]" />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 pt-28 pb-16 text-center sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 bg-gradient-to-r from-cyan-200 via-cyan-400 to-fuchsia-300 bg-clip-text text-sm font-extrabold tracking-[0.3em] text-transparent drop-shadow-[0_0_16px_rgba(34,211,238,0.85)] sm:mb-8 sm:text-3xl md:text-4xl"
          >
            THE RIPPLE LINEUP
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black leading-[0.95] sm:text-7xl md:text-8xl"
          >
            3 DAYS
            <br />
            3 FREQUENCIES
            <br />
            3 STARS
          </motion.h1>
          <motion.a
            href="#waves"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-sm text-pink-300 tracking-[0.14em] uppercase drop-shadow-[0_0_18px_rgba(255,43,136,0.95)] sm:mt-16 sm:text-xl"
          >
            Discover The Waves ↓
          </motion.a>
        </div>
      </section>

      <section id="waves" className="relative overflow-x-auto bg-gradient-to-b from-black to-slate-950/80 px-4 py-16 sm:px-8 sm:py-24">
        <div className="flex min-w-max snap-x snap-mandatory gap-4 pb-4 sm:gap-7">
          {WAVES.map((wave) => (
            <motion.button
              key={wave.id}
              onClick={() => setActiveWaveId(wave.id)}
              whileHover={{ scale: 1.02, y: -4, rotate: 0.2 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
              className="group relative min-h-[26rem] w-[85vw] snap-center overflow-hidden rounded-3xl border border-cyan-300/35 bg-black/50 p-4 text-left backdrop-blur-sm sm:min-h-[60vh] sm:w-[32rem] sm:p-5"
            >
              <motion.div
                className="absolute inset-0 opacity-100 bg-[radial-gradient(circle_at_center,rgba(38,183,255,0.15),rgba(255,59,140,0.05)_65%,transparent)] sm:opacity-0 sm:group-hover:opacity-100"
                animate={{ scale: [1, 1.03, 1], rotate: [0, 0.2, -0.2, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
              <div className="relative z-10 flex h-full flex-col">
                <div className="overflow-hidden rounded-2xl border border-white/20">
                  <img src={wave.image} alt={`${wave.artist} thumbnail`} className="h-52 w-full object-cover sm:h-64" />
                </div>
                <div className="mt-5 flex flex-1 flex-col justify-between">
                  <p className="text-cyan-200/90 tracking-[0.4em] text-xs">{wave.day}</p>
                  <h2 className="mt-3 text-2xl font-black leading-tight sm:text-4xl">{wave.subtitle}</h2>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-pink-200">{wave.artist}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden flex items-end">
        <video {...videoProps} className="absolute inset-0 w-full h-full object-cover" src="/ripplevdo.mp4" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 p-5 sm:p-14">
          <h2 className="max-w-4xl text-3xl font-black leading-tight sm:text-6xl md:text-7xl">THE RIPPLE IS ABOUT TO BREAK</h2>
          <button
            onClick={onGetPass}
            className="mt-6 rounded-xl bg-pink-500 px-6 py-3 text-sm font-semibold tracking-[0.1em] text-white transition-colors hover:bg-pink-400 sm:mt-8 sm:px-8"
          >
            Get Your Pass
          </button>
        </div>
      </section>

      <AnimatePresence>
        {activeWave && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] overflow-y-auto bg-black/95 overscroll-contain"
            onClick={() => setActiveWaveId(null)}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(0,196,255,0.28),transparent_55%)]" />
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-15"
              animate={{ backgroundPositionX: ['0%', '100%'] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage:
                  'linear-gradient(transparent 50%, rgba(255,255,255,0.08) 50%), linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.03) 50%)',
                backgroundSize: '100% 4px, 4px 100%'
              }}
            />
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-8 sm:py-12">
              <section className="mx-auto w-full max-w-6xl rounded-[2rem] border border-white/10 bg-black/35 p-4 shadow-[0_0_40px_rgba(0,245,255,0.08)] backdrop-blur-xl sm:p-6">
                <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.45fr_0.95fr]">
                  <div className="rounded-3xl border border-cyan-300/30 bg-slate-950/55 p-2 sm:p-4">
                    {activeWave.videos.length > 0 ? (
                      <video {...videoProps} className="h-[34vh] w-full rounded-2xl object-cover sm:h-[64vh]" src={activeWave.videos[0]} />
                    ) : (
                      <img src={activeWave.image} alt={activeWave.artist} className="h-[34vh] w-full rounded-2xl bg-black/80 object-contain sm:h-[64vh]" />
                    )}
                  </div>
                  <div className="rounded-3xl border border-pink-300/30 bg-black/60 p-5 sm:p-8">
                    <p className="text-xs tracking-[0.4em] text-cyan-200">{activeWave.day}</p>
                    <h3 className="mt-3 text-3xl font-black sm:text-5xl">{activeWave.artist}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.2em] text-pink-200">{activeWave.slot}</p>
                    <p className="mt-5 text-sm leading-relaxed text-white/70 sm:mt-6 sm:text-base">
                      {activeWave.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {activeWave.photos.map((photo, index) => (
                    <img
                      key={photo}
                      src={photo}
                      alt={`${activeWave.artist} photo ${index + 1}`}
                      className={`w-full rounded-2xl border border-white/20 bg-black/80 object-contain ${index === 0 ? 'col-span-2 h-44 sm:h-80 lg:h-96' : 'h-28 sm:h-52 lg:h-64'}`}
                    />
                  ))}
                </div>

                {activeWave.videos.length > 1 && (
                  <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2">
                    {activeWave.videos.slice(1).map((video) => (
                      <video key={video} {...videoProps} className="h-64 w-full rounded-2xl border border-white/20 object-cover" src={video} />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
