'use client'

import { motion } from 'framer-motion'

interface PricingTableProps {
  lang: string
}

const pricingData = [
  { from: 'Tbilisi Airport', to: 'Tbilisi City', sedan: 25, minivan: 35, sprinter: 50, time: '25 min' },
  { from: 'Tbilisi', to: 'Gudauri', sedan: 85, minivan: 115, sprinter: 175, time: '2h' },
  { from: 'Tbilisi', to: 'Kazbegi', sedan: 95, minivan: 130, sprinter: 195, time: '2.5h' },
  { from: 'Tbilisi', to: 'Batumi', sedan: 180, minivan: 240, sprinter: 350, time: '5h' },
  { from: 'Tbilisi', to: 'Kutaisi', sedan: 120, minivan: 165, sprinter: 250, time: '3h' },
  { from: 'Tbilisi', to: 'Kakheti', sedan: 75, minivan: 105, sprinter: 160, time: '1.5h' },
  { from: 'Tbilisi', to: 'Borjomi', sedan: 100, minivan: 145, sprinter: 215, time: '2.5h' },
  { from: 'Tbilisi', to: 'Mestia', sedan: 250, minivan: 325, sprinter: 460, time: '8h' },
  { from: 'Gudauri', to: 'Kazbegi', sedan: 35, minivan: 50, sprinter: 75, time: '45 min' },
  { from: 'Batumi', to: 'Kutaisi', sedan: 100, minivan: 130, sprinter: 190, time: '2.5h' },
]

const content = {
  en: {
    title: 'All Routes & Prices',
    subtitle: 'Transparent pricing. No hidden fees.',
    route: 'Route',
    sedan: 'Sedan',
    sedanInfo: '1-3 pax',
    minivan: 'Minivan',
    minivanInfo: '4-6 pax',
    sprinter: 'Sprinter',
    sprinterInfo: '7-11 pax',
    time: 'Duration',
    note: 'Prices for Long Sprinter (12-16 pax) and Great Sprinter (16-20 pax) available on request.',
  },
  he: {
    title: 'כל המסלולים והמחירים',
    subtitle: 'תמחור שקוף. ללא עלויות נסתרות.',
    route: 'מסלול',
    sedan: 'סדאן',
    sedanInfo: '1-3 נוסעים',
    minivan: 'מיניוואן',
    minivanInfo: '4-6 נוסעים',
    sprinter: 'ספרינטר',
    sprinterInfo: '7-11 נוסעים',
    time: 'משך',
    note: 'מחירים לספרינטר ארוך (12-16) וספרינטר גדול (16-20) לפי בקשה.',
  },
  ru: {
    title: 'Все маршруты и цены',
    subtitle: 'Прозрачные цены. Без скрытых платежей.',
    route: 'Маршрут',
    sedan: 'Седан',
    sedanInfo: '1-3 чел',
    minivan: 'Минивэн',
    minivanInfo: '4-6 чел',
    sprinter: 'Спринтер',
    sprinterInfo: '7-11 чел',
    time: 'Время',
    note: 'Цены на Длинный Спринтер (12-16) и Большой Спринтер (16-20) по запросу.',
  }
}

