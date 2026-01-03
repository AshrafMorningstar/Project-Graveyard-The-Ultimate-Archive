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

import { useTheme } from "../contexts/ThemeContext";
import "./ThemeSelector.css";

const ThemeSelector = () => {
  const { currentTheme, setTheme, randomizeTheme, themeNames } = useTheme();

  return (
    <div className="theme-selector">
      <button
        className="random-theme-btn"
        onClick={randomizeTheme}
        title="Randomize Theme"
      >
        🎲 Random
      </button>
      <div className="theme-grid">
        {themeNames.map((name) => (
          <button
            key={name}
            className={`theme-btn ${
              currentTheme.name.toLowerCase().includes(name) ? "active" : ""
            }`}
            onClick={() => setTheme(name)}
            title={name}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
