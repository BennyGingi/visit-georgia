'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import BackToTop from '@/components/BackToTop'
import TrustBadges from '@/components/TrustBadges'

// ============================================
// IMAGE URLS - ALL VERIFIED WORKING
// ============================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=2000&q=80",
  tbilisi: "https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=2000&q=80",
  kazbegi: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
  gudauri: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80",
  kakheti: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2000&q=80",
  mountains: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2000&q=80",
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=80",
  culture: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80",
  final: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
}

// ============================================
// TRANSLATIONS
// ============================================
const content = {
  en: {
    nav: ['Discover', 'Places', 'Experience', 'Journey'],
    hero: {
      pre: 'Discover',
      title: 'GEORGIA',
      sub: 'Where mountains whisper and wine flows through centuries',
      scroll: 'Scroll'
    },
    phrases: [
      { text: 'A land carved by mountains and time.', img: IMAGES.kazbegi },
      { text: 'Wine older than civilization itself.', img: IMAGES.wine },
      { text: 'Hospitality written into the soul.', img: IMAGES.culture },
      { text: 'Silence in valleys. Fire in hearts.', img: IMAGES.food },
    ],
    destinations: [
      { name: 'Tbilisi', desc: 'Stone and song. Sulfur baths and midnight light.', img: IMAGES.tbilisi },
      { name: 'Kazbegi', desc: 'Peaks that feel like prayers.', img: IMAGES.kazbegi },
      { name: 'Gudauri', desc: 'White horizons. Endless freedom.', img: IMAGES.gudauri },
      { name: 'Kakheti', desc: 'Vineyards that taste like history.', img: IMAGES.kakheti },
    ],
    experiences: [
      { name: 'Mountains', desc: 'Walk where clouds rest.', img: IMAGES.mountains },
      { name: 'Wine', desc: 'Ancient qvevri. Living craft.', img: IMAGES.wine },
      { name: 'Culture', desc: 'Polyphonic voices echo through time.', img: IMAGES.culture },
      { name: 'Food', desc: 'Tables that welcome strangers as family.', img: IMAGES.food },
    ],
    tours: {
      title: 'Move with ease',
      desc: 'Private transport from Tbilisi. Guided journeys across Georgia.',
      btn: 'WhatsApp Rati Tours',
      viewPrices: 'View Prices & Routes'
    },
    cta: {
      title: 'Come and feel it.',
      sub: 'Georgia waits quietly. When you are ready.'
    },
    footer: 'საქართველო მოგელით',
    immerse: 'Immerse Yourself',
    experiencesTitle: 'Experiences',
    destination: 'Destination',
  },
  he: {
    nav: ['גלה', 'מקומות', 'חוויה', 'מסע'],
    hero: {
      pre: 'גלה את',
      title: 'גאורגיה',
      sub: 'היכן הרים לוחשים ויין זורם דרך מאות שנים',
      scroll: 'גלול'
    },
    phrases: [
      { text: 'ארץ שנחצבה בידי הרים וזמן.', img: IMAGES.kazbegi },
      { text: 'יין עתיק מהתרבות עצמה.', img: IMAGES.wine },
      { text: 'הכנסת אורחים חקוקה בנשמה.', img: IMAGES.culture },
      { text: 'שקט בעמקים. אש בלבבות.', img: IMAGES.food },
    ],
    destinations: [
      { name: 'טביליסי', desc: 'אבן ושיר. מרחצאות גופרית ואור חצות.', img: IMAGES.tbilisi },
      { name: 'קזבגי', desc: 'פסגות שמרגישות כמו תפילות.', img: IMAGES.kazbegi },
      { name: 'גודאורי', desc: 'אופקים לבנים. חופש אינסופי.', img: IMAGES.gudauri },
      { name: 'קאחטי', desc: 'כרמים בטעם של היסטוריה.', img: IMAGES.kakheti },
    ],
    experiences: [
      { name: 'הרים', desc: 'לכו היכן שעננים נחים.', img: IMAGES.mountains },
      { name: 'יין', desc: 'קווברי עתיק. מלאכה חיה.', img: IMAGES.wine },
      { name: 'תרבות', desc: 'קולות פוליפוניים מהדהדים בזמן.', img: IMAGES.culture },
      { name: 'אוכל', desc: 'שולחנות שמקבלים זרים כמשפחה.', img: IMAGES.food },
    ],
    tours: {
      title: 'נעו בקלות',
      desc: 'הסעות פרטיות מטביליסי. מסעות מודרכים ברחבי גאורגיה.',
      btn: 'וואטסאפ Rati Tours',
      viewPrices: 'צפה במחירים ומסלולים'
    },
    cta: {
      title: 'בוא להרגיש.',
      sub: 'גאורגיה מחכה בשקט. כשתהיה מוכן.'
    },
    footer: 'საქართველო მოგელით',
    immerse: 'שקעו בחוויה',
    experiencesTitle: 'חוויות',
    destination: 'יעד',
  },
  ru: {
    nav: ['Открыть', 'Места', 'Опыт', 'Путешествие'],
    hero: {
      pre: 'Откройте',
      title: 'ГРУЗИЮ',
      sub: 'Где горы шепчут, а вино течёт сквозь века',
      scroll: 'Прокрутить'
    },
    phrases: [
      { text: 'Земля, высеченная горами и временем.', img: IMAGES.kazbegi },
      { text: 'Вино древнее самой цивилизации.', img: IMAGES.wine },
      { text: 'Гостеприимство, вписанное в душу.', img: IMAGES.culture },
      { text: 'Тишина в долинах. Огонь в сердцах.', img: IMAGES.food },
    ],
    destinations: [
      { name: 'Тбилиси', desc: 'Камень и песня. Серные бани и полуночный свет.', img: IMAGES.tbilisi },
      { name: 'Казбеги', desc: 'Вершины, похожие на молитвы.', img: IMAGES.kazbegi },
      { name: 'Гудаури', desc: 'Белые горизонты. Бесконечная свобода.', img: IMAGES.gudauri },
      { name: 'Кахетия', desc: 'Виноградники со вкусом истории.', img: IMAGES.kakheti },
    ],
    experiences: [
      { name: 'Горы', desc: 'Идите туда, где отдыхают облака.', img: IMAGES.mountains },
      { name: 'Вино', desc: 'Древние квеври. Живое ремесло.', img: IMAGES.wine },
      { name: 'Культура', desc: 'Полифонические голоса сквозь время.', img: IMAGES.culture },
      { name: 'Еда', desc: 'Столы, принимающие чужих как семью.', img: IMAGES.food },
    ],
    tours: {
      title: 'Путешествуйте с комфортом',
      desc: 'Частный транспорт из Тбилиси. Туры по всей Грузии.',
      btn: 'WhatsApp Rati Tours',
      viewPrices: 'Цены и маршруты'
    },
    cta: {
      title: 'Приезжайте и почувствуйте.',
      sub: 'Грузия ждёт тихо. Когда вы будете готовы.'
    },
    footer: 'საქართველო მოგელით',
    immerse: 'Погрузитесь',
    experiencesTitle: 'Впечатления',
    destination: 'Направление',
  }
}

