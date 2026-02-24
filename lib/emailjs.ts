/**
 * EmailJS Configuration and Service
 *
 * Setup Instructions:
 * 1. Create an account at https://www.emailjs.com/
 * 2. Create an Email Service and get your SERVICE_ID
 * 3. Create an Email Template with these variables:
 *    - {{from_name}}
 *    - {{from_email}}
 *    - {{from_phone}}
 *    - {{pickup_location}}
 *    - {{dropoff_location}}
 *    - {{pickup_date}}
 *    - {{pickup_time}}
 *    - {{num_passengers}}
 *    - {{vehicle_type}}
 *    - {{estimated_price}}
 *    - {{flight_number}}
 *    - {{special_requests}}
 * 4. Get your PUBLIC_KEY from Account > API Keys
 * 5. Replace the placeholder values below
 */

import emailjs from 'emailjs-com'

// EmailJS credentials loaded from environment variables (NEXT_PUBLIC_ prefix for client-side access)
export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
}

// Email recipient
export const RECIPIENT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'gingi2603@gmail.com'

export interface BookingEmailData {
  from_name: string
  from_email: string
  from_phone: string
  pickup_location: string
  dropoff_location: string
  pickup_date: string
  pickup_time: string
  num_passengers: string
  vehicle_type: string
  estimated_price: string
  flight_number: string
  special_requests: string
}

/**
 * Check if EmailJS is properly configured with real credentials
 */
export function isEmailJSConfigured(): boolean {
  return (
    !!EMAILJS_CONFIG.SERVICE_ID &&
    !!EMAILJS_CONFIG.TEMPLATE_ID &&
    !!EMAILJS_CONFIG.PUBLIC_KEY
  )
}

/**
 * Send booking details via EmailJS
 */
export async function sendBookingEmail(data: BookingEmailData): Promise<void> {
  if (!isEmailJSConfigured()) {
    console.error('EmailJS is not configured. Please replace placeholder values in lib/emailjs.ts with your actual EmailJS credentials.')
    throw new Error('Email service is not configured. Please contact us via WhatsApp instead.')
  }

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        ...data,
        to_email: RECIPIENT_EMAIL,
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    )

    if (response.status !== 200) {
      throw new Error(`EmailJS returned status ${response.status}`)
    }

    // Email sent successfully
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

/**
 * Initialize EmailJS (optional, but recommended)
 * Call this once in your app initialization
 */
export function initEmailJS() {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
}
