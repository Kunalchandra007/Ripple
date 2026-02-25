import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Mail, Phone, MapPin, ChevronDown, ExternalLink, Ticket, Home, Calendar, Users, Award } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Lightning from './Lightning';
import Squares from './Squares';
import DomeGallery from './DomeGallery';
import Dock from './Dock';
import Balatro from './Balatro';

// --- Types ---
export type Page = 'home' | 'events' | 'sponsors' | 'br';

export interface Event {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  day: 1 | 2 | 3;
  time: string;
}

// --- Constants ---
export const CATEGORIES = ['All', 'Dance', 'Music', 'Art', 'Cultural', 'Society'];

export const EVENTS: Event[] = [
  // Celeste Events
  {
    id: '1',
    name: 'MUDRA',
    category: 'Dance',
    description: 'Classical and contemporary dance competition showcasing grace and expression.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772028806/Mudra_lr2obz.png',
    day: 1,
    time: '2:00 PM'
  },
  {
    id: '2',
    name: 'NAMHYA',
    category: 'Dance',
    description: 'Traditional dance forms celebrating cultural heritage.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772014350/Namhya_tovxg7.png',
    day: 1,
    time: '4:00 PM'
  },
  // Inaayat Events
  {
    id: '3',
    name: 'ALANKRIT',
    category: 'Cultural',
    description: 'Cultural extravaganza celebrating diversity and tradition.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772014357/Alankrit_jhnijw.png',
    day: 2,
    time: '11:00 AM'
  },
  {
    id: '4',
    name: 'NAVRAS',
    category: 'Art',
    description: 'Artistic expression through the nine emotions of classical arts.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772028854/Navras_e5ktao.png',
    day: 2,
    time: '3:00 PM'
  },
  // Plexus Events
  {
    id: '5',
    name: 'BOB',
    category: 'Music',
    description: 'Battle of Bands - Where musical legends are born.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772028680/Bob_vsuvin.png',
    day: 1,
    time: '6:00 PM'
  },
  {
    id: '6',
    name: 'EKAGRATA',
    category: 'Music',
    description: 'Solo musical performance showcasing individual talent.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772028731/Ekagrata_hzpfar.png',
    day: 2,
    time: '5:00 PM'
  },
  {
    id: '7',
    name: 'LYRICA SOLISTICA',
    category: 'Music',
    description: 'Solo singing competition for melodious voices.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772028763/Lyrica_solistica_z0d5oo.png',
    day: 3,
    time: '2:00 PM'
  },
  {
    id: '8',
    name: 'SWARNABHUTI',
    category: 'Music',
    description: 'Classical music competition celebrating traditional melodies.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772014351/Swarnabhuti_bmdvat.png',
    day: 3,
    time: '4:00 PM'
  },
  // Swouc Events
  {
    id: '9',
    name: 'RANG E KALASH',
    category: 'Cultural',
    description: 'Colorful cultural celebration with traditional performances.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772028889/Rang_e_kalash_wgyxoq.png',
    day: 1,
    time: '10:00 AM'
  },
  {
    id: '10',
    name: 'UDAAN',
    category: 'Society',
    description: 'Social awareness event promoting community welfare.',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772028952/Udaan_hv2r4w.png',
    day: 2,
    time: '1:00 PM'
  }
];

// --- Components ---

export const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const dockItems = [
    {
      icon: <Home size={24} className="text-ripple-cyan" />,
      label: 'Home',
      onClick: () => setPage('home'),
      className: currentPage === 'home' ? 'active' : ''
    },
    {
      icon: <Calendar size={24} className="text-ripple-pink" />,
      label: 'Events',
      onClick: () => setPage('events'),
      className: currentPage === 'events' ? 'active' : ''
    },
    {
      icon: <Users size={24} className="text-ripple-purple" />,
      label: 'Sponsors',
      onClick: () => setPage('sponsors'),
      className: currentPage === 'sponsors' ? 'active' : ''
    },
    {
      icon: <Award size={24} className="text-ripple-cyan" />,
      label: 'BR',
      onClick: () => setPage('br'),
      className: currentPage === 'br' ? 'active' : ''
    }
  ];

  return <Dock items={dockItems} />;
};

