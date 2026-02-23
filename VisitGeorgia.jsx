import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// ============================================
// CONTEXT & PROVIDERS
// ============================================

const LanguageContext = createContext();
const ThemeContext = createContext();

const translations = {
  en: {
    dir: 'ltr',
    nav: { discover: 'Discover', experiences: 'Experiences', journey: 'Your Journey' },
    hero: {
      subtitle: 'Where Europe meets Asia',
      title: 'Georgia',
      scroll: 'Begin your journey'
    },
    why: {
      line1: 'Ancient mountains hold stories untold.',
      line2: '8,000 years of winemaking tradition.',
      line3: 'Hospitality written into the soul.',
      line4: 'A crossroads of civilizations.',
    },
    destinations: {
      tbilisi: {
        name: 'Tbilisi',
        tagline: 'Where old souls find new rhythms',
        desc: 'Cobblestone streets wind through sulfur baths and Soviet brutalism. Art nouveau balconies lean into each other like old friends sharing secrets.'
      },
      kazbegi: {
        name: 'Kazbegi',
        tagline: 'Touch the edge of heaven',
        desc: 'Gergeti Trinity Church floats above the clouds at 2,170 meters. Mount Kazbek watches in eternal silence.'
      },
      gudauri: {
        name: 'Gudauri',
        tagline: 'Where powder dreams come alive',
        desc: 'Untouched slopes. Endless horizons. Europe\'s best-kept secret for those who seek the pristine.'
      },
      kakheti: {
        name: 'Kakheti',
        tagline: 'The cradle of wine',
        desc: 'Amber qvevri wines aged in clay vessels beneath the earth. 525 grape varieties. One ancient tradition.'
      }
    },
    experiences: {
      mountains: { title: 'Mountains', desc: 'The Greater Caucasus calls' },
      wine: { title: 'Wine', desc: 'Born of clay and time' },
      culture: { title: 'Culture', desc: 'Living traditions' },
      food: { title: 'Food', desc: 'A feast for the soul' },
      history: { title: 'History', desc: 'Written in stone' }
    },
    tours: {
      title: 'Your Journey Awaits',
      subtitle: 'Private transport from Tbilisi. Guided experiences across the country. Every journey tailored to your rhythm.',
      cta: 'Begin Planning',
      features: ['Private transfers', 'Expert local guides', 'Curated experiences']
    },
    final: {
      title: 'Georgia is calling',
      subtitle: 'Let us guide you home.',
      cta: 'Connect with us'
    },
    footer: {
      copyright: '© 2025 Visit Georgia. All rights reserved.',
      tagline: 'საქართველო მოგელით'
    }
  },
  he: {
    dir: 'rtl',
    nav: { discover: 'גלה', experiences: 'חוויות', journey: 'המסע שלך' },
    hero: {
      subtitle: 'היכן אירופה פוגשת את אסיה',
      title: 'גאורגיה',
      scroll: 'התחל את המסע'
    },
    why: {
      line1: 'הרים עתיקים מחזיקים סיפורים שלא סופרו.',
      line2: '8,000 שנות מסורת יינות.',
      line3: 'הכנסת אורחים חקוקה בנשמה.',
      line4: 'צומת של תרבויות.',
    },
    destinations: {
      tbilisi: {
        name: 'טביליסי',
        tagline: 'היכן נשמות ישנות מוצאות קצבים חדשים',
        desc: 'רחובות מרוצפים מתפתלים בין מרחצאות גופרית וברוטליזם סובייטי. מרפסות ארט-נובו נשענות זו על זו כמו חברים ותיקים.'
      },
      kazbegi: {
        name: 'קזבגי',
        tagline: 'גע בקצה השמיים',
        desc: 'כנסיית גרגטי השילוש צפה מעל העננים בגובה 2,170 מטר. הר קזבק צופה בשתיקה נצחית.'
      },
      gudauri: {
        name: 'גודאורי',
        tagline: 'היכן חלומות השלג מתעוררים לחיים',
        desc: 'מדרונות בתוליים. אופקים אינסופיים. הסוד השמור של אירופה.'
      },
      kakheti: {
        name: 'קאחטי',
        tagline: 'עריסת היין',
        desc: 'יינות ענבר בכלי חרס קווברי תחת האדמה. 525 זני ענבים. מסורת עתיקה אחת.'
      }
    },
    experiences: {
      mountains: { title: 'הרים', desc: 'הקווקז הגדול קורא' },
      wine: { title: 'יין', desc: 'נולד מחימר וזמן' },
      culture: { title: 'תרבות', desc: 'מסורות חיות' },
      food: { title: 'אוכל', desc: 'חגיגה לנשמה' },
      history: { title: 'היסטוריה', desc: 'כתובה באבן' }
    },
    tours: {
      title: 'המסע שלך מחכה',
      subtitle: 'הסעות פרטיות מטביליסי. חוויות מודרכות ברחבי המדינה. כל מסע מותאם לקצב שלך.',
      cta: 'התחל לתכנן',
      features: ['הסעות פרטיות', 'מדריכים מקומיים מומחים', 'חוויות אצורות']
    },
    final: {
      title: 'גאורגיה קוראת',
      subtitle: 'תן לנו להדריך אותך הביתה.',
      cta: 'צור קשר'
    },
    footer: {
      copyright: '© 2025 Visit Georgia. כל הזכויות שמורות.',
      tagline: 'საქართველო მოგელით'
    }
  },
  ru: {
    dir: 'ltr',
    nav: { discover: 'Открыть', experiences: 'Впечатления', journey: 'Ваше путешествие' },
    hero: {
      subtitle: 'Где Европа встречает Азию',
      title: 'Грузия',
      scroll: 'Начните путешествие'
    },
    why: {
      line1: 'Древние горы хранят нерассказанные истории.',
      line2: '8000 лет винодельческой традиции.',
      line3: 'Гостеприимство, записанное в душе.',
      line4: 'Перекрёсток цивилизаций.',
    },
    destinations: {
      tbilisi: {
        name: 'Тбилиси',
        tagline: 'Где старые души находят новые ритмы',
        desc: 'Мощёные улицы петляют между серными банями и советским брутализмом. Балконы в стиле ар-нуво склоняются друг к другу.'
      },
      kazbegi: {
        name: 'Казбеги',
        tagline: 'Прикоснитесь к краю неба',
        desc: 'Церковь Гергети парит над облаками на высоте 2170 метров. Гора Казбек наблюдает в вечном молчании.'
      },
      gudauri: {
        name: 'Гудаури',
        tagline: 'Где оживают снежные мечты',
        desc: 'Нетронутые склоны. Бесконечные горизонты. Лучший секрет Европы для ценителей.'
      },
      kakheti: {
        name: 'Кахетия',
        tagline: 'Колыбель вина',
        desc: 'Янтарные вина квеври в глиняных сосудах под землёй. 525 сортов винограда. Одна древняя традиция.'
      }
    },
    experiences: {
      mountains: { title: 'Горы', desc: 'Большой Кавказ зовёт' },
      wine: { title: 'Вино', desc: 'Рождённое из глины и времени' },
      culture: { title: 'Культура', desc: 'Живые традиции' },
      food: { title: 'Еда', desc: 'Праздник для души' },
      history: { title: 'История', desc: 'Написанная в камне' }
    },
    tours: {
      title: 'Ваше путешествие ждёт',
      subtitle: 'Частный трансфер из Тбилиси. Экскурсии по всей стране. Каждое путешествие создано для вас.',
      cta: 'Начать планирование',
      features: ['Частные трансферы', 'Местные эксперты-гиды', 'Курируемые впечатления']
    },
    final: {
      title: 'Грузия зовёт',
      subtitle: 'Позвольте нам провести вас.',
      cta: 'Свяжитесь с нами'
    },
    footer: {
      copyright: '© 2025 Visit Georgia. Все права защищены.',
      tagline: 'საქართველო მოგელით'
    }
  }
};

