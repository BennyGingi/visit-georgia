'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CurrencyToggle from './CurrencyToggle'
import { Currency, convertPrice, formatPrice, getSavedCurrency, saveCurrency } from '@/lib/currency'

interface RouteCalculatorProps {
  lang: string
}

// English location names for WhatsApp (always English)
const locationNamesEN: Record<string, string> = {
  'tbilisi-airport': 'Tbilisi Airport',
  'tbilisi-city': 'Tbilisi City',
  'gudauri': 'Gudauri',
  'kazbegi': 'Kazbegi',
  'batumi': 'Batumi',
  'kutaisi': 'Kutaisi',
  'kakheti': 'Kakheti / Sighnaghi',
  'borjomi': 'Borjomi',
  'mestia': 'Mestia',
  'bakuriani': 'Bakuriani',
}

// Pricing data - ALL routes
const routes: Record<string, Record<string, { sedan: number; minivan: number; sprinter: number; longSprinter: number; greatSprinter: number; time: string; distance: string }>> = {
  'tbilisi-airport': {
    'tbilisi-city': { sedan: 25, minivan: 35, sprinter: 50, longSprinter: 70, greatSprinter: 100, time: '30 min', distance: '30 km' },
    'gudauri': { sedan: 85, minivan: 115, sprinter: 175, longSprinter: 225, greatSprinter: 360, time: '2h 15min', distance: '130 km' },
    'kazbegi': { sedan: 95, minivan: 130, sprinter: 195, longSprinter: 250, greatSprinter: 400, time: '3h', distance: '165 km' },
    'batumi': { sedan: 180, minivan: 250, sprinter: 360, longSprinter: 450, greatSprinter: 560, time: '5h 30min', distance: '400 km' },
    'kutaisi': { sedan: 120, minivan: 165, sprinter: 250, longSprinter: 330, greatSprinter: 500, time: '3h 15min', distance: '245 km' },
    'kakheti': { sedan: 75, minivan: 105, sprinter: 160, longSprinter: 205, greatSprinter: 320, time: '1h 45min', distance: '120 km' },
    'borjomi': { sedan: 100, minivan: 145, sprinter: 215, longSprinter: 280, greatSprinter: 440, time: '2h 45min', distance: '175 km' },
    'mestia': { sedan: 250, minivan: 325, sprinter: 460, longSprinter: 600, greatSprinter: 850, time: '8h 30min', distance: '480 km' },
    'bakuriani': { sedan: 110, minivan: 135, sprinter: 200, longSprinter: 250, greatSprinter: 350, time: '3h', distance: '155 km' },
  },
  'tbilisi-city': {
    'tbilisi-airport': { sedan: 25, minivan: 35, sprinter: 50, longSprinter: 70, greatSprinter: 100, time: '30 min', distance: '30 km' },
    'gudauri': { sedan: 85, minivan: 115, sprinter: 175, longSprinter: 225, greatSprinter: 360, time: '2h', distance: '125 km' },
    'kazbegi': { sedan: 95, minivan: 130, sprinter: 195, longSprinter: 250, greatSprinter: 400, time: '2h 45min', distance: '160 km' },
    'batumi': { sedan: 180, minivan: 250, sprinter: 360, longSprinter: 450, greatSprinter: 560, time: '5h 15min', distance: '385 km' },
    'kutaisi': { sedan: 120, minivan: 165, sprinter: 250, longSprinter: 330, greatSprinter: 500, time: '3h', distance: '235 km' },
    'kakheti': { sedan: 75, minivan: 105, sprinter: 160, longSprinter: 205, greatSprinter: 320, time: '1h 30min', distance: '110 km' },
    'borjomi': { sedan: 100, minivan: 145, sprinter: 215, longSprinter: 280, greatSprinter: 440, time: '2h 30min', distance: '165 km' },
    'mestia': { sedan: 250, minivan: 325, sprinter: 460, longSprinter: 600, greatSprinter: 850, time: '8h', distance: '465 km' },
    'bakuriani': { sedan: 110, minivan: 135, sprinter: 200, longSprinter: 250, greatSprinter: 350, time: '2h 45min', distance: '145 km' },
  },
  'gudauri': {
    'tbilisi-airport': { sedan: 85, minivan: 115, sprinter: 175, longSprinter: 225, greatSprinter: 360, time: '2h 15min', distance: '130 km' },
    'tbilisi-city': { sedan: 85, minivan: 115, sprinter: 175, longSprinter: 225, greatSprinter: 360, time: '2h', distance: '125 km' },
    'kazbegi': { sedan: 35, minivan: 50, sprinter: 75, longSprinter: 100, greatSprinter: 150, time: '50 min', distance: '40 km' },
    'batumi': { sedan: 220, minivan: 290, sprinter: 420, longSprinter: 530, greatSprinter: 700, time: '6h 30min', distance: '480 km' },
    'kutaisi': { sedan: 150, minivan: 200, sprinter: 300, longSprinter: 380, greatSprinter: 550, time: '4h 30min', distance: '340 km' },
    'kakheti': { sedan: 120, minivan: 160, sprinter: 240, longSprinter: 310, greatSprinter: 450, time: '3h 30min', distance: '220 km' },
    'borjomi': { sedan: 140, minivan: 185, sprinter: 280, longSprinter: 360, greatSprinter: 520, time: '4h', distance: '280 km' },
    'mestia': { sedan: 280, minivan: 365, sprinter: 520, longSprinter: 670, greatSprinter: 950, time: '9h', distance: '560 km' },
    'bakuriani': { sedan: 130, minivan: 175, sprinter: 260, longSprinter: 340, greatSprinter: 480, time: '4h', distance: '260 km' },
  },
  'kazbegi': {
    'tbilisi-airport': { sedan: 95, minivan: 130, sprinter: 195, longSprinter: 250, greatSprinter: 400, time: '3h', distance: '165 km' },
    'tbilisi-city': { sedan: 95, minivan: 130, sprinter: 195, longSprinter: 250, greatSprinter: 400, time: '2h 45min', distance: '160 km' },
    'gudauri': { sedan: 35, minivan: 50, sprinter: 75, longSprinter: 100, greatSprinter: 150, time: '50 min', distance: '40 km' },
    'batumi': { sedan: 240, minivan: 315, sprinter: 450, longSprinter: 570, greatSprinter: 750, time: '7h', distance: '520 km' },
    'kutaisi': { sedan: 165, minivan: 220, sprinter: 330, longSprinter: 420, greatSprinter: 600, time: '5h', distance: '380 km' },
    'kakheti': { sedan: 130, minivan: 175, sprinter: 260, longSprinter: 340, greatSprinter: 480, time: '4h', distance: '260 km' },
    'borjomi': { sedan: 155, minivan: 205, sprinter: 310, longSprinter: 400, greatSprinter: 570, time: '4h 30min', distance: '320 km' },
    'mestia': { sedan: 300, minivan: 390, sprinter: 560, longSprinter: 720, greatSprinter: 1000, time: '9h 30min', distance: '600 km' },
    'bakuriani': { sedan: 145, minivan: 195, sprinter: 290, longSprinter: 380, greatSprinter: 530, time: '4h 30min', distance: '300 km' },
  },
  'batumi': {
    'tbilisi-airport': { sedan: 180, minivan: 250, sprinter: 360, longSprinter: 450, greatSprinter: 560, time: '5h 30min', distance: '400 km' },
    'tbilisi-city': { sedan: 180, minivan: 250, sprinter: 360, longSprinter: 450, greatSprinter: 560, time: '5h 15min', distance: '385 km' },
    'gudauri': { sedan: 220, minivan: 290, sprinter: 420, longSprinter: 530, greatSprinter: 700, time: '6h 30min', distance: '480 km' },
    'kazbegi': { sedan: 240, minivan: 315, sprinter: 450, longSprinter: 570, greatSprinter: 750, time: '7h', distance: '520 km' },
    'kutaisi': { sedan: 100, minivan: 130, sprinter: 190, longSprinter: 250, greatSprinter: 380, time: '2h 45min', distance: '165 km' },
    'kakheti': { sedan: 220, minivan: 290, sprinter: 420, longSprinter: 530, greatSprinter: 700, time: '6h 30min', distance: '480 km' },
    'borjomi': { sedan: 140, minivan: 185, sprinter: 280, longSprinter: 360, greatSprinter: 520, time: '3h 45min', distance: '250 km' },
    'mestia': { sedan: 160, minivan: 210, sprinter: 320, longSprinter: 410, greatSprinter: 580, time: '5h', distance: '290 km' },
    'bakuriani': { sedan: 150, minivan: 200, sprinter: 300, longSprinter: 385, greatSprinter: 550, time: '4h', distance: '270 km' },
  },
  'kutaisi': {
    'tbilisi-airport': { sedan: 120, minivan: 165, sprinter: 250, longSprinter: 330, greatSprinter: 500, time: '3h 15min', distance: '245 km' },
    'tbilisi-city': { sedan: 120, minivan: 165, sprinter: 250, longSprinter: 330, greatSprinter: 500, time: '3h', distance: '235 km' },
    'gudauri': { sedan: 150, minivan: 200, sprinter: 300, longSprinter: 380, greatSprinter: 550, time: '4h 30min', distance: '340 km' },
    'kazbegi': { sedan: 165, minivan: 220, sprinter: 330, longSprinter: 420, greatSprinter: 600, time: '5h', distance: '380 km' },
    'batumi': { sedan: 100, minivan: 130, sprinter: 190, longSprinter: 250, greatSprinter: 380, time: '2h 45min', distance: '165 km' },
    'kakheti': { sedan: 160, minivan: 215, sprinter: 320, longSprinter: 410, greatSprinter: 590, time: '4h 30min', distance: '330 km' },
    'borjomi': { sedan: 80, minivan: 110, sprinter: 165, longSprinter: 215, greatSprinter: 320, time: '2h', distance: '120 km' },
    'mestia': { sedan: 110, minivan: 145, sprinter: 220, longSprinter: 285, greatSprinter: 420, time: '3h 30min', distance: '140 km' },
    'bakuriani': { sedan: 90, minivan: 120, sprinter: 180, longSprinter: 235, greatSprinter: 350, time: '2h 15min', distance: '135 km' },
  },
  'kakheti': {
    'tbilisi-airport': { sedan: 75, minivan: 105, sprinter: 160, longSprinter: 205, greatSprinter: 320, time: '1h 45min', distance: '120 km' },
    'tbilisi-city': { sedan: 75, minivan: 105, sprinter: 160, longSprinter: 205, greatSprinter: 320, time: '1h 30min', distance: '110 km' },
    'gudauri': { sedan: 120, minivan: 160, sprinter: 240, longSprinter: 310, greatSprinter: 450, time: '3h 30min', distance: '220 km' },
    'kazbegi': { sedan: 130, minivan: 175, sprinter: 260, longSprinter: 340, greatSprinter: 480, time: '4h', distance: '260 km' },
    'batumi': { sedan: 220, minivan: 290, sprinter: 420, longSprinter: 530, greatSprinter: 700, time: '6h 30min', distance: '480 km' },
    'kutaisi': { sedan: 160, minivan: 215, sprinter: 320, longSprinter: 410, greatSprinter: 590, time: '4h 30min', distance: '330 km' },
    'borjomi': { sedan: 130, minivan: 175, sprinter: 260, longSprinter: 340, greatSprinter: 480, time: '3h 30min', distance: '250 km' },
    'mestia': { sedan: 290, minivan: 380, sprinter: 540, longSprinter: 700, greatSprinter: 980, time: '9h', distance: '560 km' },
    'bakuriani': { sedan: 140, minivan: 185, sprinter: 280, longSprinter: 360, greatSprinter: 520, time: '4h', distance: '270 km' },
  },
  'borjomi': {
    'tbilisi-airport': { sedan: 100, minivan: 145, sprinter: 215, longSprinter: 280, greatSprinter: 440, time: '2h 45min', distance: '175 km' },
    'tbilisi-city': { sedan: 100, minivan: 145, sprinter: 215, longSprinter: 280, greatSprinter: 440, time: '2h 30min', distance: '165 km' },
    'gudauri': { sedan: 140, minivan: 185, sprinter: 280, longSprinter: 360, greatSprinter: 520, time: '4h', distance: '280 km' },
    'kazbegi': { sedan: 155, minivan: 205, sprinter: 310, longSprinter: 400, greatSprinter: 570, time: '4h 30min', distance: '320 km' },
    'batumi': { sedan: 140, minivan: 185, sprinter: 280, longSprinter: 360, greatSprinter: 520, time: '3h 45min', distance: '250 km' },
    'kutaisi': { sedan: 80, minivan: 110, sprinter: 165, longSprinter: 215, greatSprinter: 320, time: '2h', distance: '120 km' },
    'kakheti': { sedan: 130, minivan: 175, sprinter: 260, longSprinter: 340, greatSprinter: 480, time: '3h 30min', distance: '250 km' },
    'mestia': { sedan: 200, minivan: 260, sprinter: 380, longSprinter: 490, greatSprinter: 700, time: '6h 30min', distance: '370 km' },
    'bakuriani': { sedan: 30, minivan: 45, sprinter: 65, longSprinter: 85, greatSprinter: 130, time: '35 min', distance: '35 km' },
  },
  'mestia': {
    'tbilisi-airport': { sedan: 250, minivan: 325, sprinter: 460, longSprinter: 600, greatSprinter: 850, time: '8h 30min', distance: '480 km' },
    'tbilisi-city': { sedan: 250, minivan: 325, sprinter: 460, longSprinter: 600, greatSprinter: 850, time: '8h', distance: '465 km' },
    'gudauri': { sedan: 280, minivan: 365, sprinter: 520, longSprinter: 670, greatSprinter: 950, time: '9h', distance: '560 km' },
    'kazbegi': { sedan: 300, minivan: 390, sprinter: 560, longSprinter: 720, greatSprinter: 1000, time: '9h 30min', distance: '600 km' },
    'batumi': { sedan: 160, minivan: 210, sprinter: 320, longSprinter: 410, greatSprinter: 580, time: '5h', distance: '290 km' },
    'kutaisi': { sedan: 110, minivan: 145, sprinter: 220, longSprinter: 285, greatSprinter: 420, time: '3h 30min', distance: '140 km' },
    'kakheti': { sedan: 290, minivan: 380, sprinter: 540, longSprinter: 700, greatSprinter: 980, time: '9h', distance: '560 km' },
    'borjomi': { sedan: 200, minivan: 260, sprinter: 380, longSprinter: 490, greatSprinter: 700, time: '6h 30min', distance: '370 km' },
    'bakuriani': { sedan: 190, minivan: 250, sprinter: 360, longSprinter: 465, greatSprinter: 670, time: '6h', distance: '350 km' },
  },
  'bakuriani': {
    'tbilisi-airport': { sedan: 110, minivan: 135, sprinter: 200, longSprinter: 250, greatSprinter: 350, time: '3h', distance: '155 km' },
    'tbilisi-city': { sedan: 110, minivan: 135, sprinter: 200, longSprinter: 250, greatSprinter: 350, time: '2h 45min', distance: '145 km' },
    'gudauri': { sedan: 130, minivan: 175, sprinter: 260, longSprinter: 340, greatSprinter: 480, time: '4h', distance: '260 km' },
    'kazbegi': { sedan: 145, minivan: 195, sprinter: 290, longSprinter: 380, greatSprinter: 530, time: '4h 30min', distance: '300 km' },
    'batumi': { sedan: 150, minivan: 200, sprinter: 300, longSprinter: 385, greatSprinter: 550, time: '4h', distance: '270 km' },
    'kutaisi': { sedan: 90, minivan: 120, sprinter: 180, longSprinter: 235, greatSprinter: 350, time: '2h 15min', distance: '135 km' },
    'kakheti': { sedan: 140, minivan: 185, sprinter: 280, longSprinter: 360, greatSprinter: 520, time: '4h', distance: '270 km' },
    'borjomi': { sedan: 30, minivan: 45, sprinter: 65, longSprinter: 85, greatSprinter: 130, time: '35 min', distance: '35 km' },
    'mestia': { sedan: 190, minivan: 250, sprinter: 360, longSprinter: 465, greatSprinter: 670, time: '6h', distance: '350 km' },
  },
}

