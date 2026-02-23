'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import BackToTop from '@/components/BackToTop';

// Translations
const translations = {
    en: {
        hero: {
            title: 'Discover Georgia',
            subtitle: 'From ancient cities to mountain peaks, explore the diverse beauty of Georgia',
        },
        destinations: [
            {
                slug: 'tbilisi',
                name: 'Tbilisi',
                tagline: 'The soul of Georgia',
                description: 'Ancient capital where cobblestone streets meet modern cafes, sulfur baths whisper history, and Art Nouveau balconies overlook the Mtkvari River.',
            },
            {
                slug: 'kazbegi',
                name: 'Kazbegi',
                tagline: 'Where mountains touch heaven',
                description: 'Dramatic peaks crowned by the iconic Gergeti Trinity Church at 2,170 meters, surrounded by the majestic Caucasus Mountains.',
            },
            {
                slug: 'gudauri',
                name: 'Gudauri',
                tagline: 'Ski paradise of the Caucasus',
                description: 'Premier ski resort with pristine slopes, breathtaking views, and endless powder snow from December to April.',
            },
            {
                slug: 'batumi',
                name: 'Batumi',
                tagline: 'Black Sea pearl',
                description: 'Subtropical paradise where palm-lined boulevards meet modern architecture, casinos, and beautiful beaches along the Black Sea coast.',
            },
            {
                slug: 'kakheti',
                name: 'Kakheti',
                tagline: 'Birthplace of wine',
                description: '8,000 years of winemaking tradition in clay qvevri vessels, rolling vineyards, and charming wine cellars across Georgia\'s wine country.',
            },
            {
                slug: 'borjomi',
                name: 'Borjomi',
                tagline: 'Healing waters',
                description: 'Famous mineral water springs nestled in pristine forests, with historic parks and the gateway to Borjomi-Kharagauli National Park.',
            },
            {
                slug: 'mestia',
                name: 'Mestia',
                tagline: 'Gateway to Svaneti',
                description: 'Medieval stone towers rise above alpine meadows in this UNESCO World Heritage region, home to ancient Svan culture and traditions.',
            },
            {
                slug: 'bakuriani',
                name: 'Bakuriani',
                tagline: 'Year-round mountain resort',
                description: 'Charming resort town offering skiing in winter, hiking in summer, and fresh mountain air year-round at 1,700 meters elevation.',
            },
        ],
        readMore: 'Read More',
    },
    he: {
        hero: {
            title: 'גלו את גאורגיה',
            subtitle: 'מערים עתיקות ועד פסגות הרים, חקרו את היופי המגוון של גאורגיה',
        },
        destinations: [
            {
                slug: 'tbilisi',
                name: 'טביליסי',
                tagline: 'נשמת גאורגיה',
                description: 'בירה עתיקה שבה רחובות מרוצפים אבן פוגשים בתי קפה מודרניים, מרחצאות גופרית לוחשות היסטוריה, ומרפסות ארט נובו משקיפות על נהר מטקווארי.',
            },
            {
                slug: 'kazbegi',
                name: 'קזבגי',
                tagline: 'היכן ההרים נוגעים בשמיים',
                description: 'פסגות דרמטיות מוכתרות בכנסיית גרגטי טריניטי האיקונית בגובה 2,170 מטר, מוקפת בהרי הקווקז המלכותיים.',
            },
            {
                slug: 'gudauri',
                name: 'גודאורי',
                tagline: 'גן עדן הסקי של הקווקז',
                description: 'אתר סקי מוביל עם מדרונות בתוליים, נופים עוצרי נשימה ושלג אינסופי מדצמבר עד אפריל.',
            },
            {
                slug: 'batumi',
                name: 'באטומי',
                tagline: 'פנינת הים השחור',
                description: 'גן עדן סובטרופי שבו שדרות עם עצי דקל פוגשות אדריכלות מודרנית, קזינואים וחופים יפים לאורך חוף הים השחור.',
            },
            {
                slug: 'kakheti',
                name: 'קאחטי',
                tagline: 'מולדת היין',
                description: '8,000 שנות מסורת ייצור יין בכלי חימר קווברי, כרמים מתגלגלים ומרתפי יין מקסימים ברחבי אזור היין של גאורגיה.',
            },
            {
                slug: 'borjomi',
                name: 'בורג\'ומי',
                tagline: 'מים מרפאים',
                description: 'מעיינות מים מינרליים מפורסמים השוכנים ביערות בתוליים, עם פארקים היסטוריים ושער לפארק הלאומי בורג\'ומי-חראגאולי.',
            },
            {
                slug: 'mestia',
                name: 'מסטיה',
                tagline: 'שער לסוונטי',
                description: 'מגדלי אבן מימי הביניים מתנשאים מעל אחו אלפיניים באזור מורשת עולמית של אונסק"ו, ביתה של תרבות ומסורות סוואן עתיקות.',
            },
            {
                slug: 'bakuriani',
                name: 'באקוריאני',
                tagline: 'אתר נופש הררי כל השנה',
                description: 'עיירת נופש מקסימה המציעה סקי בחורף, טיולים בקיץ ואוויר הרים צח כל השנה בגובה 1,700 מטר.',
            },
        ],
        readMore: 'קרא עוד',
    },
    ru: {
        hero: {
            title: 'Откройте Грузию',
            subtitle: 'От древних городов до горных вершин, исследуйте разнообразную красоту Грузии',
        },
        destinations: [
            {
                slug: 'tbilisi',
                name: 'Тбилиси',
                tagline: 'Душа Грузии',
                description: 'Древняя столица, где мощёные улицы встречаются с современными кафе, серные бани хранят историю, а балконы в стиле модерн возвышаются над рекой Мтквари.',
            },
            {
                slug: 'kazbegi',
                name: 'Казбеги',
                tagline: 'Где горы касаются неба',
                description: 'Драматические вершины, увенчанные культовой церковью Гергети на высоте 2170 метров, в окружении величественных Кавказских гор.',
            },
            {
                slug: 'gudauri',
                name: 'Гудаури',
                tagline: 'Лыжный рай Кавказа',
                description: 'Первоклассный горнолыжный курорт с нетронутыми склонами, захватывающими видами и бесконечным снегом с декабря по апрель.',
            },
            {
                slug: 'batumi',
                name: 'Батуми',
                tagline: 'Жемчужина Чёрного моря',
                description: 'Субтропический рай, где пальмовые бульвары встречаются с современной архитектурой, казино и красивыми пляжами вдоль побережья Чёрного моря.',
            },
            {
                slug: 'kakheti',
                name: 'Кахетия',
                tagline: 'Родина вина',
                description: '8000 лет винодельческих традиций в глиняных сосудах квеври, холмистые виноградники и очаровательные винные погреба по всей винной стране Грузии.',
            },
            {
                slug: 'borjomi',
                name: 'Боржоми',
                tagline: 'Целебные воды',
                description: 'Знаменитые источники минеральной воды в нетронутых лесах, с историческими парками и воротами в национальный парк Боржоми-Харагаули.',
            },
            {
                slug: 'mestia',
                name: 'Местия',
                tagline: 'Ворота в Сванетию',
                description: 'Средневековые каменные башни возвышаются над альпийскими лугами в этом регионе всемирного наследия ЮНЕСКО, доме древней сванской культуры и традиций.',
            },
            {
                slug: 'bakuriani',
                name: 'Бакуриани',
                tagline: 'Круглогодичный горный курорт',
                description: 'Очаровательный курортный город, предлагающий катание на лыжах зимой, пешие прогулки летом и свежий горный воздух круглый год на высоте 1700 метров.',
            },
        ],
        readMore: 'Читать далее',
    },
};

