"use client";

import { useContext } from "react";

import { ThemeContext } from "./theme";

import { colorModes } from "@/constants";
import { ThemeIconDark, ThemeIconLight } from "./utils";

const icons = {
  // when current theme is dark, render light mode toggle & vice-versa
  dark: <ThemeIconLight />,
  light: <ThemeIconDark />,
};

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const label = theme === colorModes.dark ? "Light mode" : "Dark mode";
  const icon = icons[theme];

  return (
    <button onClick={toggleTheme} aria-label={`Switch to ${label}`}>
      {icon}
    </button>
  );
}