export default function PricingTable({ lang }: PricingTableProps) {
  const t = content[lang as keyof typeof content] || content.en
  const isRTL = lang === 'he'

  return (
    <section className="py-20 bg-gradient-to-b from-ivory to-cream dark:from-[#0a0a0a] dark:to-stone-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-espresso dark:text-white text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300">
            {t.title}
          </h2>
          <p className="text-espresso/60 dark:text-white/60 text-lg transition-colors duration-300">{t.subtitle}</p>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="hidden md:block overflow-hidden rounded-2xl border border-espresso/10 dark:border-white/10 transition-colors duration-300"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-espresso/5 dark:bg-white/5 transition-colors duration-300">
                <th className="text-left text-espresso/70 dark:text-white/70 font-medium px-6 py-4 text-sm tracking-wide transition-colors duration-300">
                  {t.route}
                </th>
                <th className="text-center text-espresso/70 dark:text-white/70 font-medium px-4 py-4 text-sm tracking-wide transition-colors duration-300">
                  <div>{t.sedan}</div>
                  <div className="text-espresso/40 dark:text-white/40 text-xs font-normal transition-colors duration-300">{t.sedanInfo}</div>
                </th>
                <th className="text-center text-espresso/70 dark:text-white/70 font-medium px-4 py-4 text-sm tracking-wide transition-colors duration-300">
                  <div>{t.minivan}</div>
                  <div className="text-espresso/40 dark:text-white/40 text-xs font-normal transition-colors duration-300">{t.minivanInfo}</div>
                </th>
                <th className="text-center text-espresso/70 dark:text-white/70 font-medium px-4 py-4 text-sm tracking-wide transition-colors duration-300">
                  <div>{t.sprinter}</div>
                  <div className="text-espresso/40 dark:text-white/40 text-xs font-normal transition-colors duration-300">{t.sprinterInfo}</div>
                </th>
                <th className="text-center text-espresso/70 dark:text-white/70 font-medium px-4 py-4 text-sm tracking-wide transition-colors duration-300">
                  {t.time}
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((route, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-espresso/5 dark:border-white/5 hover:bg-espresso/5 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-espresso dark:text-white font-medium transition-colors duration-300">{route.from}</span>
                    <span className="text-espresso/40 dark:text-white/40 mx-2 transition-colors duration-300">→</span>
                    <span className="text-espresso dark:text-white font-medium transition-colors duration-300">{route.to}</span>
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="text-terracotta dark:text-amber-400 font-semibold transition-colors duration-300">€{route.sedan}</span>
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="text-terracotta dark:text-amber-400 font-semibold transition-colors duration-300">€{route.minivan}</span>
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="text-terracotta dark:text-amber-400 font-semibold transition-colors duration-300">€{route.sprinter}</span>
                  </td>
                  <td className="text-center px-4 py-4 text-espresso/60 dark:text-white/60 transition-colors duration-300">
                    {route.time}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {pricingData.map((route, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-cream/50 dark:bg-white/5 backdrop-blur-sm border border-espresso/10 dark:border-white/10 rounded-xl p-5 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-espresso dark:text-white font-medium transition-colors duration-300">{route.from}</span>
                  <span className="text-espresso/40 dark:text-white/40 mx-2 transition-colors duration-300">→</span>
                  <span className="text-espresso dark:text-white font-medium transition-colors duration-300">{route.to}</span>
                </div>
                <span className="text-espresso/50 dark:text-white/50 text-sm transition-colors duration-300">{route.time}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-espresso/5 dark:bg-white/5 rounded-lg transition-colors duration-300">
                  <p className="text-espresso/50 dark:text-white/50 text-xs mb-1 transition-colors duration-300">{t.sedan}</p>
                  <p className="text-terracotta dark:text-amber-400 font-semibold transition-colors duration-300">€{route.sedan}</p>
                </div>
                <div className="text-center p-2 bg-espresso/5 dark:bg-white/5 rounded-lg transition-colors duration-300">
                  <p className="text-espresso/50 dark:text-white/50 text-xs mb-1 transition-colors duration-300">{t.minivan}</p>
                  <p className="text-terracotta dark:text-amber-400 font-semibold transition-colors duration-300">€{route.minivan}</p>
                </div>
                <div className="text-center p-2 bg-espresso/5 dark:bg-white/5 rounded-lg transition-colors duration-300">
                  <p className="text-espresso/50 dark:text-white/50 text-xs mb-1 transition-colors duration-300">{t.sprinter}</p>
                  <p className="text-terracotta dark:text-amber-400 font-semibold transition-colors duration-300">€{route.sprinter}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-espresso/40 dark:text-white/40 text-sm text-center mt-8 transition-colors duration-300"
        >
          {t.note}
        </motion.p>
      </div>
    </section>
  )
}