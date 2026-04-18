# Contractor (Summit Contracting) -- Feature Analysis

**Date:** 2026-03-25
**Files analyzed:** `index.html`, `app.js`
**Stack:** Static HTML + React 18 (CDN) + vanilla JS, Netlify hosting

---

## Summary Table

| Feature | Status | Data Source / Persistence | Critical Gap |
|---|---|---|---|
| Hash-based SPA router | Working | URL hash (`#/`) | No browser history support (back/forward quirky) |
| Service catalog (6 services) | Working | Hardcoded in `app.js` SERVICES array | No CMS; every content change requires code edit |
| Project portfolio (6 projects) | Working | Hardcoded in `app.js` PROJECTS array | No real images -- emoji placeholders only |
| Customer reviews (8 reviews) | Working | Hardcoded in `app.js` REVIEWS array | No live review feed integration |
| Netlify form submission (quote form) | Working | Netlify Forms (`form-name: "quote"`) | No error UX on submission failure |
| Service area map (6 regions) | Working | Hardcoded SERVICE_AREAS array | Text-only -- no interactive map |
| Trust bar | Working | Hardcoded TRUST array | Static; years computed dynamically from founded date |
| FAQ accordion (per-service) | Working | Hardcoded in each service object | None |
| Mobile bottom bar (call + estimate) | Working | CSS media query, fixed position | None |
| Loading spinner | Working | Inline `<script>` in index.html | 3s max timeout fallback |
| Noscript fallback | Working | Static HTML in `<noscript>` | Good SEO fallback |
| Skip link + focus-visible | Working | CSS + HTML | Good accessibility baseline |
| Reduced-motion support | Working | `prefers-reduced-motion` media query | None |
| OG/Twitter meta tags | Working | Static in `<head>` | No og:image defined |

---

## Detailed Feature Analysis

### 1. Hash-Based SPA Router
**Problem it solves:** Enables multi-page navigation within a single HTML file without a server.
**Implementation:** Custom `useHash()` hook listens to `hashchange` events. `nav()` helper sets `window.location.hash` and smooth-scrolls to top. Routes: `#/`, `#/services/{slug}`, `#/projects/{slug}`, `#/gallery`, `#/reviews`, `#/about`, `#/contact`.
**Tradeoffs:** Simple and zero-dependency. No code-splitting. All JS loads upfront (~30K tokens of app.js). No support for query parameters.

### 2. Service Catalog
**Problem it solves:** Showcases 6 contracting services with rich detail (descriptions, item lists, process steps, FAQs, price ranges).
**Implementation:** `SERVICES` array with full data objects. `ServiceCard` component renders grid cards. Service detail pages render inline items, process steps, and per-service FAQs.
**Tradeoffs:** Data is comprehensive (items, process, FAQs, price ranges per service) but entirely hardcoded. Adding/editing services requires editing app.js.

### 3. Netlify Quote Form
**Problem it solves:** Lead capture with server-side form processing.
**Implementation:** Hidden HTML form with `netlify` and `netlify-honeypot` attributes in index.html for Netlify detection. React `QuoteForm` component posts via `fetch("/")` with URL-encoded form data, including `form-name: "quote"` and honeypot field.
**Tradeoffs:** Bot protection via honeypot. Submission disables button and shows sending state. Error handling catches failures but does not display user-facing error messages -- just re-enables the form.

### 4. Project Portfolio with Before/After
**Problem it solves:** Social proof via detailed case studies.
**Implementation:** `PROJECTS` array with scope, challenge, solution, result, budget, and timeline fields. `ProjectCard` renders emoji-based before/after split view. Gallery page supports filter chips by service category.
**Tradeoffs:** Emoji placeholders instead of real photos significantly limits visual impact. The data quality is high (specific neighborhoods, budgets, timelines) but the presentation undersells it.

### 5. Design System
**Problem it solves:** Consistent visual identity across the industrial/contractor aesthetic.
**Implementation:** CSS custom properties (`--steel`, `--orange`, `--concrete`, `--charcoal`), Google Fonts (Bitter for display, Source Sans 3 for body). CSS injected via template literal in `CSS` constant. Responsive breakpoints at 900px, 768px, 480px.
**Tradeoffs:** All CSS is a single string injected as a `<style>` tag -- no hot-reload, no IDE autocomplete. Design is polished but monolithic.

---

## Top 3 Priorities

1. **Add real project photography.** The emoji before/after placeholders are the single biggest gap between the data quality and the visual impression. Even stock photos would improve conversion.

2. **Add og:image meta tag.** Social sharing has no image, which hurts click-through when shared on Facebook, LinkedIn, or iMessage.

3. **Surface form submission errors to the user.** The catch block silently re-enables the form. A visible error message ("Something went wrong, please call us at...") would prevent lost leads.
