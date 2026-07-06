# Contractor (Summit Contracting)

A single-page contractor/home-services website — service catalog, project portfolio, reviews, service-area map, and a working lead-capture quote form — built as a static React app with no build step.

The demo business is **Summit Contracting**, a fictional Philadelphia-area licensed home contractor used as the content for this template. Linked back to the [DaveHomeAssist](https://davehomeassist.github.io/) portfolio hub.

## What's here

| Path | What it is |
|---|---|
| `index.html` | Page shell: meta/OG tags, critical CSS, loading spinner, noscript fallback, hidden Netlify form, CDN script tags |
| `app.js` | The entire app — data (`BIZ`, `SERVICES`, `PROJECTS`, `REVIEWS`, `SERVICE_AREAS`, `TRUST`), CSS-in-JS design system, hash router, and all page/UI components, written in `React.createElement` (no JSX/build step) |
| `assets/icons/favicon/` | Favicon set (SVG, PNG sizes, Apple touch icon) |
| `netlify.toml` | SPA redirect rule (`/* -> /index.html`) for Netlify hosting |
| `contractor-feature-analysis-2026-03-25.md` | Point-in-time feature audit — what's implemented, data sources, and known gaps |
| `CLAUDE.md` | Project notes for AI-assisted development |

## How it works

- **No build step.** React 18 and ReactDOM are loaded from the unpkg CDN as UMD scripts; `app.js` is plain browser JS using `React.createElement` directly.
- **Hash-based routing.** A custom `useHash()` hook drives navigation between Home, Services (+ per-service detail), Gallery, Project detail, Reviews, Areas, About, and Contact — all client-side, no server routing needed beyond the Netlify SPA fallback.
- **All content is hardcoded** in `app.js` (services, projects, reviews, service areas). There is no CMS or database — updating content means editing the data arrays directly.
- **Lead capture** happens through the quote form (`QuoteForm` component), which posts to Netlify Forms (`data-netlify="true"`, honeypot spam field, `form-name: "quote"`).

## Running it

This is a static site with no build step or dependencies to install.

- **Locally:** open `index.html` directly in a browser, or serve the folder with any static file server (e.g. `npx serve .`) — the CDN scripts and hash router work either way. Note the Netlify quote form won't actually submit unless served/deployed by Netlify.
- **Deployed:** hosted on Netlify, driven by `netlify.toml`'s single redirect rule so all paths fall through to `index.html` for the client-side router to handle.

## Conventions

- **CDN script integrity:** The React/ReactDOM `<script>` tags in `index.html` carry `integrity` (SRI) hashes and `crossorigin="anonymous"`. If you ever bump the React version, you must regenerate the matching SRI hash — don't just change the version number in the URL.
