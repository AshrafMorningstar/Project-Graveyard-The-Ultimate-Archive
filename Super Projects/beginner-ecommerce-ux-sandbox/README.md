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

# E-commerce UX Sandbox

> A polished, multi-step e-commerce checkout flow with professional UX patterns.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

This project simulates a high-conversion checkout experience. It handles cart management, form validation with Zod, credit card formatting, and a delightful success state with confetti. It serves as a reference implementation for React forms and state management.

## Features

- 🛒 **Cart Summary** - Sticky sidebar with real-time totals
- ✅ **Form Validation** - Robust checks for emails and payment details
- 💳 **Smart Inputs** - Auto-formatting for credit card numbers
- 🌈 **Micro-interactions** - Smooth transitions between steps
- 🎉 **Delight** - Confetti celebration upon successful order

## Tech Stack

- React + Vite
- Tailwind CSS
- React Hook Form + Zod
- Framer Motion

## Setup

```bash
npm install
npm run dev
```

## Architecture

```
App -> Step State (1: Cart, 2: Payment, 3: Success)
       |
       v
    AnimatePresence -> Form Components -> Validation Logic
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