// Unsplash images for each destination
const destinationImages = {
    tbilisi: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=800&q=80',
    kazbegi: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80',
    gudauri: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    batumi: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80',
    kakheti: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    borjomi: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?auto=format&fit=crop&w=800&q=80',
    mestia: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    bakuriani: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
};

// Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const stagger = {
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

// Luxury Elegant Style - Hero Section
function HeroSection({ t, isRTL }: any) {
    return (
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-ivory overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(184,146,58,0.1) 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }} />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    {/* Ornamental element */}
                    <motion.div
                        variants={fadeUp}
                        className="flex items-center justify-center gap-4 mb-8"
                    >
                        <div className="w-12 h-px bg-terracotta/40" />
                        <span className="text-terracotta text-xs tracking-[0.3em] uppercase font-medium">Destinations</span>
                        <div className="w-12 h-px bg-terracotta/40" />
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-espresso mb-6 leading-tight"
                    >
                        {t.hero.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="text-lg sm:text-xl text-umber/70 max-w-2xl mx-auto font-serif font-light italic leading-relaxed"
                    >
                        {t.hero.subtitle}
                    </motion.p>

                    {/* Ornamental divider */}
                    <motion.div
                        variants={fadeUp}
                        className="w-16 h-px bg-terracotta/30 mx-auto mt-10"
                    />
                </motion.div>
            </div>
        </section>
    );
}

