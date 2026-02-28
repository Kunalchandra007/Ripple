import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Mail, Phone, MapPin, ChevronDown, Ticket, Home, Calendar, Users, Award } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Lightning from './Lightning';
import Squares from './Squares';
import DomeGallery from './DomeGallery';
import Dock from './Dock';
import Balatro from './Balatro';
import SpotlightCard from './SpotlightCard';

// --- Types ---
export type Page = 'home' | 'events' | 'sponsors' | 'br';

export interface Event {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  registerUrl: string;
  rulesUrl?: string;
  literaryType?: string;
  day: 1 | 2 | 3;
  time: string;
}

// --- Constants ---
export const CATEGORIES = [
  'All',
  'Academic',
  'Art',
  'Dance',
  'Drama',
  'Fashion',
  'Film Making',
  'Informal',
  'Literary',
  'Mental Health',
  'Music',
  'Poetry',
  'Photography',
  'Welfare'
];

const INITIAL_VISIBLE_EVENTS = 9;
const LOAD_MORE_EVENTS_STEP = 9;

const BLANK_POSTER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'><rect width='600' height='800' fill='%230a0a0a'/><rect x='18' y='18' width='564' height='764' fill='none' stroke='%23333333' stroke-width='3'/><text x='300' y='360' fill='%23ffffff' font-family='Arial, sans-serif' font-size='58' font-weight='700' text-anchor='middle'>POSTER</text><text x='300' y='440' fill='%23ffffff' font-family='Arial, sans-serif' font-size='58' font-weight='700' text-anchor='middle'>COMING SOON</text></svg>";

const toCloudinaryPosterUrl = (src: string) => {
  if (!src) {
    return BLANK_POSTER;
  }

  if (src.includes('res.cloudinary.com')) {
    return src;
  }

  if (src.startsWith('/events/')) {
    return `https://res.cloudinary.com/dgmwtonil/image/upload${encodeURI(src)}`;
  }

  return src;
};

