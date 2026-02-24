# QA Bug Report
Generated: 2026-02-24

## Summary
- Total Issues: 48
- Critical: 6
- High: 11
- Medium: 18
- Low: 13

---

## CRITICAL Issues

### CRITICAL-01: Empty HE/RU destination data breaks individual destination pages
- **File**: `app/destinations/[slug]/page.tsx:286-293`
- **Severity**: 🔴 CRITICAL
- **Issue**: The `destinationsData` object has full content for `en` (8 destinations) but `he` and `ru` are empty objects `{}`. When a Hebrew or Russian user navigates to any destination page (e.g. `/destinations/tbilisi`), `destination` will be `undefined` and the page shows "Destination not found".
- **Impact**: Entire `/destinations/[slug]` route is broken for 2 out of 3 supported languages. Hebrew and Russian users cannot view any individual destination.
- **Suggested Fix**: Populate `destinationsData.he` and `destinationsData.ru` with translated content for all 8 destinations, or add a fallback: `const destination = destinationsData[lang]?.[slug] || destinationsData.en[slug]`
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added English fallback: `destinationsData[lang]?.[slug] || destinationsData.en[slug]` in `app/destinations/[slug]/page.tsx`
- **Fixed At**: 2026-02-24

---

### CRITICAL-02: "Book Transfer" button always uses English on destination pages
- **File**: `app/destinations/[slug]/page.tsx:407`
- **Severity**: 🔴 CRITICAL
- **Issue**: The hero CTA button reads `commonTranslations.en.bookTransfer` instead of `commonTranslations[lang].bookTransfer`, hardcoding English regardless of user language.
- **Impact**: Hebrew/Russian users see English text on the primary CTA button.
- **Suggested Fix**: Change `commonTranslations.en.bookTransfer` to `commonTranslations[lang].bookTransfer`
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Changed `commonTranslations.en.bookTransfer` to `commonTranslations[lang].bookTransfer`; passed `lang` prop to HeroSection component
- **Fixed At**: 2026-02-24

---

### CRITICAL-03: Hardcoded "Destination not found" error text
- **File**: `app/destinations/[slug]/page.tsx:617`
- **Severity**: 🔴 CRITICAL
- **Issue**: The fallback text `"Destination not found"` is a hardcoded English string with no translations.
- **Impact**: Error state is always in English for all users.
- **Suggested Fix**: Add translated versions to `commonTranslations` and use `commonTranslations[lang].notFound`
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `notFoundText` object with en/he/ru translations and used `notFoundText[lang]` in the fallback
- **Fixed At**: 2026-02-24

---

### CRITICAL-04: Hardcoded "Destinations" label on destinations listing page
- **File**: `app/destinations/page.tsx:238`
- **Severity**: 🔴 CRITICAL
- **Issue**: The ornamental section label `"Destinations"` is hardcoded in English and not part of the translations object.
- **Impact**: All users see English text regardless of language setting.
- **Suggested Fix**: Add `destinations` key to the translations object for all 3 languages and reference it.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `sectionLabel` key to translations (en: "Destinations", he: "יעדים", ru: "Направления") and replaced hardcoded string with `{t.sectionLabel}`
- **Fixed At**: 2026-02-24

---

### CRITICAL-05: Multiple hardcoded English strings in destinations CTA section
- **File**: `app/destinations/page.tsx:363,391,394,402`
- **Severity**: 🔴 CRITICAL
- **Issue**: Multiple hardcoded English strings in the CTA section: "Explore our curated collection of Georgia's finest destinations" (line 363), "Plan Your Journey" (line 391), "Let us craft your perfect Georgian experience" (line 394), "Contact Rati Tours" (line 402).
- **Impact**: All language users see English-only CTA section at the bottom of the destinations page.
- **Suggested Fix**: Add all CTA strings to the translations object for en/he/ru.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `curatedCollection`, `planJourney`, `craftExperience`, `contactRati` keys to translations for all 3 languages and replaced all hardcoded strings
- **Fixed At**: 2026-02-24

---

### CRITICAL-06: EmailJS contains placeholder credentials — email feature non-functional
- **File**: `lib/emailjs.ts:27-31`
- **Severity**: 🔴 CRITICAL
- **Issue**: The EmailJS configuration contains placeholder values (`YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY`). Any attempt to send email via the booking form will fail silently or with an error.
- **Impact**: Email booking submission feature is completely non-functional. Users who select "Send via Email" or "Send Both" will get an error.
- **Suggested Fix**: Replace placeholder values with actual EmailJS credentials, or disable the email option until configured.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `isEmailJSConfigured()` guard function that checks for placeholder values; `sendBookingEmail()` throws descriptive error when credentials are placeholders. Agent 2 AutoFixer additionally disabled "Send via Email" and "Send Both" buttons in BookingForm UI when EmailJS is not configured (`disabled={!isEmailJSConfigured()}`), preventing users from attempting non-functional email submission.
- **Fixed At**: 2026-02-24

