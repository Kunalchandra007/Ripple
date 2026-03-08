import React, { useMemo, useState } from 'react';
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

  return (
    <div className="bg-black text-white" style={containerStyle}>
      <section
        className="relative min-h-screen overflow-hidden"
        onMouseMove={(event) => {
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
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,88,130,0.25),rgba(0,0,0,0.8)_70%)]" />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 bg-gradient-to-r from-cyan-200 via-cyan-400 to-fuchsia-300 bg-clip-text text-xl font-extrabold tracking-[0.35em] text-transparent drop-shadow-[0_0_16px_rgba(34,211,238,0.85)] sm:text-3xl md:text-4xl"
          >
            THE RIPPLE LINEUP
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95]"
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
            className="mt-16 text-lg sm:text-xl text-pink-300 tracking-[0.14em] uppercase drop-shadow-[0_0_18px_rgba(255,43,136,0.95)]"
          >
            Discover The Waves ↓
          </motion.a>
        </div>
      </section>

      <section id="waves" className="relative py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-black to-slate-950/80 overflow-x-auto">
        <div className="flex gap-5 sm:gap-7 min-w-max pb-4">
          {WAVES.map((wave) => (
            <motion.button
              key={wave.id}
              onClick={() => setActiveWaveId(wave.id)}
              whileHover={{ scale: 1.02, y: -4, rotate: 0.2 }}
              whileTap={{ scale: 0.99 }}
              className="relative min-h-[60vh] w-[82vw] sm:w-[32rem] rounded-3xl border border-cyan-300/35 bg-black/50 backdrop-blur-sm p-5 text-left overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(38,183,255,0.2),rgba(255,59,140,0.05)_65%,transparent)]"
                animate={{ scale: [1, 1.03, 1], rotate: [0, 0.2, -0.2, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
              <div className="relative z-10 flex h-full flex-col">
                <div className="overflow-hidden rounded-2xl border border-white/20">
                  <img src={wave.image} alt={`${wave.artist} thumbnail`} className="h-56 w-full object-cover sm:h-64" />
                </div>
                <div className="mt-5 flex flex-1 flex-col justify-between">
                  <p className="text-cyan-200/90 tracking-[0.4em] text-xs">{wave.day}</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl font-black leading-tight">{wave.subtitle}</h2>
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
        <div className="relative z-10 p-8 sm:p-14">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black max-w-4xl leading-tight">THE RIPPLE IS ABOUT TO BREAK</h2>
          <button
            onClick={onGetPass}
            className="mt-8 px-8 py-3 rounded-xl bg-pink-500 hover:bg-pink-400 transition-colors text-white font-semibold tracking-[0.1em]"
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
            className="fixed inset-0 z-[80] bg-black/95 overflow-y-auto"
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
            <div className="relative z-10 px-5 py-10 sm:px-8 sm:py-12">
              <section className="mx-auto max-w-7xl">
                <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                  <div className="rounded-3xl border border-cyan-300/30 bg-slate-950/55 p-3 sm:p-4" onClick={(event) => event.stopPropagation()}>
                    {activeWave.videos.length > 0 ? (
                      <video {...videoProps} className="h-[56vh] w-full rounded-2xl object-cover sm:h-[64vh]" src={activeWave.videos[0]} />
                    ) : (
                      <img src={activeWave.image} alt={activeWave.artist} className="h-[56vh] w-full rounded-2xl bg-black/80 object-contain sm:h-[64vh]" />
                    )}
                  </div>
                  <div className="rounded-3xl border border-pink-300/30 bg-black/60 p-6 sm:p-8" onClick={(event) => event.stopPropagation()}>
                    <p className="text-xs tracking-[0.4em] text-cyan-200">{activeWave.day}</p>
                    <h3 className="mt-3 text-3xl font-black sm:text-5xl">{activeWave.artist}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.2em] text-pink-200">{activeWave.slot}</p>
                    <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base">
                      {activeWave.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" onClick={(event) => event.stopPropagation()}>
                  {activeWave.photos.map((photo, index) => (
                    <img
                      key={photo}
                      src={photo}
                      alt={`${activeWave.artist} photo ${index + 1}`}
                      className={`w-full rounded-2xl border border-white/20 bg-black/80 object-contain ${index === 0 ? 'col-span-2 h-64 sm:h-80 lg:h-96' : 'h-40 sm:h-52 lg:h-64'}`}
                    />
                  ))}
                </div>

                {activeWave.videos.length > 1 && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2" onClick={(event) => event.stopPropagation()}>
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