// High-quality Unsplash images for Georgia
const images = {
  hero: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1920&q=90',
  tbilisi: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1920&q=90',
  kazbegi: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=1920&q=90',
  gudauri: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=90',
  kakheti: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=90',
  mountains: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=90',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=90',
  culture: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90',
  food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=90',
  history: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1920&q=90',
  tours: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=90',
  final: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=1920&q=90'
};

// ============================================
// CUSTOM HOOKS
// ============================================

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// ============================================
// ANIMATION VARIANTS
// ============================================

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// ============================================
// COMPONENTS
// ============================================

// Language Selector Overlay
function LanguageSelector({ isOpen, onClose }) {
  const { setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'he', name: 'Hebrew', native: 'עברית' },
    { code: 'ru', name: 'Russian', native: 'Русский' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase mb-12">
              Select Language
            </p>
            <div className="flex flex-col gap-6">
              {languages.map((lang, i) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => { setLanguage(lang.code); onClose(); }}
                  className="text-4xl md:text-6xl font-light text-white/70 hover:text-white transition-colors duration-500"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {lang.native}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Minimal Navigation
function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const langNames = { en: 'EN', he: 'עב', ru: 'RU' };

  return (
    <>
      <LanguageSelector isOpen={langOpen} onClose={() => setLangOpen(false)} />
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled ? 'bg-black/30 backdrop-blur-md' : ''
          }`}
        style={{ direction: t.dir }}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <motion.div
            className="text-white text-xl tracking-[0.2em] font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            GEORGIA
          </motion.div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => setLangOpen(true)}
              className="text-white/70 hover:text-white text-sm tracking-[0.15em] transition-colors duration-300"
            >
              {langNames[language]}
            </button>

            <button
              onClick={toggleTheme}
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

// Hero Section - Opening Scene
function HeroSection() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          src={images.hero}
          alt="Caucasus Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </motion.div>

      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity, direction: t.dir }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-white/70 text-sm md:text-base tracking-[0.4em] uppercase mb-6"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="text-white text-7xl md:text-[12rem] font-light leading-none tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t.hero.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-16 flex flex-col items-center gap-4"
        >
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase">
            {t.hero.scroll}
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Why Georgia - Cinematic Text Reveals
function WhySection() {
  const { t } = useLanguage();
  const lines = [t.why.line1, t.why.line2, t.why.line3, t.why.line4];

  return (
    <section className="relative bg-black py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6" style={{ direction: t.dir }}>
        {lines.map((line, i) => (
          <WhyLine key={i} text={line} index={i} />
        ))}
      </div>
    </section>
  );
}

function WhyLine({ text, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className="py-16 md:py-24"
    >
      <p
        className="text-white/90 text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {text}
      </p>
    </motion.div>
  );
}

// Destination Scene - Full Screen Immersive
function DestinationScene({ id, image, name, tagline, desc, reverse }) {
  const ref = useRef(null);
  const { t } = useLanguage();
  const isInView = useInView(ref, { once: true, margin: "-30%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ scale: imgScale }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div
        className={`relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 py-32 flex ${reverse ? 'justify-end' : 'justify-start'
          }`}
        style={{ direction: t.dir }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-2xl"
          style={{ y }}
        >
          <motion.p
            variants={slideIn}
            className="text-white/50 text-sm tracking-[0.3em] uppercase mb-6"
          >
            Destination
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-white text-6xl md:text-8xl lg:text-9xl font-light mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {name}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-white/80 text-xl md:text-2xl font-light italic mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {tagline}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg"
          >
            {desc}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// Destinations Container
function DestinationsSection() {
  const { t } = useLanguage();
  const destinations = [
    { id: 'tbilisi', image: images.tbilisi, ...t.destinations.tbilisi, reverse: false },
    { id: 'kazbegi', image: images.kazbegi, ...t.destinations.kazbegi, reverse: true },
    { id: 'gudauri', image: images.gudauri, ...t.destinations.gudauri, reverse: false },
    { id: 'kakheti', image: images.kakheti, ...t.destinations.kakheti, reverse: true },
  ];

  return (
    <div>
      {destinations.map((dest, i) => (
        <DestinationScene key={dest.id} {...dest} />
      ))}
    </div>
  );
}

// Experiences Section - Visual Moments
function ExperiencesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const experiences = [
    { key: 'mountains', image: images.mountains },
    { key: 'wine', image: images.wine },
    { key: 'culture', image: images.culture },
    { key: 'food', image: images.food },
    { key: 'history', image: images.history },
  ];

  return (
    <section ref={ref} className="relative bg-black py-32">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-[1800px] mx-auto px-6 md:px-12"
        style={{ direction: t.dir }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-white text-5xl md:text-7xl font-light text-center mb-24"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Experiences
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.key}
              {...exp}
              data={t.experiences[exp.key]}
              large={i === 0 || i === 3}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ExperienceCard({ image, data, large }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scaleIn}
      className={`relative overflow-hidden group cursor-pointer ${large ? 'md:col-span-2 lg:col-span-1 aspect-[4/3]' : 'aspect-[3/4]'
        }`}
    >
      <motion.img
        src={image}
        alt={data.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3
          className="text-white text-3xl md:text-4xl font-light mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {data.title}
        </h3>
        <p className="text-white/60 text-sm tracking-wide">
          {data.desc}
        </p>
      </div>
    </motion.div>
  );
}

// Tours Section
function ToursSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={images.tours}
          alt="Journey"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center"
        style={{ direction: t.dir }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-light mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t.tours.title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-white/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          {t.tours.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {t.tours.features.map((feature, i) => (
            <span key={i} className="text-white/50 text-sm tracking-[0.2em] uppercase">
              {feature}
            </span>
          ))}
        </motion.div>

        <motion.button
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-12 py-4 border border-white/30 text-white text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500"
        >
          {t.tours.cta}
        </motion.button>
      </motion.div>
    </section>
  );
}

// Final CTA Section
function FinalSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      >
        <img
          src={images.final}
          alt="Georgia calling"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative z-10 text-center px-6"
        style={{ direction: t.dir }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-light mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t.final.title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-white/70 text-xl md:text-2xl font-light italic mb-12"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t.final.subtitle}
        </motion.p>

        <motion.a
          variants={fadeUp}
          href="https://wa.me/995514048822"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t.final.cta}
        </motion.a>
      </motion.div>
    </section>
  );
}

// Footer
function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black py-16 border-t border-white/10" style={{ direction: t.dir }}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-white/40 text-sm">
          {t.footer.copyright}
        </p>
        <p
          className="text-white/60 text-2xl"
          style={{ fontFamily: "'Noto Sans Georgian', serif" }}
        >
          {t.footer.tagline}
        </p>
      </div>
    </footer>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function VisitGeorgia() {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('dark');
  const t = translations[language];

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Store language preference
    localStorage.setItem('visitGeorgia_lang', language);
  }, [language]);

  useEffect(() => {
    // Load saved preferences
    const savedLang = localStorage.getItem('visitGeorgia_lang');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div
          className={`min-h-screen transition-colors duration-700 ${theme === 'dark' ? 'bg-black' : 'bg-stone-100'
            }`}
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            direction: t.dir
          }}
        >
          {/* Google Fonts */}
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
            
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            html {
              scroll-behavior: smooth;
            }
            
            ::selection {
              background: rgba(255, 255, 255, 0.2);
              color: white;
            }
          `}</style>

          <Navigation />
          <HeroSection />
          <WhySection />
          <DestinationsSection />
          <ExperiencesSection />
          <ToursSection />
          <FinalSection />
          <Footer />
        </div>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}
