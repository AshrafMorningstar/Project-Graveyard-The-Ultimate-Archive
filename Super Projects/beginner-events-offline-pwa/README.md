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
