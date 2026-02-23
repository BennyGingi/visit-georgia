'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import TransferHero from '@/components/TransferHero'
import RouteCalculator from '@/components/RouteCalculator'
import PricingTable from '@/components/PricingTable'
import ThemeToggle from '@/components/ThemeToggle'
import { LogoIcon } from '@/components/Logo'

// ============================================
// CONTENT
// ============================================
const content = {
  en: {
    whyTitle: 'Why choose Rati Tours?',
    whyItems: [
      { icon: '🚗', title: 'Modern Fleet', desc: 'Clean, air-conditioned vehicles for every group size' },
      { icon: '👨‍✈️', title: 'Professional Drivers', desc: 'English-speaking, experienced, and friendly' },
      { icon: '✈️', title: 'Flight Tracking', desc: 'We monitor your flight – no stress if delayed' },
      { icon: '💳', title: 'Easy Payment', desc: 'Cash, card, or bank transfer' },
      { icon: '🍼', title: 'Family Friendly', desc: 'Child seats available on request' },
      { icon: '📞', title: '24/7 Support', desc: "We're always just a WhatsApp away" },
    ],
    ctaTitle: 'Ready to book?',
    ctaSub: "Send us a message and we'll confirm your transfer within minutes.",
    ctaBtn: 'Contact via WhatsApp',
    backHome: '← Back to Visit Georgia',
  },
  he: {
    whyTitle: 'למה לבחור ב-Rati Tours?',
    whyItems: [
      { icon: '🚗', title: 'צי מודרני', desc: 'רכבים נקיים וממוזגים לכל גודל קבוצה' },
      { icon: '👨‍✈️', title: 'נהגים מקצועיים', desc: 'דוברי אנגלית, מנוסים וידידותיים' },
      { icon: '✈️', title: 'מעקב טיסות', desc: 'אנחנו עוקבים אחרי הטיסה שלך – בלי לחץ אם יש עיכוב' },
      { icon: '💳', title: 'תשלום קל', desc: 'מזומן, כרטיס, או העברה בנקאית' },
      { icon: '🍼', title: 'מתאים למשפחות', desc: 'מושבי ילדים זמינים לפי בקשה' },
      { icon: '📞', title: 'תמיכה 24/7', desc: 'אנחנו תמיד במרחק וואטסאפ' },
    ],
    ctaTitle: 'מוכנים להזמין?',
    ctaSub: 'שלחו לנו הודעה ונאשר את ההסעה תוך דקות.',
    ctaBtn: 'צור קשר בוואטסאפ',
    backHome: '→ חזרה ל-Visit Georgia',
  },
  ru: {
    whyTitle: 'Почему Rati Tours?',
    whyItems: [
      { icon: '🚗', title: 'Современный автопарк', desc: 'Чистые автомобили с кондиционером для любой группы' },
      { icon: '👨‍✈️', title: 'Профессиональные водители', desc: 'Говорят по-английски, опытные и дружелюбные' },
      { icon: '✈️', title: 'Отслеживание рейса', desc: 'Мы следим за вашим рейсом – никакого стресса при задержке' },
      { icon: '💳', title: 'Удобная оплата', desc: 'Наличные, карта или банковский перевод' },
      { icon: '🍼', title: 'Для семей', desc: 'Детские кресла по запросу' },
      { icon: '📞', title: 'Поддержка 24/7', desc: 'Мы всегда на связи в WhatsApp' },
    ],
    ctaTitle: 'Готовы забронировать?',
    ctaSub: 'Напишите нам, и мы подтвердим трансфер в течение нескольких минут.',
    ctaBtn: 'Написать в WhatsApp',
    backHome: '← Вернуться на Visit Georgia',
  }
}

// ============================================
// COMPONENTS
// ============================================

