/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Decentralized File Sentry (Expert)

## Overview

A secure, client-side file encryption tool designed for the decentralized web. Files are encrypted with AES-GCM 256-bit encryption directly in the browser before being "uploaded" (mocked IPFS hash generation). The project demonstrates zero-knowledge architecture where the server never sees the keys.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: React
- Encryption: Web Crypto API (Native browser standard)
- Storage: IndexedDB (Local caching), IPFS (Mocked for demo stability)
- Styling: Tailwind CSS (Cyberpunk theme)

## Architecture Overview

```
File Input
↓
Web Crypto API (Key Generation & Encryption)
↓
Encrypted Blob
↓
IPFS Mock Adapter (Generates CID)
↓
Decryption Link Generation (Hash fragment contains key)
```

## Key Features

- **Zero-Knowledge**: Encryption happens 100% on the client.
- **AES-GCM**: Industry standard authenticated encryption.
- **Link Sharing**: Generates a rigorous magic link containing the decryption key in the URL hash (so it's never sent to the server).
- **Drag & Drop**: Modern file handling interface.

## Security Note

This is a demonstration of cryptographic primitives. While the algorithms are standard, a production security audit is required for sensitive data.

## Setup Instructions

```bash
npm install
npm run dev
```

## Author

**Ashraf Morningstar**  
GitHub: https://github.com/AshrafMorningstar

## License

MIT
