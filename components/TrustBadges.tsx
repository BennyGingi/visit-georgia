'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface TrustBadgesProps {
    lang: 'en' | 'he' | 'ru';
}

const translations = {
    en: {
        badges: [
            { icon: 'users', text: '500+ Happy Travelers' },
            { icon: 'star', text: '5.0 ★ Rating' },
            { icon: 'clock', text: '24/7 Support' },
            { icon: 'shield', text: 'Best Price Guarantee' },
        ],
    },
    he: {
        badges: [
            { icon: 'users', text: '500+ נוסעים מרוצים' },
            { icon: 'star', text: 'דירוג 5.0 ★' },
            { icon: 'clock', text: 'תמיכה 24/7' },
            { icon: 'shield', text: 'הבטחת מחיר הטוב ביותר' },
        ],
    },
    ru: {
        badges: [
            { icon: 'users', text: '500+ Довольных туристов' },
            { icon: 'star', text: 'Рейтинг 5.0 ★' },
            { icon: 'clock', text: 'Поддержка 24/7' },
            { icon: 'shield', text: 'Гарантия лучшей цены' },
        ],
    },
};

const icons = {
    users: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
    ),
    star: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    ),
    clock: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
    ),
    shield: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ),
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

const stagger = {
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

export default function TrustBadges({ lang }: TrustBadgesProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const t = translations[lang];
    const isRTL = lang === 'he';

    return (
        <section ref={ref} className="relative py-12 bg-cream dark:bg-black transition-colors duration-500" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={stagger}
                    className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
                >
                    {t.badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            className="flex items-center gap-2 px-4 py-2 bg-espresso/5 dark:bg-white/5 border border-espresso/10 dark:border-white/10 rounded-full backdrop-blur-sm transition-colors duration-300"
                        >
                            <span className="text-terracotta dark:text-amber-400 transition-colors duration-300">
                                {icons[badge.icon as keyof typeof icons]}
                            </span>
                            <span className="text-espresso/80 dark:text-white/80 text-sm font-medium whitespace-nowrap transition-colors duration-300">
                                {badge.text}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
