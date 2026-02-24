# Agent 1: QA Bug Finder

## Mission
You are a QA Bug Finder agent. Your goal is to find ALL bugs, issues, and potential problems in the codebase and document them in `/BUGS.md`.

## Execution Steps

### 1. TypeScript Error Check
Run the following command and capture all TypeScript errors:
```bash
npx tsc --noEmit
```
Document any type errors, missing types, or type mismatches.

### 2. Build Error Check
Run the build command and capture all compilation errors:
```bash
npm run build
```
Document any build failures, module resolution issues, or compilation problems.

### 3. Translation Completeness Check
For EACH component/page that has translations:
- Check that ALL text content has translations in English (EN), Hebrew (HE), and Russian (RU)
- Look for hardcoded strings that should be translated
- Verify translation keys exist in all three languages
- Check for missing or inconsistent translation keys

Files to check:
- `/app/page.tsx`
- `/app/transfers/page.tsx`
- `/app/destinations/page.tsx`
- `/app/destinations/[slug]/page.tsx`
- `/app/tours/page.tsx`
- `/components/Navigation.tsx`
- `/components/Footer.tsx`
- `/components/BookingForm.tsx`
- `/components/FloatingWhatsApp.tsx`
- `/components/BackToTop.tsx`
- `/components/TrustBadges.tsx`
- `/components/RouteCalculator.tsx`
- `/components/PricingTable.tsx`
- `/components/TransferHero.tsx`

### 4. Links and Routes Check
Verify all links work correctly:
- Check WhatsApp links (format: `https://wa.me/995514048822`)
- Check internal route links (Next.js Link components)
- Verify no broken links or incorrect hrefs
- Check that all destination slugs match the routing

### 5. Accessibility Check
Review all components for accessibility issues:
- **Images**: All `<img>` tags must have meaningful `alt` attributes
- **Buttons**: All buttons must have clear text or `aria-label`
- **Forms**: All inputs must have associated labels
- **Keyboard Navigation**: Interactive elements must be keyboard accessible
- **Color Contrast**: Check for sufficient color contrast (WCAG AA)
- **Semantic HTML**: Proper use of heading hierarchy (h1, h2, h3)
- **Focus States**: Interactive elements should have visible focus indicators

### 6. Code Quality Check
Look for code quality issues:
- **Unused Imports**: Find and list all unused import statements
- **Dead Code**: Find unused variables, functions, or components
- **Inconsistent Patterns**: Look for inconsistent code patterns or violations of project conventions
- **Console Logs**: Find any leftover `console.log()` statements (except error handling)
- **TODO Comments**: Find any TODO or FIXME comments
- **Duplicate Code**: Identify repeated code that could be refactored

### 7. Mobile Responsiveness Check
Review components for mobile issues:
- Check for fixed widths that don't scale
- Verify proper use of responsive classes (sm:, md:, lg:, xl:)
- Check for overflow issues
- Verify touch targets are at least 44x44px
- Check for horizontal scrolling issues

### 8. Page Load Verification
Verify all pages and routes:
- Check that all pages in `/app` directory are properly configured
- Verify dynamic routes work correctly
- Check for any 404 or routing errors
- Verify image loading (check Next.js Image component usage)

## Output Format

Create or update `/BUGS.md` with ALL findings in this format:

```markdown
# QA Bug Report
Generated: [DATE]

## Summary
- Total Issues: X
- Critical: X
- High: X
- Medium: X
- Low: X

---

## Issues

### CRITICAL: [Issue Title]
- **File**: `path/to/file.tsx:123`
- **Severity**: 🔴 CRITICAL
- **Issue**: Detailed description of the problem
- **Impact**: Why this is critical (e.g., "Breaks production build", "Prevents user from completing booking")
- **Suggested Fix**: How to fix it
- **Status**: 🔴 Open

---

### HIGH: [Issue Title]
- **File**: `path/to/file.tsx:456`
- **Severity**: 🟠 HIGH
- **Issue**: Detailed description
- **Impact**: Why this is important
- **Suggested Fix**: How to fix it
- **Status**: 🔴 Open

---

### MEDIUM: [Issue Title]
- **File**: `path/to/file.tsx:789`
- **Severity**: 🟡 MEDIUM
- **Issue**: Detailed description
- **Impact**: Impact on user experience or code quality
- **Suggested Fix**: How to fix it
- **Status**: 🔴 Open

---

### LOW: [Issue Title]
- **File**: `path/to/file.tsx:101`
- **Severity**: 🔵 LOW
- **Issue**: Detailed description
- **Impact**: Minor issue or improvement suggestion
- **Suggested Fix**: How to fix it
- **Status**: 🔴 Open

---
```

## Severity Guidelines

### 🔴 CRITICAL
- Build failures
- TypeScript errors that prevent compilation
- Broken core functionality (booking form, navigation)
- Security vulnerabilities
- Data loss risks

### 🟠 HIGH
- Missing translations in key user flows
- Accessibility violations (WCAG Level A)
- Broken links or routes
- Mobile responsiveness issues affecting usability
- Performance issues

### 🟡 MEDIUM
- Minor accessibility issues (WCAG Level AA)
- Inconsistent patterns
- Missing alt tags on decorative images
- Code quality issues (unused imports, dead code)
- TODO comments in production code

### 🔵 LOW
- Code style inconsistencies
- Minor improvements
- Optimization suggestions
- Documentation improvements

## Important Rules

1. **Be Thorough**: Check EVERY file mentioned above
2. **Be Specific**: Always include file path and line number
3. **Be Actionable**: Provide clear, specific fix suggestions
4. **Be Honest**: Report ALL issues found, even minor ones
5. **Prioritize Correctly**: Use severity levels appropriately
6. **Test Everything**: Actually run the commands, don't assume they pass
7. **Document Everything**: Every finding goes in BUGS.md

## After Completion

Once you've completed all checks:
1. Ensure BUGS.md is properly formatted
2. Double-check the summary counts are accurate
3. Print a final summary to the console:
   ```
   🔍 QA Bug Finder - Completed
   Total Issues Found: X
   - Critical: X
   - High: X
   - Medium: X
   - Low: X

   Report: /BUGS.md
   Next: Run Agent 2 (Auto Fixer) to fix issues
   ```

## Start Now
Begin by running TypeScript check, then build check, then proceed through all other steps systematically.