export const Hero = ({ onGetTickets }: { onGetTickets: () => void }) => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dgmwtonil/image/upload/v1772028541/bg_zhfgwx.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Lightning Effect - No blend mode to avoid shadows */}
      <div className="absolute inset-0 z-[1] opacity-25">
        <Lightning 
          hue={280}
          xOffset={0}
          speed={0.5}
          intensity={0.5}
          size={1.2}
        />
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-[2]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#1a1a2e" opacity="0.3"></path>
        </svg>
      </div>

      {/* Corner Logo */}
      <img
        src="https://res.cloudinary.com/dgmwtonil/image/upload/v1772028988/ripple-logo_mletuc.png"
        alt="Ripple 2026 Logo"
        className="absolute top-4 left-4 md:top-6 md:left-6 z-[10] w-20 md:w-28 h-auto drop-shadow-[0_0_12px_rgba(0,0,0,0.55)]"
      />

      {/* Content Layer */}
      <div className="relative z-[10] text-center px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Date */}
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-ripple-cyan font-heading text-base sm:text-xl md:text-3xl tracking-[0.18em] sm:tracking-[0.3em] mb-4 sm:mb-6"
          >
            13th - 14th - 15th March
          </motion.h2>
          
          {/* Main Title */}
          <h1 className="mb-8 sm:mb-10 font-display leading-[0.95] tracking-tight text-white text-[2.6rem] sm:text-6xl md:text-8xl lg:text-9xl">
            <span>THE GREATEST </span>
            <span className="text-ripple-pink">MEDFEST</span>
            <br />
            <span>IS BACK!</span>
          </h1>
          
          {/* CTA Button - Redirects to BR page */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,0,140,0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetTickets}
            className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-ripple-pink text-ripple-pink font-heading text-base sm:text-xl md:text-2xl tracking-[0.12em] sm:tracking-widest overflow-hidden transition-all hover:border-ripple-pink/80"
          >
            <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
              <Ticket className="group-hover:rotate-12 transition-transform" />
              GET TICKETS →
            </span>
            <div className="absolute inset-0 bg-ripple-pink translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export const About = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Squares Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Squares 
          direction="diagonal"
          speed={0.5}
          borderColor="rgba(30, 58, 138, 0.6)"
          squareSize={50}
          hoverFillColor="rgba(30, 58, 138, 0.2)"
        />
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading mb-4 inline-block relative">
            ABOUT RIPPLE
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-ripple-cyan shadow-[0_0_10px_#00f5ff]" />
          </h2>
          <div className="mt-8 sm:mt-12 space-y-5 sm:space-y-6 text-base sm:text-lg text-white/70 leading-relaxed font-light">
            <p>
              The smallest of pebbles, teeniest and tiniest of them all. Yet the water ripples with its fervour endlessly. RIPPLE is the embodiment of the infinite, from the most unexpected sources. It is a small dream to be lost in the ocean of time and yet rippling through your memories, that you spent jumping and laughing, shouting out your favourite lyrics in the cacophonies of a toneless voice, and yet leaving this annual fest with the warmest hearts. RIPPLE is not a list of events, with star nights and competitions. Rather, its an opportunity, to be your best self and better yet- your truest one. Because whatever you may choose to do. IT WILL RIPPLE.
            </p>
            
            <ul className="space-y-3 text-sm sm:text-base text-white/80 break-words">
              <li>• RIPPLE IS THE LARGEST MEDICAL SUMMERFEST IN DELHI WITH A FOOTFALL OF 30,000+ LAST TIME.</li>
              <li>• WE HAVE HOSTED STARS LIKE MOHIT CHAUHAN, HONEY SINGH, VISHAL SHEKHAR ETC.</li>
              <li>• OUR LATEST SEASON SHOWED A RECORD CROWD OF 20,000+ STUDENTS IN A SINGLE NIGHT</li>
              <li>• UCMS IS THE ONLY AND LARGEST INSTITUTION IN EAST DELHI AND ASSOCIATED WITH A HOSPITAL WITH THE HIGHEST FOOTFALL AND SURROUNDING STATES.</li>
              <li>• WE HAVE A GLORIOUS AND ONE THE LARGEST ALUMINUS NETWORK INCLUDING DR. MAHESH SHARMA(MEMBER OF PARLIAMENT), DGHS, THE DIRECTOR- ICMR, PALASH SEN, LOCAL TRAIN, AND ALSO DR. RAHUL GUPTA (DIRECTOR, DRUGS CONTROL POLICY, USA)</li>
              <li>• WE HAVE ONE OF THE LARGEST GATHERINGS OF QUALITY STUDENT AND PROFESSIONAL CROWD FROM ACROSS INDIA</li>
              <li>• WE POSSESS AN EXCELLENT STUDENT SOCIETY CIRCLE WITH BIG AND EFFECTIVE OUTREACH IN LOCAL AND NATIONWIDE AUDIENCE.</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="relative max-w-[420px] mx-auto w-full"
        >
          <img 
            src="https://res.cloudinary.com/dgmwtonil/image/upload/v1772028988/ripple-logo_mletuc.png" 
            alt="Ripple Logo" 
            className="relative z-10 rounded-2xl hover:scale-105 transition-all duration-500 shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export const Schedule = () => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);

  const scheduleData = {
    1: [
      { time: '9-4', event: 'Kashmakash' },
      { time: '9-1', event: 'Solo Instrumental' },
      { time: '10-1', event: 'Mind and Medium' },
      { time: '9-1', event: 'Rang-e-Kalash and Magical' },
      { time: '1-5', event: 'JAM, Gen-Quiz, Blackout Poetry' },
      { time: '1-5', event: 'Scribble' },
      { time: '1-5', event: 'Nazara' },
      { time: '2-7', event: 'Battle Of Bands' },
      { time: 'Night', event: 'Band Night' }
    ],
    2: [
      { time: '9-1', event: 'Crisis Committee' },
      { time: '9-4', event: 'Filler Quiz' },
      { time: '10-1', event: 'Udaan' },
      { time: '10-5', event: 'Aloka' },
      { time: '10-1', event: 'Botella' },
      { time: '10-5', event: 'Sarthak' },
      { time: '1-5', event: 'India Quiz' },
      { time: '2-5', event: 'Husn-e-Nayan' },
      { time: '10-2', event: 'Nrityanjali' },
      { time: 'Night', event: 'Fashion Night' }
    ],
    3: [
      { time: '10-1', event: 'Namhya' },
      { time: '12-3', event: 'Mudra' },
      { time: '10-1', event: 'Sapno Ki Udaan' },
      { time: '9-5', event: 'Manzar' },
      { time: '10-3', event: 'Sushruta' },
      { time: '10-12', event: 'Ekagrata' },
      { time: '12-3', event: 'Lyrica-Solistica' },
      { time: '10-1', event: 'Tic-Tac-Toe' },
      { time: '1-5', event: 'Fresco' },
      { time: '9-1', event: 'MLD' },
      { time: '1-5', event: 'Iqraar-e-Alfaz' },
      { time: '9-1', event: 'Fandom Quiz' },
      { time: '1-5', event: 'Movie Quiz' },
      { time: 'Night', event: 'Artist Night' }
    ]
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-black/30">
      {/* Squares Background */}
      <div className="absolute inset-0 z-0 opacity-35">
        <Squares 
          direction="right"
          speed={0.8}
          borderColor="rgba(30, 58, 138, 0.5)"
          squareSize={60}
          hoverFillColor="rgba(30, 58, 138, 0.15)"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading text-center mb-10 sm:mb-16">EVENT SCHEDULE</h2>
        
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          {[1, 2, 3].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day as 1 | 2 | 3)}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 font-heading text-lg sm:text-2xl tracking-[0.1em] sm:tracking-widest transition-all ${activeDay === day ? 'bg-ripple-pink text-white shadow-[0_0_20px_#ff008c]' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
            >
              DAY 0{day}
            </button>
          ))}
        </div>

        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-t-4 border-t-ripple-pink"
        >
          <div className="space-y-4 sm:space-y-6">
            {scheduleData[activeDay].map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-3 sm:p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-xl group">
                <div className="flex items-center gap-3 sm:gap-6">
                  <span className="font-heading text-xl sm:text-2xl text-ripple-cyan shrink-0">{item.time}</span>
                  <div>
                    <h4 className="text-base sm:text-xl font-bold group-hover:text-ripple-pink transition-colors">{item.event}</h4>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="text-xs font-bold uppercase tracking-widest px-4 py-2 border border-white/20 rounded-full hover:border-ripple-cyan hover:text-ripple-cyan transition-all">
                    Remind Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Gallery = () => {
  const optimizeCloudinary = (src: string) =>
    src.replace(
      '/upload/',
      window.matchMedia('(max-width: 768px)').matches
        ? '/upload/f_auto,q_auto:eco,dpr_auto,w_720/'
        : '/upload/f_auto,q_auto:good,dpr_auto,w_1200/'
    );

  const galleryImages = [
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772011665/Screenshot_at_2023-11-10_06-27-58_kqacuq.png',
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772011647/Screenshot_at_2023-11-10_06-23-38_yd4ekq.png',
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772011624/Screenshot_at_2023-11-10_07-51-57_gbxdwh.png',
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772011635/Screenshot_at_2023-11-10_06-15-16_fqkbjb.png',
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772011601/Screenshot_at_2023-11-10_06-17-03_fkfecc.png',
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772011593/Screenshot_at_2023-11-10_06-07-35_pplu5h.png',
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772012089/Screenshot_at_2023-11-10_07-55-53_mcn1fr.png',
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772012115/Screenshot_at_2023-11-10_06-17-35_xfgpio.png',
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772012120/gyg_bv5p89.png',
    'https://res.cloudinary.com/dgmwtonil/image/upload/v1772011665/Screenshot_at_2023-11-10_06-27-58_kqacuq.png',
  ].map(optimizeCloudinary);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-full mx-auto bg-black">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-35 pointer-events-none"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dgmwtonil/image/upload/v1772029020/bgforgallery_pjgnxi.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/35 pointer-events-none" />

      <h2 className="relative z-10 text-4xl sm:text-5xl md:text-7xl font-heading text-center mb-10 sm:mb-16">GLIMPSE OF PREVIOUS RIPPLE</h2>

      <div className="relative z-10 min-h-[360px] sm:min-h-[500px] md:min-h-[600px]">
        <DomeGallery
          images={galleryImages}
          grayscale={false}
          imageBorderRadius="20px"
        />
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer id="footer" className="relative bg-black pt-20 sm:pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dgmwtonil/image/upload/v1772029057/footer_hajjac.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/55 pointer-events-none" />

      {/* Graffiti Divider */}
      <div className="absolute top-0 left-0 w-full h-16 sm:h-24 bg-white/5 flex items-center justify-center overflow-hidden">
        <div className="whitespace-nowrap flex gap-6 sm:gap-12 text-ripple-pink/20 font-display text-3xl sm:text-6xl opacity-30 select-none">
          {Array(10).fill('RIPPLE 2026').map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 sm:gap-16 relative z-10">
        <div>
          <h3 className="text-3xl sm:text-4xl font-display text-ripple-pink neon-glow-pink mb-4 sm:mb-6">RIPPLE</h3>
          <p className="text-white/50 leading-relaxed mb-8">
            The ultimate urban college fest. Experience the energy, the talent, and the neon nights.
          </p>
          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.2, color: '#ff008c' }} href="https://instagram.com/ripple_ucms" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-white/70">
              <Instagram size={24} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#00f5ff' }} href="mailto:ripple2026.ucms@gmail.com" className="p-3 glass rounded-full text-white/70">
              <Mail size={24} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#7b2ff7' }} href="tel:7835810675" className="p-3 glass rounded-full text-white/70">
              <Phone size={24} />
            </motion.a>
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <h4 className="text-xl sm:text-2xl font-heading text-ripple-cyan">LOCATE US</h4>
          <div className="flex items-start gap-4 text-white/60">
            <MapPin className="text-ripple-pink shrink-0" />
            <p className="break-words">University College of Medical Sciences,<br />GTB Hospital<br />Dilshad Garden, New Delhi - 110095</p>
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <Instagram className="text-ripple-pink shrink-0" />
            <a href="https://instagram.com/ripple_ucms" target="_blank" rel="noopener noreferrer" className="hover:text-ripple-cyan transition-colors">@ripple_ucms</a>
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <Mail className="text-ripple-pink shrink-0" />
            <a href="mailto:ripple2026.ucms@gmail.com" className="hover:text-ripple-cyan transition-colors">ripple2026.ucms@gmail.com</a>
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <Phone className="text-ripple-pink shrink-0" />
            <a href="tel:7835810675" className="hover:text-ripple-cyan transition-colors">7835810675</a>
          </div>
        </div>

        <div>
          <h4 className="text-xl sm:text-2xl font-heading text-ripple-cyan mb-6">NEWSLETTER</h4>
          <p className="text-white/50 mb-6">Get the latest updates on events and tickets.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-ripple-pink transition-colors"
            />
            <button className="bg-ripple-pink px-6 py-2 rounded-lg font-bold hover:bg-ripple-pink/80 transition-colors w-full sm:w-auto">
              JOIN
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 sm:mt-24 pt-8 border-t border-white/5 text-center text-white/30 text-xs sm:text-sm">
        <p>&copy; 2026 RIPPLE FEST. ALL RIGHTS RESERVED. DESIGNED WITH NEON & SOUL.</p>
      </div>
    </footer>
  );
};

