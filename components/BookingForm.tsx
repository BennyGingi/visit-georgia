'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CurrencyToggle from './CurrencyToggle'
import { Currency, convertPrice, formatPrice, getSavedCurrency, saveCurrency } from '@/lib/currency'
import { sendBookingEmail, isEmailJSConfigured } from '@/lib/emailjs'

interface BookingFormProps {
  lang: string
}

const content = {
  en: {
    title: 'Book Your Transfer',
    subtitle: 'Fill in the details below and we\'ll confirm your booking within minutes',

    // Form fields
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    fullNamePlaceholder: 'John Smith',
    email: 'Email Address',
    emailPlaceholder: 'john@example.com',
    phone: 'Phone Number',
    phonePlaceholder: '+995 5XX XXX XXX',

    transferDetails: 'Transfer Details',
    pickupLocation: 'Pickup Location',
    dropoffLocation: 'Dropoff Location',
    selectLocation: 'Select location',

    dateTime: 'Date & Time',
    pickupDate: 'Pickup Date',
    pickupTime: 'Pickup Time',

    passengers: 'Passengers & Vehicle',
    numPassengers: 'Number of Passengers',
    vehicle: 'Vehicle Type',

    additionalInfo: 'Additional Information',
    flightNumber: 'Flight Number (if applicable)',
    flightNumberPlaceholder: 'e.g., TK 123',
    specialRequests: 'Special Requests',
    specialRequestsPlaceholder: 'Child seats, extra luggage, specific pickup point...',

    // Vehicle options
    vehicles: {
      sedan: 'Sedan (1-3 passengers)',
      minivan: 'Minivan (4-6 passengers)',
      sprinter: 'Sprinter (7-11 passengers)',
      longSprinter: 'Long Sprinter (12-16 passengers)',
      greatSprinter: 'Great Sprinter (16-20 passengers)',
    },

    // Locations
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

    // Pricing info
    estimatedPrice: 'Estimated Price',
    priceNote: 'Final price will be confirmed via WhatsApp',

    // Buttons
    calculate: 'Calculate Price',
    submitWhatsApp: 'Send via WhatsApp',
    submitEmail: 'Send via Email',
    submitBoth: 'Send Both (WhatsApp + Email)',
    sending: 'Sending...',

    // Validation
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    invalidPhone: 'Please enter a valid phone number',

    // Success
    successTitle: 'Booking Request Sent!',
    successMessage: 'We\'ve received your booking request and will get back to you shortly.',
    successMessageWhatsApp: 'You\'ll be redirected to WhatsApp to confirm the details.',
    successMessageEmail: 'We\'ve sent your booking details to our team via email.',
    successMessageBoth: 'We\'ve sent your booking via email and will redirect you to WhatsApp.',
    successButton: 'Open WhatsApp',
    closeButton: 'Close',
    errorAlert: 'There was an error sending your booking. Please try again or contact us directly.',
  },
  he: {
    title: 'הזמן את ההסעה שלך',
    subtitle: 'מלא את הפרטים למטה ונאשר את ההזמנה תוך דקות',

    personalInfo: 'פרטים אישיים',
    fullName: 'שם מלא',
    fullNamePlaceholder: 'ישראל ישראלי',
    email: 'כתובת אימייל',
    emailPlaceholder: 'israel@example.com',
    phone: 'מספר טלפון',
    phonePlaceholder: '+995 5XX XXX XXX',

    transferDetails: 'פרטי ההסעה',
    pickupLocation: 'מיקום איסוף',
    dropoffLocation: 'מיקום יעד',
    selectLocation: 'בחר מיקום',

    dateTime: 'תאריך ושעה',
    pickupDate: 'תאריך איסוף',
    pickupTime: 'שעת איסוף',

    passengers: 'נוסעים ורכב',
    numPassengers: 'מספר נוסעים',
    vehicle: 'סוג רכב',

    additionalInfo: 'מידע נוסף',
    flightNumber: 'מספר טיסה (אם רלוונטי)',
    flightNumberPlaceholder: 'לדוגמה: TK 123',
    specialRequests: 'בקשות מיוחדות',
    specialRequestsPlaceholder: 'מושבי ילדים, מטען נוסף, נקודת איסוף ספציפית...',

    vehicles: {
      sedan: 'סדאן (1-3 נוסעים)',
      minivan: 'מיניוואן (4-6 נוסעים)',
      sprinter: 'ספרינטר (7-11 נוסעים)',
      longSprinter: 'ספרינטר ארוך (12-16 נוסעים)',
      greatSprinter: 'ספרינטר גדול (16-20 נוסעים)',
    },

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

    estimatedPrice: 'מחיר משוער',
    priceNote: 'המחיר הסופי יאושר בוואטסאפ',

    calculate: 'חשב מחיר',
    submitWhatsApp: 'שלח דרך וואטסאפ',
    submitEmail: 'שלח דרך אימייל',
    submitBoth: 'שלח בשניהם (וואטסאפ + אימייל)',
    sending: 'שולח...',

    required: 'שדה חובה',
    invalidEmail: 'נא להזין אימייל תקין',
    invalidPhone: 'נא להזין מספר טלפון תקין',

    successTitle: 'בקשת ההזמנה נשלחה!',
    successMessage: 'קיבלנו את בקשת ההזמנה שלך ונחזור אליך בהקדם.',
    successMessageWhatsApp: 'תועבר לוואטסאפ לאישור הפרטים.',
    successMessageEmail: 'שלחנו את פרטי ההזמנה לצוות שלנו באימייל.',
    successMessageBoth: 'שלחנו את ההזמנה באימייל ונעביר אותך לוואטסאפ.',
    successButton: 'פתח וואטסאפ',
    closeButton: 'סגור',
    errorAlert: 'אירעה שגיאה בשליחת ההזמנה. אנא נסו שוב או צרו קשר ישירות.',
  },
  ru: {
    title: 'Забронировать трансфер',
    subtitle: 'Заполните данные ниже, и мы подтвердим бронирование в течение нескольких минут',

    personalInfo: 'Личная информация',
    fullName: 'Полное имя',
    fullNamePlaceholder: 'Иван Иванов',
    email: 'Email адрес',
    emailPlaceholder: 'ivan@example.com',
    phone: 'Номер телефона',
    phonePlaceholder: '+995 5XX XXX XXX',

    transferDetails: 'Детали трансфера',
    pickupLocation: 'Место посадки',
    dropoffLocation: 'Место назначения',
    selectLocation: 'Выберите место',

    dateTime: 'Дата и время',
    pickupDate: 'Дата посадки',
    pickupTime: 'Время посадки',

    passengers: 'Пассажиры и транспорт',
    numPassengers: 'Количество пассажиров',
    vehicle: 'Тип транспорта',

    additionalInfo: 'Дополнительная информация',
    flightNumber: 'Номер рейса (если применимо)',
    flightNumberPlaceholder: 'напр., TK 123',
    specialRequests: 'Особые пожелания',
    specialRequestsPlaceholder: 'Детские кресла, дополнительный багаж, конкретное место посадки...',

    vehicles: {
      sedan: 'Седан (1-3 пассажира)',
      minivan: 'Минивэн (4-6 пассажиров)',
      sprinter: 'Спринтер (7-11 пассажиров)',
      longSprinter: 'Длинный Спринтер (12-16 пассажиров)',
      greatSprinter: 'Большой Спринтер (16-20 пассажиров)',
    },

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

    estimatedPrice: 'Ориентировочная цена',
    priceNote: 'Окончательная цена будет подтверждена в WhatsApp',

    calculate: 'Рассчитать цену',
    submitWhatsApp: 'Отправить через WhatsApp',
    submitEmail: 'Отправить через Email',
    submitBoth: 'Отправить оба (WhatsApp + Email)',
    sending: 'Отправка...',

    required: 'Это поле обязательно',
    invalidEmail: 'Пожалуйста, введите корректный email',
    invalidPhone: 'Пожалуйста, введите корректный номер телефона',

    successTitle: 'Запрос на бронирование отправлен!',
    successMessage: 'Мы получили ваш запрос и скоро свяжемся с вами.',
    successMessageWhatsApp: 'Вы будете перенаправлены в WhatsApp для подтверждения деталей.',
    successMessageEmail: 'Мы отправили детали бронирования нашей команде по email.',
    successMessageBoth: 'Мы отправили бронирование по email и перенаправим вас в WhatsApp.',
    successButton: 'Открыть WhatsApp',
    closeButton: 'Закрыть',
    errorAlert: 'Произошла ошибка при отправке бронирования. Пожалуйста, попробуйте ещё раз или свяжитесь с нами напрямую.',
  }
}

