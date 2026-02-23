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

### Multi-Language Support (i18n)
- Supports English (`en`), Hebrew (`he`), and Russian (`ru`)
- RTL support for Hebrew via `dir` attribute on `<html>`
- Language state is managed in page components and passed down to child components
- Translations are defined inline in each page file under a `content` or `translations` object
- Language preference is persisted to `localStorage` under key `visitGeorgia_lang`

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

### Animation Patterns
Uses Framer Motion extensively with consistent patterns:
- `useScroll` + `useTransform` for parallax effects
- `useInView` for scroll-triggered animations
- Standard variants: `fadeUp`, `fadeIn`, `stagger`, `scaleUp` (defined in page files)
- Cubic-bezier easing: `[0.16, 1, 0.3, 1]` for smooth motion

### Styling
- Tailwind CSS with custom theme extensions in `tailwind.config.js`
- Custom font families: `font-display` (Playfair Display), `font-body` (Inter), `font-georgian` (Noto Serif Georgian)
- Custom gold color palette for brand accents
- CSS utilities in `app/globals.css`: `.noise`, `.glass`, `.mesh-gradient`, `.gradient-text`
- Dark theme by default (`bg-[#0a0a0a]`)

### Path Aliases
- `@/*` maps to project root (e.g., `@/components/Navigation`)