// ============================================
// ANIMATION VARIANTS - Cinematic timing
// ============================================
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 }
  }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
}

// ============================================
// COMPONENTS
// ============================================

// Hero Section - Cinematic Dark Style
function HeroSection({ t, isRTL }: any) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-ivory to-cream dark:from-cinema-black dark:via-cinema-dark dark:to-cinema-black transition-colors duration-500" />

        {/* Actual Image with Ken Burns animation */}
        <Image
          src={IMAGES.hero}
          alt="Caucasus Mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover ken-burns"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/60 via-transparent to-ivory dark:from-cinema-black/60 dark:via-transparent dark:to-cinema-black transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/50 via-transparent to-ivory/50 dark:from-cinema-black/50 dark:via-transparent dark:to-cinema-black/50 transition-colors duration-500" />

        {/* Vignette effect */}
        <div className="absolute inset-0 dark:vignette-strong" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity, y }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-terracotta dark:text-gold-aged text-lg md:text-xl tracking-[0.35em] uppercase mb-4 font-serif font-light transition-colors duration-500"
        >
          {t.hero.pre}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-espresso dark:text-white text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-bold leading-none tracking-tight dark:gold-glow transition-colors duration-500"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-espresso/60 dark:text-white/60 text-lg md:text-2xl mt-6 max-w-2xl font-light tracking-wide font-serif italic transition-colors duration-500"
        >
          {t.hero.sub}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <span className="text-espresso/30 dark:text-white/30 text-xs tracking-[0.3em] uppercase font-light transition-colors duration-500">{t.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border border-terracotta/40 dark:border-gold-dim/40 rounded-full flex justify-center pt-2 transition-colors duration-500"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-terracotta dark:bg-gold-aged rounded-full transition-colors duration-500"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cinematic decorative corners */}
      <div className="absolute top-24 left-6 w-20 h-20 border-l-2 border-t-2 border-terracotta/30 dark:border-gold-dim/30 transition-colors duration-500" />
      <div className="absolute top-24 left-6 w-12 h-12 border-l border-t border-terracotta/20 dark:border-gold-aged/20 translate-x-2 translate-y-2 transition-colors duration-500" />
      <div className="absolute bottom-24 right-6 w-20 h-20 border-r-2 border-b-2 border-terracotta/30 dark:border-gold-dim/30 transition-colors duration-500" />
      <div className="absolute bottom-24 right-6 w-12 h-12 border-r border-b border-terracotta/20 dark:border-gold-aged/20 -translate-x-2 -translate-y-2 transition-colors duration-500" />
    </section>
  )
}

