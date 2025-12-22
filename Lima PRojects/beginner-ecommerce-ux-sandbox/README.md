/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Simple E-commerce Mock (Payment Sandbox)

## Overview

A single-product storefront with a polished checkout flow. This project simulates a real-world e-commerce experience including product variants, cart management, and a mock payment gateway, focusing purely on frontend UX/UI patterns.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: React (Next.js-ready structure)
- State: React Context API (Cart Logic)
- Icons: Lucide React
- Styling: CSS Modules / Tailwind (Optional)

## Architecture Overview

```
Product Page (Variants, Image Gallery)
↓
Cart Context (Add/Remove, Persistence)
↓
Checkout Modal (Form Validation)
↓
Mock Payment Service (Async Simulation)
```

## Key Features

- **Product Variants**: Switch between sizes and colors with URL state sync.
- **Persistent Cart**: Items remain in cart after refresh (localStorage).
- **Mock Checkout**: Realistic credit card input formatting and validation.
- **Order Summary**: Dynamic calculation of taxes and shipping.
- **Coupon System**: Try code "DISCOUNT20" for 20% off.

## Accessibility

- Aria labels for all interactive elements
- Keyboard-navigable image gallery
- Form error announcements

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
