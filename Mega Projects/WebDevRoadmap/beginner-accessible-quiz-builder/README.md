/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Accessible Quiz Builder

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A web-based tool to create and play interactive quizzes with a strong focus on accessibility (a11y). It demonstrates semantic HTML, ARIA roles, and focus management to ensure usability for screen readers and keyboard users.

## Key Features

- **WCAG AA Compliant:** High contrast, keyboard navigable, and screen-reader ready.
- **Two Modes:** Builder mode to create quizzes and Player mode to take them.
- **Local Persistence:** Quizzes are saved to LocalStorage.
- **Immediate Feedback:** Visual and audible (via ARIA live regions) feedback on answers.

## Accessibility Highlights

- **Focus Management:** Programmatically moves focus to new content (e.g., next question).
- **ARIA Live Regions:** Announcements for correct/incorrect answers without page reloads.
- **Semantic Structure:** Proper use of headings, fieldsets, and lists.

## Tech Stack

- Vanilla HTML/CSS/JS
- No external dependencies

## Usage

1. Enter "Builder Mode".
2. Add your questions and mark the correct answer.
3. Click "Save Quiz".
4. Switch to "Player Mode" to test your quiz with keyboard or screen reader.

## License

MIT