// Phrase Section - Cinematic Dark Style
function PhraseSection({ phrase, index }: { phrase: { text: string, img: string }, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30%" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.08])

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <div className="absolute inset-0 bg-ivory dark:bg-cinema-black transition-colors duration-500" />
        <Image
          src={phrase.img}
          alt={`Background image for: ${phrase.text}`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-ivory/65 dark:bg-cinema-black/65 transition-colors duration-500" />
        {/* Vignette */}
        <div className="absolute inset-0 dark:vignette" />
      </motion.div>

      {/* Text with gold accent border */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ y }}
      >
        {/* Decorative line above */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-16 h-px bg-terracotta/50 dark:bg-gold-aged/50 mx-auto mb-8 transition-colors duration-500"
        />
        <h2 className="font-serif text-espresso dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight italic transition-colors duration-500">
          {phrase.text}
        </h2>
        {/* Decorative line below */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-16 h-px bg-terracotta/50 dark:bg-gold-aged/50 mx-auto mt-8 transition-colors duration-500"
        />
      </motion.div>
    </section>
  )
}

// Destination Section - Cinematic Dark Style
function DestinationSection({ dest, index, isRTL, destinationLabel }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [120, -120])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1])
  const isReverse = index % 2 === 1

  return (
    <section ref={ref} className="relative min-h-screen w-full flex items-center overflow-hidden py-20">
      {/* Background with cinematic treatment */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <div className="absolute inset-0 bg-ivory dark:bg-cinema-black transition-colors duration-500" />
        <Image
          src={dest.img}
          alt={dest.name}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ivory/55 dark:bg-cinema-black/55 transition-colors duration-500" />
        <div className={`absolute inset-0 bg-gradient-to-${isReverse ? 'l' : 'r'} from-ivory/90 via-ivory/50 to-transparent dark:from-cinema-black/90 dark:via-cinema-black/50 dark:to-transparent transition-colors duration-500`} />
        {/* Vignette */}
        <div className="absolute inset-0 dark:vignette" />
      </motion.div>

      {/* Content with bordered container */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 flex ${isReverse ? 'justify-end' : 'justify-start'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="max-w-xl relative"
          style={{ y }}
        >
          {/* Decorative border */}
          <div className={`absolute ${isReverse ? '-right-4' : '-left-4'} top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-terracotta/40 dark:via-gold-aged/40 to-transparent transition-colors duration-500`} />

          <motion.span
            variants={fadeUp}
            className="text-terracotta/70 dark:text-gold-aged/70 text-xs tracking-[0.35em] uppercase block mb-6 font-light transition-colors duration-500"
          >
            0{index + 1} — {destinationLabel}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display text-espresso dark:text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-none transition-colors duration-500"
          >
            {dest.name}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-espresso/50 dark:text-white/50 text-xl md:text-2xl font-serif font-light leading-relaxed italic transition-colors duration-500"
          >
            {dest.desc}
          </motion.p>

          {/* Bottom accent */}
          <motion.div
            variants={fadeUp}
            className="mt-8 w-12 h-px bg-terracotta/50 dark:bg-gold-dim/50 transition-colors duration-500"
          />
        </motion.div>
      </div>
    </section>
  )
}

// Experience Card - Cinematic Dark Style with borders
function ExperienceCard({ exp, index }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scaleUp}
      className="relative group overflow-hidden aspect-[3/4] border-2 border-stone/20 dark:border-gold-dim/20 hover:border-terracotta/50 dark:hover:border-gold-aged/50 transition-colors duration-500"
    >
      {/* Image */}
      <div className="absolute inset-0 bg-cream dark:bg-cinema-black transition-colors duration-500" />
      <Image
        src={exp.img}
        alt={exp.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/50 to-transparent dark:from-cinema-black dark:via-cinema-black/50 dark:to-transparent transition-colors duration-500" />

      {/* Vignette */}
      <div className="absolute inset-0 dark:vignette dark:opacity-60" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-terracotta/0 dark:bg-gold-aged/0 group-hover:bg-terracotta/5 dark:group-hover:bg-gold-aged/5 transition-colors duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3 className="font-display text-espresso dark:text-white text-3xl md:text-4xl font-bold mb-2 transition-colors duration-500">
          {exp.name}
        </h3>
        <p className="text-espresso/50 dark:text-white/50 text-base md:text-lg font-serif font-light italic transition-colors duration-500">
          {exp.desc}
        </p>
      </div>

      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-terracotta/0 dark:border-gold-aged/0 group-hover:border-terracotta/60 dark:group-hover:border-gold-aged/60 transition-colors duration-500" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-terracotta/0 dark:border-gold-aged/0 group-hover:border-terracotta/60 dark:group-hover:border-gold-aged/60 transition-colors duration-500" />
    </motion.div>
  )
}

// Experiences Section - Cinematic Dark Style
function ExperiencesSection({ t, isRTL }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="relative py-24 md:py-40 bg-ivory dark:bg-cinema-black transition-colors duration-500">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-cream to-ivory dark:from-cinema-black dark:via-cinema-dark dark:to-cinema-black transition-colors duration-500" />

      <div className="relative z-10 max-w-7xl mx-auto px-6" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span
            variants={fadeUp}
            className="text-terracotta/70 dark:text-gold-aged/70 text-xs tracking-[0.35em] uppercase font-light transition-colors duration-500"
          >
            {t.immerse}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-espresso dark:text-white text-5xl md:text-7xl lg:text-8xl font-bold mt-4 transition-colors duration-500"
          >
            {t.experiencesTitle}
          </motion.h2>
          {/* Decorative line */}
          <motion.div
            variants={fadeUp}
            className="w-20 h-px bg-terracotta/40 dark:bg-gold-dim/40 mx-auto mt-8 transition-colors duration-500"
          />
        </motion.div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.experiences.map((exp: any, i: number) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Tours Section - Cinematic Dark Style
function ToursSection({ t, isRTL }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-cream dark:bg-cinema-black transition-colors duration-500" />
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(150,114,89,0.08)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_70%)]" />

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Decorative top border */}
        <motion.div
          variants={fadeUp}
          className="w-px h-16 bg-gradient-to-b from-transparent to-terracotta/50 dark:to-gold-dim/50 mx-auto mb-12 transition-colors duration-500"
        />

        <motion.h2
          variants={fadeUp}
          className="font-display text-espresso dark:text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 transition-colors duration-500"
        >
          {t.tours.title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-espresso/50 dark:text-white/50 text-xl md:text-2xl font-serif font-light mb-12 italic transition-colors duration-500"
        >
          {t.tours.desc}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/transfers"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-terracotta dark:border-gold-aged text-terracotta dark:text-gold-aged text-lg font-medium hover:bg-terracotta hover:text-ivory dark:hover:bg-gold-aged dark:hover:text-cinema-black transition-all duration-300"
          >
            {t.tours.viewPrices}
          </Link>
          <a
            href="https://wa.me/995514048822"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white text-lg font-medium hover:bg-green-500 transition-all duration-300"
          >
            {t.tours.btn}
          </a>
        </motion.div>

        {/* Decorative bottom border */}
        <motion.div
          variants={fadeUp}
          className="w-px h-16 bg-gradient-to-t from-transparent to-terracotta/50 dark:to-gold-dim/50 mx-auto mt-12 transition-colors duration-500"
        />
      </motion.div>
    </section>
  )
}

