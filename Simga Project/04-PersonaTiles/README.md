/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Persona Tiles

**Modular Interactive Profile Builder**

> Build your digital persona visually using modular tiles that represent traits, skills, and intentions. No forms, no text inputs—identity composed through interaction.

---

## 🎯 Concept Philosophy

Persona Tiles reframes identity as **a system of modular, rearrangeable traits** rather than static text fields. Your persona is built by selecting and arranging visual elements.

### Core Question

_"What if identity was composed, not typed?"_

---

## 🧩 Tile System

### Tile Types

| Type         | Color  | Purpose              | Examples                       |
| ------------ | ------ | -------------------- | ------------------------------ |
| **Skill**    | Blue   | Represents abilities | Frontend, Design, Backend      |
| **Interest** | Purple | Represents curiosity | Music, Travel, Reading         |
| **Value**    | Green  | Represents mindset   | Creativity, Growth, Impact     |
| **Goal**     | Amber  | Represents direction | Mastery, Innovation, Community |

### Tile Behavior

#### Click to Activate/Deactivate

- **Inactive**: Subtle, low opacity
- **Active**: Grows in prominence, colored background
- **In Canvas**: Moves to composition area

#### Visual Hierarchy

- **Size**: Active tiles larger than inactive
- **Proximity**: Related tiles cluster subtly
- **Motion**: Smooth transitions, no snapping

---

## 🎨 Composition Logic

### Canvas Area

The persona canvas is where your identity takes shape:

- **Empty State**: Helpful prompt appears
- **Active State**: Tiles arrange dynamically
- **Layout**: Flexbox with automatic wrapping
- **Hierarchy**: Earlier selections slightly larger

### Layout Rules

1. Active tiles move toward center
2. Related tiles cluster by type
3. Layout never overlaps or breaks
4. Size indicates selection order

---

## 🛠️ Technical Architecture

### Stack

- **HTML5**: Semantic structure
- **CSS Grid + Flexbox**: Dynamic layouts
- **Vanilla JavaScript**: State management

### Architecture Principles

✅ Tile state stored in JS Set  
✅ Layout recalculated on every state change  
✅ CSS handles animation, JS handles logic  
✅ No drag-and-drop libraries

### File Structure

```
persona-tiles/
├── index.html          # Tile pool + canvas
├── css/
│   ├── grid.css        # Layout system
│   └── tiles.css       # Tile components
└── js/
    └── persona-engine.js # State management
```

---

## 🎭 UX Rationale

### Why Tiles Instead of Forms?

Traditional forms are **transactional and boring**. Tiles make identity composition feel like **creative play**.

### Visual Feedback

Every interaction provides immediate visual feedback:

- Hover → Scale + shadow
- Click → Color fill + canvas placement
- Deactivate → Smooth removal animation

### No Save Button

Your persona exists in the moment. There's no "submit"—the act of composing **is** the experience.

---

## ♿ Accessibility

- **Keyboard toggling** (Enter/Space to activate tiles)
- **Visible focus indicators** for keyboard navigation
- **Semantic grouping** by tile type
- **ARIA attributes** for screen readers

---

## ⚡ Performance

- **Smooth transitions** at 60fps
- **Efficient state management** with Set data structure
- **No layout thrashing** during recalculation
- **GPU-accelerated** transforms

---

## 🎓 What This Project Proves

### For Recruiters

✅ Understands dynamic layouts  
✅ Can manage state cleanly without frameworks  
✅ Thinks about identity beyond text  
✅ Creates engaging, playful interactions

### For Developers

✅ State management with vanilla JS  
✅ Dynamic layout recalculation  
✅ Component-based thinking  
✅ Animation choreography

---

## 🚀 Running the Project

1. Open `index.html` in any modern browser
2. **Click tiles** to add them to your persona
3. **Click again** to remove them
4. **Use Tab + Enter** for keyboard navigation

---

## 📝 License

Created by **Ashraf Morningstar**  
GitHub: [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

---

## 💡 Key Takeaway

> "This developer can build interaction systems. They understand that great UX comes from thoughtful state management and visual feedback."

---

_Persona Tiles is part of a curated collection of unique web development projects designed to demonstrate mastery of interactive UI through original, portfolio-worthy work._
