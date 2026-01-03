/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Local Events Offline PWA

> Offline-first progressive web app for discovering community events.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A resilient, offline-first application that allows users to browse local events even without an internet connection. It synchronizes data when back online and provides Map, List, and Calendar views.

## Features

- 📶 **Offline First** - Service Worker caching & IndexedDB storage
- 🗺️ **Interactive Map** - View events geographically (Leaflet)
- 📅 **Calendar View** - Browse by date
- 🔄 **Auto-Sync** - Updates content when connection restores
- 📱 **Installable** - Fully PWA compliant (Manifest + Icons)

## Tech Stack

- React + Vite
- Workbox (PWA)
- IndexedDB (idb)
- Tailwind CSS
- React Leaflet

## Setup

```bash
npm install
npm run dev
```

## Architecture

```
App -> IndexedDB Provider -> Views (List/Map/Cal)
       ^
       Service Worker (caches API & Assets)
```


---

## 📜 Copyright & License

© 2026 Ashraf Morningstar. All Rights Reserved.

**Educational Disclaimer:** This is a personal recreation of an existing project concept, developed for learning and skill development purposes. The original project concept remains the intellectual property of its respective creator(s).

**License:** MIT License - See [LICENSE](./LICENSE) file for details.

**Developer:** [Ashraf Morningstar](https://github.com/AshrafMorningstar)

**Portfolio:** Explore more projects at [github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

---

### 🤝 Connect & Contribute

Found this helpful? Give it a ⭐️ on GitHub!

- 💼 Company: MORNINGSTARCONSTRUCTION
- 📍 Location: India
- 🐦 Twitter: [@AMS_Morningstar](https://twitter.com/AMS_Morningstar)
- 📧 Email: ashrafmorningstar@gmail.com