// CTA Section - Cinematic Dark Style
function CTASection({ t, isRTL }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1])

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with cinematic treatment */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div className="absolute inset-0 bg-ivory dark:bg-cinema-black transition-colors duration-500" />
        <Image
          src={IMAGES.final}
          alt="Georgia landscape"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ivory/60 dark:bg-cinema-black/60 transition-colors duration-500" />
        {/* Strong vignette for drama */}
        <div className="absolute inset-0 dark:vignette-strong" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Decorative element */}
        <motion.div
          variants={fadeUp}
          className="w-px h-20 bg-gradient-to-b from-transparent via-terracotta/50 dark:via-gold-aged/50 to-transparent mx-auto mb-10 transition-colors duration-500"
        />

        <motion.h2
          variants={fadeUp}
          className="font-display text-espresso dark:text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 dark:gold-glow transition-colors duration-500"
        >
          {t.cta.title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-espresso/50 dark:text-white/50 text-xl md:text-2xl font-serif font-light italic transition-colors duration-500"
        >
          {t.cta.sub}
        </motion.p>

        {/* Georgian script */}
        <motion.p
          variants={fadeUp}
          className="text-terracotta/40 dark:text-gold-aged/40 text-lg font-georgian mt-8 transition-colors duration-500"
        >
          საქართველო მოგელით
        </motion.p>
      </motion.div>
    </section>
  )
}



// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Home() {
  const [lang, setLang] = useState<'en' | 'he' | 'ru'>('en')
  const t = content[lang as keyof typeof content]
  const isRTL = lang === 'he'

  // Save language preference
  useEffect(() => {
    const saved = localStorage.getItem('visitGeorgia_lang')
    if (saved && (saved === 'en' || saved === 'he' || saved === 'ru')) {
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('visitGeorgia_lang', lang)
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [lang, isRTL])

  return (
    <main className="bg-ivory dark:bg-cinema-black dark:noise-grain transition-colors duration-500">
      {/* Navigation */}
      <Navigation lang={lang} setLang={setLang} />

      {/* Hero */}
      <HeroSection t={t} isRTL={isRTL} />

      {/* Trust Badges */}
      <TrustBadges lang={lang} />

      {/* Powerful Phrases */}
      {t.phrases.map((phrase, i) => (
        <PhraseSection key={i} phrase={phrase} index={i} />
      ))}

      {/* Destinations */}
      {t.destinations.map((dest, i) => (
        <DestinationSection key={i} dest={dest} index={i} isRTL={isRTL} destinationLabel={t.destination} />
      ))}

      {/* Experiences */}
      <ExperiencesSection t={t} isRTL={isRTL} />

      {/* Tours */}
      <ToursSection t={t} isRTL={isRTL} />

      {/* CTA */}
      <CTASection t={t} isRTL={isRTL} />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating Components */}
      <FloatingWhatsApp lang={lang} />
      <BackToTop />
    </main>
  )
}