---

## HIGH Issues

### HIGH-01: Russian tour names/descriptions show English (isRTL logic bug)
- **File**: `app/tours/page.tsx:471-472`
- **Severity**: 🟠 HIGH
- **Issue**: The TourCard uses `isRTL` to determine language: `const tourName = isRTL ? (lang === 'he' ? tour.nameHe : tour.nameRu) : tour.name`. Since `isRTL` is only `true` for Hebrew (`lang === 'he'`), Russian users (`lang === 'ru'`) get `isRTL = false` and fall through to `tour.name` (English).
- **Impact**: Russian users see English tour names and descriptions on all tour cards.
- **Suggested Fix**: Change logic to: `const tourName = lang === 'he' ? tour.nameHe : lang === 'ru' ? tour.nameRu : tour.name`
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Changed TourCard logic to `lang === 'he' ? tour.nameHe : lang === 'ru' ? tour.nameRu : tour.name` for both tourName and tourDesc
- **Fixed At**: 2026-02-24

---

### HIGH-02: Raw `<img>` tags used instead of Next.js `<Image>` throughout entire app
- **File**: Multiple files (12+ locations)
- **Severity**: 🟠 HIGH
- **Issue**: Every image in the codebase uses raw `<img>` tags instead of Next.js `<Image>` component. Affected files: `app/page.tsx:213,309,367,441,599`, `app/tours/page.tsx:424,485,563`, `app/destinations/page.tsx:287`, `app/destinations/[slug]/page.tsx:369,579`, `components/TransferHero.tsx:57`. The `Image` import in `app/page.tsx:5` was unused.
- **Impact**: No automatic lazy loading, no image optimization (WebP/AVIF), no blur placeholders, no CLS prevention. Significantly impacts Core Web Vitals and page performance.
- **Suggested Fix**: Replace all `<img>` tags with Next.js `<Image>` component with proper `fill`, `width`/`height`, and `priority` props.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 AutoFixer - Converted all 12 `<img>` tags to Next.js `<Image>` with `fill`, `sizes`, and `priority` (hero images) props across 5 files: `app/page.tsx` (5 images), `app/tours/page.tsx` (3 images), `app/destinations/page.tsx` (1 image), `app/destinations/[slug]/page.tsx` (2 images), `components/TransferHero.tsx` (1 image). Added `import Image from 'next/image'` where missing.
- **Fixed At**: 2026-02-24

---

### HIGH-03: Hardcoded "Immerse Yourself" and "Experiences" section headers
- **File**: `app/page.tsx:492,498`
- **Severity**: 🟠 HIGH
- **Issue**: The ExperiencesSection contains two hardcoded English strings: "Immerse Yourself" (line 492) and "Experiences" (line 498) that are not in the translations object.
- **Impact**: Section headers always display in English for HE/RU users.
- **Suggested Fix**: Add these strings to the `content` translations object and use `t.immerse` / `t.experiences`.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `immerse` and `experiencesTitle` keys to all 3 language translations and replaced hardcoded strings with `{t.immerse}` and `{t.experiencesTitle}`
- **Fixed At**: 2026-02-24

---

### HIGH-04: Hardcoded "Destination" label in homepage destination section
- **File**: `app/page.tsx:397`
- **Severity**: 🟠 HIGH
- **Issue**: The label `"0{index + 1} — Destination"` contains the hardcoded English word "Destination".
- **Impact**: HE/RU users see mixed-language labels in the destination section.
- **Suggested Fix**: Add `destination` key to translations and use `t.destination`.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `destination` key to translations (en: "Destination", he: "יעד", ru: "Направление"); passed `destinationLabel` prop to DestinationSection component
- **Fixed At**: 2026-02-24

---

### HIGH-05: Hardcoded "Why Us" label in transfers page
- **File**: `app/transfers/page.tsx:88-89`
- **Severity**: 🟠 HIGH
- **Issue**: The WhySection label `"Why Us"` is hardcoded in English and not part of translations.
- **Impact**: HE/RU users see English label text on the transfers page.
- **Suggested Fix**: Add `whyUs` key to transfers page translations.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `whyUs` key to all 3 language translations (en: "Why Us", he: "למה אנחנו", ru: "Почему мы") and replaced hardcoded string with `{t.whyUs}`
- **Fixed At**: 2026-02-24

---

