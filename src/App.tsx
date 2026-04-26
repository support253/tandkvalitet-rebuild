import './index.css'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, MotionConfig } from 'motion/react'
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Check, Clock, ChevronDown, X } from 'lucide-react'
import heroReception from './assets/hero-reception.webp'
import heroDuo from './assets/hero-duo.webp'
import behandlingerAction from './assets/behandlinger-action.webp'
import serviceGenerel from './assets/service-generel.webp'
import serviceKirurgi from './assets/service-kirurgi.webp'
import serviceKroner from './assets/service-kroner.jpg'
import serviceAkut from './assets/service-akut.webp'
import implantaterRoom from './assets/implantater-room.jpg'
import tandlaegeskraekWaiting from './assets/tandlaegeskraek-waiting.jpg'
import allanPortrait from './assets/allan-portrait.jpg'
import hanaPortrait from './assets/hana-portrait.jpg'
import lokationFacade from './assets/lokation-facade.jpg'
import lokationSign from './assets/lokation-sign.jpg'
import lokationEntrance from './assets/lokation-entrance.jpg'
import lokationDoor from './assets/lokation-door.jpg'
import ctaChurch from './assets/cta-church.jpg'

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

function SlideIn({ children, delay = 0, direction = 'left', className = '' }: { children: React.ReactNode; delay?: number; direction?: 'left' | 'right'; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const treatments = [
  { name: 'Implantater & avanceret kirurgi', href: '#implantater', external: false },
  { name: 'Caries', href: '#alle-behandlinger', external: false },
  { name: 'Tandkødsbetændelse & parodontitis', href: '#alle-behandlinger', external: false },
  { name: 'Rodbehandling', href: '#alle-behandlinger', external: false },
  { name: 'Revner i tænderne', href: '#alle-behandlinger', external: false },
  { name: 'Visdomstænder', href: '#alle-behandlinger', external: false },
  { name: 'Efter fjernelse af en tand', href: '#alle-behandlinger', external: false },
  { name: 'Erosioner', href: '#alle-behandlinger', external: false },
  { name: 'Kosmetisk tandbehandling', href: '#alle-behandlinger', external: false },
  { name: 'Kroner & broer', href: '#alle-behandlinger', external: false },
  { name: 'Hel- og delproteser', href: '#alle-behandlinger', external: false },
  { name: 'Akut tandhjælp', href: '#behandlinger', external: false },
]

export default function App() {
  const [showTreatments, setShowTreatments] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [showImplantModal, setShowImplantModal] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%'])

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close modal on Escape + lock body scroll while open
  useEffect(() => {
    if (!showImplantModal) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowImplantModal(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [showImplantModal])

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen font-sans overflow-x-hidden">

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          navScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-line shadow-sm' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="flex flex-col">
            <span className={`text-[15px] font-semibold tracking-[-0.01em] transition-colors ${navScrolled ? 'text-ink' : 'text-white'}`}>
              Tandkvalitet <span className={`font-normal transition-colors ${navScrolled ? 'text-ink-muted' : 'text-white/60'}`}>·</span> Nyborg
            </span>
            <span className={`text-[10px] italic transition-colors ${navScrolled ? 'text-ink-faint' : 'text-white/40'}`}>Dine tænder - dit smil</span>
          </a>
          <div className={`hidden md:flex items-center gap-7 text-[13px] transition-colors ${navScrolled ? 'text-ink-muted' : 'text-white/70'}`}>
            {/* Behandlinger dropdown */}
            <div className="relative" onMouseEnter={() => setShowTreatments(true)} onMouseLeave={() => setShowTreatments(false)}>
              <button className={`flex items-center gap-1 py-4 transition-colors ${navScrolled ? 'hover:text-ink' : 'hover:text-white'}`}>
                Behandlinger <ChevronDown className={`w-3 h-3 transition-transform ${showTreatments ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showTreatments && (
                  <>
                    <div className="absolute top-full left-0 w-72 h-2" />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-[calc(100%+4px)] left-0 w-72 bg-white border border-line rounded-xl shadow-lg py-2 z-50"
                    >
                      {treatments.map((t, i) => (
                        <a
                          key={i}
                          href={t.href}
                          target={t.external ? '_blank' : undefined}
                          rel={t.external ? 'noopener noreferrer' : undefined}
                          onClick={() => setShowTreatments(false)}
                          className="flex items-center justify-between px-4 py-2 text-[13px] text-ink-muted hover:text-ink hover:bg-surface transition-colors"
                        >
                          {t.name}
                          {t.external && <ArrowUpRight className="w-3 h-3 text-ink-faint" />}
                        </a>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <a href="#implantater" className={`transition-colors ${navScrolled ? 'hover:text-ink' : 'hover:text-white'}`}>Implantater</a>
            <a href="#holdet" className={`transition-colors ${navScrolled ? 'hover:text-ink' : 'hover:text-white'}`}>Medarbejdere</a>
            <a href="#find-os" className={`transition-colors ${navScrolled ? 'hover:text-ink' : 'hover:text-white'}`}>Kontakt</a>
            <a href="https://www.sundhed.dk" target="_blank" rel="noopener noreferrer" className={`transition-colors ${navScrolled ? 'hover:text-ink' : 'hover:text-white'}`}>Priser</a>
          </div>
          <a href="tel:65313300" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
            navScrolled ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
          }`}>
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ring 65 31 33 00</span>
            <span className="sm:hidden">Ring</span>
          </a>
        </div>
      </motion.nav>

      {/* Hero — full width image with overlay */}
      <section className="relative pt-14 min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroReception}
            alt="Reception hos Tandkvalitet i Nyborg"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover scale-110"
            style={{ y: heroImageY }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        </div>

        {/* Hana + Allan duo cutout — desktop only, anchored bottom-right */}
        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          src={heroDuo}
          loading="lazy"
          decoding="async"
          alt="Hana El-khawaga og Allan Friis Pedersen — tandlæger og indehavere"
          className="hidden lg:block absolute bottom-0 right-0 xl:right-8 z-10 h-[68%] xl:h-[74%] max-w-[44%] w-auto pointer-events-none select-none object-contain object-bottom drop-shadow-2xl"
        />

        <div className="max-w-[1200px] mx-auto px-6 pb-16 md:pb-24 relative z-20 w-full">
          <div className="max-w-[640px]">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(30px,5vw,64px)] text-white font-bold leading-[1.08] tracking-[-0.03em]">
              Tandlæge i Nyborg —<br />implantater, kirurgi og tryg behandling
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="text-[18px] text-white/70 mt-5 leading-[1.65] font-light max-w-[520px]">
              Tandlægerne i Nyborg har siden august 2024 været drevet af Allan Friis Pedersen og Hana El-khawaga. Vi behandler vore patienter professionelt på et højt fagligt niveau, i afslappede og behagelige omgivelser.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-8">
              <a href="tel:65313300" className="bg-accent text-white px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-accent-dark transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg">
                <Phone className="w-4 h-4" /> Ring og book
              </a>
              <a href="#behandlinger" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-7 py-3.5 rounded-xl text-[14px] font-medium hover:bg-white/20 transition-all">
                Se behandlinger
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/70 mt-7 leading-relaxed">
              <span className="inline-flex items-center gap-1.5 bg-accent/95 text-white text-[12px] font-semibold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Vi modtager nye patienter
              </span>
              <span>Åbent man–fre fra 08:00</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Telefontid 08–12 hverdage</span>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85 }}
              className="text-[12px] text-white/50 mt-2 leading-relaxed">
              Uden for telefontid: <a href="mailto:info@tandkvalitet.dk" className="text-white/70 hover:text-white underline decoration-white/20 hover:decoration-white/60 transition-colors">info@tandkvalitet.dk</a> · Akut aften/weekend: <a href="tel:+4599440809" className="text-white/70 hover:text-white underline decoration-white/20 hover:decoration-white/60 transition-colors">Tandlægevagten Fyn 99 44 08 09</a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-accent text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 text-[13px] font-medium">
          {['All-on-4 pionerer i Danmark', 'Henvisninger fra hele landet', 'Specialister i implantologi', 'Fokus på tandlægeskræk'].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Behandlinger — asymmetric layout */}
      <section id="behandlinger" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            {/* Left — intro + image */}
            <SlideIn direction="left">
            <div>
              <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Behandlinger</p>
              <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.02em] text-ink leading-tight">
                Erfaring i bredde og dybde
              </h2>
              <p className="text-ink-muted text-[15px] mt-4 leading-relaxed mb-8">
                Vi udfører alle former for tandbehandling, herunder kroner, broer samt implantater. Vores klinikassistenter kan mere end de fleste og skaber de bedste betingelser for, at tandlægen får den fornødne tid til at levere den forventede præstation.
              </p>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={behandlingerAction}
                  alt="Tandlæge Hana i gang med behandling"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
            </SlideIn>

            {/* Right — service cards */}
            <SlideIn direction="right" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Generel tandpleje',
                  desc: 'Eftersyn, tandrensning, fyldninger, rodbehandling og forebyggende behandling for hele familien.',
                  img: serviceGenerel,
                },
                {
                  title: 'Implantater & kirurgi',
                  desc: 'All-on-4, knogerekonstruktion og A-PRF. Vores nationale speciale.',
                  img: serviceKirurgi,
                  highlight: true,
                },
                {
                  title: 'Kroner & proteser',
                  desc: 'Tandkroner, broer, helproteser, delproteser og kosmetisk tandbehandling.',
                  img: serviceKroner,
                },
                {
                  title: 'Akut tandhjælp',
                  desc: 'Ring 65 31 33 00 i åbningstiden — akutte tilfælde prioriteres samme dag. Aften/weekend: Tandlægevagten Fyn.',
                  img: serviceAkut,
                },
              ].map((s, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden border transition-all hover:shadow-md group ${
                  s.highlight ? 'border-accent/30 bg-accent-light' : 'border-line bg-white'
                }`}>
                  <div className="h-32 overflow-hidden">
                    <img src={s.img} alt={s.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-semibold text-ink mb-1.5">{s.title}</h3>
                    <p className="text-[13px] text-ink-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Alle behandlinger — expandable cards with on-page summaries */}
      <section id="alle-behandlinger" className="pb-20 md:pb-28 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <h3 className="text-[18px] font-semibold text-ink mb-2">Alle behandlinger</h3>
            <p className="text-[13px] text-ink-muted mb-6">Klik på en behandling for en kort beskrivelse. Faglige illustrationer og uddybende tekst findes hos <a href="https://www.tandlaegeforeningen.dk" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark underline decoration-accent/30 hover:decoration-accent/70 transition-colors">Tandlægeforeningen</a>.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
              {[
                {
                  title: 'Specielle implantatbehandlinger',
                  desc: 'All-on-4, knogerekonstruktion og A-PRF — vores nationale speciale.',
                  longText: 'Vi var de første i Danmark der udførte All-on-4 behandlingen — fuldkæbebro på 4 implantater og fastsiddende tænder samme dag. Mangler du 1, flere eller alle tænder, har vi en løsning. Vi laver også knogerekonstruktion med din egen knogle og A-PRF, hvor vi bruger et koncentrat af dit eget blod til at stimulere sårhelingen.',
                  href: '#implantater',
                  external: false,
                },
                {
                  title: 'Implantatbehandlinger',
                  desc: 'Kunstige tandrødder som fundament for kroner og broer.',
                  longText: 'Et implantat er en kunstig tandrod af titanium, der opereres ind i kæbeknoglen og vokser fast over nogle måneder. Det bruges når en eller flere tænder mangler — uden at vi behøver at slibe på nabotanderne. Efter helingstiden får du en porcelænskrone eller bro fastskruet på implantatet, og grundig mundhygiejne er afgørende for at det holder i mange år.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/g-k/implantat-en-kunstig-tandrod/',
                  external: true,
                },
                {
                  title: 'Caries',
                  desc: 'Huller i tænderne — fyldninger og forebyggelse.',
                  longText: 'Caries — kaldt "huller i tænderne" — opstår når bakterier omdanner sukker til syre, der opløser tandens overflade. Vi behandler ved at fjerne det syge tandvæv og lægge en fyldning, der genskaber tandens form. Forebyggelse handler om daglig tandbørstning med fluortandpasta, mindre sukker, og regelmæssige eftersyn.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/a-f/caries/',
                  external: true,
                },
                {
                  title: 'Tandkødsbetændelse og parodontitis',
                  desc: 'Behandling og forebyggelse af sygdomme i tandkødet.',
                  longText: 'Tandkødsbetændelse opstår når bakterier samler sig på tænderne; tandkødet bliver hævet, rødt og bløder ved tandbørstning. Parodontitis er den alvorlige form, hvor knoglen omkring tanden begynder at nedbrydes. Behandlingen er fjernelse af plak og tandsten samt grundig daglig pleje — jo tidligere du kommer, jo nemmere er det at vende processen.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/s-aa/tandkoedsbetaendelse/',
                  external: true,
                },
                {
                  title: 'Rodbehandling',
                  desc: 'Fjernelse af betændt væv i tandens rodkanal.',
                  longText: 'Rodbehandling bliver nødvendig når bakterier når ind til tandens nerve, ofte gennem et dybt hul eller en revne. Vi åbner tanden, fjerner den inficerede nerve og renser rodkanalen — alt sammen under lokalbedøvelse, så det er stort set smertefrit. Bagefter får tanden en fyldning eller krone for at sikre den på lang sigt.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/p-r/rodbehandling/',
                  external: true,
                },
                {
                  title: 'Revner i tænderne',
                  desc: 'Diagnosticering og behandling af dentinfrakturer.',
                  longText: 'Dentininfraktioner er små revner i tandbenet under emaljen, som ikke ses udefra, men giver skarpe smerter ved tygning eller koldt. De opstår typisk i tænder med store fyldninger eller efter års slid. Små revner kan limes med en fyldning, mens større kræver en krone for at stabilisere tanden.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/p-r/revner-i-taenderne-dentininfraktioner/',
                  external: true,
                },
                {
                  title: 'Visdomstænder',
                  desc: 'Vurdering og evt. fjernelse af visdomstænder.',
                  longText: 'Visdomstænder kommer typisk frem i 20-årene, men kæben er ofte for lille til at give plads. Når de ligger skævt eller delvist skjult, kan de give betændelse, huller i nabotanden eller dybe tandkødslommer. Vi vurderer om en fjernelse er nødvendig, og indgrebet foregår altid under lokalbedøvelse.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/s-aa/visdomstaender/',
                  external: true,
                },
                {
                  title: 'Efter fjernelse af en tand',
                  desc: 'Vejledning og opfølgning efter tandudtrækning.',
                  longText: 'De første timer efter en tandudtrækning er munden bedøvet — vent med at spise indtil bedøvelsen er væk. Ved blødning lægger du en ren gaze på såret og bider sammen i 30 minutter. Hold ro det første døgn, lig med hovedet højt, undgå at skylle munden, og kontakt os hvis blødningen ikke stopper eller hævelsen vokser efter to dage.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/a-f/efter-fjernelse-af-en-tand/',
                  external: true,
                },
                {
                  title: 'Erosioner – syreskader',
                  desc: 'Behandling og forebyggelse af syreskader på emaljen.',
                  longText: 'Erosioner er slid på tænderne forårsaget af syre — fra sodavand, juice, sure opstød eller opkast. De første tegn er små fordybninger på kindtænderne, som regel uden smerte; uden behandling bliver tænderne kortere og mere følsomme. Vi behandler etablerede skader med fyldninger eller kroner — emaljen genoprettes ikke af sig selv.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/a-f/erosioner-syreskader-paa-taenderne/',
                  external: true,
                },
                {
                  title: 'Kosmetisk tandbehandling',
                  desc: 'Æstetiske behandlinger for dit bedste smil.',
                  longText: 'Kosmetisk tandbehandling omfatter blandt andet blegning, facader og kosmetiske fyldninger, der kan gøre tænder lysere eller ændre deres form. Resultatet afhænger af din tandtype, og det holder ikke evigt. Vi gennemgår altid mulighederne, holdbarhed og bivirkninger med dig før vi går i gang.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/livsstil/kosmetisk-tandbehandling/',
                  external: true,
                },
                {
                  title: 'Kroner og broer',
                  desc: 'Faste erstatninger der genskaber funktion og æstetik.',
                  longText: 'En krone er en kunstig kappe, der beskytter en ødelagt tand. En bro erstatter en eller flere manglende tænder ved at være fastcementeret på nabotænderne. Begge kan laves i porcelæn, guld eller en kombination, og indgrebet involverer slibning, aftryk og montering af den færdige konstruktion. Du passer dem som dine egne tænder med daglig børstning og tandtråd.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/g-k/kroner-og-broer/',
                  external: true,
                },
                {
                  title: 'Helprotese',
                  desc: 'Aftagelig erstatning ved tab af alle tænder i kæben.',
                  longText: 'En helprotese erstatter alle tænder i kæben når ingen naturlige tænder kan bevares — typisk efter omfattende tandtab fra huller, parodontitis eller slid. Vi tilpasser den løbende, især i de første måneder hvor tandkødet ændrer sig. Børst protesen dagligt med koldt vand og mild sæbe (aldrig varmt), og kom til regelmæssige kontroller — protesen skal justeres med tiden, da tandkødet svinder.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/p-r/ny-protese/',
                  external: true,
                },
                {
                  title: 'Delprotese',
                  desc: 'Aftagelig erstatning ved tab af enkelte eller flere tænder.',
                  longText: 'En delprotese erstatter få eller flere manglende tænder og holdes på plads af små bøjler på dine resterende tænder. Vi sliber lidt på tænderne for at få plads til bøjlerne, og protesen tilpasses løbende. Du børster den dagligt med koldt vand og mild sæbe, og kommer til regelmæssige kontroller, så vi kan justere efterhånden som tandkødet ændrer sig.',
                  href: 'https://www.tandlaegeforeningen.dk/til-tandlaeger/til-dine-patienter/tandsygdomme-gener-og-behandlinger/p-r/ny-protese/',
                  external: true,
                },
              ].map((b, i) => (
                <details key={i} className="group rounded-xl border border-line bg-white hover:border-accent/40 transition-colors open:border-accent/40 open:shadow-sm">
                  <summary className="flex gap-3 p-4 cursor-pointer list-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                    <div className="flex-1">
                      <h4 className="text-[14px] font-medium text-ink group-hover:text-accent group-open:text-accent transition-colors flex items-center justify-between gap-2">
                        <span>{b.title}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-ink-faint shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      </h4>
                      <p className="text-[12px] text-ink-muted mt-0.5">{b.desc}</p>
                    </div>
                  </summary>
                  <div className="px-4 pb-4 pl-[1.6rem]">
                    <p className="text-[13px] text-ink-muted leading-relaxed border-t border-line pt-3 mb-3">
                      {b.longText}
                    </p>
                    <a
                      href={b.href}
                      target={b.external ? '_blank' : undefined}
                      rel={b.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1 text-[12px] font-medium text-accent hover:text-accent-dark transition-colors"
                    >
                      {b.external ? 'Læs alt på Tandlægeforeningen' : 'Se vores fulde implantat-speciale'}
                      {b.external ? <ArrowUpRight className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Implantater — full width with image */}
      <section id="implantater" className="bg-surface-alt">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg min-h-[580px]">
          {/* Image half */}
          <div className="relative h-[300px] lg:h-auto">
            <img
              src={implantaterRoom}
              alt="Præcisionsarbejde med implantatkomponent"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content half */}
          <div className="bg-accent text-white p-10 md:p-14 lg:p-16 flex flex-col justify-center">
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-4 text-white/50">Vores speciale</p>
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] leading-tight mb-6">
              Avanceret implantologi
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed mb-10 max-w-[480px]">
              Vi var de første i Danmark, der udførte All-on-4 behandlingen. Vores viden indenfor rodbehandling og kirurgi gør, at vi udfører disse opgaver på patienter henvist fra tandlæger over hele landet.
            </p>

            <div className="space-y-6">
              {[
                ['All-on-4', 'Fuld kæbebro på 4 implantater. Faste tænder samme dag.'],
                ['Knogerekonstruktion', 'Genopbygning med din egen knogle og moderne materialer.'],
                ['A-PRF', 'Dit eget blod stimulerer sårheling efter kirurgiske indgreb.'],
                ['Henvisninger fra hele landet', 'Kolleger henviser komplekse implantatsager til os.'],
              ].map(([title, desc], i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-white/10 text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold">{title}</h4>
                    <p className="text-[13px] text-white/40 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-[32px] font-light tracking-[-0.02em]">Pionerer</div>
                <p className="text-[12px] text-white/40">Først i Danmark med All-on-4</p>
              </div>
              <div>
                <div className="text-[32px] font-light tracking-[-0.02em]">Dag 1</div>
                <p className="text-[12px] text-white/40">Faste tænder med All-on-4</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowImplantModal(true)}
              className="mt-8 self-start bg-white text-accent px-6 py-3 rounded-xl text-[14px] font-semibold hover:bg-white/90 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Læs mere om vores speciale <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          </div>
        </div>
      </section>

      {/* Tandlægeskræk — warm section with image */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <SlideIn direction="left">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={tandlaegeskraekWaiting}
                alt="Rolig venteområde med bløde stole"
                loading="lazy"
                decoding="async"
                className="w-full h-[400px] object-cover"
              />
            </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.2}>
            <div>
              <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Vi forstår dig</p>
              <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] text-ink leading-tight mb-4">
                Lider du af tandlægeskræk?
              </h2>
              <p className="text-ink-muted text-[15px] leading-relaxed mb-4">
                Vi er meget opmærksomme på, at nogle kan lide af tandlægeskræk. Faktisk er det op på 40% af alle voksne. Du er langt fra den eneste.
              </p>
              <p className="text-ink-muted text-[15px] leading-relaxed mb-8">
                Derfor tilstræber vi at gøre dit besøg så behageligt som muligt. Vi behandler altid i dit tempo, og du bestemmer hvornår vi holder pause. Både Hana og Allan har stor erfaring med angstpatienter og yder altid en omsorgsfuld behandling.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {['Behandling i dit tempo', 'Forklar-først tilgang', 'Ofte kureret på 1-2 besøg', 'Erfaring med tandlægeskræk'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-[14px] text-ink">{item}</span>
                  </div>
                ))}
              </div>
              <a href="tel:65313300" className="bg-accent text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-accent-dark transition-colors inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg">
                Ring for en tryg start <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-white border-t border-line">
        <div className="max-w-[780px] mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Ofte stillede spørgsmål</p>
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.02em] text-ink leading-tight">Hvad vil du gerne vide?</h2>
            <p className="text-ink-muted text-[15px] mt-3">De spørgsmål vi oftest får, før patienter bestiller første tid.</p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="border-t border-line">
              {[
                {
                  q: 'Tager I imod nye patienter?',
                  a: <>Ja, vi tager løbende imod nye patienter — både hvis du flytter fra kommunal tandpleje eller skifter fra en anden tandlæge. Du behøver ikke overflytte din journal før første besøg; vi ordner det bagefter.</>,
                },
                {
                  q: 'Jeg har ikke været hos tandlægen i mange år — bliver der skældt ud?',
                  a: <>Nej. Aldrig. Vi har set det hele før, og første besøg er en samtale, ikke en eksamen. Vi kigger, vi forklarer, og vi lægger en plan i dit tempo.</>,
                },
                {
                  q: 'Kan jeg få bedøvelse eller narkose?',
                  a: <>Ja. Vi bruger lokalbedøvelse rutinemæssigt ved behandlinger hvor det er relevant. Ved større eller angstfremkaldende indgreb er der mulighed for narkose — <a href="tel:65313300" className="text-accent hover:text-accent-dark underline decoration-accent/30 hover:decoration-accent/70 transition-colors">ring 65 31 33 00</a> og spørg, så planlægger vi det sammen.</>,
                },
                {
                  q: 'Hvad koster et rutineeftersyn?',
                  a: <>Vores priser følger <a href="https://www.tandlaegeforeningen.dk/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark underline decoration-accent/30 hover:decoration-accent/70 transition-colors">Tandlægeforeningens overenskomst</a> samt sundhed.dk. Et årligt eftersyn for voksne er delvist dækket af sygesikringen. <a href="tel:65313300" className="text-accent hover:text-accent-dark underline decoration-accent/30 hover:decoration-accent/70 transition-colors">Ring 65 31 33 00</a> hvis du vil have en konkret pris inden du kommer.</>,
                },
                {
                  q: 'Har I ventetid?',
                  a: <>Ved akut behov kan vi ofte finde en tid samme dag i åbningstiden. Til rutineeftersyn <a href="tel:65313300" className="text-accent hover:text-accent-dark underline decoration-accent/30 hover:decoration-accent/70 transition-colors">ringer du</a> og aftaler en tid, der passer dig.</>,
                },
              ].map((item, i) => (
                <details key={i} className="group border-b border-line">
                  <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-[16px] font-medium text-ink hover:text-accent transition-colors">
                    <span>{item.q}</span>
                    <ChevronDown className="w-4 h-4 text-ink-faint shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="pb-5 -mt-1 text-[14px] text-ink-muted leading-relaxed pr-8">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Holdet */}
      <section id="holdet" className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.02em] text-ink">Mød holdet</h2>
            <p className="text-ink-muted text-[15px] mt-3">Vi lægger vægt på tillid og omsorg, så du kan være tryg ved at lægge dine tænder i vore hænder</p>
          </FadeIn>

          <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {[
              {
                name: 'Allan Friis Pedersen',
                role: 'Tandlæge',
                specialty: 'Kirurgi, implantologi & angstbehandling',
                loc: 'Indehaver',
                bio: 'Allan er klinikejer og driver Tandkvalitet sammen med Hana. Han udfører alle behandlinger på klinikken — kirurgi, implantater, rodbehandling og almen tandpleje — og lægger særlig vægt på at forklare hvert skridt grundigt, så du føler dig tryg gennem hele forløbet.',
                img: allanPortrait,
              },
              {
                name: 'Hana El-khawaga',
                role: 'Tandlæge',
                specialty: 'Kirurgi, implantologi & angstbehandling',
                loc: 'Indehaver',
                bio: 'Hana er klinikejer og driver Tandkvalitet sammen med Allan. Hun udfører alle behandlinger på klinikken — kirurgi, implantater, rodbehandling og almen tandpleje — og yder altid en perfektionistisk og omsorgsfuld behandling med stor opmærksomhed på patientens tryghed.',
                img: hanaPortrait,
              },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-line overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/5] bg-surface overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[17px] font-semibold text-ink">{p.name}</h3>
                    <span className="text-[11px] font-medium text-accent bg-accent-light px-2.5 py-1 rounded-full">{p.loc}</span>
                  </div>
                  <p className="text-[13px] text-accent font-medium mb-1">{p.specialty}</p>
                  <p className="text-[13px] text-ink-muted leading-relaxed mt-3">{p.bio}</p>
                </div>
              </div>
            ))}
          </div>
          </FadeIn>
        </div>
      </section>

      {/* Lokationer */}
      <section id="find-os" className="py-20 md:py-28 bg-surface border-t border-line">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.02em] text-ink">Find os</h2>
            <p className="text-ink-muted text-[15px] mt-3">Adelgade 5, midt i Nyborg</p>
          </FadeIn>

          <FadeIn delay={0.2}>
          <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
            <div className="relative h-[280px] lg:h-auto overflow-hidden grid grid-cols-2 grid-rows-2 gap-1 bg-line">
              <img src={lokationFacade} alt="Tandkvalitet, Adelgade 5 — facade" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <img src={lokationSign} alt="Tandlægerne Adelgade — skilt" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <img src={lokationEntrance} alt="Indgang — trappen op til klinikken" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <img src={lokationDoor} alt="Klinikkens dør med tandsymbol" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <h3 className="text-[22px] font-semibold text-ink mb-6">Tandkvalitet Nyborg</h3>
              <div className="space-y-3 text-[14px]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-ink-muted">Adelgade 5, 5800 Nyborg</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <a href="tel:65313300" className="text-ink font-medium hover:text-accent transition-colors">65 31 33 00</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <a href="mailto:info@tandkvalitet.dk" className="text-ink font-medium hover:text-accent transition-colors">info@tandkvalitet.dk</a>
                </div>
              </div>
              <div className="border-t border-line mt-6 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-3.5 h-3.5 text-ink-faint" />
                  <span className="text-[12px] text-ink-faint uppercase tracking-wider font-medium">Åbningstider</span>
                </div>
                <div className="text-[13px] text-ink-muted space-y-1.5">
                  <div className="flex justify-between"><span>Man — Tor</span><span className="text-ink font-medium">08:00 — 15:00</span></div>
                  <div className="flex justify-between"><span>Fredag</span><span className="text-ink font-medium">08:00 — 14:00</span></div>
                  <div className="flex justify-between"><span>Hver 2. onsdag</span><span className="text-ink font-medium">12:30 — 18:00</span></div>
                  <div className="flex justify-between pt-1.5 border-t border-line mt-1.5"><span>Telefontid</span><span className="text-ink font-medium">08:00 — 12:00</span></div>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/bpQ757HEAKsQAwjU6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-accent font-medium mt-6 hover:text-accent-dark transition-colors"
              >
                Åbn i Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={ctaChurch}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/90" />
        </div>
        <div className="max-w-[600px] mx-auto px-6 relative z-10 text-center">
          <FadeIn>
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-[-0.02em] text-white mb-4">Book en tid</h2>
          <p className="text-[15px] text-white/50 leading-relaxed mb-10">
            Ring i telefontiden (08:00 — 12:00) eller send en mail. Vi vender tilbage hurtigst muligt.
          </p>
          <div className="max-w-[380px] mx-auto">
            <a href="tel:65313300" className="flex items-center justify-between bg-accent text-white px-6 py-4 rounded-xl font-medium text-[15px] hover:bg-accent-dark transition-colors group w-full">
              <span>Ring til Nyborg — 65 31 33 00</span>
              <Phone className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </a>
          </div>
          <a href="mailto:info@tandkvalitet.dk" className="inline-flex items-center gap-1.5 text-[13px] text-white/40 mt-6 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5" />
            info@tandkvalitet.dk
          </a>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-white/30 py-10 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-[13px]">
            <div>
              <h4 className="text-white font-medium mb-2 text-[14px]">Tandkvalitet Nyborg</h4>
              <p>Adelgade 5, 5800 Nyborg</p>
              <p>Tlf: 65 31 33 00</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2 text-[14px]">Åbningstider</h4>
              <p>Man — Tor: 08:00 — 15:00</p>
              <p>Fredag: 08:00 — 14:00</p>
              <p>Hver 2. onsdag: 12:30 — 18:00</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2 text-[14px]">Kontakt</h4>
              <p>info@tandkvalitet.dk</p>
              <p>Telefontid: 08:00 — 12:00</p>
              <p className="mt-2">Tandlægevagten Fyn: 9944 0809</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] gap-4">
            <p>© 2026 Tandkvalitet Nyborg</p>
            <a href="https://www.sundhed.dk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">sundhed.dk</a>
          </div>
        </div>
      </footer>

      {/* Specielle implantatbehandlinger — modal overlay */}
      <AnimatePresence>
        {showImplantModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowImplantModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="implant-modal-title"
            className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl max-w-[720px] w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowImplantModal(false)}
                aria-label="Luk"
                className="sticky top-4 float-right mr-4 z-10 w-9 h-9 rounded-full bg-surface hover:bg-line text-ink-muted hover:text-ink flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="p-8 sm:p-10 md:p-12">
                <p className="text-[12px] font-semibold text-accent uppercase tracking-widest mb-3">Specialeområde</p>
                <h2 id="implant-modal-title" className="text-[24px] sm:text-[28px] md:text-[32px] font-bold tracking-[-0.02em] text-ink leading-tight mb-6">
                  Specielle implantatbehandlinger
                </h2>
                <p className="text-ink-muted text-[15px] leading-relaxed mb-5">
                  Vi har specialiseret os i at lave avancerede implantatbehandlinger.
                </p>
                <p className="text-ink-muted text-[15px] leading-relaxed mb-5">
                  Mangler du 1, flere eller alle tænder, har vi altid en løsning til dig. Vi var de første i Danmark, der udførte All-on-4 behandlingen, hvor man bygger en fuldkæbebro på 4 implantater samme dag, som tænderne trækkes ud, og patienten får fastsiddende tænder samme dag.
                </p>
                <p className="text-ink-muted text-[15px] leading-relaxed mb-8">
                  Genopbygning af tabt knoglevæv eller tandkød kan også være nødvendigt inden implantater isættes. Her bygger vi med patientens egen knogle og knoglesubstitutter og bruger de nyeste teknikker på området. Vi laver A-PRF behandlinger, hvor vi anvender et koncentrat af dit eget blod (hvide blodlegemer og blodplader) til at stimulere sårhelingen.
                </p>
                <div className="border-t border-line pt-6">
                  <p className="text-[12px] text-ink-faint uppercase tracking-wider font-medium mb-3">Læs mere om teknikkerne</p>
                  <div className="flex flex-col gap-2.5 mb-8">
                    <a href="https://www.nobelbiocare.com/en-se/all-on-4-treatment-concept" target="_blank" rel="noopener noreferrer" className="text-[14px] text-accent hover:text-accent-dark inline-flex items-center gap-1.5 group">
                      All-on-4 Treatment Concept (Nobel Biocare) <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a href="https://www.puremed.dk/?portfolio=a-prf-and-allografts" target="_blank" rel="noopener noreferrer" className="text-[14px] text-accent hover:text-accent-dark inline-flex items-center gap-1.5 group">
                      A-PRF and Allografts (Puremed) <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                  <a href="tel:65313300" className="bg-accent text-white px-6 py-3 rounded-xl text-[14px] font-semibold hover:bg-accent-dark transition-colors inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Ring 65 31 33 00 for en samtale
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  )
}
