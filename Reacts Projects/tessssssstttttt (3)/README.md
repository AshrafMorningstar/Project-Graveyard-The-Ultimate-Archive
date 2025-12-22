/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Creative Spotify-inspired Music Web App

> A modern, fast, and developer-friendly music streaming application built with Next.js, TypeScript, and Tailwind CSS.

![Project Banner](https://via.placeholder.com/1200x600?text=Music+App+Preview)

## Features

- **Premium UI**: Glassmorphism, smooth animations, and a polished dark-mode aesthetic.
- **Robust Player**: Persistent playback with seek, volume, and queue management.
- **Music Library**: Create playlists, like tracks, and browse by artist/album.
- **Search**: Instant search results for tracks and artists.
- **Modern Tech**: Built on the Next.js App Router for optimal performance.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AshrafMorningstar/music-app.git
   cd music-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and configure your secrets.

   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Project Structure

```
/app          # Next.js App Router pages
/components   # React components (UI, Player, Layout)
/lib          # Utilities, mock data, and constants
/hooks        # Custom React hooks (audio, state)
/public       # Static assets
/styles       # Global styles and Tailwind config
```

### Commands

- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Vercel will automatically detect the Next.js configuration and deploy.

## License

MIT © Ashraf Morningstar