### HIGH-06: Tour metadata not translated (duration, groupSize, bestSeason)
- **File**: `app/tours/page.tsx:54,132-133,140,200-201,208,259-261`
- **Severity**: 🟠 HIGH
- **Issue**: Tour data fields `duration` (e.g., "7 Days / 6 Nights"), `groupSize` (e.g., "2-12 people"), and `bestSeason` (e.g., "May-October") are English-only strings displayed directly in the tour detail modal (lines 581, 602, 606).
- **Impact**: Tour metadata always displays in English for HE/RU users.
- **Suggested Fix**: Add `durationHe`/`durationRu`, `groupSizeHe`/`groupSizeRu`, `bestSeasonHe`/`bestSeasonRu` fields to tour data objects.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `durationHe`, `durationRu`, `groupSizeHe`, `groupSizeRu`, `bestSeasonHe`, `bestSeasonRu` fields to Tour interface and all 3 tour data objects; updated TourDetailModal to use translated values
- **Fixed At**: 2026-02-24

---

### HIGH-07: FloatingWhatsApp message hardcoded in English
- **File**: `components/FloatingWhatsApp.tsx:7`
- **Severity**: 🟠 HIGH
- **Issue**: The default WhatsApp message `"Hi Rati! I'm interested in your transfer services."` is hardcoded in English. The component does not accept a `lang` prop.
- **Impact**: HE/RU users initiate WhatsApp conversations with an English pre-filled message.
- **Suggested Fix**: Accept `lang` prop and provide translated default messages.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Rewrote FloatingWhatsApp to accept optional `lang` prop with translated messages (en/he/ru) and translated aria-labels; updated all 5 page files to pass `lang` prop
- **Fixed At**: 2026-02-24

---

### HIGH-08: BookingForm error alert hardcoded in English
- **File**: `components/BookingForm.tsx:501`
- **Severity**: 🟠 HIGH
- **Issue**: The `alert()` message `"There was an error sending your booking. Please try again or contact us directly."` is hardcoded in English.
- **Impact**: Error feedback is always in English regardless of user language.
- **Suggested Fix**: Use translated error message from the `t` translations object.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `errorAlert` key to all 3 language translations in BookingForm content; replaced hardcoded `alert()` string with `alert(t.errorAlert)`
- **Fixed At**: 2026-02-24

---

### HIGH-09: PricingTable route names always in English
- **File**: `components/PricingTable.tsx:10-20,125-127,160-162`
- **Severity**: 🟠 HIGH
- **Issue**: The `pricingData` array contains route names like "Tbilisi Airport", "Gudauri" in English only. These are rendered directly in the pricing table without translation.
- **Impact**: HE/RU users see English route names in the pricing table.
- **Suggested Fix**: Accept `lang` prop and use translated location name maps similar to RouteCalculator.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 AutoFixer - Added `locationNames` translation map (en/he/ru) for all 10 locations (Tbilisi Airport, Tbilisi City, Tbilisi, Gudauri, Kazbegi, Batumi, Kutaisi, Kakheti, Borjomi, Mestia). Updated both desktop table and mobile card renderers to use translated names. Also fixed arrow direction for RTL (Hebrew).
- **Fixed At**: 2026-02-24

---

### HIGH-10: Tour detail modal close button missing aria-label
- **File**: `app/tours/page.tsx:569`
- **Severity**: 🟠 HIGH
- **Issue**: The close button in TourDetailModal has only an SVG X icon but no `aria-label` or visible text. Screen readers cannot identify the button's purpose.
- **Impact**: Accessibility violation (WCAG Level A) — button has no accessible name.
- **Suggested Fix**: Add `aria-label="Close"` to the button element.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `aria-label="Close"` to the close button element in TourDetailModal
- **Fixed At**: 2026-02-24

---

### HIGH-11: Tour cards not keyboard accessible
- **File**: `app/tours/page.tsx:480`
- **Severity**: 🟠 HIGH
- **Issue**: Tour cards are `<div>` elements with `onClick` handlers but no `role="button"`, `tabIndex={0}`, or `onKeyDown` handler. Keyboard-only users cannot interact with tour cards.
- **Impact**: Accessibility violation (WCAG Level A) — interactive elements not keyboard operable.
- **Suggested Fix**: Add `role="button"`, `tabIndex={0}`, and `onKeyDown` handler for Enter/Space, or use a `<button>` element.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `role="button"`, `tabIndex={0}`, and `onKeyDown` handler for Enter/Space keys to tour card `motion.div` elements
- **Fixed At**: 2026-02-24

---

## MEDIUM Issues

### MEDIUM-01: Form labels not programmatically associated with inputs
- **File**: `components/BookingForm.tsx:601-811`, `components/RouteCalculator.tsx:347-392`
- **Severity**: 🟡 MEDIUM
- **Issue**: Labels are rendered as separate `<label>` elements but are NOT linked to their inputs via `htmlFor`/`id` attributes. Screen readers won't connect labels to inputs.
- **Impact**: Accessibility issue — form fields not properly labeled for assistive technology.
- **Suggested Fix**: Add `htmlFor` to each `<label>` and matching `id` to each `<input>`/`<select>`/`<textarea>`.
- **Status**: 🔴 Open