// Adventure Bold Style - Language Switcher
function LanguageSwitcher({ lang, setLang }: { lang: string, setLang: (l: string) => void }) {
  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'עב' },
    { code: 'ru', label: 'RU' },
  ]

  return (
    <div className="flex gap-1 bg-ivory/50 dark:bg-black/50 backdrop-blur-md p-1 border border-espresso/10 dark:border-white/10 transition-colors duration-300">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-3 py-1.5 text-xs font-bold tracking-wider transition-all duration-200 ${
            lang === l.code
              ? 'bg-terracotta dark:bg-gold-400 text-white dark:text-black'
              : 'text-espresso/60 dark:text-white/60 hover:text-terracotta dark:hover:text-gold-400'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

// Adventure Bold Style - Navigation
function Navigation({ lang, setLang }: { lang: string, setLang: (l: string) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/80 dark:bg-black/80 backdrop-blur-lg border-b border-espresso/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gold-aged blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <LogoIcon size={40} color="#c9a84c" className="relative transition-transform duration-300 group-hover:scale-105" />
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

        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <div className="w-px h-6 bg-espresso/20 dark:bg-white/20 transition-colors duration-300" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

// Adventure Bold Style - Why Section
function WhySection({ lang }: { lang: string }) {
  const t = content[lang as keyof typeof content] || content.en
  const isRTL = lang === 'he'

  return (
    <section className="py-24 bg-cream dark:bg-black relative overflow-hidden transition-colors duration-500">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-terracotta/30 dark:via-gold-400/30 to-transparent transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(150,114,89,0.08)_0%,_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.08)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-terracotta dark:text-gold-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block transition-colors duration-300">
            Why Us
          </span>
          <h2 className="font-display text-espresso dark:text-white text-4xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300">
            {t.whyTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.whyItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-espresso/[0.03] dark:bg-white/[0.03] border border-espresso/10 dark:border-white/10 p-6 hover:border-terracotta/50 dark:hover:border-gold-400/50 hover:bg-espresso/[0.06] dark:hover:bg-white/[0.06] transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-terracotta/0 dark:bg-gold-400/0 group-hover:bg-terracotta/5 dark:group-hover:bg-gold-400/5 transition-colors duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-terracotta/10 dark:bg-gold-400/10 border border-terracotta/20 dark:border-gold-400/20 flex items-center justify-center mb-4 group-hover:border-terracotta/50 dark:group-hover:border-gold-400/50 transition-colors">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-espresso dark:text-white text-lg font-bold mb-2 group-hover:text-terracotta dark:group-hover:text-gold-400 transition-colors">{item.title}</h3>
                <p className="text-espresso/50 dark:text-white/50 text-sm leading-relaxed transition-colors duration-300">{item.desc}</p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-terracotta/0 dark:border-gold-400/0 group-hover:border-terracotta/40 dark:group-hover:border-gold-400/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Adventure Bold Style - CTA Section
function CTASection({ lang }: { lang: string }) {
  const t = content[lang as keyof typeof content] || content.en
  const isRTL = lang === 'he'

  return (
    <section className="py-24 bg-ivory dark:bg-black relative overflow-hidden transition-colors duration-500">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.1)_0%,_transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <h2 className="font-display text-espresso dark:text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-300">
          {t.ctaTitle}
        </h2>
        <p className="text-espresso/50 dark:text-white/50 text-xl mb-10 transition-colors duration-300">{t.ctaSub}</p>

        <motion.a
          href="https://wa.me/+995514048822"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-green-500 text-white text-lg font-bold tracking-wide shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] hover:bg-green-400 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t.ctaBtn}
        </motion.a>
      </motion.div>
    </section>
  )
}

// Adventure Bold Style - Footer
function Footer({ lang }: { lang: string }) {
  const t = content[lang as keyof typeof content] || content.en

  return (
    <footer className="py-12 bg-cream dark:bg-black border-t border-terracotta/10 dark:border-gold-400/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="text-espresso/50 dark:text-white/50 hover:text-terracotta dark:hover:text-gold-400 transition-colors text-sm font-medium tracking-wide"
          >
            {t.backHome}
          </Link>

          <p className="text-espresso/30 dark:text-white/30 text-sm transition-colors duration-300">
            © 2025 Rati Tours. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export default function TransfersPage() {
  const [lang, setLang] = useState('en')

  // Load saved language
  useEffect(() => {
    const saved = localStorage.getItem('visitGeorgia_lang')
    if (saved) setLang(saved)
  }, [])

  // Save language
  useEffect(() => {
    localStorage.setItem('visitGeorgia_lang', lang)
  }, [lang])

  return (
    <main className="bg-ivory dark:bg-black min-h-screen transition-colors duration-500">
      <Navigation lang={lang} setLang={setLang} />
      <TransferHero lang={lang} />
      <RouteCalculator lang={lang} />
      <WhySection lang={lang} />
      <PricingTable lang={lang} />
      <CTASection lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}