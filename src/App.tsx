import './index.css'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Check, Clock, ChevronDown } from 'lucide-react'
import heroReception from './assets/hero-reception.jpg'
import behandlingerAction from './assets/behandlinger-action.jpg'
import serviceGenerel from './assets/service-generel.jpg'
import serviceKirurgi from './assets/service-kirurgi.jpg'
import serviceKroner from './assets/service-kroner.jpg'
import serviceAkut from './assets/service-akut.jpg'
import implantaterRoom from './assets/implantater-room.jpg'
import tandlaegeskraekWaiting from './assets/tandlaegeskraek-waiting.jpg'
import allanPortrait from './assets/allan-portrait.jpg'
import hanaPortrait from './assets/hana-portrait.jpg'
import lokationExterior from './assets/lokation-exterior.jpg'
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
  { name: 'Specielle implantatbehandlinger', href: '#implantater', external: false },
  { name: 'Implantatbehandlinger', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/g-k/implantat-en-kunstig-tandrod/', external: true },
  { name: 'Caries', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/a-f/caries/', external: true },
  { name: 'Tandkødsbetændelse og parodontitis', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/s-%C3%A5/tandkoedsbetaendelse/', external: true },
  { name: 'Rodbehandling', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/p-r/rodbehandling/', external: true },
  { name: 'Revner i tænderne', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/p-r/revner-i-taenderne-dentininfraktioner/', external: true },
  { name: 'Visdomstænder', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/s-%C3%A5/visdomstaender/', external: true },
  { name: 'Efter fjernelse af en tand', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/a-f/efter-fjernelse-af-en-tand/', external: true },
  { name: 'Erosioner', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/a-f/erosioner-syreskader-paa-taenderne/', external: true },
  { name: 'Kosmetisk tandbehandling', href: 'https://www.tandlaegeforeningen.dk/patienter/livsstil/kosmetisk-tandbehandling/', external: true },
  { name: 'Kroner og broer', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/g-k/kroner-og-broer/', external: true },
  { name: 'Helprotese', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/p-r/ny-protese/', external: true },
  { name: 'Delprotese', href: 'https://www.tandlaegeforeningen.dk/patienter/tandsygdomme-gener-og-behandlinger/p-r/ny-protese/', external: true },
]

export default function App() {
  const [showTreatments, setShowTreatments] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%'])

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
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
          <a href="tel:65313300" className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
            navScrolled ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
          }`}>
            Book tid
          </a>
        </div>
      </motion.nav>

      {/* Hero — full width image with overlay */}
      <section className="relative pt-14 min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroReception}
            alt="Reception hos Tandkvalitet i Nyborg"
            className="w-full h-full object-cover scale-110"
            style={{ y: heroImageY }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 pb-16 md:pb-24 relative z-10 w-full">
          <div className="max-w-[640px]">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/90 text-white text-[12px] font-medium px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Modtager nye patienter
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(36px,5.5vw,72px)] text-white font-bold leading-[1.05] tracking-[-0.03em]">
              Dine tænder.<br />Dit smil.
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
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-accent text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-wrap justify-between gap-6 text-[13px] font-medium">
          {['All-on-4 pionerer i Danmark', 'Henvisninger fra hele landet', 'Specialister i implantologi', 'Fokus på tandlægeskræk'].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-white/60" />
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
                  desc: 'All-on-4, guided surgery, knogerekonstruktion og A-PRF. Vores nationale speciale.',
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
                  desc: 'Akutte tilfælde prioriteres. Ring 08-10 for hurtig hjælp. Udenfor åbningstid: Tandlægevagten.',
                  img: serviceAkut,
                },
              ].map((s, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden border transition-all hover:shadow-md group ${
                  s.highlight ? 'border-accent/30 bg-accent-light' : 'border-line bg-white'
                }`}>
                  <div className="h-32 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

      {/* Alle behandlinger — full list */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <h3 className="text-[18px] font-semibold text-ink mb-6">Alle behandlinger</h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              ['Caries', 'Behandling af huller i tænderne med fyldninger og forebyggelse.'],
              ['Tandkødsbetændelse & parodontitis', 'Behandling og forebyggelse af sygdomme i tandkødet.'],
              ['Rodbehandling', 'Fjernelse af betændt væv i tandens rodkanal.'],
              ['Revner i tænderne', 'Diagnosticering og behandling af dentinfrakturer.'],
              ['Visdomstænder', 'Vurdering og evt. fjernelse af visdomstænder.'],
              ['Efter fjernelse af en tand', 'Vejledning og opfølgning efter tandudtrækning.'],
              ['Erosioner', 'Behandling og forebyggelse af syreskader på emaljen.'],
              ['Blegning af tænder', 'Professionel tandblegning for et hvidere smil.'],
              ['Kroner og broer', 'Faste erstatninger der genskaber funktion og æstetik.'],
              ['Hel- og delproteser', 'Aftagelige erstatninger ved tab af flere tænder.'],
              ['Kosmetisk tandbehandling', 'Æstetiske behandlinger for dit bedste smil.'],
              ['Implantater', 'Kunstige tandrødder som fundament for kroner og broer.'],
            ].map(([title, desc], i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl border border-line bg-white hover:border-accent/20 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                <div>
                  <h4 className="text-[14px] font-medium text-ink">{title}</h4>
                  <p className="text-[12px] text-ink-muted mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
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
              alt="Behandlingsrum til implantatbehandling"
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
                ['Guided Surgery', 'CT-scanning og 3D-planlægning. Nye tænder på 1 time.'],
                ['Knogerekonstruktion', 'Genopbygning med din egen knogle og moderne materialer.'],
                ['A-PRF', 'Dit eget blod stimulerer sårheling efter kirurgiske indgreb.'],
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
                <div className="text-[32px] font-light tracking-[-0.02em]">1 time</div>
                <p className="text-[12px] text-white/40">Guidet kirurgi</p>
              </div>
              <div>
                <div className="text-[32px] font-light tracking-[-0.02em]">Dag 1</div>
                <p className="text-[12px] text-white/40">Faste tænder med All-on-4</p>
              </div>
            </div>
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
                Derfor tilstræber vi at gøre dit besøg så behageligt som muligt. Vi behandler altid i dit tempo, og du bestemmer hvornår vi holder pause. Hana interesserer sig særligt for angstpatienter og yder altid en omsorgsfuld behandling.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {['Behandling i dit tempo', 'Forklar-først tilgang', 'Ofte kureret på 1-2 besøg', 'Særlig ekspertise med Hana'].map((item, i) => (
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
                specialty: 'Kirurgi & Implantologi',
                loc: 'Indehaver',
                bio: 'Allan interesserer sig specielt for kirurgi og implantologi og tilbyder avancerede rekonstruktioner. Han er konsulent for andre tandlæger og opererer for klinikker landet over.',
                img: allanPortrait,
              },
              {
                name: 'Hana El-khawaga',
                role: 'Tandlæge',
                specialty: 'Parodontose & Angstbehandling',
                loc: 'Indehaver',
                bio: 'Hana har bred erfaring og interesserer sig særligt for tandlægeskræk, paradentosebehandling og rodbehandlinger. Hun yder altid en perfektionistisk og omsorgsfuld behandling.',
                img: hanaPortrait,
              },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-line overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[3/4] bg-surface overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top" />
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
            <div className="relative h-[280px] lg:h-auto overflow-hidden">
              <img
                src={lokationExterior}
                alt="Tandkvalitet, Adelgade 5, Nyborg — facade"
                className="w-full h-full object-cover"
              />
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

      {/* Nyttige links */}
      <section className="bg-white border-t border-line py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <h3 className="text-[14px] font-semibold text-ink mb-5">Nyttige links</h3>
          <div className="flex flex-wrap gap-3">
            {[
              ['Tandlægeforeningen', 'https://www.tandlaegeforeningen.dk'],
              ['Sundhed.dk', 'https://www.sundhed.dk'],
              ['Sygeforsikring Danmark', 'https://www.sygeforsikring.dk'],
              ['Tandlægevagten Fyn', 'https://www.regionsyddanmark.dk/wm211080'],
              ['Skift tandlæge', '#'],
              ['Tilskudsmuligheder', '#'],
            ].map(([label, url], i) => (
              <a key={i} href={url} target={url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-[13px] text-ink-muted px-4 py-2 rounded-lg border border-line hover:border-accent/30 hover:text-accent transition-colors">
                {label}
              </a>
            ))}
          </div>
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
    </div>
  )
}
