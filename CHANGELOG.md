# Changelog

All notable changes to this project, grouped by date. This project does not follow semantic versioning (it's a static site, not a package).

## 2026-07-06
- Added an explicit all-rights-reserved `LICENSE`.

## 2026-04-18
- Added Subresource Integrity (SRI) hashes to the React/ReactDOM UMD CDN `<script>` tags for supply-chain security.
- Removed the deprecated `AGENTS.md` in favor of `CLAUDE.md` as the canonical AI-assistant project doc.

## 2026-04-17
- Added `CLAUDE.md` project notes and a feature analysis document (`contractor-feature-analysis-2026-03-25.md`) auditing what's implemented and known gaps (e.g. emoji-based before/after placeholders instead of real photos, no CMS, no submission error UX).

## 2026-03-24
- Fixed `app.js` to load via a relative path so the site works correctly when hosted on GitHub Pages.

## 2026-03-21
- Cross-project sweep: added Open Graph meta tags, accessibility improvements, and performance fixes.
- Added meta descriptions, `prefers-reduced-motion` support, and favicon fixes.

## 2026-03-20
- Added a robust `noscript` fallback describing the business and services for users/crawlers without JavaScript.
- Accessibility fix: added a fallback shell and keyboard-safe navigation link.
- Tokenized hardcoded hex color values into CSS custom properties and replaced an inline nav click handler with CSS.

## 2026-03-19
- Housekeeping: added a local archives ignore rule and synced local changes.

## 2026-03-17
- Added keyboard focus styling to the landing page.

## 2026-03-16
- Added a backlink to the DaveHomeAssist portfolio hub.

## 2026-03-15
- Added the favicon pack and wired up page icons.

## 2026-03-12
- Initial project snapshot: the Summit Contracting single-page React app (services, portfolio, reviews, quote form) with Netlify hosting config.