export const EventsPage = () => {
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const filteredEvents = filter === 'All' ? EVENTS : EVENTS.filter(e => e.category === filter);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/dgmwtonil/image/upload/v1772028969/bgforevents_hqeboh.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
          opacity: 0.4
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-display text-white leading-none">EVENTS</h1>
          <p className="text-ripple-cyan font-heading text-lg sm:text-2xl tracking-[0.15em] sm:tracking-widest mt-4">CHOOSE YOUR BATTLEGROUND</p>
        </div>

        {/* Custom Neon Dropdown */}
        <div className="relative w-full md:w-auto">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-4 px-5 sm:px-6 py-3 glass rounded-xl border-ripple-cyan/30 hover:border-ripple-cyan transition-all w-full md:min-w-[240px] justify-between"
          >
            <span className="font-heading text-lg sm:text-xl tracking-[0.1em] sm:tracking-widest">{filter === 'All' ? 'SORT BY CATEGORY' : filter.toUpperCase()}</span>
            <ChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-full glass rounded-xl overflow-hidden z-20"
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setFilter(cat); setIsDropdownOpen(false); }}
                    className="w-full text-left px-6 py-3 hover:bg-ripple-cyan/20 hover:text-ripple-cyan transition-colors font-heading text-lg tracking-widest"
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredEvents.map((event) => (
          <motion.div
            layout
            key={event.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            className="glass rounded-3xl overflow-hidden group border-t-4 border-t-ripple-purple"
          >
            <div className="relative h-52 sm:h-64 overflow-hidden bg-black/50">
              <img src={event.image} alt={event.name} className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-4 right-4 bg-ripple-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-xs font-bold text-ripple-cyan uppercase tracking-widest">{event.category}</span>
              </div>
            </div>
            
            <div className="p-5 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-heading mb-2 group-hover:text-ripple-pink transition-colors">{event.name}</h3>
              <p className="text-white/50 text-sm mb-6 line-clamp-2">{event.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="flex-1 bg-ripple-pink py-3 rounded-xl font-heading text-lg sm:text-xl tracking-[0.1em] sm:tracking-widest hover:bg-ripple-pink/80 transition-all shadow-[0_0_15px_rgba(255,0,140,0.3)]">
                  REGISTER
                </button>
                <button className="px-4 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center">
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
};

export const SponsorsPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Balatro
          spinRotation={-1.6}
          spinSpeed={5.5}
          offset={[0, 0]}
          color1="#ff2f6d"
          color2="#00cfff"
          color3="#111827"
          contrast={3.2}
          lighting={0.35}
          spinAmount={0.28}
          pixelFilter={780}
          spinEase={1}
          isRotate
          mouseInteraction={false}
        />
      </div>

      <div className="absolute inset-0 bg-black/45 z-[1]" />

      <section className="relative z-10 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-display text-white leading-none mb-6">SPONSORS</h1>
        <p className="text-ripple-cyan font-heading text-lg sm:text-2xl tracking-[0.15em] sm:tracking-widest mb-12">PARTNERS WHO MAKE RIPPLE POSSIBLE</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {['Title Sponsor', 'Powered By', 'Associate Partner', 'Media Partner', 'Community Partner', 'Hospitality Partner'].map((slot) => (
            <div key={slot} className="glass rounded-3xl p-6 sm:p-8 border border-white/10 min-h-40 flex flex-col justify-between">
              <span className="text-xs text-white/60 tracking-[0.2em] uppercase">{slot}</span>
              <h3 className="text-xl sm:text-2xl font-heading tracking-widest text-white/90">Coming Soon</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