export const EVENTS: Event[] = [
  // Academic
  {
    id: '50',
    name: 'INIQUITOUS',
    category: 'Academic',
    description: '[Academic event]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772286824/Iniquitous_mrktg6.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeP2rj5ha8BSZE5I81Hvsjx61uD9GRyQZzYFG7mKp3L1ByYJg/viewform',
    rulesUrl: '/events/Academic/Inquitous.pdf',
    day: 1,
    time: 'TBA'
  },
  // Art
  {
    id: '1',
    name: 'POT O PAINT',
    category: 'Art',
    description: '[Pot painting Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772286898/Pot_o_paint_m9bthc.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe-UkFluzVVC6hMuw7Bj18UhAsVnwhX-9SQ3dcrGJAU7O2Jdw/viewform',
    rulesUrl: '/events/Art/Pot o paint.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '2',
    name: 'RANG E BOTTLE',
    category: 'Art',
    description: '[Bottle painting Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287046/Rang_e_bottle_atu3s7.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScrjnojVb9Zq53AFUg58hu4J4g-YVCFZdlV5ElupArP2HRVFg/viewform',
    rulesUrl: '/events/Art/Rang e bottle.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '3',
    name: 'TOTE ALLY CREATIVE',
    category: 'Art',
    description: '[Tote bag painting Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772286936/Tote_ally_creative_fsfj59.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfCSwSpFFu_ovyawhfST6vbyjz_dNUNCpE5X-UzNMr-9YrlLw/viewform',
    rulesUrl: '/events/Art/Totally creative.pdf',
    day: 1,
    time: 'TBA'
  },
  // Dance
  {
    id: '4',
    name: 'MUDRA',
    category: 'Dance',
    description: '[Duo dance Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287081/Mudra_becada.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeTMZoPaoCPTDvrVHxCrtUO3AHqM9WKe9GyX58tP4i1HN6Tsg/viewform',
    rulesUrl: '/events/Dance/Mudra.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '5',
    name: 'NAMYA',
    category: 'Dance',
    description: '[Solo dance Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287087/Namhya_r3mscc.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSflBI22yGMT-e70U-CzbRjwzBvoufpGL6ciz0rBKeeAh5dvEA/viewform?usp=header',
    rulesUrl: '/events/Dance/Namhya.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '6',
    name: 'NRITYANJALI',
    category: 'Dance',
    description: '[Group dance Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287148/Nrityanjali_nzabuu.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfricskuwFBGG4pTS5wM82YA1c-wSR5PTwyHzEV3lLWPvzUOA/viewform',
    rulesUrl: '/events/Dance/Nrityanjali.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '7',
    name: 'RETRO REMIX',
    category: 'Dance',
    description: '[Online reel making Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287209/Retro_remix_g5otdl.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfwTaakwVhUISzXz04O2iz5FqHfeP9SZtDDWHm5Pg9cxbTXEA/viewform',
    rulesUrl: '/events/Dance/Retro remix.pdf',
    day: 1,
    time: 'TBA'
  },
  // Drama
  {
    id: '8',
    name: 'DIALOGUEBAAZI',
    category: 'Drama',
    description: '[Online script writing Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287236/Dialoguebaazi_kxvaus.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScSQlxxNR5qA2LCDTb8dH0jQlcIcHf7xx-9gdxukm3CNl6CjA/viewform',
    rulesUrl: '/events/Drama/Dialoguebaazi.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '9',
    name: 'KASHMAKASH',
    category: 'Drama',
    description: '[Nukkad natak Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287312/Kashmakash_h7q1h1.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeuF8qhT11p0_28X56GXEPQc5fGMWfGMfHUszXALkrrch25tg/viewform',
    rulesUrl: '/events/Drama/Kashmakash.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '10',
    name: 'SARTHAK',
    category: 'Drama',
    description: '[Mono/Duet act Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287262/Sarthak_yllgof.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScCA_jfXgU1DH9IVWM1BVxWwF7fKH-TiRa5g6_ymEAcebyCiw/viewform',
    rulesUrl: '/events/Drama/Sarthak.pdf',
    day: 1,
    time: 'TBA'
  },
  // Fashion
  {
    id: '11',
    name: 'ADIRA',
    category: 'Fashion',
    description: '[The catwalk carnival]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287388/Adira_avsux5.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe3c46Bj3xWx2YVWjd_VQ_P4b7BxIl6zRu6IR7tQppMFG5irA/viewform',
    rulesUrl: '/events/Fashion/Adira.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '13',
    name: 'NAVRAS',
    category: 'Fashion',
    description: '[Online makeup/portfolio Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287392/Navras_pilqvz.png',
    registerUrl: '#',
    rulesUrl: '/events/Fashion/Navras.pdf',
    day: 1,
    time: 'TBA'
  },
  // Film Making
  {
    id: '14',
    name: 'MANZAR',
    category: 'Film Making',
    description: '[On spot filmmaking Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287461/Manzar_sgcsfo.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfyXX64NJvk_a4vLeLcnUaT7Xs0_hu-6fnZ9fF1Mdi6e-El1w/viewform',
    rulesUrl: '/events/Film Making/Manzar.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '15',
    name: 'NAZAARA',
    category: 'Film Making',
    description: '[Online film submission Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772289550/Nazaara_ivq9eo.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScbOdpWR4JyeunBwibsY_JZvb39JbQgLGWd9e5S3seiVzoMlg/viewform',
    rulesUrl: '/events/Film Making/Nazaara.pdf',
    day: 1,
    time: 'TBA'
  },
  // Informal
  {
    id: '16',
    name: "RIPPLE'S GOT LATENT",
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287648/Ripple_s_got_latent_xjpogf.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeBv1xE_bYVO2lBCIXEaXmNuXxcH3zbvWT-bI47FWd2vZD_yA/viewform',
    rulesUrl: '/events/Informal/Ripple got talent.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '17',
    name: 'THE GREAT GAME OF TREASURE',
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287740/The_great_game_of_treasure_py46iu.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc2suOrqcxNh3-MFzn5gy_c06ha-7pLSyArhqwlfLIHNf91sA/viewform',
    rulesUrl: '/events/Informal/The great game of treasure.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '18',
    name: 'HOGATHON',
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287633/Hogathon_tlvrda.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfVm9STpx73vYRbn8zaJAyrjzR1fd7enHX1DwcCv7dVhVHXbA/viewform',
    day: 1,
    time: 'TBA'
  },
  {
    id: '19',
    name: "THE TRAITOR'S CHAIR",
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287744/The_traitors_chair_ll3y6l.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfhhPuIdI49xjef1A3XXXjL1YcidWrSJvgOxpXt6fLZmN7rCw/viewform',
    rulesUrl: '/events/Informal/The traitors chair.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '20',
    name: 'BEG BORROW STEAL',
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287608/Beg_borrow_steal_x9ihae.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfcQk8ulNGbxJWSiCOrtnSD8vb_sbB5CQJUXoQpaH8J4Myysw/viewform',
    rulesUrl: '/events/Informal/Beg borrow steal.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '21',
    name: 'DARE TO DART',
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287620/Dare_to_dart_kksrrf.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSceNy41iNuGQwod100imWfbTKRxfOEUlnrgG4spAZh1SI8AqA/viewform',
    rulesUrl: '/events/Informal/Dare to dart.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '22',
    name: "ELEVATOR'S PITCH",
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287623/Elevators_pitch_p1ives.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScQX9TI2ei5vJQ71UCKmlN1SH9JxG4ja3Ovi-L_Ur-JHaHJ_Q/viewform',
    rulesUrl: '/events/Informal/Elevators pitch.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '23',
    name: 'PETALS & SECRETS',
    category: 'Informal',
    description: '[Anonymous rose and anonymous compliments]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772289255/Petals_and_secrets_bf4uyt.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfdJP7QxJXxKkKNc7x78jvRj_P16kNRJzscBndoXbCbS9pA9g/viewform',
    rulesUrl: '/events/Informal/Petals and secrets.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '24',
    name: 'BLIND TRUST WALK',
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287617/Blind_trustwalk_v2revz.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd4R868La4O6nlROqoFmuvIVEswM7xaY0I59cHDrV0p3XBCsQ/viewform',
    rulesUrl: '/events/Informal/Blind trustwalk.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '25',
    name: 'MEMED',
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287640/Memed_fozmm3.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfluWKe1g2wg8qpFPY2pAGlJTb6c9Ixymn-yTIp9a8wWrCTuQ/viewform',
    rulesUrl: '/events/Informal/Memed.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '26',
    name: "TEACHER'S CARNIVAL",
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287736/Teachers_carnival_ldfhi2.png',
    registerUrl: '#',
    rulesUrl: '/events/Informal/Teachers carnival.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '27',
    name: 'PROM NIGHT',
    category: 'Informal',
    description: '',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287644/Prom_night_wglh01.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSex26pG86aUQX9RmMJLcc0_Eigiplsn_pXFMEegH_n8xmNChg/viewform',
    rulesUrl: '/events/Informal/Prom night.pdf',
    day: 1,
    time: 'TBA'
  },
  // Literary
  {
    id: '28',
    name: 'IN THE MOOD FOR HINTS',
    category: 'Literary',
    literaryType: 'QUIZ',
    description: '[A melas flavoured general quiz]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287959/In_the_mood_for_hints_txyq56.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc1n5Zx7RWIbtdnaA6GohJvcAChu_8tfMRWSEfyzZScqOUwgg/viewform',
    rulesUrl: '/events/Literary/Quiz/In the mood for hints.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '29',
    name: 'ABSOLUTE CINEMA QUIZ',
    category: 'Literary',
    literaryType: 'QUIZ',
    description: '[A movies quiz]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287855/Absolute_cinema_quiz_p9zrgx.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfiEA2M3qXoqNZf0BdJo3-FZ-n1VoKSK4ZJcFUgCLgB_9pQqQ/viewform',
    rulesUrl: '/events/Literary/Quiz/Absolute cinema quiz.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '30',
    name: 'CHAI CHARCHA AUR CHATURAI',
    category: 'Literary',
    literaryType: 'QUIZ',
    description: '[India quiz]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772287905/Chai_charcha_aur_chaturai_apield.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeRHQw7i4gI_8E9RQQ5Zr6HHMXfTlCgGtm_4Kq-yn2sJ_fRaw/viewform',
    rulesUrl: '/events/Literary/Quiz/Chai charcha chaturai.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '31',
    name: 'QUIZZED IN MY PANTS',
    category: 'Literary',
    literaryType: 'QUIZ',
    description: '[A Fandom quiz]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772289359/Quizzed_in_my_pants_wsb9ko.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfdvQJzZYwQVE3cmdWKL4zUzz82yfI_e1HeVmXPiVCxg3nMAA/viewform',
    rulesUrl: '/events/Literary/Quiz/Quizzed in my pants.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '32',
    name: 'JAM',
    category: 'Literary',
    literaryType: 'SPEAKING',
    description: '[Just a minute]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288153/JAM_mkgchi.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScTtqK-4X_-Ti8rJ1T1tT3qWLawXXelZ0bGTFYJp_1ILeL1aA/viewform',
    rulesUrl: '/events/Literary/Speaking/Jam.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '33',
    name: 'SENATUS',
    category: 'Literary',
    literaryType: 'SPEAKING',
    description: '[Multi level debate]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288254/Senatus_yh2jje.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeqa-zeM9f5eGdioNdYQolAvIuRgP2XbzKB5s1guv8zA5OMgA/viewform',
    rulesUrl: '/events/Literary/Speaking/Senatus.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '34',
    name: 'CRISIS COMMITTEE',
    category: 'Literary',
    literaryType: 'SPEAKING',
    description: '[Nepal interim governance crisis committee]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288078/Crisis_Commitee_hcoi3m.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe2r2dQku2ea6WCIE3HvY8S6MzwcG0dgSD9UABYqdmHDjFICA/viewform',
    rulesUrl: '/events/Literary/Speaking/Crisis commiteee.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '35',
    name: 'TALESMITH',
    category: 'Literary',
    literaryType: 'WRITING',
    description: '[Online creative writing]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288340/Talesmith_co6wcf.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScYsOo4AwZ2zRFrCpOAtXoVVo_6az1EAUmOIuK6DkNDlapmdA/viewform',
    rulesUrl: '/events/Literary/Writing/Talesmith.pdf',
    day: 1,
    time: 'TBA'
  },
  // Mental Health
  {
    id: '36',
    name: 'MIND AND MAPS',
    category: 'Mental Health',
    description: '[Art events and mental health talks]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288438/Mind_and_maps_ntgppn.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe65c8xwiR21sNwxziHDJ1h1Qho03yv2qE-XUNGLelWSbyPgQ/viewform',
    rulesUrl: '/events/Mental Health/Minds and maps.pdf',
    day: 1,
    time: 'TBA'
  },
  // Music
  {
    id: '37',
    name: 'VALHALLA',
    category: 'Music',
    description: '[Battle of bands]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288452/Bob_yjvesi.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdrckovuXEM7-IJdP6BxTMjHbbP5vNQNTFWURmMY-8kvUxcGg/viewform',
    rulesUrl: '/events/Music/Valhallw.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '38',
    name: 'EKAGRATA',
    category: 'Music',
    description: '[Solo Indian singing Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288460/Ekagrata_zot4ds.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdez1vsO9HQGcgLX4bJYy87hzWcgGIZ0AbgiybCMex_LfB4Jg/viewform',
    rulesUrl: '/events/Music/Ekagrata.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '39',
    name: 'LYRICA SOLISTICA',
    category: 'Music',
    description: '[Solo western singing Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288462/Lyrica_solistica_prgnkx.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeGoD-NOPs2C3N4Ll_Sx3a6xfocseQz_hEukOh3TQrh2GvB3A/viewform',
    rulesUrl: '/events/Music/Lyrics solistica.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '40',
    name: 'SWARNABHUTI',
    category: 'Music',
    description: '[Solo instrumental Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288470/Swarnabhuti_rnv9h9.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdFC_SQfgN6GybrdBjiBVm6RlUfLEXzD-jnjJUloslqnGja0g/viewform',
    rulesUrl: '/events/Music/Swarnabhuti.pdf',
    day: 1,
    time: 'TBA'
  },
  // Poetry
  {
    id: '41',
    name: 'IQRAAR E ALFAAZ',
    category: 'Poetry',
    description: '[Spoken word poetry competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288610/Iqraar-e-Alfaaz_aadkio.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeHUEHQ79RJf-Mjc4VLppe0Af6L5CvpVkEprDZiYQOJpe5Bng/viewform?usp=sharing&ouid=111344145043972777353',
    rulesUrl: '/events/Poetry/Iqraar e alfaaz.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '42',
    name: 'SHADOWED SCRIPT',
    category: 'Poetry',
    description: '[Blackout poetry competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288712/Shadowed_Script_ygmslq.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdMmmVzqCnuDQBzNZr6YD6om7QWj1Nj0oNkziVRjjmLI87OVA/viewform?usp=sharing&ouid=111344145043972777353',
    rulesUrl: '/events/Poetry/Shadowed script.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '43',
    name: 'RASARANG',
    category: 'Poetry',
    description: '[Online poetry writing competition on assigned rasa]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288673/Rasrang_gme8hn.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeFowU9Cjg6c1W2eSNhVnOtjBS58xURgYiiuSaFTBA2hWXqBg/viewform?usp=sharing&ouid=111344145043972777353',
    rulesUrl: '/events/Poetry/Rasrang.pdf',
    day: 1,
    time: 'TBA'
  },
  // Photography
  {
    id: '44',
    name: 'ALOKA',
    category: 'Photography',
    description: '[On spot photography Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288480/Aloka_srawyu.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScM9Yrqe4lWBbmW-xV7jSKOYTtItMWZHreuyOZH4rwYzWyF7Q/viewform',
    rulesUrl: '/events/Photography/Aloka.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '45',
    name: 'LAMHA',
    category: 'Photography',
    description: '[Event photography]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288523/Lamha_npmf6w.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfDS6Q5mvdWe5GzedapUUBaXpdaCqdWMJbEv3rGqPf94xV9Rg/viewform',
    rulesUrl: '/events/Photography/Lamha.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '46',
    name: 'PRATIBIMBA',
    category: 'Photography',
    description: '[Online photography Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288529/Pratibimba_eyunmn.jpg',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfCGxkXQYuVJZgGf3YD3yjui6g1-PSw-BiFOFiV8kwV30P2RA/viewform',
    rulesUrl: '/events/Photography/Pratibimba.pdf',
    day: 1,
    time: 'TBA'
  },
  // Welfare
  {
    id: '47',
    name: 'RANG E KALASH',
    category: 'Welfare',
    description: '[Cultural pot painting Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288722/Rang_e_kalash_csxvis.png',
    registerUrl: '#',
    rulesUrl: '/events/Welfare/Rang e kalaash.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '48',
    name: 'TRANSCEND',
    category: 'Welfare',
    description: '[Poster making Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288743/Societies__event_RIPPLE_26__20260221_061129_0000_z5oqkj.png',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeG6_tNyJ_ESTO3ali9880xQwb9HoFORSsAwGPZ4ySU4X3lmw/viewform',
    rulesUrl: '/events/Welfare/Transcend.pdf',
    day: 1,
    time: 'TBA'
  },
  {
    id: '49',
    name: 'UDAAN',
    category: 'Welfare',
    description: '[Quiz Competition]',
    image: 'https://res.cloudinary.com/dgmwtonil/image/upload/v1772288751/Udaan_t1edm9.png',
    registerUrl: '#',
    rulesUrl: '/events/Welfare/Udaan.pdf',
    day: 1,
    time: 'TBA'
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
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading mb-6 inline-block relative leading-[0.95]">
            ABOUT RIPPLE
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-ripple-cyan shadow-[0_0_10px_#00f5ff]" />
          </h2>
          <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6 text-base sm:text-lg text-white/75 leading-relaxed font-body">
            <p>
              The smallest of pebbles, teeniest and tiniest of them all. Yet the water ripples with its fervour endlessly. RIPPLE is the embodiment of the infinite, from the most unexpected sources. It is a small dream to be lost in the ocean of time and yet rippling through your memories, that you spent jumping and laughing, shouting out your favourite lyrics in the cacophonies of a toneless voice, and yet leaving this annual fest with the warmest hearts. RIPPLE is not a list of events, with star nights and competitions. Rather, its an opportunity, to be your best self and better yet- your truest one. Because whatever you may choose to do. IT WILL RIPPLE.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-ripple-cyan text-xl sm:text-2xl font-heading">30,000+</p>
                <p className="text-white/70 text-xs sm:text-sm tracking-wide">Largest medical summerfest footfall in Delhi</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-ripple-pink text-xl sm:text-2xl font-heading">20,000+</p>
                <p className="text-white/70 text-xs sm:text-sm tracking-wide">Single-night record crowd in latest season</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-ripple-cyan text-base sm:text-lg font-heading">STAR LEGACY</p>
                <p className="text-white/70 text-xs sm:text-sm tracking-wide">Mohit Chauhan, Honey Singh, Vishal Shekhar and more</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-ripple-pink text-base sm:text-lg font-heading">PAN-INDIA REACH</p>
                <p className="text-white/70 text-xs sm:text-sm tracking-wide">Strong alumni network and nationwide student outreach</p>
              </div>
            </div>
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
      { time: '9 am onwards', event: 'Kashmakash' },
      { time: '9 am onwards', event: 'Swarnabhuti' },
      { time: '10 am onwards', event: 'Mind & Maps' },
      { time: '10 am onwards', event: 'Rang-e-kalash' },
      { time: '1 pm onwards', event: 'Valhalla' },
      { time: '1 pm onwards', event: 'Shadpwed Script' },
      { time: '1 pm onwards', event: 'JAM' },
      { time: '1 pm onwards', event: "The traitor's chair" },
      { time: '2 pm onwards', event: 'In the mood for hints' },
      { time: '2 pm onwards', event: 'Tote-ally Creative' },
      { time: '3 pm onwards', event: "Elevator's Pitch" },
      { time: '4 pm onwards', event: 'Prom Night' },
      { time: 'NIGHT', event: 'BAND NIGHT' }
    ],
    2: [
      { time: '9 am onwards', event: 'Nepal interim governance crisis committee' },
      { time: '9 am onwards', event: 'Sarthak' },
      { time: '10 am onwards', event: 'Nrityanjali' },
      { time: '10 am onwards', event: 'Aloka' },
      { time: '11 am onwards', event: "Teacher's Carnival" },
      { time: '12 pm onwards', event: 'Beg borrow and steal' },
      { time: '1 pm onwards', event: 'Dare to Dart' },
      { time: '2 pm onwards', event: 'Chai Charcha Chaturai' },
      { time: '2 pm onwards', event: 'Blind trustwalk' },
      { time: '3 pm onwards', event: 'Rang-e-bottle' },
      { time: '3 pm onwards', event: "Ripple's got latent" },
      { time: '3 pm onwards', event: 'Adira' },
      { time: 'NIGHT', event: 'DJ NIGHT' }
    ],
    3: [
      { time: '9 am onwards', event: 'Senatus' },
      { time: '9 am onwards', event: 'Inquitous' },
      { time: '9 am onwards', event: 'Quizzed in my pants' },
      { time: '9 am onwards', event: 'Namya' },
      { time: '9 am onwards', event: 'Manzar' },
      { time: '10 am onwards', event: 'Transcend' },
      { time: '11 am onwards', event: 'Lyrica solistica' },
      { time: '11 am onwards', event: 'Mudra' },
      { time: '11 am onwards', event: 'Udaan' },
      { time: '11 am onwards', event: 'The Great Game of Treasure' },
      { time: '12 pm onwards', event: 'Hogathon' },
      { time: '1 pm onwards', event: 'Iqraar-e-Alfaaz' },
      { time: '1 pm onwards', event: 'Ekagrata' },
      { time: '2 pm onwards', event: 'Pot-o-Paint' },
      { time: '2 pm onwards', event: 'Absolute cinema quiz' },
      { time: 'NIGHT', event: 'STAR NIGHT' }
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

        <SpotlightCard
          className="rounded-2xl sm:rounded-3xl border-t-4 border-t-ripple-pink"
          spotlightColor="rgba(0, 245, 255, 0.18)"
        >
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8"
        >
          <div className="max-h-[65vh] overflow-y-auto pr-1 sm:pr-2 space-y-3 sm:space-y-4">
            {scheduleData[activeDay].map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-[280px_1fr] items-center gap-2 md:gap-8 p-4 sm:p-5 rounded-xl bg-black/25 hover:bg-black/35 transition-colors"
              >
                <span className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-[0.04em] text-ripple-cyan leading-none">
                  {item.time}
                </span>
                <h4 className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-[0.06em] text-white leading-tight">
                  {item.event}
                </h4>
              </div>
            ))}
          </div>
        </motion.div>
        </SpotlightCard>
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

export const Footer = ({ onGetTickets }: { onGetTickets?: () => void }) => {
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
          <div className="mb-8 space-y-1">
            <p className="text-white/85 text-lg sm:text-xl font-semibold tracking-wide">
              Experience the Ultimate Medfest.
            </p>
            <p className="text-ripple-cyan text-base sm:text-lg font-heading tracking-[0.08em] sm:tracking-[0.12em] uppercase">
              Save your slot now.
            </p>
          </div>
          {onGetTickets && (
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 22px rgba(255,0,140,0.45)' }}
              whileTap={{ scale: 0.96 }}
              onClick={onGetTickets}
              className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 border border-ripple-pink text-ripple-pink font-heading tracking-[0.12em] sm:tracking-[0.16em] rounded-lg hover:bg-ripple-pink hover:text-white transition-colors"
            >
              <Ticket size={18} />
              GET TICKETS
            </motion.button>
          )}
          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.2, color: '#ff008c' }} href="https://instagram.com/ripple_ucms" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-white/70">
              <Instagram size={24} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#00f5ff' }} href="mailto:ripple2026.ucms@gmail.com" className="p-3 glass rounded-full text-white/70">
              <Mail size={24} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#7b2ff7' }} href="tel:9870163059" className="p-3 glass rounded-full text-white/70">
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
            <a href="tel:9870163059" className="hover:text-ripple-cyan transition-colors">9870163059</a>
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <Phone className="text-ripple-pink shrink-0" />
            <a href="tel:7835810675" className="hover:text-ripple-cyan transition-colors">7835810675</a>
          </div>
        </div>

        <div>
          <h4 className="text-xl sm:text-2xl font-heading text-ripple-cyan mb-6">SEND YOUR QUERIES</h4>
          <p className="text-white/50 mb-6">Query section will be working soon</p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:border-ripple-pink transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:border-ripple-pink transition-colors"
            />
            <textarea
              placeholder="Your Query"
              rows={4}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:border-ripple-pink transition-colors resize-none"
            />
            <button
              type="submit"
              className="bg-ripple-pink px-6 py-2.5 rounded-lg font-bold hover:bg-ripple-pink/80 transition-colors w-full sm:w-auto"
            >
              SEND
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 sm:mt-24 pt-8 border-t border-white/5 text-white/30 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-center sm:text-right sm:ml-auto px-2 py-1 font-heading tracking-[0.12em] text-ripple-pink font-bold drop-shadow-[0_0_10px_rgba(255,0,140,0.65)]">
          Made and managed by{' '}
          <a
            href="https://my-portfolio-zeta-ruby-26.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-extrabold text-ripple-cyan underline underline-offset-4 decoration-ripple-pink hover:text-white transition-colors"
          >
            Kunal
          </a>
        </p>
      </div>
    </footer>
  );
};

