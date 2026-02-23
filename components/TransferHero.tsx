'use client'

import { motion } from 'framer-motion'

interface TransferHeroProps {
  lang: string
}

const content = {
  en: {
    pre: 'Rati Tours',
    title: 'Travel with ease',
    sub: 'Private transfers across Georgia. From airport arrivals to mountain escapes.',
    stats: [
      { value: '10+', label: 'Destinations' },
      { value: '24/7', label: 'Support' },
      { value: '5★', label: 'Rated' },
    ],
  },
  he: {
    pre: 'Rati Tours',
    title: 'נסעו בנוחות',
    sub: 'הסעות פרטיות ברחבי גאורגיה. מנחיתות בשדה התעופה ועד מילוט להרים.',
    stats: [
      { value: '10+', label: 'יעדים' },
      { value: '24/7', label: 'תמיכה' },
      { value: '5★', label: 'דירוג' },
    ],
  },
  ru: {
    pre: 'Rati Tours',
    title: 'Путешествуйте легко',
    sub: 'Частные трансферы по Грузии. От прибытия в аэропорт до горных приключений.',
    stats: [
      { value: '10+', label: 'Направлений' },
      { value: '24/7', label: 'Поддержка' },
      { value: '5★', label: 'Рейтинг' },
    ],
  }
}

export default function TransferHero({ lang }: TransferHeroProps) {
  const t = content[lang as keyof typeof content] || content.en
  const isRTL = lang === 'he'

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image - Adventure Bold Style */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-ivory dark:bg-black transition-colors duration-500" />
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
          alt="Road through Georgia"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/50 to-ivory dark:from-black/70 dark:via-black/50 dark:to-black transition-colors duration-500" />
        {/* Gold accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-terracotta/10 dark:from-gold-400/10 via-transparent to-transparent transition-colors duration-500" />
      </motion.div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block bg-terracotta dark:bg-gold-400 text-white dark:text-black text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 mb-6 transition-colors duration-300"
        >
          {t.pre}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-espresso dark:text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 transition-colors duration-300"
          style={{ textShadow: '0 0 60px rgba(251, 191, 36, 0.3)' }}
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-espresso/60 dark:text-white/60 text-lg md:text-xl max-w-2xl mb-10 transition-colors duration-300"
        >
          {t.sub}
        </motion.p>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex gap-8 md:gap-12"
        >
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-terracotta dark:text-gold-400 text-3xl md:text-4xl font-bold transition-colors duration-300">{stat.value}</div>
              <div className="text-espresso/40 dark:text-white/40 text-xs uppercase tracking-wider mt-1 transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-terracotta/50 dark:via-gold-400/50 to-transparent transition-colors duration-500" />
    </section>
  )
}