const content = {
  en: {
    title: 'Calculate Your Transfer',
    from: 'From',
    to: 'To',
    vehicle: 'Vehicle',
    passengers: 'passengers',
    price: 'Price',
    duration: 'Duration',
    distance: 'Distance',
    book: 'Book via WhatsApp',
    select: 'Select location',
    locations: {
      'tbilisi-airport': 'Tbilisi Airport',
      'tbilisi-city': 'Tbilisi City',
      'gudauri': 'Gudauri',
      'kazbegi': 'Kazbegi',
      'batumi': 'Batumi',
      'kutaisi': 'Kutaisi',
      'kakheti': 'Kakheti / Sighnaghi',
      'borjomi': 'Borjomi',
      'mestia': 'Mestia',
      'bakuriani': 'Bakuriani',
    },
    vehicles: {
      sedan: 'Sedan',
      minivan: 'Minivan',
      sprinter: 'Sprinter',
      longSprinter: 'Long Sprinter',
      greatSprinter: 'Great Sprinter',
    },
    vehicleInfo: {
      sedan: '1-3',
      minivan: '4-6',
      sprinter: '7-11',
      longSprinter: '12-16',
      greatSprinter: '16-20',
    },
    included: 'Included',
    includedItems: ['Meet & greet', 'Water bottles', 'Child seat (on request)', 'Waiting time', 'All taxes'],
  },
  he: {
    title: 'חשב את ההסעה שלך',
    from: 'מ',
    to: 'אל',
    vehicle: 'רכב',
    passengers: 'נוסעים',
    price: 'מחיר',
    duration: 'משך',
    distance: 'מרחק',
    book: 'הזמן בוואטסאפ',
    select: 'בחר מיקום',
    locations: {
      'tbilisi-airport': 'נמל התעופה טביליסי',
      'tbilisi-city': 'טביליסי עיר',
      'gudauri': 'גודאורי',
      'kazbegi': 'קזבגי',
      'batumi': 'באטומי',
      'kutaisi': 'קוטאיסי',
      'kakheti': 'קאחטי / סיגנאגי',
      'borjomi': 'בורג׳ומי',
      'mestia': 'מסטיה',
      'bakuriani': 'בקוריאני',
    },
    vehicles: {
      sedan: 'סדאן',
      minivan: 'מיניוואן',
      sprinter: 'ספרינטר',
      longSprinter: 'ספרינטר ארוך',
      greatSprinter: 'ספרינטר גדול',
    },
    vehicleInfo: {
      sedan: '1-3',
      minivan: '4-6',
      sprinter: '7-11',
      longSprinter: '12-16',
      greatSprinter: '16-20',
    },
    included: 'כלול במחיר',
    includedItems: ['קבלת פנים', 'בקבוקי מים', 'מושב ילדים (לפי בקשה)', 'זמן המתנה', 'כל המיסים'],
  },
  ru: {
    title: 'Рассчитайте трансфер',
    from: 'Откуда',
    to: 'Куда',
    vehicle: 'Транспорт',
    passengers: 'пассажиров',
    price: 'Цена',
    duration: 'Время',
    distance: 'Расстояние',
    book: 'Забронировать в WhatsApp',
    select: 'Выберите место',
    locations: {
      'tbilisi-airport': 'Аэропорт Тбилиси',
      'tbilisi-city': 'Тбилиси город',
      'gudauri': 'Гудаури',
      'kazbegi': 'Казбеги',
      'batumi': 'Батуми',
      'kutaisi': 'Кутаиси',
      'kakheti': 'Кахетия / Сигнахи',
      'borjomi': 'Боржоми',
      'mestia': 'Местия',
      'bakuriani': 'Бакуриани',
    },
    vehicles: {
      sedan: 'Седан',
      minivan: 'Минивэн',
      sprinter: 'Спринтер',
      longSprinter: 'Длинный Спринтер',
      greatSprinter: 'Большой Спринтер',
    },
    vehicleInfo: {
      sedan: '1-3',
      minivan: '4-6',
      sprinter: '7-11',
      longSprinter: '12-16',
      greatSprinter: '16-20',
    },
    included: 'Включено',
    includedItems: ['Встреча с табличкой', 'Вода', 'Детское кресло (по запросу)', 'Время ожидания', 'Все налоги'],
  }
}