// Pricing data - base sedan prices for all routes
const routes: Record<string, Record<string, number>> = {
  'tbilisi-airport': {
    'tbilisi-city': 25, 'gudauri': 85, 'kazbegi': 95, 'batumi': 180, 'kutaisi': 120,
    'kakheti': 75, 'borjomi': 100, 'mestia': 250, 'bakuriani': 110,
  },
  'tbilisi-city': {
    'tbilisi-airport': 25, 'gudauri': 85, 'kazbegi': 95, 'batumi': 180, 'kutaisi': 120,
    'kakheti': 75, 'borjomi': 100, 'mestia': 250, 'bakuriani': 110,
  },
  'gudauri': {
    'tbilisi-airport': 85, 'tbilisi-city': 85, 'kazbegi': 35, 'batumi': 220, 'kutaisi': 150,
    'kakheti': 120, 'borjomi': 140, 'mestia': 280, 'bakuriani': 130,
  },
  'kazbegi': {
    'tbilisi-airport': 95, 'tbilisi-city': 95, 'gudauri': 35, 'batumi': 240, 'kutaisi': 165,
    'kakheti': 130, 'borjomi': 155, 'mestia': 300, 'bakuriani': 145,
  },
  'batumi': {
    'tbilisi-airport': 180, 'tbilisi-city': 180, 'gudauri': 220, 'kazbegi': 240, 'kutaisi': 100,
    'kakheti': 220, 'borjomi': 140, 'mestia': 160, 'bakuriani': 150,
  },
  'kutaisi': {
    'tbilisi-airport': 120, 'tbilisi-city': 120, 'gudauri': 150, 'kazbegi': 165, 'batumi': 100,
    'kakheti': 160, 'borjomi': 80, 'mestia': 110, 'bakuriani': 90,
  },
  'kakheti': {
    'tbilisi-airport': 75, 'tbilisi-city': 75, 'gudauri': 120, 'kazbegi': 130, 'batumi': 220,
    'kutaisi': 160, 'borjomi': 130, 'mestia': 290, 'bakuriani': 140,
  },
  'borjomi': {
    'tbilisi-airport': 100, 'tbilisi-city': 100, 'gudauri': 140, 'kazbegi': 155, 'batumi': 140,
    'kutaisi': 80, 'kakheti': 130, 'mestia': 200, 'bakuriani': 30,
  },
  'mestia': {
    'tbilisi-airport': 250, 'tbilisi-city': 250, 'gudauri': 280, 'kazbegi': 300, 'batumi': 160,
    'kutaisi': 110, 'kakheti': 290, 'borjomi': 200, 'bakuriani': 190,
  },
  'bakuriani': {
    'tbilisi-airport': 110, 'tbilisi-city': 110, 'gudauri': 130, 'kazbegi': 145, 'batumi': 150,
    'kutaisi': 90, 'kakheti': 140, 'borjomi': 30, 'mestia': 190,
  },
}

