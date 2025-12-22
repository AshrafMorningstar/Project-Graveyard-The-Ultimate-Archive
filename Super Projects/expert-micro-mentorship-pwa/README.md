/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Micro-Mentorship Platform PWA

> Connect with industry experts for instant, short-duration video mentorship sessions.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A Progressive Web App (PWA) that facilitates spontaneous knowledge sharing. It features a directory of mentors and a built-in peer-to-peer video calling interface powered by WebRTC.

## Features

- 🎥 **Instant Video Calls** - Low-latency video using PeerJS (WebRTC)
- 📱 **PWA Installable** - Add to home screen with offline capability
- 🔍 **Mentor Discovery** - Filter experts by role, company, or skills
- ⚡ **Real-time Status** - See who is available for a call right now (simulated)

## Tech Stack

- React + Vite
- WebRTC (via PeerJS)
- Tailwind CSS
- React Router
- Vite PWA Plugin

## Setup

```bash
npm install
npm run dev
```

## How to Test Calls

1. Open the app in two separate browser windows (or devices).
2. Note the "My ID" shown in the call room of one window.
3. Enter that ID into the "Remote Peer ID" field of the second window and click Call.
