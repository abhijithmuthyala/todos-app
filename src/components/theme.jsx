"use client";

import { createContext, useEffect, useState } from "react";

import { colorModes } from "@/constants";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalTheme();

  function toggleTheme() {
    setTheme(theme === colorModes.dark ? colorModes.light : colorModes.dark);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        id="theme-wrapper"
        data-theme={theme}
        className="min-h-screen bg-neutral-100 font-josefin-sans text-sm text-neutral-900 md:text-base"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function useLocalTheme() {
  const [theme, setTheme] = useState(colorModes.dark);

  useEffect(function syncLocalTheme() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(
    function syncThemeToStorage() {
      localStorage.setItem("theme", theme);
    },
    [theme],
  );

  return [theme, setTheme];
}
