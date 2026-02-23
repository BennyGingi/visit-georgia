'use client'

import { motion } from 'framer-motion'
import { Currency, CURRENCY_SYMBOLS } from '@/lib/currency'

interface CurrencyToggleProps {
  currency: Currency
  onChange: (currency: Currency) => void
  className?: string
}

const currencies: Currency[] = ['EUR', 'GEL', 'USD']

export default function CurrencyToggle({ currency, onChange, className = '' }: CurrencyToggleProps) {
  return (
    <div className={`flex gap-1 bg-espresso/5 dark:bg-white/5 backdrop-blur-sm p-1 rounded-xl border border-espresso/10 dark:border-white/10 transition-colors duration-300 ${className}`}>
      {currencies.map((curr) => (
        <motion.button
          key={curr}
          onClick={() => onChange(curr)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            currency === curr
              ? 'bg-terracotta dark:bg-gold-400 text-white dark:text-black shadow-sm'
              : 'text-espresso/60 dark:text-white/60 hover:text-espresso dark:hover:text-white hover:bg-espresso/5 dark:hover:bg-white/5'
          }`}
        >
          {CURRENCY_SYMBOLS[curr]} {curr}
        </motion.button>
      ))}
    </div>
  )
}