// English vehicle names for WhatsApp
const vehicleNamesEN: Record<string, string> = {
  sedan: 'Sedan (1-3 passengers)',
  minivan: 'Minivan (4-6 passengers)',
  sprinter: 'Sprinter (7-11 passengers)',
  longSprinter: 'Long Sprinter (12-16 passengers)',
  greatSprinter: 'Great Sprinter (16-20 passengers)',
}

export default function RouteCalculator({ lang }: RouteCalculatorProps) {
  const t = content[lang as keyof typeof content] || content.en
  const isRTL = lang === 'he'

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [vehicle, setVehicle] = useState('sedan')
  const [currency, setCurrency] = useState<Currency>('EUR')

  // Load saved currency on mount
  useEffect(() => {
    setCurrency(getSavedCurrency())
  }, [])

  // Save currency when changed
  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    saveCurrency(newCurrency)
  }

  // Get all locations for "From" dropdown
  const allLocations = Object.keys(routes)

  // Get available destinations based on selected "from"
  const availableDestinations = from ? Object.keys(routes[from] || {}) : []

  const routeData = from && to ? routes[from]?.[to] : null
  const priceEUR = routeData ? routeData[vehicle as keyof typeof routeData] : null
  const price = priceEUR ? convertPrice(priceEUR, currency) : null

  // WhatsApp message ALWAYS in English
  const generateWhatsAppLink = () => {
    const fromName = locationNamesEN[from] || from
    const toName = locationNamesEN[to] || to
    const vehicleName = vehicleNamesEN[vehicle] || vehicle
    const message = `Hi Rati! I'd like to book a transfer:

From: ${fromName}
To: ${toName}
Vehicle: ${vehicleName}
Price: ${formatPrice(price!, currency)}

Please confirm availability. Thank you!`
    return `https://wa.me/995514048822?text=${encodeURIComponent(message)}`
  }

  return (
    <section className="py-20 bg-ivory dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-espresso dark:text-white text-4xl md:text-5xl font-bold text-center mb-12 transition-colors duration-300"
        >
          {t.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-10"
        >
          {/* Currency Toggle */}
          <div className="flex justify-center mb-8">
            <CurrencyToggle currency={currency} onChange={handleCurrencyChange} />
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* From */}
            <div>
              <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 tracking-wide transition-colors duration-300">{t.from}</label>
              <select
                value={from}
                onChange={(e) => { setFrom(e.target.value); setTo(''); }}
                className="w-full bg-espresso/5 dark:bg-white/5 border border-espresso/10 dark:border-white/10 rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-cream dark:bg-stone-900">{t.select}</option>
                {allLocations.map(loc => (
                  <option key={loc} value={loc} className="bg-cream dark:bg-stone-900">
                    {t.locations[loc as keyof typeof t.locations]}
                  </option>
                ))}
              </select>
            </div>

            {/* To */}
            <div>
              <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 tracking-wide transition-colors duration-300">{t.to}</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                disabled={!from}
                className="w-full bg-espresso/5 dark:bg-white/5 border border-espresso/10 dark:border-white/10 rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors appearance-none cursor-pointer disabled:opacity-40"
              >
                <option value="" className="bg-cream dark:bg-stone-900">{t.select}</option>
                {availableDestinations.map(loc => (
                  <option key={loc} value={loc} className="bg-cream dark:bg-stone-900">
                    {t.locations[loc as keyof typeof t.locations]}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle */}
            <div>
              <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 tracking-wide transition-colors duration-300">{t.vehicle}</label>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full bg-espresso/5 dark:bg-white/5 border border-espresso/10 dark:border-white/10 rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors appearance-none cursor-pointer"
              >
                {Object.entries(t.vehicles).map(([key, name]) => (
                  <option key={key} value={key} className="bg-cream dark:bg-stone-900">
                    {name} ({t.vehicleInfo[key as keyof typeof t.vehicleInfo]} {t.passengers})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {routeData && price && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border-t border-espresso/10 dark:border-white/10 pt-8 transition-colors duration-300"
              >
                {/* Price display */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-espresso/50 dark:text-white/50 text-sm mb-1 transition-colors duration-300">{t.duration}</p>
                      <p className="text-espresso dark:text-white text-xl font-medium transition-colors duration-300">{routeData.time}</p>
                    </div>
                    <div className="w-px h-10 bg-espresso/20 dark:bg-white/20 transition-colors duration-300" />
                    <div className="text-center">
                      <p className="text-espresso/50 dark:text-white/50 text-sm mb-1 transition-colors duration-300">{t.distance}</p>
                      <p className="text-espresso dark:text-white text-xl font-medium transition-colors duration-300">{routeData.distance}</p>
                    </div>
                  </div>

                  <div className="text-center md:text-right">
                    <p className="text-espresso/50 dark:text-white/50 text-sm mb-1 transition-colors duration-300">{t.price}</p>
                    <p className="text-terracotta dark:text-amber-400 text-5xl font-bold font-display transition-colors duration-300">{formatPrice(price, currency)}</p>
                  </div>
                </div>

                {/* Included items */}
                <div className="mb-8">
                  <p className="text-espresso/50 dark:text-white/50 text-sm mb-3 transition-colors duration-300">{t.included}:</p>
                  <div className="flex flex-wrap gap-3">
                    {t.includedItems.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-espresso/5 dark:bg-white/5 rounded-full text-espresso/70 dark:text-white/70 text-sm transition-colors duration-300">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book button */}
                <motion.a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full md:w-auto md:px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-full shadow-xl shadow-green-500/20 hover:shadow-green-500/40 transition-shadow"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.book}
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}