---

### MEDIUM-02: HTML lang attribute not updated when language changes
- **File**: `app/layout.tsx:16`
- **Severity**: 🟡 MEDIUM
- **Issue**: The `lang` attribute is hardcoded to `"en"` on the `<html>` element. When users switch to Hebrew or Russian, `dir` is updated but `lang` is not.
- **Impact**: Screen readers and browser features that depend on `lang` attribute will always assume English content.
- **Suggested Fix**: Add `document.documentElement.setAttribute('lang', lang)` to the language change `useEffect` in Navigation.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added `document.documentElement.setAttribute('lang', lang)` alongside the existing `dir` attribute update in Navigation.tsx useEffect
- **Fixed At**: 2026-02-24

---

### MEDIUM-03: Decorative SVGs missing aria-hidden="true" (site-wide)
- **File**: Multiple files (~30+ instances)
- **Severity**: 🟡 MEDIUM
- **Issue**: Most SVG icons throughout the codebase lack `aria-hidden="true"`. Affected files include: `RouteCalculator.tsx:446`, `BookingForm.tsx:542,561,836,844,863,871,890,898`, `Footer.tsx:58,67,76,85,161`, `Navigation.tsx:146`, `transfers/page.tsx:157`, `tours/page.tsx:521,573,616,631,779`, `destinations/page.tsx:312`, `destinations/[slug]/page.tsx:408,459,534`, `TrustBadges.tsx:40,45,50,55`.
- **Impact**: Screen readers will attempt to read SVG content, creating noise for visually impaired users.
- **Suggested Fix**: Add `aria-hidden="true"` to all decorative SVGs, or `<title>` elements for meaningful ones.
- **Status**: 🔴 Open

---

### MEDIUM-04: Low-opacity text may fail WCAG contrast requirements
- **File**: Multiple files (site-wide)
- **Severity**: 🟡 MEDIUM
- **Issue**: Several text elements use very low opacity values: `text-espresso/30`, `text-white/30` (Footer.tsx:195), `text-espresso/40`, `text-white/40` (various), `text-gold-aged/40` (page.tsx:640). These are likely below the WCAG AA 4.5:1 contrast ratio.
- **Impact**: Text may be unreadable for users with low vision.
- **Suggested Fix**: Increase minimum opacity to 50-60% for meaningful text. Add `aria-hidden="true"` to purely decorative text.
- **Status**: 🔴 Open

---

### MEDIUM-05: Mobile menu lacks focus trapping
- **File**: `components/Navigation.tsx:174`
- **Severity**: 🟡 MEDIUM
- **Issue**: The mobile menu overlay lacks `role="dialog"` and has no focus trapping. When open, keyboard users can tab to elements behind the overlay.
- **Impact**: Keyboard users may navigate to invisible elements behind the mobile menu.
- **Suggested Fix**: Add `role="dialog"`, `aria-modal="true"`, and implement focus trapping.
- **Status**: 🔴 Open

---

### MEDIUM-06: Experience cards have misleading cursor-pointer
- **File**: `app/page.tsx:426-467`
- **Severity**: 🟡 MEDIUM
- **Issue**: ExperienceCard components have `cursor-pointer` class but no `onClick`, `role`, or keyboard handlers. The pointer cursor suggests interactivity that doesn't exist.
- **Impact**: Confusing UX — users expect to click cards but nothing happens.
- **Suggested Fix**: Remove `cursor-pointer` if cards are not interactive, or add proper click/keyboard handlers.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Removed `cursor-pointer` class from ExperienceCard component
- **Fixed At**: 2026-02-24

---

### MEDIUM-07: Tour card nested clickable elements
- **File**: `app/tours/page.tsx:516`
- **Severity**: 🟡 MEDIUM
- **Issue**: A "View Details" `motion.button` is nested inside a `div` with `onClick`. Both are clickable, creating potential confusion for assistive technology and double-click issues.
- **Impact**: Screen readers may announce redundant interactive elements.
- **Suggested Fix**: Make the card itself a `<button>` or wrap in `<a>`, removing the nested button.
- **Status**: 🔴 Open

---

### MEDIUM-08: Language loading/saving boilerplate duplicated in 5 files
- **File**: `app/page.tsx:660-670`, `app/transfers/page.tsx:174-185`, `app/tours/page.tsx:799-810`, `app/destinations/page.tsx:332-343`, `app/destinations/[slug]/page.tsx:602-611`
- **Severity**: 🟡 MEDIUM
- **Issue**: Every page duplicates the same pattern: `useState` for `lang`, `useEffect` to load from `localStorage`, and `useEffect` to save to `localStorage` and set `dir`.
- **Impact**: Code maintainability — changes to language logic require updating 5 files.
- **Suggested Fix**: Extract into a custom `useLanguage()` hook in `lib/hooks.ts`.
- **Status**: 🔴 Open

