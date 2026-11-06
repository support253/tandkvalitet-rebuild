import './index.css'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, MotionConfig } from 'motion/react'
import {
  Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Clock, ChevronDown, X, Plus, Menu,
  Award, Send, Sparkles, HeartHandshake, Check, Quote,
} from 'lucide-react'
import heroReception from './assets/hero-reception.webp'
import heroDuo from './assets/hero-duo.webp'
import behandlingerAction from './assets/behandlinger-action.webp'
import serviceGenerel from './assets/service-generel.webp'
import serviceKirurgi from './assets/service-kirurgi.webp'
import serviceKroner from './assets/service-kroner.jpg'
import serviceAkut from './assets/service-akut.webp'
import implantaterRoom from './assets/implantater-room.jpg'
import allanPortrait from './assets/allan-portrait.jpg'
import hanaPortrait from './assets/hana-portrait.jpg'
import lokationFacade from './assets/lokation-facade.jpg'
import lokationDoor from './assets/lokation-door.jpg'
import ctaChurch from './assets/cta-church.jpg'
import {
  treatImplantSpecial, treatImplant, treatCaries, treatGums, treatRoot, treatCracks, treatWisdom,
  treatExtraction, treatErosion, treatCosmetic, treatCrowns, treatDentures, tandlaegeskraekSamtale,
} from './photos'

const PHONE = '65 31 33 00'
const TEL = 'tel:+4565313300'
const MAIL = 'info@tandkvalitet.dk'
const TF = 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter'

/*
  Google reviews. Read from the Google Maps listing "Tandlægerne Adelgade
  (Tandlæge Hana El-khawaga)" on 2026-11-06: 4,6 from 9 reviews (8 × 5 stars,
  1 × 1 star). Only 3 reviews have text; one of them is deliberately left out
  (possible conflict of interest). Quotes below are verbatim, names shortened
  to first name + initial. Update RATING/COUNT by hand when the listing changes.
*/
const GOOGLE_RATING = 4.6
const GOOGLE_RATING_DA = '4,6'
const GOOGLE_COUNT = 9
const GOOGLE_URL = 'https://maps.app.goo.gl/bpQ757HEAKsQAwjU6'
const reviews = [
  {
    name: 'Mette A.',
    text: 'Altid en god og behagelig oplevelse at komme til tandlæge. Hana er yderst omsorgsfuld og altid rar og klar til at lytte. Man føler sig i god hænder og hun tager sig tid til at fortælle, hvad hun laver. Gode råd bliver givet med smil og blink i øjet og ikke med løftet pegefinger. Hele tandlægeklinikken får min kæmpe store anbefaling',
  },
  {
    name: 'Camilla N.',
    text: 'Utrolig dygtige og behagelige… Også selvom der skal laves huller og man har en smule tandlægeskræk… De kan varmt anbefales',
  },
]

function GoogleG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

const STAR = 'M12 2.6l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z'
/** Five stars, filled to `value` (so 4,6 shows a partly filled fifth star). */
function Stars({ value, size = 16, track = 'text-white/30', label }: { value: number; size?: number; track?: string; label?: string }) {
  const gap = 2
  const full = 5 * size + 4 * gap
  const filled = Math.floor(value) * (size + gap) + (value % 1) * size
  const row = (cls: string) => (
    <span className={`flex ${cls}`} style={{ gap }}>
      {[0, 1, 2, 3, 4].map(i => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} className="shrink-0" aria-hidden="true"><path d={STAR} fill="currentColor" /></svg>
      ))}
    </span>
  )
  return (
    <span className="relative inline-flex" style={{ width: full }} role="img" aria-label={label ?? `${String(value).replace('.', ',')} ud af 5 stjerner`}>
      {row(track)}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: filled }}>{row('text-[#FBBC04]')}</span>
    </span>
  )
}

/*
  Cutout of Hana and Allan. hero-duo.webp (2000x1126) has empty margins
  (left 254, top 262, right 275 px), so the parent box should have the opaque
  area's ratio (1471 / 864) and the image is offset inside it.
*/
const DUO_RATIO = '1471 / 864'
function DuoImage() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={heroDuo}
        decoding="async"
        alt="Hana El-khawaga og Allan Friis Pedersen, tandlæger og indehavere"
        className="absolute max-w-none h-auto"
        style={{ width: '135.962%', left: '-17.267%', top: '-30.324%' }}
      />
    </div>
  )
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type Treatment = {
  slug: string
  title: string
  desc: string
  text: string[]
  img: string
  alt: string
  special?: boolean
  links: { href: string; label: string }[]
}