export const EventsPage = () => {
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [literaryFilter, setLiteraryFilter] = useState('All Literary');
  const [isLiteraryDropdownOpen, setIsLiteraryDropdownOpen] = useState(false);
  const [visibleEventsCount, setVisibleEventsCount] = useState(INITIAL_VISIBLE_EVENTS);

  const literarySubtopics = [
    'All Literary',
    ...Array.from(
      new Set(
        EVENTS.filter((event) => event.category === 'Literary')
          .map((event) => event.literaryType || event.name)
      )
    )
  ];

  const filteredEvents = EVENTS.filter((event) => {
    if (filter === 'All') {
      return true;
    }

    if (filter !== 'Literary') {
      return event.category === filter;
    }

    if (literaryFilter === 'All Literary') {
      return event.category === 'Literary';
    }

    return event.category === 'Literary' && (event.literaryType || event.name) === literaryFilter;
  });

  useEffect(() => {
    setVisibleEventsCount(INITIAL_VISIBLE_EVENTS);
  }, [filter, literaryFilter]);

  const visibleEvents = filteredEvents.slice(0, visibleEventsCount);
  const hasMoreEvents = visibleEventsCount < filteredEvents.length;

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

        {/* Category + Literary Subtopic Dropdowns */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                  className="absolute top-full right-0 mt-2 w-full glass rounded-xl overflow-hidden z-20 max-h-[60vh] overflow-y-auto overscroll-contain scroll-smooth"
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFilter(cat);
                        if (cat !== 'Literary') {
                          setLiteraryFilter('All Literary');
                          setIsLiteraryDropdownOpen(false);
                        }
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-6 py-3 hover:bg-ripple-cyan/20 hover:text-ripple-cyan transition-colors font-heading text-lg tracking-widest"
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {filter === 'Literary' && (
            <div className="relative w-full md:w-auto">
              <button
                onClick={() => setIsLiteraryDropdownOpen(!isLiteraryDropdownOpen)}
                className="flex items-center gap-4 px-5 sm:px-6 py-3 glass rounded-xl border-ripple-pink/30 hover:border-ripple-pink transition-all w-full md:min-w-[260px] justify-between"
              >
                <span className="font-heading text-lg sm:text-xl tracking-[0.1em] sm:tracking-widest">
                  {literaryFilter.toUpperCase()}
                </span>
                <ChevronDown className={`transition-transform ${isLiteraryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLiteraryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-full glass rounded-xl overflow-hidden z-20 max-h-[60vh] overflow-y-auto overscroll-contain scroll-smooth"
                  >
                    {literarySubtopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setLiteraryFilter(topic);
                          setIsLiteraryDropdownOpen(false);
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-ripple-pink/20 hover:text-ripple-pink transition-colors font-heading text-lg tracking-widest"
                      >
                        {topic.toUpperCase()}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {visibleEvents.map((event, eventIndex) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            className="glass rounded-3xl overflow-hidden group border-t-4 border-t-ripple-purple"
          >
            <div className="relative h-52 sm:h-64 overflow-hidden bg-black/50">
              <img
                src={toCloudinaryPosterUrl(event.image)}
                alt={event.name}
                loading={eventIndex < 6 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={eventIndex < 3 ? 'high' : 'low'}
                width={600}
                height={800}
                className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-ripple-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-xs font-bold text-ripple-cyan uppercase tracking-widest">{event.category}</span>
              </div>
            </div>
            
            <div className="p-5 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-heading mb-2 group-hover:text-ripple-pink transition-colors">{event.name}</h3>
              <p className="text-white/70 text-base sm:text-lg font-medium italic tracking-wide mb-6 line-clamp-2">
                {event.description.replace(/^\s*\[|\]\s*$/g, '')}
              </p>
              
              <div className="flex flex-col gap-3">
                {event.registerUrl !== '#' && (
                  <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-ripple-pink py-3 rounded-xl font-heading text-lg sm:text-xl tracking-[0.1em] sm:tracking-widest hover:bg-ripple-pink/80 transition-all shadow-[0_0_15px_rgba(255,0,140,0.3)] text-center"
                  >
                    REGISTER
                  </a>
                )}
                {event.rulesUrl ? (
                  <a
                    href={event.rulesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl border border-white/20 font-heading text-base sm:text-lg tracking-[0.1em] sm:tracking-widest text-white/90 hover:bg-white/5 transition-colors text-center"
                  >
                    RULE BOOK
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full py-3 rounded-xl border border-white/20 font-heading text-base sm:text-lg tracking-[0.1em] sm:tracking-widest text-white/40 cursor-not-allowed"
                  >
                    RULE BOOK
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {hasMoreEvents && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleEventsCount((count) => count + LOAD_MORE_EVENTS_STEP)}
            className="px-7 py-3 rounded-xl border border-ripple-cyan/50 text-ripple-cyan font-heading tracking-[0.12em] hover:bg-ripple-cyan/10 transition-colors"
          >
            LOAD MORE EVENTS
          </button>
        </div>
      )}
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