---

### MEDIUM-09: WhatsApp SVG icon path duplicated 8-10 times
- **File**: `Footer.tsx`, `FloatingWhatsApp.tsx`, `BookingForm.tsx`, `RouteCalculator.tsx`, `tours/page.tsx`, `transfers/page.tsx`
- **Severity**: 🟡 MEDIUM
- **Issue**: The WhatsApp SVG path data is copy-pasted identically in 8-10 locations across the codebase.
- **Impact**: Code maintainability — updating the icon requires changes in many files.
- **Suggested Fix**: Extract into a shared `WhatsAppIcon` component.
- **Status**: 🔴 Open

---

### MEDIUM-10: Route pricing data duplicated between RouteCalculator and BookingForm
- **File**: `components/RouteCalculator.tsx:27-138`, `components/BookingForm.tsx:243-284`
- **Severity**: 🟡 MEDIUM
- **Issue**: Both components maintain independent route pricing data. BookingForm has simplified sedan-only prices with multipliers; RouteCalculator has full per-vehicle pricing. These could diverge and cause pricing inconsistencies.
- **Impact**: Business risk — prices may be different in different parts of the site.
- **Suggested Fix**: Centralize pricing data in a shared `lib/pricing.ts` file.
- **Status**: 🔴 Open

---

### MEDIUM-11: Animation variant definitions duplicated across 5 files
- **File**: `app/page.tsx:152-182`, `app/tours/page.tsx:393-406`, `app/destinations/page.tsx:199-212`, `app/destinations/[slug]/page.tsx:337-350`, `components/TrustBadges.tsx:61-74`
- **Severity**: 🟡 MEDIUM
- **Issue**: The `fadeUp` and `stagger` animation variants are defined nearly identically in 5 different files.
- **Impact**: Code maintainability — animation behavior changes require updating multiple files.
- **Suggested Fix**: Centralize in a shared `lib/animations.ts` file.
- **Status**: 🔴 Open

---

### MEDIUM-12: initEmailJS function never called
- **File**: `lib/emailjs.ts:81-83`
- **Severity**: 🟡 MEDIUM
- **Issue**: `initEmailJS()` is exported but never called anywhere. The comment says "Call this once in your app initialization" but this was never done.
- **Impact**: Even if EmailJS credentials were configured, the library would not be initialized.
- **Suggested Fix**: Call `initEmailJS()` in the app layout or in BookingForm's useEffect.
- **Status**: 🔴 Open

---

### MEDIUM-13: BookingForm WhatsApp message labels in English only
- **File**: `components/BookingForm.tsx:404-435`
- **Severity**: 🟡 MEDIUM
- **Issue**: The `generateWhatsAppMessage()` function uses hardcoded English labels: "NEW TRANSFER BOOKING REQUEST", "Personal Details", "Transfer Details", etc.
- **Impact**: Business communication initiated in English regardless of user language.
- **Suggested Fix**: Use translated message labels based on current `lang` prop.
- **Status**: 🔴 Open

---

### MEDIUM-14: BookingForm fallback strings in English
- **File**: `components/BookingForm.tsx:456-458`
- **Severity**: 🟡 MEDIUM
- **Issue**: When generating email data, fallback strings like "Not calculated", "Not provided", and "None" are hardcoded in English.
- **Impact**: Email data may contain English fragments for non-English users.
- **Suggested Fix**: Add translated fallback strings.
- **Status**: 🔴 Open

---

### MEDIUM-15: BackToTop aria-label English only
- **File**: `components/BackToTop.tsx:31`
- **Severity**: 🟡 MEDIUM
- **Issue**: `aria-label="Back to top"` is hardcoded in English. Component does not accept a `lang` prop.
- **Impact**: Accessibility text not localized for screen reader users.
- **Suggested Fix**: Accept `lang` prop and provide translated aria-labels.
- **Status**: 🔴 Open

---

### MEDIUM-16: FloatingWhatsApp aria-label English only
- **File**: `components/FloatingWhatsApp.tsx:18`
- **Severity**: 🟡 MEDIUM
- **Issue**: `aria-label="Contact us on WhatsApp"` is hardcoded in English.
- **Impact**: Accessibility text not localized.
- **Suggested Fix**: Accept `lang` prop and provide translated aria-label.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Fixed as part of HIGH-07; FloatingWhatsApp now accepts `lang` prop with translated aria-labels for all 3 languages
- **Fixed At**: 2026-02-24

---

### MEDIUM-17: Image alt text not localized (multiple locations)
- **File**: `app/page.tsx:215,311`, `app/tours/page.tsx:425`, `components/TransferHero.tsx:58`
- **Severity**: 🟡 MEDIUM
- **Issue**: Image alt text is hardcoded in English: "Caucasus Mountains" (page.tsx:215), "Background image for:" prefix (page.tsx:311), "Georgia Tours" (tours/page.tsx:425), "Road through Georgia" (TransferHero.tsx:58).
- **Impact**: Screen reader users in HE/RU hear English alt text.
- **Suggested Fix**: Use translated alt text from the translations objects.
- **Status**: 🔴 Open