const treatments: Treatment[] = [
  {
    slug: 'specielle-implantatbehandlinger',
    title: 'Specielle implantatbehandlinger',
    desc: 'All-on-4, knogleopbygning og A-PRF. Vores speciale.',
    text: [
      'Vi har specialiseret os i avancerede implantatbehandlinger. Mangler du 1, flere eller alle tænder, har vi altid en løsning til dig.',
      'Vi var de første i Danmark, der udførte All-on-4 behandlingen. Her bygger vi en fuldkæbebro på 4 implantater samme dag, som tænderne trækkes ud, så du får fastsiddende tænder samme dag.',
      'Nogle gange skal tabt knoglevæv eller tandkød genopbygges, før implantaterne sættes i. Her bygger vi med din egen knogle og knoglesubstitutter og bruger de nyeste teknikker. Vi laver også A-PRF behandlinger, hvor et koncentrat af dit eget blod (hvide blodlegemer og blodplader) stimulerer sårhelingen.',
    ],
    img: treatImplantSpecial,
    alt: 'Model af et tandimplantat med krone i kæben',
    special: true,
    links: [
      { href: 'https://www.nobelbiocare.com/en-se/all-on-4-treatment-concept', label: 'All-on-4 Treatment Concept (Nobel Biocare)' },
      { href: 'https://www.puremed.dk/?portfolio=a-prf-and-allografts', label: 'A-PRF and Allografts (Puremed)' },
    ],
  },
  {
    slug: 'implantatbehandlinger',
    title: 'Implantatbehandlinger',
    desc: 'Kunstige tandrødder, der bærer kroner og broer.',
    text: [
      'Et implantat er en kunstig tandrod af titanium, der opereres ind i kæbeknoglen og vokser fast over nogle måneder. Det bruges, når en eller flere tænder mangler, uden at vi behøver at slibe på nabotænderne.',
      'Efter helingstiden får du en porcelænskrone eller bro skruet fast på implantatet. Grundig mundhygiejne er afgørende for, at det holder i mange år.',
    ],
    img: treatImplant,
    alt: 'Tandimplantat med krone holdt i en behandlerhandske',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/g-k/implantat-en-kunstig-tandrod/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'caries',
    title: 'Caries',
    desc: 'Huller i tænderne. Fyldninger og forebyggelse.',
    text: [
      'Caries, også kaldet huller i tænderne, opstår når bakterier omdanner sukker til syre, der opløser tandens overflade.',
      'Vi fjerner det syge tandvæv og lægger en fyldning, der genskaber tandens form. Forebyggelse handler om daglig tandbørstning med fluortandpasta, mindre sukker og regelmæssige eftersyn.',
    ],
    img: treatCaries,
    alt: 'Nærbillede af tænder, hvor der lægges en fyldning',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/a-f/caries/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'tandkoedsbetaendelse-og-parodontitis',
    title: 'Tandkødsbetændelse og parodontitis',
    desc: 'Når tandkødet bløder, hæver eller trækker sig.',
    text: [
      'Tandkødsbetændelse opstår, når bakterier samler sig på tænderne. Tandkødet bliver hævet og rødt og bløder, når du børster. Parodontitis er den alvorlige form, hvor knoglen omkring tanden begynder at nedbrydes.',
      'Behandlingen er fjernelse af plak og tandsten samt grundig daglig pleje. Jo tidligere du kommer, jo nemmere er det at vende udviklingen.',
    ],
    img: treatGums,
    alt: 'Tandrensning ved tandkødskanten med spejl og instrument',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/s-aa/tandkoedsbetaendelse/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'rodbehandling',
    title: 'Rodbehandling',
    desc: 'Når betændelsen sidder inde i tanden.',
    text: [
      'Rodbehandling bliver nødvendig, når bakterier når ind til tandens nerve, ofte gennem et dybt hul eller en revne. Vi åbner tanden, fjerner den betændte nerve og renser rodkanalen.',
      'Det foregår under lokalbedøvelse, så det er stort set smertefrit. Bagefter får tanden en fyldning eller krone, der sikrer den på lang sigt.',
    ],
    img: treatRoot,
    alt: 'Tandlæge viser et røntgenbillede på en tablet',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/p-r/rodbehandling/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'revner-i-taenderne',
    title: 'Revner i tænderne',
    desc: 'Skarpe smerter, når du tygger eller drikker koldt.',
    text: [
      'Revner i tandbenet under emaljen (dentininfraktioner) kan ikke ses udefra, men giver skarpe smerter, når du tygger eller drikker noget koldt. De opstår typisk i tænder med store fyldninger eller efter mange års slid.',
      'Små revner kan lukkes med en fyldning, mens større revner kræver en krone, der holder tanden samlet.',
    ],
    img: treatCracks,
    alt: 'Nærbillede af en kindtand',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/p-r/revner-i-taenderne-dentininfraktioner/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'visdomstaender',
    title: 'Visdomstænder',
    desc: 'Vurdering og fjernelse, når der ikke er plads.',
    text: [
      'Visdomstænder kommer typisk frem i 20\'erne, men kæben har ofte ikke plads til dem. Når de ligger skævt eller er delvist skjult, kan de give betændelse, huller i nabotanden eller dybe tandkødslommer.',
      'Vi vurderer, om tanden skal fjernes, og indgrebet foregår altid under lokalbedøvelse.',
    ],
    img: treatWisdom,
    alt: 'Panoramarøntgen af tænder og kæbe',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/s-aa/visdomstaender/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'efter-fjernelse-af-en-tand',
    title: 'Efter fjernelse af en tand',
    desc: 'Sådan passer du på såret de første dage.',
    text: [
      'De første timer efter en tandudtrækning er munden bedøvet, så vent med at spise, til bedøvelsen er væk. Bløder det, lægger du en ren gaze på såret og bider sammen i 30 minutter.',
      'Hold ro det første døgn, lig med hovedet højt og undgå at skylle munden. Kontakt os, hvis blødningen ikke stopper, eller hævelsen vokser efter to dage.',
    ],
    img: treatExtraction,
    alt: 'Sammenrullede gazebind',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/a-f/efter-fjernelse-af-en-tand/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'erosioner',
    title: 'Erosioner (syreskader)',
    desc: 'Slid fra sodavand, juice og syre.',
    text: [
      'Erosioner er slid på tænderne, der skyldes syre fra fx sodavand, juice, sure opstød eller opkast. De første tegn er små fordybninger på kindtænderne, som regel uden smerte. Uden behandling bliver tænderne kortere og mere følsomme.',
      'Emaljen vokser ikke ud igen, så vi behandler skaderne med fyldninger eller kroner.',
    ],
    img: treatErosion,
    alt: 'Glas med sodavand og isterninger',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/a-f/erosioner-syreskader-paa-taenderne/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'kosmetisk-tandbehandling',
    title: 'Kosmetisk tandbehandling',
    desc: 'Blegning, facader og pænere fyldninger.',
    text: [
      'Kosmetisk tandbehandling omfatter blandt andet blegning, facader og kosmetiske fyldninger, der kan gøre tænderne lysere eller ændre deres form.',
      'Resultatet afhænger af dine tænder, og det holder ikke evigt. Vi gennemgår altid muligheder, holdbarhed og bivirkninger med dig, før vi går i gang.',
    ],
    img: treatCosmetic,
    alt: 'Kvinde der smiler',
    links: [{ href: `${TF}/livsstil/kosmetisk-tandbehandling/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'kroner-og-broer',
    title: 'Kroner og broer',
    desc: 'Faste løsninger, der ligner dine egne tænder.',
    text: [
      'En krone er en kappe, der beskytter en ødelagt tand. En bro erstatter en eller flere manglende tænder og sidder fast på nabotænderne. Begge kan laves i porcelæn, guld eller en kombination.',
      'Behandlingen består af slibning, aftryk og montering af den færdige krone eller bro. Du passer dem som dine egne tænder med daglig børstning og tandtråd.',
    ],
    img: treatCrowns,
    alt: 'Porcelænskroner på en gipsmodel',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/g-k/kroner-og-broer/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
  {
    slug: 'hel-og-delproteser',
    title: 'Hel- og delproteser',
    desc: 'Aftagelige tænder, når flere eller alle mangler.',
    text: [
      'En helprotese erstatter alle tænder i kæben, når ingen naturlige tænder kan bevares. En delprotese erstatter en eller flere manglende tænder og holdes på plads af små bøjler på dine egne tænder.',
      'Begge tilpasses løbende, især de første måneder hvor tandkødet ændrer sig. Børst protesen dagligt med koldt vand og mild sæbe (aldrig varmt), og kom til regelmæssige kontroller.',
    ],
    img: treatDentures,
    alt: 'Hånd der holder en delprotese',
    links: [{ href: `${TF}/tandsygdomme-gener-og-behandlinger/p-r/ny-protese/`, label: 'Læs mere hos Tandlægeforeningen' }],
  },
]

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Tager I imod nye patienter?',
    a: <>Ja, vi tager løbende imod nye patienter, både hvis du kommer fra den kommunale tandpleje eller skifter fra en anden tandlæge. Du behøver ikke flytte din journal før første besøg. Det ordner vi bagefter.</>,
  },
  {
    q: 'Jeg har ikke været hos tandlægen i mange år. Bliver der skældt ud?',
    a: <>Nej. Vi har set det hele før, og første besøg er en samtale, ikke en eksamen. Vi kigger, vi forklarer, og vi lægger en plan i dit tempo.</>,
  },
  {
    q: 'Kan jeg blive bedøvet?',
    a: <>Ja. Vi bruger lokalbedøvelse ved de behandlinger, hvor det er relevant. Er du nervøs for et større indgreb, så <a href={TEL} className="text-accent-ink underline decoration-accent/40 hover:decoration-accent">ring {PHONE}</a> og fortæl os det, så planlægger vi det sammen.</>,
  },
  {
    q: 'Hvad koster et eftersyn?',
    a: <>Vores priser følger <a href="https://www.tandlaegeforeningen.dk/" target="_blank" rel="noopener noreferrer" className="text-accent-ink underline decoration-accent/40 hover:decoration-accent">Tandlægeforeningens overenskomst</a> og sundhed.dk. Et årligt eftersyn for voksne er delvist dækket af den offentlige sygesikring. <a href={TEL} className="text-accent-ink underline decoration-accent/40 hover:decoration-accent">Ring {PHONE}</a>, hvis du vil have en konkret pris, før du kommer.</>,
  },
  {
    q: 'Har I ventetid?',
    a: <>Akutte tilfælde prioriteres. Til et almindeligt eftersyn <a href={TEL} className="text-accent-ink underline decoration-accent/40 hover:decoration-accent">ringer du</a> i telefontiden 08–12 og aftaler en tid, der passer dig.</>,
  },
  {
    q: 'Hvad gør jeg ved akut tandpine om aftenen eller i weekenden?',
    a: <>Ring til Tandlægevagten Fyn på <a href="tel:+4599440809" className="text-accent-ink underline decoration-accent/40 hover:decoration-accent">99 44 08 09</a>. I vores åbningstid ringer du til os på <a href={TEL} className="text-accent-ink underline decoration-accent/40 hover:decoration-accent">{PHONE}</a>, og akutte tilfælde prioriteres.</>,
  },
  {
    q: 'Hvad er All-on-4?',
    a: <>All-on-4 er en fast bro til en hel kæbe, der sidder på fire implantater. Broen sættes på samme dag, som tænderne trækkes ud, så du får fastsiddende tænder samme dag. Vi var de første i Danmark, der udførte behandlingen.</>,
  },
  {
    q: 'Hvad hvis jeg bliver forhindret?',
    a: <>Meld afbud senest kl. 12 dagen før. Udebliver du uden afbud, opkræver vi et gebyr på 250 kr.</>,
  },
]

type FontOption = { id: string; label: string; href: string; display: string; sans: string; weight: number; fvs?: string }
const GF = 'https://fonts.googleapis.com/css2?display=swap&family='
const FONT_OPTIONS: FontOption[] = [
  { id: 'jakarta', label: 'Plus Jakarta Sans', href: '', display: "'Plus Jakarta Sans'", sans: "'Plus Jakarta Sans'", weight: 800 },
  { id: 'manrope', label: 'Manrope', href: `${GF}Manrope:wght@400..800`, display: "'Manrope'", sans: "'Manrope'", weight: 800 },
  { id: 'outfit', label: 'Outfit', href: `${GF}Outfit:wght@400..800`, display: "'Outfit'", sans: "'Outfit'", weight: 700 },
  { id: 'sora', label: 'Sora + Jakarta', href: `${GF}Sora:wght@500..800`, display: "'Sora'", sans: "'Plus Jakarta Sans'", weight: 700 },
  { id: 'onest', label: 'Onest', href: `${GF}Onest:wght@400..800`, display: "'Onest'", sans: "'Onest'", weight: 700 },
  { id: 'fraunces', label: 'Fraunces + Jakarta (serif)', href: `${GF}Fraunces:opsz,wght,SOFT@9..144,500..700,0..100`, display: "'Fraunces'", sans: "'Plus Jakarta Sans'", weight: 600, fvs: '"SOFT" 100' },
]

/** Preview-only font picker. Shown when the URL contains ?fonts */
function FontSwitcher() {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState('jakarta')
  useEffect(() => { setShow(new URLSearchParams(window.location.search).has('fonts')) }, [])
  if (!show) return null
  const pick = (f: FontOption) => {
    if (f.href && !document.querySelector(`link[data-font="${f.id}"]`)) {
      const l = document.createElement('link')
      l.rel = 'stylesheet'; l.href = f.href; l.dataset.font = f.id
      document.head.appendChild(l)
    }
    const s = document.documentElement.style
    s.setProperty('--font-display', `${f.display}, system-ui, sans-serif`)
    s.setProperty('--font-sans', `${f.sans}, system-ui, sans-serif`)
    s.setProperty('--display-weight', String(f.weight))
    s.setProperty('--display-fvs', f.fvs ?? 'normal')
    setActive(f.id)
  }
  return (
    <div className="fixed left-4 bottom-4 z-[90] bg-white rounded-2xl ring-1 ring-black/10 shadow-soft p-2 flex flex-col gap-1 text-[13px]">
      <span className="px-2 pt-1 text-[11px] uppercase tracking-wider text-ink-faint">Skrifttype</span>
      {FONT_OPTIONS.map(f => (
        <button key={f.id} onClick={() => pick(f)}
          className={`text-left px-3 py-1.5 rounded-xl ${active === f.id ? 'bg-ink text-white' : 'hover:bg-surface'}`}>
          {f.label}
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [showTreatments, setShowTreatments] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [pastHero, setPastHero] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%'])
  const open = treatments.find(t => t.slug === openSlug) ?? null

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 620)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close modal on Escape + lock body scroll while open
  useEffect(() => {
    if (!openSlug) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenSlug(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openSlug])

  const openTreatment = (slug: string) => {
    setShowTreatments(false)
    setMobileMenu(false)
    setOpenSlug(slug)
  }

  const navLinks = [
    { href: '#implantater', label: 'Implantater' },
    { href: '#holdet', label: 'Holdet' },
    { href: '#faq', label: 'Priser & spørgsmål' },
    { href: '#find-os', label: 'Find os' },
  ]

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen font-sans overflow-x-hidden">

      {/* Nav: floating solid pill */}
      <header className="fixed top-3 inset-x-0 z-50">
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-label="Hovedmenu"
          className="relative wrap-nav bg-white rounded-full ring-1 ring-black/[0.06] shadow-soft h-14 pl-5 pr-2 flex items-center justify-between"
        >
          <a href="#" className="flex items-baseline gap-2 shrink-0">
            <span className="font-display text-[19px] font-bold text-ink tracking-[-0.03em]">Tandkvalitet</span>
            <span className="text-[12px] font-medium text-accent-ink">Nyborg</span>
          </a>

          <div className="hidden lg:flex items-center gap-1 text-[14px] font-medium text-ink-light">
            <div className="relative" onMouseEnter={() => setShowTreatments(true)} onMouseLeave={() => setShowTreatments(false)}>
              <button
                type="button"
                aria-expanded={showTreatments}
                onClick={() => setShowTreatments(v => !v)}
                className="flex items-center gap-1 px-3.5 py-2 rounded-full hover:bg-surface hover:text-ink transition-colors"
              >
                Behandlinger <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTreatments ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showTreatments && (
                  <>
                    <div className="absolute top-full left-0 w-80 h-3" />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-[calc(100%+10px)] -left-2 w-[340px] bg-white rounded-3xl ring-1 ring-black/[0.06] shadow-soft p-2 z-50"
                    >
                      {treatments.map(t => (
                        <button
                          key={t.slug}
                          type="button"
                          onClick={() => openTreatment(t.slug)}
                          className="w-full flex items-center gap-3 px-2 py-1.5 rounded-2xl text-left text-[14px] text-ink-light hover:text-ink hover:bg-surface transition-colors"
                        >
                          <img src={t.img} alt="" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                          {t.title}
                        </button>
                      ))}
                      <a href="#akut" onClick={() => setShowTreatments(false)} className="mt-1 flex items-center justify-between px-3 py-2.5 rounded-2xl bg-accent-light text-[14px] font-semibold text-accent-ink">
                        Akut tandhjælp <ArrowRight className="w-4 h-4" />
                      </a>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="px-3.5 py-2 rounded-full hover:bg-surface hover:text-ink transition-colors">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <a href={TEL} className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-accent text-white text-[14px] font-semibold hover:bg-accent-dark transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Ring {PHONE}</span>
              <span className="sm:hidden">Ring</span>
            </a>
            <button
              type="button"
              aria-label={mobileMenu ? 'Luk menu' : 'Åbn menu'}
              aria-expanded={mobileMenu}
              onClick={() => setMobileMenu(v => !v)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-surface"
            >
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="lg:hidden absolute top-[calc(100%+8px)] inset-x-0 bg-white rounded-3xl ring-1 ring-black/[0.06] shadow-soft p-3 max-h-[75svh] overflow-y-auto"
              >
                <p className="px-3 pt-1 pb-2 text-[12px] font-semibold uppercase tracking-wider text-accent-ink">Behandlinger</p>
                <div className="grid grid-cols-1 gap-0.5 mb-2">
                  {treatments.map(t => (
                    <button key={t.slug} type="button" onClick={() => openTreatment(t.slug)} className="flex items-center gap-3 px-2 py-1.5 rounded-2xl text-left text-[15px] text-ink hover:bg-surface">
                      <img src={t.img} alt="" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                      {t.title}
                    </button>
                  ))}
                </div>
                <div className="border-t border-line pt-2 grid gap-0.5">
                  <a href="#akut" onClick={() => setMobileMenu(false)} className="px-3 py-2.5 rounded-2xl text-[15px] font-semibold text-accent-ink hover:bg-surface">Akut tandhjælp</a>
                  {navLinks.map(l => (
                    <a key={l.href} href={l.href} onClick={() => setMobileMenu(false)} className="px-3 py-2.5 rounded-2xl text-[15px] text-ink hover:bg-surface">{l.label}</a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>

      {/* Hero */}
      <section className="hero-fit relative pt-24 flex items-end overflow-hidden" style={{ minHeight: 'calc(88svh / var(--z))' }}>
        <div className="absolute inset-0">
          <motion.img
            src={heroReception}
            alt="Receptionen hos Tandkvalitet på Adelgade 5 i Nyborg"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover scale-110"
            style={{ y: heroImageY }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/65 to-night/25" />
        </div>

        {/* Desktop: Hana and Allan to the right of the text, standing on the trust card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:block absolute duo-pos z-10 pointer-events-none select-none drop-shadow-2xl"
          style={{ aspectRatio: DUO_RATIO }}
        >
          <DuoImage />
        </motion.div>

        {/*
          Text aligned to the left edge of the content column (Thomas 6/11, after trying both).
          Below lg the duo sits in the flow under the text and runs down to the hero's
          bottom edge (no bottom padding), so its flat cut lines up with the end of the
          hero where it pokes out beside the narrower trust card.
        */}
        <div className="wrap pb-0 lg:pb-36 xl:pb-24 relative z-20">
          <div className="max-w-[780px]">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-md ring-1 ring-white/25 text-white text-[13px] font-medium pl-2.5 pr-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#7fd9de] animate-pulse" />
              Vi modtager nye patienter
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-4 text-[clamp(34px,4.6vw,76px)] text-white font-bold leading-[1.02] tracking-[-0.035em]">
              Tandlæge i Nyborg.<br />
              <span className="text-[#8fe0e4]">Tryg i stolen.</span><br />
              Stærk i implantater.
            </motion.h1>
            {/* Phones/tablets: one short line (Thomas: "way less description text") */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="lg:hidden text-[17px] text-white/85 mt-4 leading-[1.55] max-w-[440px]">
              Allan og Hana har drevet klinikken på Adelgade 5 siden august 2024.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="hidden lg:block text-[18px] xl:text-[20px] text-white/85 mt-6 leading-[1.6] max-w-[540px] xl:max-w-[560px]">
              Allan Friis Pedersen og Hana El-khawaga har drevet klinikken på Adelgade 5 siden august 2024. Vi behandler professionelt på et højt fagligt niveau, i afslappede og behagelige omgivelser.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-2.5 sm:gap-3 mt-6 lg:mt-8">
              <a href={TEL} className="w-full sm:w-auto justify-center bg-accent text-white px-5 sm:px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-accent-dark transition-all inline-flex items-center gap-2 hover:-translate-y-0.5">
                <Phone className="w-4 h-4" /> Ring og book tid
              </a>
              {/* Hidden on phones: one clear action there, and the page scrolls to the treatments anyway */}
              <a href="#behandlinger" className="hidden sm:inline-block bg-white/10 backdrop-blur-md ring-1 ring-white/25 text-white px-5 sm:px-7 py-3.5 rounded-full text-[15px] font-medium hover:bg-white/20 transition-all">
                Se behandlinger
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-6 lg:mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-white">
                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-soft shrink-0"><GoogleG className="w-5 h-5" /></span>
                <span className="flex flex-col leading-tight">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-[18px] font-bold">{GOOGLE_RATING_DA}</span>
                    <Stars value={GOOGLE_RATING} />
                  </span>
                  <span className="text-[13px] text-white/75 mt-0.5 underline-offset-2 group-hover:text-white group-hover:underline">{GOOGLE_COUNT} anmeldelser på Google</span>
                </span>
              </a>
              <span aria-hidden="true" className="hidden sm:block w-px h-9 bg-white/20" />
              <p className="hidden sm:block text-[14px] text-white/75 leading-relaxed">
                Åbent man–fre fra 08:00<br />Telefontid 08–12 på hverdage
              </p>
            </motion.div>
          </div>

          {/* Phones/tablets: Hana and Allan under the text, standing on the trust card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden relative mt-8 -mx-5 w-[calc(100%+40px)] sm:mx-0 sm:ml-auto sm:w-full sm:max-w-[460px] pointer-events-none select-none drop-shadow-2xl"
            style={{ aspectRatio: DUO_RATIO }}
          >
            <DuoImage />
          </motion.div>
        </div>
      </section>

      {/*
        Trust card: floats over the bottom of the hero. Below lg it overlaps only
        32px so it covers less of Hana and Allan (Thomas 6/11). From lg the
        56px overlap is what .duo-pos (bottom: 52px) is measured against.
      */}
      <div className="relative z-30 -mt-8 lg:-mt-14">
        <FadeIn className="wrap">
          <ul className="bg-white rounded-[28px] ring-1 ring-black/[0.05] shadow-soft grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-2">
            {[
              { icon: Award, title: 'All-on-4 pionerer', sub: 'Først i Danmark med behandlingen' },
              { icon: Send, title: 'Henvisninger fra hele landet', sub: 'Tandlæger sender deres sager hertil' },
              { icon: Sparkles, title: 'Avanceret implantologi', sub: 'Knogleopbygning og A-PRF' },
              { icon: HeartHandshake, title: 'Tryg ved tandlægeskræk', sub: 'Besøget så behageligt som muligt' },
            ].map(({ icon: Icon, title, sub }) => (
              <li key={title} className="flex items-center gap-3.5 p-4 rounded-[22px] hover:bg-surface transition-colors">
                <span className="w-11 h-11 rounded-2xl bg-accent-light text-accent-ink flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-ink leading-tight">{title}</span>
                  <span className="block text-[13px] text-ink-muted mt-0.5">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>

      {/* Everything below the hero: 10% zoomed out from tablet up (see .below-hero in index.css) */}
      <div className="below-hero">

      {/* Behandlinger overview */}
      <section id="behandlinger" className="pt-20 md:pt-28 pb-16 md:pb-20 scroll-mt-24">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-12 items-start">
            <FadeIn>
              <p className="text-[13px] font-semibold text-accent-ink uppercase tracking-[0.14em] mb-3">Behandlinger</p>
              <h2 className="text-[36px] md:text-[46px] font-bold text-ink leading-[1.05]">
                Erfaring i bredde <span className="pen">og dybde</span>
              </h2>
              <p className="text-ink-light text-[17px] mt-5 leading-relaxed mb-8 max-w-[480px]">
                Vi udfører alle former for tandbehandling, herunder kroner, broer og implantater. Vores klinikassistenter kan mere end de fleste, så tandlægen får den tid, behandlingen kræver.
              </p>
              <div className="rounded-[28px] overflow-hidden">
                <img src={behandlingerAction} alt="Tandlæge i gang med en behandling" loading="lazy" decoding="async" className="w-full h-[320px] object-cover" />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-8">
                {[
                  { id: 'generel', title: 'Generel tandpleje', desc: 'Eftersyn, tandrensning, fyldninger, rodbehandling og forebyggelse for hele familien.', img: serviceGenerel, slug: 'caries' },
                  { id: 'implantater-kort', title: 'Implantater og kirurgi', desc: 'All-on-4, knogleopbygning og A-PRF. Vores speciale, som kolleger henviser til.', img: serviceKirurgi, slug: 'specielle-implantatbehandlinger', chip: 'Speciale' },
                  { id: 'kroner', title: 'Kroner og proteser', desc: 'Kroner, broer, hel- og delproteser og kosmetisk tandbehandling.', img: serviceKroner, slug: 'kroner-og-broer' },
                  { id: 'akut', title: 'Akut tandhjælp', desc: `Ring ${PHONE} i telefontiden. Akutte tilfælde prioriteres. Aften og weekend: Tandlægevagten Fyn 99 44 08 09.`, img: serviceAkut, href: TEL },
                ].map(s => {
                  const inner = (
                    <>
                      <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden">
                        <img src={s.img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                        {s.chip && <span className="absolute left-3 top-3 bg-white text-accent-ink text-[12px] font-semibold px-2.5 py-1 rounded-full">{s.chip}</span>}
                      </div>
                      <h3 className="mt-4 text-[20px] font-semibold text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-[15px] text-ink-muted leading-relaxed">{s.desc}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-[14px] font-semibold text-accent-ink">
                        {s.href ? `Ring ${PHONE}` : 'Læs mere'} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </>
                  )
                  return s.href ? (
                    <a key={s.id} id={s.id} href={s.href} className="group block scroll-mt-28">{inner}</a>
                  ) : (
                    <button key={s.id} type="button" onClick={() => setOpenSlug(s.slug!)} className="group block text-left">{inner}</button>
                  )
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Alle behandlinger: photo card per treatment */}
      <section id="alle-behandlinger" className="bg-cream py-20 md:py-24 scroll-mt-20">
        <div className="wrap">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-[30px] md:text-[38px] font-bold text-ink leading-tight">Alle behandlinger</h2>
              <p className="text-[16px] text-ink-muted mt-2 max-w-[520px]">Klik på en behandling for at læse, hvad den går ud på, og hvad du selv kan gøre.</p>
            </div>
            <a href={TEL} className="self-start md:self-auto inline-flex items-center gap-2 text-[15px] font-semibold text-accent-ink hover:text-ink">
              Spørg os på {PHONE} <ArrowRight className="w-4 h-4" />
            </a>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 sm:gap-x-5 gap-y-8 sm:gap-y-9">
            {treatments.map((t, i) => (
              <FadeIn key={t.slug} delay={Math.min(i, 7) * 0.04}>
                <button type="button" id={t.slug} onClick={() => setOpenSlug(t.slug)} className="group block w-full text-left scroll-mt-28">
                  <div className="relative aspect-[4/3] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-surface-alt">
                    <img src={t.img} alt={t.alt} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                    {t.special && <span className="absolute left-3 top-3 bg-white text-accent-ink text-[12px] font-semibold px-2.5 py-1 rounded-full">Vores speciale</span>}
                  </div>
                  <h3 className="mt-3 sm:mt-3.5 text-[16px] sm:text-[18px] font-semibold text-ink leading-snug group-hover:text-accent-ink transition-colors hyphens-auto" lang="da">{t.title}</h3>
                  <p className="mt-1 text-[14px] sm:text-[15px] text-ink-muted leading-relaxed">{t.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[14px] font-semibold text-accent-ink">
                    Læs mere <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Implantater */}
      <section id="implantater" className="scroll-mt-20">
        <div className="wrap py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden min-h-[580px]">
            <div className="relative h-[300px] lg:h-auto">
              <img src={implantaterRoom} alt="Præcisionsarbejde med en implantatkomponent" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div className="bg-accent-dark text-white p-10 md:p-14 lg:p-16 flex flex-col justify-center">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] mb-4 text-white/75">Vores speciale</p>
              <h2 className="text-[32px] md:text-[42px] font-bold leading-[1.05] mb-6">Avanceret implantologi</h2>
              <p className="text-white/85 text-[17px] leading-relaxed mb-10 max-w-[480px]">
                Vi var de første i Danmark, der udførte All-on-4 behandlingen. Vores viden inden for rodbehandling og kirurgi gør, at tandlæger over hele landet henviser patienter til os.
              </p>
              <div className="space-y-5">
                {[
                  ['All-on-4', 'Fuld kæbebro på 4 implantater. Faste tænder samme dag.'],
                  ['Knogleopbygning', 'Genopbygning med din egen knogle og moderne materialer.'],
                  ['A-PRF', 'Dit eget blod stimulerer sårhelingen efter kirurgiske indgreb.'],
                  ['Henvisninger fra hele landet', 'Kolleger henviser komplekse implantatsager til os.'],
                ].map(([title, desc], i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="font-display w-9 h-9 rounded-full bg-white/15 text-white text-[14px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <div>
                      <h3 className="text-[17px] font-semibold">{title}</h3>
                      <p className="text-[15px] text-white/80 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpenSlug('specielle-implantatbehandlinger')}
                className="mt-10 self-start bg-white text-accent-ink px-6 py-3 rounded-full text-[15px] font-semibold hover:bg-white/90 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5"
              >
                Læs mere om vores speciale <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tandlægeskræk */}
      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn className="relative">
              <div className="rounded-[32px] overflow-hidden">
                <img src={tandlaegeskraekSamtale} alt="Tandlæge og patient sidder og taler sammen, før behandlingen går i gang" loading="lazy" decoding="async" className="w-full h-[440px] object-cover object-[center_42%]" />
              </div>
              <div className="absolute -bottom-6 left-6 right-6 sm:right-auto sm:max-w-[320px] bg-white rounded-3xl shadow-soft ring-1 ring-black/[0.05] p-5 flex items-center gap-4">
                <span className="w-11 h-11 rounded-2xl bg-accent-light text-accent-ink flex items-center justify-center shrink-0"><HeartHandshake className="w-5 h-5" strokeWidth={2.2} /></span>
                <p className="font-display text-[18px] font-semibold text-ink leading-snug">Du bestemmer, hvornår vi holder pause.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-[13px] font-semibold text-accent-ink uppercase tracking-[0.14em] mb-3">Vi forstår dig</p>
              <h2 className="text-[36px] md:text-[46px] font-bold text-ink leading-[1.05] mb-5">
                Lider du af <span className="pen">tandlægeskræk?</span>
              </h2>
              <p className="text-ink-light text-[17px] leading-relaxed mb-4">
                Mange voksne kender det, og du er langt fra den eneste. Derfor gør vi dit besøg så behageligt som muligt.
              </p>
              <p className="text-ink-light text-[17px] leading-relaxed mb-8">
                Vi behandler altid i dit tempo, og vi forklarer, før vi går i gang. Både Hana og Allan har stor erfaring med angstpatienter.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-9">
                {['Behandling i dit tempo', 'Vi forklarer først', 'Pause når du vil', 'Erfaring med angstpatienter'].map(item => (
                  <li key={item} className="flex items-center gap-3 bg-surface rounded-2xl px-4 py-3">
                    <span className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center shrink-0"><Check className="w-3.5 h-3.5" strokeWidth={3} /></span>
                    <span className="text-[15px] font-medium text-ink">{item}</span>
                  </li>
                ))}
              </ul>
              <a href={TEL} className="bg-accent text-white px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-accent-dark transition-colors inline-flex items-center gap-2 hover:-translate-y-0.5">
                Ring for en tryg start <ArrowRight className="w-4 h-4" />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Anmeldelser: real Google reviews, verbatim (see the reviews constant) */}
      <section id="anmeldelser" className="pb-20 md:pb-28 scroll-mt-24">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <FadeIn>
            <p className="text-[13px] font-semibold text-accent-ink uppercase tracking-[0.14em] mb-3">Anmeldelser</p>
            <h2 className="text-[36px] md:text-[46px] font-bold text-ink leading-[1.05]">Med patienternes <span className="pen">egne ord</span></h2>
            <p className="text-ink-light text-[17px] mt-4 leading-relaxed max-w-[440px]">Udvalgte anmeldelser fra vores profil på Google. Du kan læse dem alle på Google.</p>
            <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer"
              className="group mt-8 flex items-center gap-4 bg-white rounded-3xl ring-1 ring-black/[0.06] shadow-soft p-5 max-w-[380px] hover:-translate-y-0.5 transition-transform">
              <span className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center shrink-0"><GoogleG className="w-7 h-7" /></span>
              <span className="flex-1">
                <span className="flex items-center gap-2.5">
                  <span className="font-display text-[30px] font-bold text-ink leading-none">{GOOGLE_RATING_DA}</span>
                  <Stars value={GOOGLE_RATING} size={18} track="text-line" />
                </span>
                <span className="block text-[14px] text-ink-muted mt-1.5">{GOOGLE_COUNT} anmeldelser på Google</span>
              </span>
              <ArrowUpRight className="w-5 h-5 text-ink-faint group-hover:text-accent-ink transition-colors shrink-0" />
            </a>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-5 items-stretch">
            {reviews.map((r, i) => (
              <FadeIn key={r.name} delay={0.1 + i * 0.1} className="h-full">
                <figure className="relative h-full bg-cream rounded-[28px] p-7 md:p-8 flex flex-col">
                  <Quote aria-hidden="true" className="absolute right-6 top-6 w-10 h-10 text-accent/25" strokeWidth={1.5} />
                  <Stars value={5} size={18} track="text-line" label="5 ud af 5 stjerner" />
                  <blockquote className="mt-5 text-[17px] md:text-[18px] text-ink leading-relaxed flex-1">{r.text}</blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-line flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-accent-light text-accent-ink font-display font-bold flex items-center justify-center shrink-0">{r.name[0]}</span>
                    <span>
                      <span className="block text-[15px] font-semibold text-ink">{r.name}</span>
                      <span className="flex items-center gap-1.5 text-[13px] text-ink-muted"><GoogleG className="w-3.5 h-3.5" /> Anmeldelse på Google</span>
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-cream py-20 md:py-28 scroll-mt-20">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <FadeIn className="lg:sticky lg:top-28">
            <p className="text-[13px] font-semibold text-accent-ink uppercase tracking-[0.14em] mb-3">Spørgsmål og priser</p>
            <h2 className="text-[36px] md:text-[46px] font-bold text-ink leading-[1.05]">Det spørger <span className="pen">folk os om</span></h2>
            <p className="text-ink-light text-[17px] mt-4 leading-relaxed">De spørgsmål vi oftest får, før nye patienter bestiller første tid.</p>
            <div className="mt-8 bg-night text-white rounded-[28px] p-7 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-accent/30 blur-2xl" aria-hidden="true" />
              <p className="relative text-[15px] text-white/75">Fandt du ikke svaret?</p>
              <a href={TEL} className="relative mt-1 block font-display text-[34px] font-bold tracking-[-0.03em] hover:text-[#8fe0e4] transition-colors">{PHONE}</a>
              <p className="relative text-[14px] text-white/70 mt-1">Telefontid 08–12 på hverdage</p>
              <a href={`mailto:${MAIL}`} className="relative mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-white/90 hover:text-white">
                <Mail className="w-4 h-4" /> {MAIL}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-3">
              {faqs.map((item, i) => (
                <details key={i} className="group bg-white rounded-3xl ring-1 ring-black/[0.05] open:shadow-soft transition-shadow">
                  <summary className="flex items-center gap-4 p-5 md:p-6 cursor-pointer list-none">
                    <span className="font-display text-[15px] font-bold text-accent-ink w-7 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-[17px] font-semibold text-ink leading-snug">{item.q}</span>
                    <span className="w-9 h-9 rounded-full bg-surface group-open:bg-accent group-open:text-white text-ink flex items-center justify-center shrink-0 transition-colors">
                      <Plus className="w-4 h-4 transition-transform duration-200 group-open:rotate-45" />
                    </span>
                  </summary>
                  <div className="px-5 md:px-6 pb-6 pl-[3.75rem] md:pl-[4.25rem] text-[16px] text-ink-light leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Holdet */}
      <section id="holdet" className="py-20 md:py-28 scroll-mt-20">
        <div className="wrap">
          <FadeIn className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-12 mb-10">
            <div>
              <p className="text-[13px] font-semibold text-accent-ink uppercase tracking-[0.14em] mb-3">Holdet</p>
              <h2 className="text-[36px] md:text-[46px] font-bold text-ink leading-[1.05]">Mød indehaverne</h2>
            </div>
            <p className="text-ink text-[18px] leading-relaxed max-w-[520px]">Vi lægger vægt på tillid og omsorg, så du kan være tryg ved at lægge dine tænder i vores hænder.</p>
          </FadeIn>

          {/* One horizontal card per owner (photo left, text right) so both fit on one screen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[
              {
                name: 'Allan Friis Pedersen',
                specialty: 'Kirurgi, implantologi og angstbehandling',
                bio: 'Allan driver klinikken sammen med Hana. Han udfører alle behandlinger på klinikken, fra kirurgi og implantater til rodbehandling og almindelig tandpleje, og lægger særlig vægt på at forklare hvert skridt grundigt, så du føler dig tryg gennem hele forløbet.',
                img: allanPortrait,
              },
              {
                name: 'Hana El-khawaga',
                specialty: 'Kirurgi, implantologi og angstbehandling',
                bio: 'Hana driver klinikken sammen med Allan. Hun udfører alle behandlinger på klinikken, fra kirurgi og implantater til rodbehandling og almindelig tandpleje, og yder altid en perfektionistisk og omsorgsfuld behandling med stor opmærksomhed på din tryghed.',
                img: hanaPortrait,
              },
            ].map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1} className="h-full">
                <article className="h-full bg-cream rounded-[28px] overflow-hidden grid grid-cols-1 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[380px] bg-surface-alt">
                    <img src={p.img} alt={`${p.name}, tandlæge og indehaver`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />
                    <span className="absolute left-4 top-4 bg-white text-ink text-[13px] font-semibold px-3 py-1.5 rounded-full">Tandlæge · Indehaver</span>
                  </div>
                  <div className="p-7 md:p-8 flex flex-col justify-center">
                    <h3 className="text-[26px] font-bold text-ink leading-tight">{p.name}</h3>
                    <p className="mt-1.5 text-[15px] font-semibold text-accent-ink">{p.specialty}</p>
                    <p className="mt-3 text-[17px] text-ink leading-relaxed">{p.bio}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Find os: real Google Maps embed */}
      <section id="find-os" className="bg-cream py-20 md:py-28 scroll-mt-20">
        <div className="wrap">
          <FadeIn className="max-w-[640px] mb-10">
            <p className="text-[13px] font-semibold text-accent-ink uppercase tracking-[0.14em] mb-3">Find os</p>
            <h2 className="text-[36px] md:text-[46px] font-bold text-ink leading-[1.05]">Midt i Nyborg, på Adelgade 5</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-5">
              <div className="rounded-[28px] overflow-hidden bg-surface-alt ring-1 ring-black/[0.05] min-h-[360px] lg:min-h-[520px]">
                <iframe
                  title="Kort over Tandkvalitet, Adelgade 5, 5800 Nyborg"
                  src="https://www.google.com/maps?q=Tandl%C3%A6gerne%20Adelgade%2C%20Adelgade%205%2C%205800%20Nyborg&hl=da&z=16&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="w-full h-full min-h-[360px] lg:min-h-[520px] border-0 block"
                />
              </div>

              <div className="bg-white rounded-[28px] ring-1 ring-black/[0.05] p-7 md:p-8 flex flex-col">
                <h3 className="text-[24px] font-bold text-ink">Tandkvalitet Nyborg</h3>
                <p className="text-[14px] text-ink-muted mt-0.5">Tandlægerne Adelgade</p>
                <div className="mt-5 space-y-3 text-[16px]">
                  <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-accent-ink shrink-0 mt-0.5" /><span className="text-ink">Adelgade 5, 5800 Nyborg</span></div>
                  <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-accent-ink shrink-0" /><a href={TEL} className="text-ink font-semibold hover:text-accent-ink">{PHONE}</a></div>
                  <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-accent-ink shrink-0" /><a href={`mailto:${MAIL}`} className="text-ink font-semibold hover:text-accent-ink">{MAIL}</a></div>
                </div>
                <div className="border-t border-line mt-6 pt-5">
                  <div className="flex items-center gap-2 mb-3"><Clock className="w-4 h-4 text-ink-faint" /><span className="text-[13px] text-ink-muted uppercase tracking-wider font-semibold">Åbningstider</span></div>
                  <dl className="text-[15px] space-y-1.5">
                    <div className="flex justify-between"><dt className="text-ink-muted">Man–tor</dt><dd className="text-ink font-medium">08:00–15:00</dd></div>
                    <div className="flex justify-between"><dt className="text-ink-muted">Fredag</dt><dd className="text-ink font-medium">08:00–14:00</dd></div>
                    <div className="flex justify-between"><dt className="text-ink-muted">Hver 2. onsdag</dt><dd className="text-ink font-medium">12:30–18:00</dd></div>
                    <div className="flex justify-between pt-1.5 mt-1.5 border-t border-line"><dt className="text-ink-muted">Telefontid</dt><dd className="text-ink font-medium">08:00–12:00</dd></div>
                  </dl>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <img src={lokationFacade} alt="Facaden på Adelgade 5" loading="lazy" decoding="async" className="w-full h-24 object-cover rounded-2xl" />
                  <img src={lokationDoor} alt="Klinikkens dør med tandsymbol" loading="lazy" decoding="async" className="w-full h-24 object-cover rounded-2xl" />
                </div>
                <a href="https://maps.app.goo.gl/bpQ757HEAKsQAwjU6" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-ink hover:text-ink">
                  Få rutevejledning <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer with CTA card */}
      <footer className="bg-night text-white rounded-t-[40px] md:rounded-t-[56px] -mt-10 relative overflow-hidden">
        <div className="wrap pt-12 md:pt-16">
          <div className="relative rounded-[32px] overflow-hidden">
            <img src={ctaChurch} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/80 to-accent-dark/60" />
            <div className="relative p-8 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-[520px]">
                <h2 className="text-[38px] md:text-[48px] font-bold leading-[1.0]">Book en tid</h2>
                <p className="text-[17px] text-white/80 mt-4 leading-relaxed">Ring i telefontiden 08–12, eller skriv til os. Vi vender tilbage hurtigst muligt.</p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <a href={TEL} className="inline-flex items-center gap-3 bg-accent hover:bg-[#35c0c7] text-white pl-5 pr-6 py-4 rounded-full text-[18px] font-semibold transition-colors">
                  <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><Phone className="w-4 h-4" /></span>
                  Ring {PHONE}
                </a>
                <a href={`mailto:${MAIL}`} className="inline-flex items-center gap-2 text-[15px] text-white/80 hover:text-white">
                  <Mail className="w-4 h-4" /> {MAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-10 text-[15px]">
            <div className="col-span-2 md:col-span-1">
              <p className="font-display text-[22px] font-bold tracking-[-0.03em]">Tandkvalitet</p>
              <p className="text-white/60 mt-2 leading-relaxed">Tandlæge i Nyborg. Tryg behandling og avanceret implantologi.</p>
            </div>
            <div>
              <h3 className="text-[13px] uppercase tracking-[0.14em] text-white/50 font-semibold mb-4">Klinikken</h3>
              <p className="text-white/85">Adelgade 5</p>
              <p className="text-white/85">5800 Nyborg</p>
              <a href={TEL} className="block text-white/85 hover:text-white mt-3">{PHONE}</a>
              <a href={`mailto:${MAIL}`} className="block text-white/85 hover:text-white">{MAIL}</a>
            </div>
            <div>
              <h3 className="text-[13px] uppercase tracking-[0.14em] text-white/50 font-semibold mb-4">Åbningstider</h3>
              <p className="text-white/85">Man–tor 08–15</p>
              <p className="text-white/85">Fredag 08–14</p>
              <p className="text-white/85">Hver 2. onsdag 12:30–18</p>
              <p className="text-white/60 mt-3">Telefontid 08–12</p>
            </div>
            <div>
              <h3 className="text-[13px] uppercase tracking-[0.14em] text-white/50 font-semibold mb-4">Behandlinger</h3>
              <ul className="space-y-1.5">
                {treatments.slice(0, 6).map(t => (
                  <li key={t.slug}><button type="button" onClick={() => setOpenSlug(t.slug)} className="text-left text-white/85 hover:text-white">{t.title}</button></li>
                ))}
                <li><a href="#alle-behandlinger" className="text-[#8fe0e4] hover:text-white">Se alle</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between gap-3 text-[13px] text-white/55">
            <p>© 2026 Tandkvalitet · Tandlægerne Adelgade, Nyborg</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <a href="tel:+4599440809" className="hover:text-white">Akut: Tandlægevagten Fyn 99 44 08 09</a>
              <a href="https://www.sundhed.dk" target="_blank" rel="noopener noreferrer" className="hover:text-white">sundhed.dk</a>
            </div>
          </div>
        </div>
        {/* Faded wordmark: about 60% of the column width (container query units) */}
        <div className="wrap" style={{ containerType: 'inline-size' }}>
          <p aria-hidden="true" style={{ fontSize: 'calc(100cqw / 9)' }} className="font-display font-bold text-white/[0.05] leading-[0.8] tracking-[-0.05em] text-center select-none pointer-events-none whitespace-nowrap pb-[0.04em]">
            Tandkvalitet
          </p>
        </div>
      </footer>
      </div>{/* /below-hero */}

      {/* Mobile sticky call button */}
      <AnimatePresence>
        {pastHero && !openSlug && !mobileMenu && (
          <motion.a
            href={TEL}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed bottom-4 inset-x-4 z-40 bg-accent text-white rounded-full h-14 flex items-center justify-center gap-2 text-[16px] font-semibold shadow-soft"
          >
            <Phone className="w-4 h-4" /> Ring og book · {PHONE}
          </motion.a>
        )}
      </AnimatePresence>

      {/* Treatment modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenSlug(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="treatment-modal-title"
            className="fixed inset-0 z-[100] bg-night/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: 'calc(92svh / var(--z))' }}
              className="relative bg-white rounded-t-[32px] sm:rounded-[32px] max-w-[680px] w-full overflow-y-auto"
            >
              <div className="relative h-52 sm:h-64">
                <img src={open.img} alt={open.alt} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setOpenSlug(null)}
                  aria-label="Luk"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center hover:bg-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-7 sm:p-10">
                {open.special && <p className="text-[13px] font-semibold text-accent-ink uppercase tracking-[0.14em] mb-2">Vores speciale</p>}
                <h2 id="treatment-modal-title" className="text-[28px] sm:text-[34px] font-bold text-ink leading-tight mb-5">{open.title}</h2>
                {open.text.map((p, i) => (
                  <p key={i} className="text-[17px] text-ink-light leading-relaxed mb-4">{p}</p>
                ))}
                <div className="flex flex-col gap-2 mt-6 mb-8">
                  {open.links.map(l => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-ink hover:text-ink">
                      {l.label} <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <a href={TEL} className="w-full sm:w-auto bg-accent text-white px-7 py-3.5 rounded-full text-[15px] font-semibold hover:bg-accent-dark transition-colors inline-flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Ring {PHONE} og hør mere
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FontSwitcher />
    </div>
    </MotionConfig>
  )
}
