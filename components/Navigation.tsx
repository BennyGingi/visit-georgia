'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { LogoIcon } from './Logo';

interface NavigationProps {
    lang: 'en' | 'he' | 'ru';
    setLang: (lang: 'en' | 'he' | 'ru') => void;
}

const translations = {
    en: {
        home: 'Home',
        transfers: 'Transfers',
        tours: 'Tours',
        destinations: 'Destinations',
    },
    he: {
        home: 'בית',
        transfers: 'העברות',
        tours: 'סיורים',
        destinations: 'יעדים',
    },
    ru: {
        home: 'Главная',
        transfers: 'Трансферы',
        tours: 'Туры',
        destinations: 'Направления',
    },
};

export default function Navigation({ lang, setLang }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = translations[lang];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Update HTML dir attribute for RTL support
        document.documentElement.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
    }, [lang]);

    useEffect(() => {
        // Prevent body scroll when mobile menu is open
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { href: '/', label: t.home },
        { href: '/transfers', label: t.transfers },
        { href: '/tours', label: t.tours },
        { href: '/destinations', label: t.destinations },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-ivory/80 dark:bg-black/80 backdrop-blur-md border-b border-espresso/10 dark:border-white/10'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-full bg-gold-aged blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                                <LogoIcon
                                    size={40}
                                    color="#c9a84c"
                                    className="relative transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-espresso dark:text-white tracking-widest transition-colors duration-300">
                                    RATI
                                </span>
                                <span className="text-xs font-semibold text-terracotta dark:text-gold-aged tracking-[0.2em] -mt-1 transition-colors duration-300">
                                    TOURS
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                                            ? 'text-terracotta dark:text-amber-400'
                                            : 'text-espresso/70 dark:text-white/70 hover:text-espresso dark:hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Language Switcher & Theme Toggle */}
                        <div className="hidden md:flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {(['en', 'he', 'ru'] as const).map((language) => (
                                    <button
                                        key={language}
                                        onClick={() => setLang(language)}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${lang === language
                                                ? 'bg-terracotta dark:bg-amber-400 text-white dark:text-black'
                                                : 'text-espresso/70 dark:text-white/70 hover:text-espresso dark:hover:text-white hover:bg-espresso/10 dark:hover:bg-white/10'
                                            }`}
                                    >
                                        {language === 'en' ? 'EN' : language === 'he' ? 'עב' : 'RU'}
                                    </button>
                                ))}
                            </div>
                            <div className="w-px h-6 bg-espresso/20 dark:bg-white/20 transition-colors duration-300" />
                            <ThemeToggle />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-espresso/70 dark:text-white/70 hover:text-espresso dark:hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-ivory dark:bg-black transition-all duration-300 md:hidden ${isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
                    {/* Mobile Navigation Links */}
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-4xl font-bold transition-all duration-300 ${isActive(link.href)
                                    ? 'text-terracotta dark:text-amber-400'
                                    : 'text-espresso/70 dark:text-white/70 hover:text-espresso dark:hover:text-white'
                                }`}
                            style={{
                                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                opacity: isMobileMenuOpen ? 1 : 0,
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Mobile Language Switcher */}
                    <div
                        className="flex items-center gap-4 mt-8"
                        style={{
                            transitionDelay: isMobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms',
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transition: 'all 300ms',
                        }}
                    >
                        {(['en', 'he', 'ru'] as const).map((language) => (
                            <button
                                key={language}
                                onClick={() => {
                                    setLang(language);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`px-6 py-3 text-lg font-medium rounded-md transition-all duration-200 ${lang === language
                                        ? 'bg-terracotta dark:bg-amber-400 text-white dark:text-black'
                                        : 'text-espresso/70 dark:text-white/70 hover:text-espresso dark:hover:text-white hover:bg-espresso/10 dark:hover:bg-white/10'
                                    }`}
                            >
                                {language === 'en' ? 'EN' : language === 'he' ? 'עב' : 'RU'}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Theme Toggle */}
                    <div
                        className="mt-6"
                        style={{
                            transitionDelay: isMobileMenuOpen ? `${(navLinks.length + 1) * 50}ms` : '0ms',
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transition: 'all 300ms',
                        }}
                    >
                        <ThemeToggle className="w-12 h-12" />
                    </div>
                </div>
            </div>
        </>
    );
}
