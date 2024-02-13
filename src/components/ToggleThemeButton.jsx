"use client";

import { useState } from "react";

import { ThemeIconDark, ThemeIconLight } from "./utils";

const colorModes = {
  dark: "dark",
  light: "light",
};

const icons = {
  // when current theme is dark, render light mode toggle & vice-versa
  dark: <ThemeIconLight />,
  light: <ThemeIconDark />,
};

export default function ToggleThemeButton() {
  const [theme, setTheme] = useState(colorModes.dark);
  const label = theme === colorModes.dark ? "Light mode" : "Dark mode";
  const icon = icons[theme];

  function toggleTheme() {
    setTheme(theme === colorModes.dark ? colorModes.light : colorModes.dark);
  }

  return (
    <button onClick={toggleTheme} aria-label={`Switch to ${label}`}>
      {icon}
    </button>
  );
}
