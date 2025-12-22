/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# ChronoCard - Time-Aware Digital Identity

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Concept Philosophy

ChronoCard is a living digital identity card that reacts to time itself. Instead of user-driven interaction, the system context (time) becomes the primary driver of UI behavior.

### Why Time is the Primary Input

Traditional web interfaces are static or require explicit user interaction. ChronoCard explores a different paradigm: **ambient responsiveness**. The interface continuously adapts to temporal context, creating a sense of life and presence without demanding user attention.

## Features

- **Time-Based Theming**: Visual appearance morphs based on time of day

  - 🌅 Morning (5:00-11:59): Light, warm, airy
  - ☀️ Afternoon (12:00-16:59): Neutral, balanced
  - 🌆 Evening (17:00-20:59): Saturated, soft contrast
  - 🌙 Night (21:00-04:59): Dark, low luminance

- **Dynamic Greetings**: Contextual greetings that fade smoothly
- **Weekday Accent Colors**: Each day has a unique accent color
- **Subtle Motion**: Imperceptible breathing animation based on seconds
- **Typography Adaptation**: Font weight shifts between AM/PM
- **Premium Glassmorphism**: Frosted glass aesthetic with soft shadows

## Technical Stack

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, transitions, glassmorphism
- **Vanilla JavaScript**: No frameworks, no libraries

## UX Rationale

### Ambient Design

The interface exists in a state of calm, continuous motion. Motion is:

- **Autonomous**: No user trigger required
- **Subtle**: Perceptible only subconsciously
- **Meaningful**: Tied to actual time progression

### Visual Hierarchy

1. Time Display (primary focus)
2. Greeting (emotional context)
3. Identity (personal branding)
4. Status (system health indicator)

## Architecture

### Separation of Concerns

- **HTML**: Structure and content
- **CSS**: Visual presentation and theming
- **JavaScript**: Time logic and state management

### CSS Variables

All theming is controlled through CSS custom properties, updated by JavaScript:

```css
--bg-primary
--bg-secondary
--text-primary
--text-secondary
--accent-color
--card-scale
--card-opacity
```

### Performance

- 60fps smooth animations
- No layout thrashing
- Efficient `setInterval` usage
- Battery-friendly motion

## Accessibility

- ✅ Readable contrast at all times
- ✅ Semantic HTML for screen readers
- ✅ Reduced motion support (`prefers-reduced-motion`)
- ✅ Keyboard accessible
- ✅ Print-friendly styles

## Installation

1. Clone or download this repository
2. Open `index.html` in a modern browser
3. No build process required

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Screenshots

The interface appearance varies throughout the day. Visit at different times to experience the full range of themes.

## Why This Project Matters

This project demonstrates:

- Understanding of **state management** without frameworks
- Mastery of **CSS custom properties** for theming
- Ability to create **premium experiences** with fundamentals
- **Design thinking** beyond traditional interaction patterns

## License

Created by Ashraf Morningstar for educational and portfolio purposes.

---

_"Time is the only input that never stops."_