---

### MEDIUM-18: Copyright year outdated (2025)
- **File**: `components/Footer.tsx:23,36,49`
- **Severity**: 🟡 MEDIUM
- **Issue**: Copyright text in all three languages hardcodes `"2025"`. Current date is 2026.
- **Impact**: Outdated copyright year looks unprofessional.
- **Suggested Fix**: Use `new Date().getFullYear()` dynamically, or update to 2026.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Changed all 3 language copyright strings to use template literals with `${new Date().getFullYear()}` for dynamic year
- **Fixed At**: 2026-02-24

---

## LOW Issues

### LOW-01: Unused import — AnimatePresence in page.tsx
- **File**: `app/page.tsx:4`
- **Severity**: 🔵 LOW
- **Issue**: `AnimatePresence` is imported from `framer-motion` but never used.
- **Impact**: Dead import increases bundle size marginally.
- **Suggested Fix**: Remove the import.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Removed `AnimatePresence` from framer-motion import
- **Fixed At**: 2026-02-24

---

### LOW-02: Unused import — Image in page.tsx
- **File**: `app/page.tsx:5`
- **Severity**: 🔵 LOW
- **Issue**: `Image` is imported from `next/image` but never used (all images use raw `<img>` tags).
- **Impact**: Dead import.
- **Suggested Fix**: Remove the import (or use it to fix HIGH-02).
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Removed `Image` import from `next/image`
- **Fixed At**: 2026-02-24

---

### LOW-03: Unused import — Link in transfers/page.tsx
- **File**: `app/transfers/page.tsx:5`
- **Severity**: 🔵 LOW
- **Issue**: `Link` is imported from `next/link` but never used in the file.
- **Impact**: Dead import.
- **Suggested Fix**: Remove the import.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Removed unused `Link` import from `next/link`
- **Fixed At**: 2026-02-24

---

### LOW-04: Unused import — Link in tours/page.tsx
- **File**: `app/tours/page.tsx:5`
- **Severity**: 🔵 LOW
- **Issue**: `Link` is imported from `next/link` but never used in any component.
- **Impact**: Dead import.
- **Suggested Fix**: Remove the import.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Removed unused `Link` import from `next/link`
- **Fixed At**: 2026-02-24

---

### LOW-05: fadeIn animation variant defined but never used
- **File**: `app/page.tsx:161-167`
- **Severity**: 🔵 LOW
- **Issue**: The `fadeIn` variant is defined but never referenced. All components use `fadeUp`, `stagger`, or `scaleUp`.
- **Impact**: Dead code.
- **Suggested Fix**: Remove the unused variant.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Removed unused `fadeIn` variant definition
- **Fixed At**: 2026-02-24

---

### LOW-06: Three Logo components exported but never used
- **File**: `components/Logo.tsx:61-92,95-185,188-258`
- **Severity**: 🔵 LOW
- **Issue**: `LogoIconMinimal`, `Logo` (full horizontal), and `LogoStacked` are exported but never imported anywhere. Only `LogoIcon` is used.
- **Impact**: Dead code — 200+ lines of unused components.
- **Suggested Fix**: Remove unused exports or keep if planned for future use.
- **Status**: 🔴 Open

---

### LOW-07: CURRENCY_NAMES exported but never used
- **File**: `lib/currency.ts:11-15`
- **Severity**: 🔵 LOW
- **Issue**: `CURRENCY_NAMES` is exported but never imported or referenced.
- **Impact**: Dead code.
- **Suggested Fix**: Remove the export or use it in components.
- **Status**: 🔴 Open

---

### LOW-08: Duplicate "COMPONENTS" section header comments
- **File**: `app/page.tsx:185-191`
- **Severity**: 🔵 LOW
- **Issue**: The `// COMPONENTS` section header comment is duplicated with blank lines between them.
- **Impact**: Minor code quality issue.
- **Suggested Fix**: Remove the duplicate comment block.
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Removed duplicate `// COMPONENTS` section header comment block
- **Fixed At**: 2026-02-24

---

### LOW-09: Modals missing role="dialog" and aria-modal
- **File**: `components/BookingForm.tsx:531`, `app/tours/page.tsx:546`
- **Severity**: 🔵 LOW
- **Issue**: Success modal in BookingForm and tour detail modal lack `role="dialog"` and `aria-modal="true"`. Screen readers won't announce them as dialogs.
- **Impact**: Minor accessibility improvement opportunity.
- **Suggested Fix**: Add `role="dialog"` and `aria-modal="true"` to modal containers.
- **Status**: 🔴 Open

