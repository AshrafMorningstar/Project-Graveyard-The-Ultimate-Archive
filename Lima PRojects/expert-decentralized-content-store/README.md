/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# D-Page (Decentralized Content Store)

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A publishing tool for the decentralized web. It allows users to write content, cryptographically sign it using local keys (Web Crypto API), and generates Content Identifiers (CIDs) simulating an IPFS pinning workflow.

## Key Features

- 🔑 **Client-Side Cryptography** - RSA key pair generation in-browser.
- 📦 **IPFS Simulation** - Real-time SHA-256 hashing to generate CIDs.
- ✅ **Verifiable Content** - Visual proofs of content integrity.
- 📝 **Rich Editor** - Distraction-free writing interface.

## Tech Stack

- **Core:** HTML5, CSS3
- **Crypto:** Web Crypto API (SubtleCrypto)
- **UI:** FontAwesome, Vanilla JS

## How to Use

1. Open `index.html`.
2. Wait for "Identity Active" to confirm key generation.
3. Type a title and content to see the "Content Hash (CID)" update in real-time.
4. Click "Publish to IPFS" to simulate network pinning.
5. See the verification badge confirm the signature.

---

Built with ❤️ by Ashraf Morningstar
