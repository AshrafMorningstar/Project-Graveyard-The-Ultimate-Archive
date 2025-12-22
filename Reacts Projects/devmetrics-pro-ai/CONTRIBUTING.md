/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Contributing to DevMetrics Pro AI

First off, thank you for considering contributing to DevMetrics Pro AI! 🎉

**Created by AshrafMorningstar** - https://github.com/AshrafMorningstar

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## 🤝 Code of Conduct

This project follows a simple code of conduct:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards other contributors

## 🎯 How Can I Contribute?

### Reporting Bugs

- Use the GitHub Issues page
- Include a clear title and description
- Provide steps to reproduce
- Include screenshots/videos if applicable
- Mention your environment (OS, Node version, etc.)

### Suggesting Features

- Open an issue with the `enhancement` label
- Clearly describe the feature and its benefits
- Provide examples or mockups if possible

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages** (`git commit -m 'feat: Add amazing feature'`)
6. **Push to your fork** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request**

## 🛠️ Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/devmetrics-pro-ai.git
cd devmetrics-pro-ai

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add your API keys

# Start development
npm run dev        # Next.js dev server
npm run studio     # Remotion studio
```

## 📝 Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add tests** for new features
3. **Ensure all tests pass** (`npm run lint`)
4. **Update the README.md** with details of changes if needed
5. **Follow the commit message convention**:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

## 🎨 Style Guidelines

### TypeScript/React

- Use TypeScript for all new files
- Follow functional component patterns
- Use proper typing (avoid `any`)
- Keep components focused and reusable

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Maintain responsive design
- Use the `cn()` utility for conditional classes

### File Structure

```
src/
├── app/          # Next.js pages
├── scenes/       # Remotion video scenes
├── components/   # Reusable React components
├── api/          # API integrations
├── utils/        # Utility functions
└── types/        # TypeScript types
```

### Naming Conventions

- **Components**: PascalCase (`BasicStats.tsx`)
- **Utilities**: camelCase (`cn.ts`)
- **Constants**: UPPER_SNAKE_CASE
- **CSS classes**: kebab-case or Tailwind utilities

## 🧪 Testing

Before submitting:

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Test Remotion renders
npm run studio
```

## 📦 Adding New Video Scenes

1. Create scene in `src/scenes/YourScene.tsx`
2. Add proper TypeScript types
3. Include AshrafMorningstar credit comment
4. Register in `src/remotion/index.ts`
5. Update README.md with scene description
6. Test in Remotion Studio

Example scene template:

```tsx
/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React from "react";
import { AbsoluteFill } from "remotion";

export const YourScene: React.FC = () => {
  return (
    <AbsoluteFill className="bg-slate-950">{/* Your content */}</AbsoluteFill>
  );
};
```

## 🎬 Video Scene Guidelines

- **Duration**: 5-10 seconds (150-300 frames at 30fps)
- **Resolution**: 1920x1080 (Full HD)
- **Performance**: Optimize for smooth 30fps playback
- **Accessibility**: Use readable fonts and contrast
- **Branding**: Maintain the violet/cyan color scheme

## 🐛 Bug Fix Guidelines

1. **Reproduce the bug** consistently
2. **Write a test** that fails due to the bug
3. **Fix the bug**
4. **Verify the test passes**
5. **Check for regressions**

## 💡 Feature Development Guidelines

1. **Discuss first** - Open an issue before major changes
2. **Keep it focused** - One feature per PR
3. **Document thoroughly** - Update docs and add comments
4. **Consider performance** - Profile and optimize
5. **Maintain compatibility** - Don't break existing features

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:

- Listed in the README.md
- Mentioned in release notes
- Credited in the project documentation

## 📧 Questions?

Feel free to reach out:

- Open a GitHub Discussion
- Create an issue with the `question` label
- Contact [@AshrafMorningstar](https://github.com/AshrafMorningstar)

---

**Thank you for making DevMetrics Pro AI better! 🚀**

_Created by AshrafMorningstar_
