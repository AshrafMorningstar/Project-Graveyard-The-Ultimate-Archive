/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Privacy-First Analytics Dashboard

> Self-hosted, lightweight analytics dashboard that respects user privacy.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A comprehensive dashboard for visualizing web traffic without compromising user privacy. It tracks essential metrics like unique visitors, custom events, and referral sources without using cookies or collecting PII (Personally Identifiable Information).

## Features

- 🛡️ **GDPR Compliant** - No cookies, no IP tracking, no fingerprinting
- 📊 **Rich Visualizations** - Interactive area charts, bar graphs, and pie charts
- ⚡ **Real-time** - Dashboard updates instantaneously
- 📱 **Responsive** - Works perfectly on mobile and desktop screens
- 🌍 **Lightweight** - < 1kb tracking script (simulated)

## Tech Stack

- React + Vite
- Recharts (Data Visualization)
- Tailwind CSS
- Lucide Icons
- Date-fns

## Metrics Tracked

- Unique Visitors
- Total Pageviews
- Bounce Rates
- Visit Duration
- Referral Sources
- Device Types

## Setup

```bash
npm install
npm run dev
```

## Architecture

```
App -> Mock Data Generator -> Recharts Components
```
