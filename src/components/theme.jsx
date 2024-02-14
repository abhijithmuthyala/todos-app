"use client";

import { createContext, useState } from "react";

import { colorModes } from "@/constants";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(colorModes.dark);

  function toggleTheme() {
    setTheme(theme === colorModes.dark ? colorModes.light : colorModes.dark);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        id="theme-wrapper"
        data-theme={theme}
        className="min-h-screen bg-neutral-100 font-josefin-sans text-sm text-neutral-900"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
