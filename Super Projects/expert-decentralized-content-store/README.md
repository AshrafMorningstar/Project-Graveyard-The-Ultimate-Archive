/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# dStore: Decentralized Content Platform

> A censorship-resistant blogging platform using IPFS for storage and simulated Blockchain for indexing.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

dStore demonstrates the architecture of Web3 content platforms. It ensures content permanence and immutability by storing data on IPFS (InterPlanetary File System) and tying it to a user's crypto wallet identity.

## Features

- 🔗 **Decentralized Storage** - Content lives on IPFS, not central servers
- 🆔 **Wallet Auth** - Login with Ethereum address (Simulated)
- 📝 **Markdown Support** - Rich text rendering for articles
- 🛡️ **Verifiable** - Every post has a unique Content ID (CID)
- 🚫 **Unstoppable** - Content cannot be taken down by a central authority

## Tech Stack

- React + Vite
- IPFS (ipfs-http-client)
- Ethers.js (Wallet interaction)
- Tailwind CSS
- React Markdown

## How it Works

1. **Connect Wallet**: Authenticate with your unique address.
2. **Write**: Compose content in Markdown.
3. **Upload**: Client generates a hash (CID) and uploads content to IPFS nodes.
4. **Index**: The CID and Metadata are stored on the blockchain registry.

## Setup

```bash
npm install
npm run dev
```

## Note

This project uses simulated IPFS upload and Blockchain transaction delays to demonstrate the UX flow without requiring a live node or gas fees.
