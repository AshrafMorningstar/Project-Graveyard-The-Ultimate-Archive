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

# QR Code Generator

<a href = "https://qr-generator-webcode.netlify.app/" >For live link Click here</a>

This project is a QR Code Generator built using React. It allows users to input text, select the background colour, and adjust the dimensions to generate a QR code. The generated QR code can be downloaded as well.

## Features

- Input text to generate a QR code
- Select background colour for the QR code
- Adjust dimensions of the QR code
- Download the generated QR code

## Technologies Used

- React
- Tailwind CSS

## Installation

1. Clone the repository:

```bash
- git clone https://github.com/arun-webcode/Reactjs-mini-projects/edit/main/01-qrcode-gen
- cd qr-code-generator
- npm install
- npm run dev
Note - Remember to add this code on tailwind.config.js file.
/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
darkMode: "class",
theme: {
  extend: {},
},
plugins: [],
};
```

## Usage

1. Open the application in your browser.
2. Enter the text you want to encode in the QR code.
3. Select the background colour using the colour picker.
4. Adjust the dimensions using the range input.
5. Click on the "Generate" button to create the QR code.
6. Download the generated QR code by clicking the "Download" button.

##Project Structure
src/
│
├── components/
│ ├── Header.jsx
│ ├── InputBox.jsx
│ ├── ExtraOptions.jsx
│
├── App.jsx
├── index.css
├── main.jsx
└── index.html

<img src ="src\assets\qr-gen.jpg" />

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Made By - @Arun-webcode


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
