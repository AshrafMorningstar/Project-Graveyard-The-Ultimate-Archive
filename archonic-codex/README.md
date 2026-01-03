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

# 🌌 Archonic Codex - Universal Knowledge Engine

<div align="center">

![Archonic Codex Banner](https://raw.githubusercontent.com/AshrafMorningstar/archonic-codex/main/public/banner.png)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-00f3ff?style=for-the-badge)](https://ashrafmorningstar.github.io/archonic-codex/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Stars](https://img.shields.io/github/stars/AshrafMorningstar/archonic-codex?style=for-the-badge&color=bd00ff)](https://github.com/AshrafMorningstar/archonic-codex/stargazers)

**"The future is unwritten, but the code is compiled."**

_A next-generation 3D spatial operating system interface that redefines web interaction_

[🎯 Features](#-features) • [🚀 Quick Start](#-quick-start) • [🎨 Screenshots](#-screenshots) • [🛠️ Tech Stack](#️-tech-stack) • [📖 Documentation](#-documentation)

</div>

---

## 🌟 Overview

**Archonic Codex** is not just a portfolio—it's a **fully functional, futuristic operating system** running entirely in your browser. Built with cutting-edge React 19, TypeScript, and advanced animation libraries, it delivers a **premium glassmorphic UI** with **neural interface simulations** that push the boundaries of what's possible on the web.

### 🎯 Why Archonic Codex?

- 🌌 **Quantum Glassmorphism**: Frosted-glass UI with neon accents and dynamic themes
- 🧠 **Neural Interface**: AI-powered interactions and real-time system notifications
- 🖥️ **Spatial OS Layout**: Desktop-class window management (drag, drop, resize, minimize)
- 🎨 **4 Premium Themes**: Quantum, Cyberpunk, Light Mode, and custom wallpapers
- ⚡ **Blazing Performance**: Powered by Vite + React 19 concurrent features
- 🔒 **Secure Architecture**: Mock biometric authentication and boot sequences
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile
- 🎮 **30+ Built-in Apps**: Games, productivity tools, creative suites, and more

---

## ✨ Features

### 🎨 **Premium UI/UX**

- **Glassmorphism Design**: Translucent windows with backdrop blur
- **Neon Accents**: Quantum glow effects and holographic animations
- **Smooth Transitions**: Framer Motion powered micro-interactions
- **Custom Scrollbars**: Gradient-styled, minimal scrollbars
- **Dark/Light Modes**: Seamless theme switching

### 🖥️ **Desktop Environment**

- **Window Manager**: Drag, resize, minimize, maximize, and close windows
- **Dock System**: macOS-style dock with app indicators
- **Top Bar**: System clock, battery, WiFi, and control center
- **Lock Screen**: Biometric authentication simulation
- **Boot Sequence**: Realistic system startup animation

### 🚀 **Built-in Applications**

#### 🎮 **Games**

- Quantum Chess (3D chess with quantum mechanics)
- Space Invaders (Void Defender)
- Minesweeper (Logic Bomb)
- Snake, Tic-Tac-Toe, Memory Game

#### 💼 **Productivity**

- TaskMaster (Kanban board)
- FocusFlow (Pomodoro timer)
- Chronos Calendar
- Notes & MarkText Editor
- Code Matrix (Code editor)

#### 🎨 **Creative Suite**

- Paint (Drawing canvas)
- Sonic Vibe (Music player)
- NebulaSynth (Audio synthesizer)
- Cinema (Video player)
- Prism Gallery (Image viewer)

#### 🛠️ **System Tools**

- Finder (File explorer)
- Chronos Terminal
- System Nexus (Task manager)
- Settings (Theme & customization)
- Neuro AI (AI assistant)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AshrafMorningstar/archonic-codex.git

# Navigate to project directory
cd archonic-codex

# Install dependencies (use --legacy-peer-deps for React 19)
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Screenshots

<div align="center">

### 🌌 Lock Screen

![Lock Screen](https://via.placeholder.com/800x450/0A0C27/00f3ff?text=Lock+Screen+Preview)

### 🖥️ Desktop Environment

![Desktop](https://via.placeholder.com/800x450/050510/bd00ff?text=Desktop+Environment)

### 🎮 Quantum Chess

![Quantum Chess](https://via.placeholder.com/800x450/1e1e24/4CC9F0?text=Quantum+Chess)

### 🎨 Theme Customization

![Themes](https://via.placeholder.com/800x450/F0F4F8/6366F1?text=Theme+Customization)

</div>

---

## 🛠️ Tech Stack

### **Core**

- **React 19** - Latest React with concurrent features
- **TypeScript 5.8** - Type-safe development
- **Vite 6** - Next-generation build tool

### **Styling**

- **TailwindCSS 3** - Utility-first CSS framework
- **Custom CSS** - Glassmorphism and animations
- **Google Fonts** - Inter, Orbitron, Fira Code

### **State Management**

- **Zustand** - Lightweight state management

### **Animation**

- **Framer Motion** - Production-ready animations
- **GSAP** - Advanced timeline animations
- **React Spring** - Physics-based animations

### **Utilities**

- **Lucide React** - Beautiful icon library
- **Chess.js** - Chess logic engine

---

## 📖 Documentation

### Project Structure

```
archonic-codex/
├── apps/              # Application components (30+ apps)
├── components/        # Reusable UI components
├── utils/            # Utility functions
├── types.ts          # TypeScript type definitions
├── store.ts          # Zustand state management
├── App.tsx           # Main application component
└── index.tsx         # Application entry point
```

### Key Components

- **`App.tsx`**: Main orchestrator, manages windows and themes
- **`Window.tsx`**: Draggable, resizable window container
- **`Dock.tsx`**: Application launcher dock
- **`TopBar.tsx`**: System status bar
- **`LockScreen.tsx`**: Authentication interface
- **`BootScreen.tsx`**: System startup animation

### State Management

The app uses Zustand for global state:

```typescript
interface Store {
  theme: Theme;
  windows: Record<string, WindowState>;
  openWindow: (appId: string) => void;
  closeWindow: (appId: string) => void;
  // ... more state
}
```

---

## 🎯 Roadmap

- [ ] **v2.0**: Real backend integration with Supabase
- [ ] **v2.1**: Multi-user support with authentication
- [ ] **v2.2**: Cloud file storage integration
- [ ] **v2.3**: Real-time collaboration features
- [ ] **v3.0**: Mobile app (React Native)
- [ ] **v3.1**: Desktop app (Electron)

---

## 🤝 Contributing

Contributions are **highly encouraged**! Here's how you can help:

1. **Fork** the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test on multiple browsers
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

<div align="center">

**Ashraf Morningstar**

[![GitHub](https://img.shields.io/badge/GitHub-AshrafMorningstar-181717?style=for-the-badge&logo=github)](https://github.com/AshrafMorningstar)
[![Portfolio](https://img.shields.io/badge/Portfolio-Coming_Soon-00f3ff?style=for-the-badge)](https://ashrafmorningstar.github.io)

_Building the future, one commit at a time_ 🚀

</div>

---

## 🌟 Show Your Support

If this project inspired you or helped you learn something new, please consider:

- ⭐ **Starring** this repository
- 🍴 **Forking** it for your own projects
- 📢 **Sharing** it with the developer community
- 💬 **Opening issues** for bugs or feature requests

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/AshrafMorningstar/archonic-codex?style=flat-square)
![GitHub language count](https://img.shields.io/github/languages/count/AshrafMorningstar/archonic-codex?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/AshrafMorningstar/archonic-codex?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/AshrafMorningstar/archonic-codex?style=flat-square)

---

## 🙏 Acknowledgments

- Inspired by macOS, Windows 11, and futuristic UI concepts
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Wallpapers from [Unsplash](https://unsplash.com/)

---

<div align="center">

**Built with 💙 by Ashraf Morningstar**

🌌 _The Universe Awaits_ 🌌

[⬆ Back to Top](#-archonic-codex---universal-knowledge-engine)

</div>


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