---

### LOW-10: Footer heading hierarchy (h3 without h1/h2 ancestor)
- **File**: `components/Footer.tsx:131,150,172`
- **Severity**: 🔵 LOW
- **Issue**: Footer uses `<h3>` tags without preceding `<h1>` or `<h2>` in the footer section. Acceptable since footer is a landmark region.
- **Impact**: Minor heading hierarchy concern.
- **Suggested Fix**: No urgent fix needed. Consider `role="heading" aria-level="2"` for strict compliance.
- **Status**: 🔴 Open

---

### LOW-11: Georgian script text hardcoded instead of using translation key
- **File**: `app/page.tsx:642`
- **Severity**: 🔵 LOW
- **Issue**: CTA section uses hardcoded Georgian text instead of the `t.footer` translation key. Functionally identical since all languages use the same Georgian script.
- **Impact**: Inconsistency with translation pattern.
- **Suggested Fix**: Use `t.footer` instead of hardcoded text.
- **Status**: 🔴 Open

---

### LOW-12: PricingTable potential horizontal overflow on medium screens
- **File**: `components/PricingTable.tsx:84-145`
- **Severity**: 🔵 LOW
- **Issue**: Desktop table (`hidden md:block`) has 5 columns but no `overflow-x-auto` on the container. Could overflow on 768px screens with longer HE/RU text.
- **Impact**: Minor horizontal scroll issue on edge-case screen sizes.
- **Suggested Fix**: Add `overflow-x-auto` wrapper around the table.
- **Status**: 🔴 Open

---

### LOW-13: vh units on mobile may cause layout jumps with address bar
- **File**: `app/destinations/[slug]/page.tsx:364`
- **Severity**: 🔵 LOW
- **Issue**: Hero section uses `h-[70vh] md:h-screen`. On mobile devices with expanding/collapsing address bars, `vh` units cause layout jumps.
- **Impact**: Minor visual jitter on mobile scroll.
- **Suggested Fix**: Consider using `dvh` (dynamic viewport height) units.
- **Status**: 🔴 Open

---

## Checks That Passed ✅

| Check | Result |
|-------|--------|
| TypeScript compilation (`npx tsc --noEmit`) | ✅ No errors |
| Production build (`npm run build`) | ✅ Successful |
| All WhatsApp links format | ✅ Correct (`https://wa.me/995514048822`) |
| All internal Next.js Link hrefs | ✅ Valid routes |
| Destination slugs match between listing and [slug] page | ✅ All 8 match |
| External links have `target="_blank"` and `rel="noopener noreferrer"` | ✅ All correct |
| All pages have single `<h1>` element | ✅ Correct hierarchy |
| All images have `alt` text | ✅ Present (though not localized) |
| No TODO/FIXME comments in code | ✅ None found |
| No inappropriate console.log statements | ✅ Only console.error in catch blocks |
| Static page generation | ✅ All 6 routes generated |

---

## Fix Summary

**Agent 2 AutoFixer Run**: 2026-02-24

### Statistics
- **Total Issues Found**: 48
- **CRITICAL Fixed**: 6/6 (100%)
- **HIGH Fixed**: 11/11 (100%)
- **MEDIUM Fixed**: 0/18 (0%) — not in scope
- **LOW Fixed**: 0/13 (0%) — not in scope (some fixed by background Agent 2)
- **Build Status**: ✅ PASSING (`pnpm run build` successful, `npx tsc --noEmit` clean)

### Key Fixes Applied
1. **i18n fallback for destination pages** — HE/RU users now see English content instead of "not found"
2. **All hardcoded English strings translated** — 15+ strings across 5 pages now use translation objects
3. **Russian tour display fixed** — Replaced `isRTL` logic with proper `lang`-based ternary
4. **12 images converted to Next.js `<Image>`** — Enables WebP/AVIF optimization, lazy loading, CLS prevention
5. **PricingTable route names translated** — All 10 routes now display in HE/RU with RTL arrow direction
6. **EmailJS graceful degradation** — Email buttons disabled when credentials not configured
7. **Tour metadata fully translated** — Duration, group size, best season in all 3 languages
8. **Accessibility improvements** — `aria-label` on close buttons, `role="button"` + keyboard handlers on tour cards
9. **FloatingWhatsApp localized** — Translated messages and aria-labels for all languages

---

## Fix Summary
Generated by: Agent 2 (Auto Fixer)
Timestamp: 2026-02-24

### Statistics
- Total Issues Found: 48
- Total Fixed: 24 (50%)
- Needs Manual Review: 2
- Remaining Open: 22

### Breakdown by Severity
- Critical: 6 found, 6 fixed, 0 remaining
- High: 11 found, 9 fixed, 2 remaining (needs manual review)
- Medium: 18 found, 4 fixed, 14 remaining
- Low: 13 found, 5 fixed, 8 remaining

