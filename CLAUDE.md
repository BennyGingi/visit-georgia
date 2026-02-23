# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm install      # Install dependencies
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server
```

## Architecture Overview

This is a **Next.js 16** tourism website for Georgia (the country) using the App Router, built with TypeScript, Tailwind CSS, and Framer Motion for animations.

### Images Configuration
- External images are configured to load from `images.unsplash.com` using `remotePatterns` in `next.config.js`
- All image URLs are centralized in page files under an `IMAGES` constant object

### Multi-Language Support (i18n)
- Supports English (`en`), Hebrew (`he`), and Russian (`ru`)
- RTL support for Hebrew via `dir` attribute on `<html>` (set in Navigation component's useEffect)
- Language state is managed in page components via `useState` and passed down to child components as props
- Translations are defined inline in each page/component file under a `content` or `translations` object
- Language preference is persisted to `localStorage` under key `visitGeorgia_lang`
- Components requiring language must receive `lang` and `setLang` props from parent pages

### Page Structure
- `/` - Main cinematic homepage with full-screen parallax sections
- `/transfers` - Transfer/taxi booking page with route calculator and pricing
- `/destinations` - Destination listing page
- `/destinations/[slug]` - Individual destination pages

### Component Architecture
Components in `/components` are reusable across pages:
- `Navigation` - Sticky header with language switcher and mobile menu
- `Footer` - Multi-language footer with contact info
- `FloatingWhatsApp` - Fixed WhatsApp contact button
- `BackToTop` - Scroll-to-top button
- `TrustBadges` - Social proof section
- `RouteCalculator` - Interactive transfer price calculator
- `PricingTable` - Transfer pricing display
- `TransferHero` - Hero section for transfers page
- `ThemeToggle` - Dark/light mode toggle component
- `Logo` - Brand logo icon component

### Animation Patterns
Uses Framer Motion extensively with consistent patterns:
- `useScroll` + `useTransform` for parallax effects
- `useInView` for scroll-triggered animations
- Standard variants: `fadeUp`, `fadeIn`, `stagger`, `scaleUp` (defined in page files)
- Cubic-bezier easing: `[0.16, 1, 0.3, 1]` for smooth motion

### Styling
- Tailwind CSS with custom theme extensions in `tailwind.config.js`
- Custom font families:
  - `font-display` (Playfair Display) - for headlines
  - `font-serif` (Cormorant Garamond) - alternative serif
  - `font-body` (Inter) - body text
  - `font-georgian` (Noto Serif Georgian) - Georgian text
- **Three Color Palettes**:
  - **Cinematic Dark**: `cinema.black`, `cinema.dark`, `cinema.mid`, `cinema.soft`, `gold-aged`, `gold-bright`, `gold-dim`
  - **Luxury Elegant**: `ivory`, `cream`, `linen`, `stone`, `umber`, `espresso`, `ink`, `terracotta`, `forest`
  - **Adventure Bold**: `gold-glow` (rgba)
- **Custom Animations** (defined in `tailwind.config.js`):
  - `fade-in`, `slide-up`, `float`, `ken-burns`, `fade-in-down`, `reveal-up`, `glow-pulse`
- **CSS Utilities** in `app/globals.css`:
  - Basic effects: `.noise`, `.gradient-text`, `.text-stroke`, `.glass`, `.mesh-gradient`
  - Cinematic theme: `.noise-grain`, `.vignette`, `.vignette-strong`, `.gold-glow`, `.gold-box-glow`, `.cinema-border`
  - Elegant theme: `.elegant-link`, `.luxury-image`, `.cream-glass`, `.ornamental-divider`
  - Adventure theme: `.glow-button`, `.diagonal-clip`, `.stat-large`, `.adventure-badge`
  - Easing utilities: `.ease-cinematic`, `.ease-elegant`
  - Animations: `.ken-burns`, `.scroll-indicator`, `.img-zoom`
- Dark theme by default (`bg-[#0a0a0a]`), supports light mode via `darkMode: 'class'`
- RTL support built into CSS with `[dir="rtl"]` selectors

### Path Aliases
- `@/*` maps to project root (e.g., `@/components/Navigation`)

### Client-Side Rendering
- All pages and most components use `'use client'` directive due to:
  - Framer Motion animations requiring browser APIs
  - `localStorage` for language persistence
  - Interactive state management (scroll, hover, click handlers)