const vehicleMultipliers = {
  sedan: 1,
  minivan: 1.4,
  sprinter: 2,
  longSprinter: 2.6,
  greatSprinter: 4,
}

export default function BookingForm({ lang }: BookingFormProps) {
  const t = content[lang as keyof typeof content] || content.en
  const isRTL = lang === 'he'

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    numPassengers: '1',
    vehicle: 'sedan',
    flightNumber: '',
    specialRequests: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submissionType, setSubmissionType] = useState<'whatsapp' | 'email' | 'both' | null>(null)
  const [currency, setCurrency] = useState<Currency>('EUR')

  // Load saved currency on mount
  useEffect(() => {
    setCurrency(getSavedCurrency())
  }, [])

  // Save currency when changed
  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    saveCurrency(newCurrency)
    // Recalculate price with new currency
    calculatePriceFromValues(formData.pickupLocation, formData.dropoffLocation, formData.vehicle, newCurrency)
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Calculate price from specific values (avoids stale closure bug)
  const calculatePriceFromValues = (pickup: string, dropoff: string, vehicle: string, curr: Currency = currency) => {
    if (!pickup || !dropoff) {
      setEstimatedPrice(null)
      return
    }

    const basePrice = routes[pickup]?.[dropoff]
    if (basePrice) {
      const multiplier = vehicleMultipliers[vehicle as keyof typeof vehicleMultipliers]
      const priceEUR = Math.round(basePrice * multiplier)
      const convertedPrice = convertPrice(priceEUR, curr)
      setEstimatedPrice(convertedPrice)
    } else {
      setEstimatedPrice(null)
    }
  }

  // Auto-calculate when locations or vehicle change
  const handleLocationOrVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    // Calculate updated values immediately without waiting for state
    const updatedPickup = name === 'pickupLocation' ? value : formData.pickupLocation
    const updatedDropoff = name === 'dropoffLocation' ? value : formData.dropoffLocation
    const updatedVehicle = name === 'vehicle' ? value : formData.vehicle

    handleChange(e)
    calculatePriceFromValues(updatedPickup, updatedDropoff, updatedVehicle, currency)
  }

  // Validation - returns errors object to avoid stale state bug
  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = t.required
    if (!formData.email.trim()) {
      newErrors.email = t.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t.required
    } else if (!/^[+]?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = t.invalidPhone
    }
    if (!formData.pickupLocation) newErrors.pickupLocation = t.required
    if (!formData.dropoffLocation) newErrors.dropoffLocation = t.required
    if (!formData.pickupDate) newErrors.pickupDate = t.required
    if (!formData.pickupTime) newErrors.pickupTime = t.required

    setErrors(newErrors)
    return newErrors
  }

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const pickupLocationName = t.locations[formData.pickupLocation as keyof typeof t.locations] || formData.pickupLocation
    const dropoffLocationName = t.locations[formData.dropoffLocation as keyof typeof t.locations] || formData.dropoffLocation
    const vehicleName = t.vehicles[formData.vehicle as keyof typeof t.vehicles]

    let message = `🚗 *NEW TRANSFER BOOKING REQUEST*\n\n`
    message += `👤 *Personal Details*\n`
    message += `Name: ${formData.fullName}\n`
    message += `Email: ${formData.email}\n`
    message += `Phone: ${formData.phone}\n\n`

    message += `📍 *Transfer Details*\n`
    message += `From: ${pickupLocationName}\n`
    message += `To: ${dropoffLocationName}\n`
    message += `Date: ${formData.pickupDate}\n`
    message += `Time: ${formData.pickupTime}\n\n`

    message += `🚐 *Vehicle & Passengers*\n`
    message += `Passengers: ${formData.numPassengers}\n`
    message += `Vehicle: ${vehicleName}\n`

    if (estimatedPrice) {
      message += `Estimated Price: ${formatPrice(estimatedPrice, currency)}\n`
    }
    message += `\n`

    if (formData.flightNumber) {
      message += `✈️ *Flight Details*\n`
      message += `Flight Number: ${formData.flightNumber}\n\n`
    }

    if (formData.specialRequests) {
      message += `📝 *Special Requests*\n`
      message += `${formData.specialRequests}\n\n`
    }

    message += `Please confirm availability and final price. Thank you!`

    return message
  }

  // Generate email data
  const generateEmailData = () => {
    const pickupLocationName = t.locations[formData.pickupLocation as keyof typeof t.locations] || formData.pickupLocation
    const dropoffLocationName = t.locations[formData.dropoffLocation as keyof typeof t.locations] || formData.dropoffLocation
    const vehicleName = t.vehicles[formData.vehicle as keyof typeof t.vehicles]

    return {
      from_name: formData.fullName,
      from_email: formData.email,
      from_phone: formData.phone,
      pickup_location: pickupLocationName,
      dropoff_location: dropoffLocationName,
      pickup_date: formData.pickupDate,
      pickup_time: formData.pickupTime,
      num_passengers: formData.numPassengers,
      vehicle_type: vehicleName,
      estimated_price: estimatedPrice ? formatPrice(estimatedPrice, currency) : 'Not calculated',
      flight_number: formData.flightNumber || 'Not provided',
      special_requests: formData.specialRequests || 'None',
    }
  }

  // Open WhatsApp
  const openWhatsApp = () => {
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/995514048822?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // Handle form submission
  const handleSubmit = async (type: 'whatsapp' | 'email' | 'both') => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      // Scroll to first error using fresh errors, not stale state
      const firstError = Object.keys(validationErrors)[0]
      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)
    setSubmissionType(type)

    try {
      // Send email if needed
      if (type === 'email' || type === 'both') {
        const emailData = generateEmailData()
        await sendBookingEmail(emailData)
      }

      // Show success modal
      setShowSuccess(true)
      setIsSubmitting(false)

      // Open WhatsApp if needed
      if (type === 'whatsapp' || type === 'both') {
        setTimeout(() => {
          openWhatsApp()
        }, 1500)
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert(t.errorAlert)
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-ivory dark:from-cinema-dark dark:to-cinema-black transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-espresso dark:text-white text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300">
            {t.title}
          </h2>
          <p className="text-espresso/60 dark:text-white/60 text-lg transition-colors duration-300">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowSuccess(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-cream dark:bg-cinema-dark rounded-2xl p-8 max-w-md w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-espresso dark:text-white text-2xl font-bold mb-2">
                  {t.successTitle}
                </h3>
                <p className="text-espresso/60 dark:text-white/60 mb-6">
                  {submissionType === 'whatsapp' && t.successMessageWhatsApp}
                  {submissionType === 'email' && t.successMessageEmail}
                  {submissionType === 'both' && t.successMessageBoth}
                </p>

                <div className="flex gap-3 justify-center">
                  {(submissionType === 'whatsapp' || submissionType === 'both') && (
                    <button
                      onClick={openWhatsApp}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      {t.successButton}
                    </button>
                  )}

                  {submissionType === 'email' && (
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-espresso/10 dark:bg-white/10 text-espresso dark:text-white rounded-full font-medium hover:bg-espresso/20 dark:hover:bg-white/20 transition-colors"
                    >
                      {t.closeButton}
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-10 space-y-8"
        >
          {/* Currency Toggle */}
          <div className="flex justify-center pb-4 border-b border-espresso/10 dark:border-white/10 transition-colors duration-300">
            <CurrencyToggle currency={currency} onChange={handleCurrencyChange} />
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-espresso dark:text-white text-xl font-bold mb-4 transition-colors duration-300">
              {t.personalInfo}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t.fullNamePlaceholder}
                  className={`w-full bg-espresso/5 dark:bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-espresso/10 dark:border-white/10'} rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.email} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className={`w-full bg-espresso/5 dark:bg-white/5 border ${errors.email ? 'border-red-500' : 'border-espresso/10 dark:border-white/10'} rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.phone} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className={`w-full bg-espresso/5 dark:bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-espresso/10 dark:border-white/10'} rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Transfer Details */}
          <div className="border-t border-espresso/10 dark:border-white/10 pt-8 transition-colors duration-300">
            <h3 className="text-espresso dark:text-white text-xl font-bold mb-4 transition-colors duration-300">
              {t.transferDetails}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.pickupLocation} *
                </label>
                <select
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleLocationOrVehicleChange}
                  className={`w-full bg-espresso/5 dark:bg-white/5 border ${errors.pickupLocation ? 'border-red-500' : 'border-espresso/10 dark:border-white/10'} rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors appearance-none cursor-pointer`}
                >
                  <option value="">{t.selectLocation}</option>
                  {Object.entries(t.locations).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
                {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
              </div>

              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.dropoffLocation} *
                </label>
                <select
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleLocationOrVehicleChange}
                  className={`w-full bg-espresso/5 dark:bg-white/5 border ${errors.dropoffLocation ? 'border-red-500' : 'border-espresso/10 dark:border-white/10'} rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors appearance-none cursor-pointer`}
                >
                  <option value="">{t.selectLocation}</option>
                  {Object.entries(t.locations).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
                {errors.dropoffLocation && <p className="text-red-500 text-xs mt-1">{errors.dropoffLocation}</p>}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="border-t border-espresso/10 dark:border-white/10 pt-8 transition-colors duration-300">
            <h3 className="text-espresso dark:text-white text-xl font-bold mb-4 transition-colors duration-300">
              {t.dateTime}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.pickupDate} *
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full bg-espresso/5 dark:bg-white/5 border ${errors.pickupDate ? 'border-red-500' : 'border-espresso/10 dark:border-white/10'} rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors`}
                />
                {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
              </div>

              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.pickupTime} *
                </label>
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className={`w-full bg-espresso/5 dark:bg-white/5 border ${errors.pickupTime ? 'border-red-500' : 'border-espresso/10 dark:border-white/10'} rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors`}
                />
                {errors.pickupTime && <p className="text-red-500 text-xs mt-1">{errors.pickupTime}</p>}
              </div>
            </div>
          </div>

          {/* Passengers & Vehicle */}
          <div className="border-t border-espresso/10 dark:border-white/10 pt-8 transition-colors duration-300">
            <h3 className="text-espresso dark:text-white text-xl font-bold mb-4 transition-colors duration-300">
              {t.passengers}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.numPassengers}
                </label>
                <input
                  type="number"
                  name="numPassengers"
                  value={formData.numPassengers}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  className="w-full bg-espresso/5 dark:bg-white/5 border border-espresso/10 dark:border-white/10 rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.vehicle}
                </label>
                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleLocationOrVehicleChange}
                  className="w-full bg-espresso/5 dark:bg-white/5 border border-espresso/10 dark:border-white/10 rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors appearance-none cursor-pointer"
                >
                  {Object.entries(t.vehicles).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price Display */}
          {estimatedPrice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-terracotta/10 dark:bg-gold-400/10 border border-terracotta/20 dark:border-gold-400/20 rounded-xl p-6 text-center transition-colors duration-300"
            >
              <p className="text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                {t.estimatedPrice}
              </p>
              <p className="text-terracotta dark:text-amber-400 text-4xl font-bold font-display transition-colors duration-300">
                {formatPrice(estimatedPrice, currency)}
              </p>
              <p className="text-espresso/40 dark:text-white/40 text-xs mt-2 transition-colors duration-300">
                {t.priceNote}
              </p>
            </motion.div>
          )}

          {/* Additional Information */}
          <div className="border-t border-espresso/10 dark:border-white/10 pt-8 transition-colors duration-300">
            <h3 className="text-espresso dark:text-white text-xl font-bold mb-4 transition-colors duration-300">
              {t.additionalInfo}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.flightNumber}
                </label>
                <input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  placeholder={t.flightNumberPlaceholder}
                  className="w-full bg-espresso/5 dark:bg-white/5 border border-espresso/10 dark:border-white/10 rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-espresso/60 dark:text-white/60 text-sm mb-2 transition-colors duration-300">
                  {t.specialRequests}
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder={t.specialRequestsPlaceholder}
                  rows={4}
                  className="w-full bg-espresso/5 dark:bg-white/5 border border-espresso/10 dark:border-white/10 rounded-xl px-4 py-3 text-espresso dark:text-white focus:outline-none focus:border-terracotta/50 dark:focus:border-amber-400/50 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="space-y-4">
            {/* WhatsApp Button */}
            <motion.button
              type="button"
              onClick={() => handleSubmit('whatsapp')}
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-full shadow-xl shadow-green-500/20 hover:shadow-green-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t.sending}
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.submitWhatsApp}
                </>
              )}
            </motion.button>

            {/* Email Button - disabled when EmailJS is not configured */}
            <motion.button
              type="button"
              onClick={() => handleSubmit('email')}
              disabled={isSubmitting || !isEmailJSConfigured()}
              whileHover={{ scale: (isSubmitting || !isEmailJSConfigured()) ? 1 : 1.02 }}
              whileTap={{ scale: (isSubmitting || !isEmailJSConfigured()) ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold rounded-full shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t.sending}
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t.submitEmail}
                </>
              )}
            </motion.button>

            {/* Both Button - disabled when EmailJS is not configured */}
            <motion.button
              type="button"
              onClick={() => handleSubmit('both')}
              disabled={isSubmitting || !isEmailJSConfigured()}
              whileHover={{ scale: (isSubmitting || !isEmailJSConfigured()) ? 1 : 1.02 }}
              whileTap={{ scale: (isSubmitting || !isEmailJSConfigured()) ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t.sending}
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {t.submitBoth}
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