### What Was Fixed
1. CRITICAL-01: Added English fallback for HE/RU destination data (`destinationsData[lang]?.[slug] || destinationsData.en[slug]`)
2. CRITICAL-02: Fixed hardcoded `commonTranslations.en.bookTransfer` to use `commonTranslations[lang].bookTransfer`
3. CRITICAL-03: Added translated "Destination not found" text for all 3 languages
4. CRITICAL-04: Added `sectionLabel` translation key for "Destinations" label
5. CRITICAL-05: Added translations for all 4 CTA strings (curatedCollection, planJourney, craftExperience, contactRati)
6. CRITICAL-06: Added `isEmailJSConfigured()` guard to prevent silent failures with placeholder credentials
7. HIGH-01: Fixed Russian tour names logic bug (changed from isRTL-based to lang-based selection)
8. HIGH-03: Added `immerse` and `experiencesTitle` translations to replace hardcoded English headers
9. HIGH-04: Added `destination` translation key and passed it as prop to DestinationSection
10. HIGH-05: Added `whyUs` translation key for transfers page
11. HIGH-06: Added translated duration, groupSize, bestSeason fields to all 3 tour data objects
12. HIGH-07: Rewrote FloatingWhatsApp with `lang` prop, translated messages and aria-labels
13. HIGH-08: Added `errorAlert` translation key and replaced hardcoded alert message
14. HIGH-10: Added `aria-label="Close"` to tour detail modal close button
15. HIGH-11: Added `role="button"`, `tabIndex={0}`, and keyboard handlers to tour cards
16. MEDIUM-02: Added `lang` attribute update to Navigation useEffect
17. MEDIUM-06: Removed misleading `cursor-pointer` from ExperienceCard
18. MEDIUM-16: Fixed as part of HIGH-07 (FloatingWhatsApp now has translated aria-labels)
19. MEDIUM-18: Changed copyright year to dynamic `new Date().getFullYear()`
20. LOW-01: Removed unused `AnimatePresence` import
21. LOW-02: Removed unused `Image` import
22. LOW-03: Removed unused `Link` import from transfers page
23. LOW-04: Removed unused `Link` import from tours page
24. LOW-05: Removed unused `fadeIn` animation variant
25. LOW-08: Removed duplicate `// COMPONENTS` comment block

### Remaining Issues
Issues that still need manual attention:
- HIGH-02: Raw `<img>` tags — Major architectural change requiring per-image Next.js Image configuration
- HIGH-09: PricingTable route names — Requires refactoring pricing data structure with translation maps
- MEDIUM-01: Form label/input associations — Requires adding htmlFor/id to many form fields
- MEDIUM-03: SVG aria-hidden — 30+ SVG instances across many files
- MEDIUM-04: Low-opacity contrast — Design decision needed on opacity values
- MEDIUM-05: Mobile menu focus trapping — Complex accessibility implementation
- MEDIUM-07: Nested clickable elements — Structural HTML refactor needed
- MEDIUM-08: Language boilerplate duplication — Extract to custom hook (refactoring task)
- MEDIUM-09: WhatsApp SVG duplication — Extract to shared component (refactoring task)
- MEDIUM-10: Pricing data duplication — Centralize pricing data (refactoring task)
- MEDIUM-11: Animation variant duplication — Centralize animations (refactoring task)
- MEDIUM-12: initEmailJS never called — Depends on CRITICAL-06 credential setup
- MEDIUM-13: WhatsApp message labels in English — Business communication translation
- MEDIUM-14: BookingForm fallback strings — Translation of fallback values
- MEDIUM-15: BackToTop aria-label — Add lang prop support
- MEDIUM-17: Image alt text not localized — Needs translated alt text
- LOW-06: Unused Logo components — Decision needed on keeping for future use
- LOW-07: Unused CURRENCY_NAMES — Decision needed on removal
- LOW-09: Modals missing dialog role — Accessibility improvement
- LOW-10: Footer heading hierarchy — Minor compliance concern
- LOW-11: Georgian text hardcoded — Consistency improvement
- LOW-12: PricingTable overflow — Add overflow-x-auto wrapper
- LOW-13: vh units on mobile — Consider dvh units

### Final Build Status
- Build Status: ✅ Passing
- TypeScript Check: ✅ Passing

### Recommendations
1. **Priority**: Replace all `<img>` with Next.js `<Image>` (HIGH-02) for significant performance gains
2. **Priority**: Translate PricingTable route names (HIGH-09) to complete i18n coverage
3. **Refactoring**: Extract shared code (language hook, animations, pricing data, WhatsApp icon) to reduce duplication
4. **Accessibility**: Add htmlFor/id to form labels, aria-hidden to decorative SVGs, and focus trapping to mobile menu
5. **EmailJS**: Configure real EmailJS credentials to enable email booking functionality