// Luxury Elegant Style - Destination Card
function DestinationCard({ destination, image, readMore, index, isRTL }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={index}
        >
            <Link
                href={`/destinations/${destination.slug}`}
                className="group block relative overflow-hidden bg-cream shadow-sm hover:shadow-xl transition-all duration-500"
            >
                {/* Image with luxury filter */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-linen" />
                    <img
                        src={image}
                        alt={destination.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 luxury-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
                </div>

                {/* Content - Luxury Elegant styling */}
                <div className="relative p-6 md:p-8 bg-cream" dir={isRTL ? 'rtl' : 'ltr'}>
                    {/* Small ornamental line */}
                    <div className="w-8 h-px bg-terracotta/40 mb-4" />

                    <h3 className="font-display text-2xl md:text-3xl font-bold text-espresso mb-2 group-hover:text-terracotta transition-colors duration-300">
                        {destination.name}
                    </h3>
                    <p className="text-terracotta/80 text-sm font-serif italic mb-3">
                        {destination.tagline}
                    </p>
                    <p className="text-umber/60 text-sm leading-relaxed mb-5 line-clamp-3 font-light">
                        {destination.description}
                    </p>

                    {/* Elegant Read More Link */}
                    <div className="flex items-center gap-2 text-espresso text-sm font-medium elegant-link">
                        <span>{readMore}</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                        </svg>
                    </div>
                </div>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
        </motion.div>
    );
}

// Main Page Component
export default function DestinationsPage() {
    const [lang, setLang] = useState<'en' | 'he' | 'ru'>('en');
    const t = translations[lang];
    const isRTL = lang === 'he';

    // Load language preference
    useEffect(() => {
        const saved = localStorage.getItem('visitGeorgia_lang');
        if (saved && (saved === 'en' || saved === 'he' || saved === 'ru')) {
            setLang(saved);
        }
    }, []);

    useEffect(() => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }, [isRTL]);

    return (
        <main className="bg-ivory min-h-screen">
            {/* Navigation - will need theme-aware styling */}
            <Navigation lang={lang} setLang={setLang} />

            {/* Hero Section */}
            <HeroSection t={t} isRTL={isRTL} />

            {/* Destinations Grid - Luxury Elegant Style */}
            <section className="relative py-16 md:py-24 bg-ivory">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <p className="text-umber/50 text-sm font-serif italic">
                            Explore our curated collection of Georgia's finest destinations
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10"
                    >
                        {t.destinations.map((destination: any, index: number) => (
                            <DestinationCard
                                key={destination.slug}
                                destination={destination}
                                image={destinationImages[destination.slug as keyof typeof destinationImages]}
                                readMore={t.readMore}
                                index={index}
                                isRTL={isRTL}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section - Luxury style */}
            <section className="py-20 bg-espresso">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="font-display text-ivory text-3xl md:text-4xl font-bold mb-4">
                        Plan Your Journey
                    </h2>
                    <p className="text-ivory/60 text-lg font-serif italic mb-8">
                        Let us craft your perfect Georgian experience
                    </p>
                    <a
                        href="https://wa.me/+995514048822"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-terracotta text-ivory text-lg font-medium hover:bg-terracotta/90 transition-colors"
                    >
                        Contact Rati Tours
                    </a>
                </div>
            </section>

            {/* Footer */}
            <Footer lang={lang} />

            {/* Floating Components */}
            <FloatingWhatsApp />
            <BackToTop />
        </main>
    );
}
