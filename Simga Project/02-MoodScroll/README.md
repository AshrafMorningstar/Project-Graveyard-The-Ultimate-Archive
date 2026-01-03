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

# MoodScroll

**Emotion-Responsive Scroll Experience**

> A single-page emotional journey where scroll position controls the emotional state of the interface. No buttons, no navigation—just scroll.

---

## 🎯 Concept Philosophy

MoodScroll reframes scrolling from a mere transport mechanism into **the primary emotional input**. As users scroll, they don't just reveal content—they transform the entire atmosphere of the interface.

### Core Question

_"What if scrolling changes how the interface feels, not just what it shows?"_

---

## 🎭 Emotional Zones

The page is divided into four distinct emotional states that blend seamlessly:

### Zone 1: Calm (0–25%)

**Visual Mood**: Light, airy, minimal  
**Colors**: Soft whites and grays  
**Typography**: Light weight (300), increased letter-spacing  
**Line Height**: 1.8 (spacious, breathable)  
**Emotion**: Peace, clarity, openness

### Zone 2: Curiosity (25–50%)

**Visual Mood**: Slight contrast, motion hints  
**Colors**: Cool blues and teals  
**Typography**: Regular weight (400), normal spacing  
**Line Height**: 1.7  
**Emotion**: Wonder, exploration, questioning

### Zone 3: Intensity (50–75%)

**Visual Mood**: High contrast, denser visuals  
**Colors**: Deep purples and blacks  
**Typography**: Bold weight (700), tighter spacing  
**Line Height**: 1.5 (compact, urgent)  
**Emotion**: Immersion, presence, weight

### Zone 4: Reflection (75–100%)

**Visual Mood**: Dark, soft, reduced motion  
**Colors**: Near-black with soft grays  
**Typography**: Light weight (300), wide spacing  
**Line Height**: 1.9 (contemplative)  
**Emotion**: Introspection, completion, rest

---

## 🎨 Visual State Interpolation

### Continuous Transitions

All visual changes happen **smoothly and continuously**—no hard jumps or section snapping.

#### What Changes:

- **Background Color**: Gradual gradient shifts
- **Text Color**: Adapts for optimal contrast
- **Accent Color**: Reflects emotional intensity
- **Font Weight**: 300 → 700 → 300
- **Letter Spacing**: Wide → tight → wide
- **Line Height**: Spacious → compact → spacious

#### How It Works:

1. Scroll position normalized to 0–1
2. Current emotional zone detected
3. Values interpolated between zones
4. CSS variables updated via JavaScript
5. Browser handles smooth transitions

---

## 🛠️ Technical Architecture

### Stack

- **HTML5**: Semantic sections
- **CSS3**: Custom properties, smooth transitions
- **Vanilla JavaScript**: Scroll engine with `requestAnimationFrame`

### Architecture Principles

✅ Scroll logic isolated in dedicated engine  
✅ CSS variables drive all visual changes  
✅ JavaScript never sets fixed colors directly  
✅ 60fps performance via RAF optimization

### File Structure

```
moodscroll/
├── index.html          # Four emotional zones
├── css/
│   ├── base.css        # Layout + variables
│   └── moods.css       # Zone-specific styles
└── js/
    └── scroll-engine.js # Interpolation logic
```

---

## 🎭 UX Rationale

### Why Scroll-Only?

By removing all other inputs, MoodScroll forces users to **experience the interface at their own pace**. Fast scrollers get rapid transitions; slow scrollers experience gradual morphing.

### Editorial Content

Large headings and short, poetic text blocks create a **magazine-like aesthetic** that complements the emotional journey. Content is intentionally minimal to let the atmosphere speak.

### No Section Snapping

Unlike many scroll-based sites, MoodScroll **never forces users into sections**. The experience is fluid and user-controlled.

---

## ⚡ Performance

- **60fps scrolling** via `requestAnimationFrame`
- **Throttled scroll listeners** (no event spam)
- **Zero CLS** (Cumulative Layout Shift)
- **GPU-accelerated** color transitions
- **No layout thrashing**

---

## ♿ Accessibility

- **Readable contrast** at all scroll positions (WCAG AA minimum)
- **Reduced motion support** (respects `prefers-reduced-motion`)
- **Content readable** without scroll animations enabled
- **Semantic HTML** for screen readers

---

## 🎓 What This Project Proves

### For Recruiters

✅ Understands interaction beyond clicks  
✅ Can coordinate multiple visual systems  
✅ Thinks like a designer, not just a coder  
✅ Masters performance optimization

### For Developers

✅ Scroll as first-class input mechanism  
✅ Smooth interpolation algorithms  
✅ CSS variable orchestration  
✅ RequestAnimationFrame best practices

---

## 🚀 Running the Project

1. Open `index.html` in any modern browser
2. **Scroll slowly** to experience smooth transitions
3. **Scroll fast** to see rapid emotional shifts
4. No build process or dependencies required

---

## 📸 Screenshots at Different Scroll Depths

### 0% - Calm

Light, airy background with minimal text

### 50% - Intensity

Dark purple gradient with bold, tight typography

### 100% - Reflection

Near-black background with soft, wide-spaced text

---

## 📝 License

Created by **Ashraf Morningstar**  
GitHub: [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

---

## 💡 Key Takeaway

> "This developer understands experiential UI. They can create atmosphere, not just interfaces."

---

_MoodScroll is part of a curated collection of unique web development projects designed to demonstrate mastery of interaction design through original, portfolio-worthy work._


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
