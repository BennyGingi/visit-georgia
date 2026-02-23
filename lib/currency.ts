// Currency types and utilities

export type Currency = 'EUR' | 'GEL' | 'USD'

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  GEL: '₾',
  USD: '$',
}

export const CURRENCY_NAMES: Record<Currency, string> = {
  EUR: 'Euro',
  GEL: 'Georgian Lari',
  USD: 'US Dollar',
}

// Exchange rates (base: EUR)
export const EXCHANGE_RATES: Record<Currency, number> = {
  EUR: 1,
  GEL: 2.95,
  USD: 1.08,
}

// Convert EUR price to selected currency
export function convertPrice(eurPrice: number, toCurrency: Currency): number {
  return Math.round(eurPrice * EXCHANGE_RATES[toCurrency])
}

// Format price with currency symbol
export function formatPrice(price: number, currency: Currency, position: 'before' | 'after' = 'before'): string {
  const symbol = CURRENCY_SYMBOLS[currency]

  if (position === 'after') {
    return `${price}${symbol}`
  }

  // For GEL, symbol goes after the number (Georgian convention)
  if (currency === 'GEL') {
    return `${price}${symbol}`
  }

  return `${symbol}${price}`
}

// Get/Set currency from localStorage
const STORAGE_KEY = 'visitGeorgia_currency'

export function getSavedCurrency(): Currency {
  if (typeof window === 'undefined') return 'EUR'

  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && (saved === 'EUR' || saved === 'GEL' || saved === 'USD')) {
    return saved as Currency
  }
  return 'EUR'
}

export function saveCurrency(currency: Currency): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, currency)
}
