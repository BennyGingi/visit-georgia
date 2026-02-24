# Security Audit Report

**Project:** Visit Georgia
**Date:** 2026-02-24
**Auditor:** Automated Security Scan + Manual Review
**Status:** All CRITICAL and HIGH issues remediated

---

## Executive Summary

Full 12-point security audit of the Visit Georgia Next.js tourism website. The application is a static/client-side rendered site with no backend API, database, or authentication — which significantly reduces the attack surface. All CRITICAL and HIGH issues have been fixed.

| Severity | Found | Fixed | Remaining |
|----------|-------|-------|-----------|
| CRITICAL | 0     | 0     | 0         |
| HIGH     | 3     | 3     | 0         |
| MEDIUM   | 3     | 0     | 3         |
| LOW      | 2     | 0     | 2         |
| INFO     | 3     | 0     | 3         |

---

## Findings

### HIGH Severity (Fixed)

#### HIGH-01: Missing Security Headers
- **Category:** Missing Security Headers
- **Location:** `next.config.js`
- **Description:** No security headers were configured, leaving the site vulnerable to clickjacking, MIME sniffing, and other header-based attacks.
- **Fix Applied:** Added comprehensive security headers via `next.config.js` `async headers()`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `X-DNS-Prefetch-Control: on`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - Full Content Security Policy (see HIGH-02)

#### HIGH-02: Missing Content Security Policy
- **Category:** CSP
- **Location:** `next.config.js`
- **Description:** No CSP header was set, allowing unrestricted script/style/image loading.
- **Fix Applied:** Added strict CSP allowing only required origins:
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.emailjs.com`
  - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
  - `font-src 'self' https://fonts.gstatic.com`
  - `img-src 'self' data: blob: https://images.unsplash.com`
  - `connect-src 'self' https://api.emailjs.com https://wa.me`
  - `frame-ancestors 'none'`
  - `base-uri 'self'`
  - `form-action 'self'`
- **Note:** `unsafe-inline` and `unsafe-eval` are required by Next.js and Framer Motion. Migrating to nonce-based CSP would require a custom `_document` setup.

#### HIGH-03: `window.open` Missing Security Parameters
- **Category:** Open Redirect / Tab Nabbing
- **Location:** `components/BookingForm.tsx`
- **Description:** `window.open(url, '_blank')` was called without `noopener,noreferrer`, allowing the opened page to access `window.opener`.
- **Fix Applied:** Changed to `window.open(url, '_blank', 'noopener,noreferrer')`.

---

### MEDIUM Severity (Accepted Risk)

#### MEDIUM-01: CSP Allows `unsafe-inline` and `unsafe-eval`
- **Category:** CSP Strictness
- **Location:** `next.config.js`
- **Description:** The CSP includes `'unsafe-inline'` for scripts/styles and `'unsafe-eval'` for scripts. This weakens XSS protection.
- **Reason Accepted:** Required by Next.js dev mode, Framer Motion runtime, and Tailwind CSS inline styles. Removing these would break core functionality. Nonce-based CSP is the proper fix but requires significant architecture changes.

#### MEDIUM-02: No Rate Limiting on Form Submission
- **Category:** Abuse Prevention
- **Location:** `components/BookingForm.tsx`
- **Description:** The booking form has no rate limiting. A user could spam email submissions via EmailJS.
- **Reason Accepted:** EmailJS has its own rate limiting (200 emails/month on free tier). The form disables the submit button during submission. For a tourism site with low volume, this is acceptable risk. Server-side rate limiting would require an API route.

#### MEDIUM-03: localStorage Used Without Integrity Check
- **Category:** Data Integrity
- **Location:** Multiple components (language preference)
- **Description:** Language preference is stored in `localStorage` under key `visitGeorgia_lang`. A malicious script could modify this value.
- **Reason Accepted:** The stored value is only used to set UI language (en/he/ru) and is validated against known values. No security-sensitive data is stored in localStorage. Impact of tampering is limited to UI language change.

---

### LOW Severity (Informational)

#### LOW-01: EmailJS Public Key Exposed in Client Bundle
- **Category:** Secret Exposure
- **Location:** `lib/emailjs.ts`
- **Description:** EmailJS public key is bundled into client-side JavaScript via `NEXT_PUBLIC_*` env vars.
- **Reason Accepted:** EmailJS public keys are designed to be client-side. The key only allows sending emails through the configured template — it cannot read emails or access the account. This is the intended usage pattern per EmailJS documentation.

#### LOW-02: Form Input Lengths Could Be Stricter
- **Category:** Input Validation
- **Location:** `components/BookingForm.tsx`
- **Description:** While `maxLength` has been added to all inputs (name:100, email:254, phone:20, flight:10, notes:500), there is no server-side validation since all processing is client-side.
- **Reason Accepted:** All form data is sent to EmailJS (third-party) or composed into a WhatsApp URL (user-initiated). No data is stored in a database. Client-side validation with `maxLength` and type attributes provides adequate protection for this use case.

---

### INFO (No Action Required)

#### INFO-01: No `dangerouslySetInnerHTML` or `eval()` Usage
- **Category:** XSS
- **Finding:** No instances of `dangerouslySetInnerHTML`, `eval()`, or `Function()` constructor found in the codebase. All dynamic content is rendered through React's built-in XSS protection.

#### INFO-02: All External Links Have `rel="noopener noreferrer"`
- **Category:** Tab Nabbing
- **Finding:** All 10+ instances of `target="_blank"` in the codebase include `rel="noopener noreferrer"`.

#### INFO-03: No Known Dependency Vulnerabilities
- **Category:** Supply Chain
- **Finding:** `pnpm audit` reports 0 vulnerabilities across all dependencies.

---

## Audit Checklist

| # | Check | Result |
|---|-------|--------|
| 1 | XSS vulnerabilities (dangerouslySetInnerHTML, eval) | None found |
| 2 | Injection risks (SQL, command) | N/A - no backend/database |
| 3 | Exposed secrets in git history | None found |
| 4 | Content Security Policy | Added (HIGH-02) |
| 5 | Security headers (HSTS, X-Frame-Options, etc.) | Added (HIGH-01) |
| 6 | Open redirects | Fixed window.open (HIGH-03) |
| 7 | CSRF protection | N/A - no state-changing API routes |
| 8 | Rate limiting | EmailJS-level only (MEDIUM-02) |
| 9 | Dependency vulnerabilities | 0 found via pnpm audit |
| 10 | Unsafe localStorage usage | Language pref only (MEDIUM-03) |
| 11 | Input validation / maxLength | Added to all form fields |
| 12 | Unsafe patterns (eval, innerHTML) | None found |

---

## Recommendations for Future Development

1. **If adding API routes:** Implement server-side rate limiting, CSRF tokens, and input validation.
2. **If adding authentication:** Use `httpOnly` cookies (not localStorage), implement session management, add RBAC.
3. **If adding a database:** Parameterize all queries, add server-side input sanitization.
4. **CSP improvement:** Migrate to nonce-based CSP when Next.js/Framer Motion support allows it.
5. **Subresource Integrity:** Add SRI hashes to any externally loaded scripts (EmailJS CDN).
