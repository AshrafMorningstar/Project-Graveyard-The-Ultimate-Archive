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

import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import "./ThemeSelector.css";

interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
  name: string;
}

interface ThemeSelectorProps {
  themes: Record<string, Theme>;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  currentTheme,
  onThemeChange,
}) => {
  return (
    <div className="theme-selector glass-card">
      <Palette size={20} />
      <span>Theme:</span>
      <div className="theme-options">
        {Object.entries(themes).map(([key, theme]) => (
          <motion.button
            key={key}
            className={`theme-button ${currentTheme === key ? "active" : ""}`}
            onClick={() => onThemeChange(key)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            }}
          >
            <span className="theme-name">{theme.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
