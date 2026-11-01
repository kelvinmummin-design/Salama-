# Salama

An offline-first, bilingual (English / Kiswahili) directory of emergency and public services in Kenya.

## Local preview

Install Node.js 20 or later, then run `npm install`, `npm run dev`. Open the local address printed by Vite. The production checks are `npm run validate:data` and `npm run build` (or `npm run check`).

## What's implemented

- Six approved screens: Home, service groups and directory, emergency countdown, Help Now, and Quiet Help.
- Three-second cancel step for urgent calls; direct dialer links for directory entries.
- English and Kiswahili controls, on-device saved numbers, emergency script, breathing prompt, discreet draft SMS, one-time optional location request.
- Optional offline county lookup from bundled geoBoundaries data; the location stays on the device and is inserted only into a user-reviewed message draft.
- Installable web app with same-origin static asset caching for offline use.
- Public directory validator and a GitHub Pages build/deploy workflow.
- Capacitor Android project configuration.

## Number verification and release status

The public directory contains 82 sourced entries across the six approved service groups, checked on 2026-11-01. Each entry has a source link and check date. Records that are historical, seasonal, county-specific, or lack authoritative confirmation stay out of the live directory and are tracked in `verification/research-candidates.json` and `verification/release-gates.json`.

The offline county boundary file is the geoBoundaries gbOpen Kenya ADM1 set (47 counties, boundary representation year 2020), bundled with its source and license metadata in `public/data/kenya-counties-source.json`. Confirm boundary currency and attribution during the release review.

This is a curated directory of national services, not a complete list of every organization or county office in Kenya. The NTSA contact page and service portal publish different customer-service numbers; each is labelled with its source. Recheck availability, short-code and toll-free access across Kenyan carriers, Swahili wording, emergency behavior, and real-device dialing before public launch. No software can guarantee there will never be a failure.

GitHub Pages deployment requires pushing this folder to a GitHub repository with Pages configured to use GitHub Actions. The workflow deploys on pushes to `main`. The Capacitor Android project is scaffolded and synced; Android Studio/SDK is still required to build and sign an APK.

## Privacy

No accounts, ads, analytics, remote fonts, or third-party runtime scripts. Favorites, language choice, and a downloaded directory copy stay in local storage. Location is requested only after a tap and is not written to storage. The update action requests only the public directory file; it sends no personal details. SMS opens a draft for the user and does not send automatically.

