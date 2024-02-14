/** @type {import('tailwindcss').Config} */

function withOpacity(opacity, variableName) {
  return `rgba(var(--${variableName}), ${opacity})`;
}

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "var(--blue-400)",
      neutral: {
        100: "var(--neutral-100)",
        200: "var(--neutral-200)",
        300: "var(--neutral-300)",
        400: "var(--neutral-400)",
        500: "var(--neutral-500)",
        600: "var(--neutral-600)",
        700: "var(--neutral-700)",
        800: "var(--neutral-800)",
        900: "var(--neutral-900)",
      },
      white: "var(--white)",
      transparent: "transparent",
      inherit: "inherit",
      destructive({ opacityValue }) {
        return withOpacity(opacityValue, "destructive-rgb");
      },
    },
    gradientColorStops: {
      "header-start": "var(--bg-gradient-start-header)",
      "highlight-start": "var(--bg-gradient-start-highlight)",
      "header-end": "var(--bg-gradient-end-header)",
      "highlight-end": "var(--bg-gradient-end-highlight)",
    },
    extend: {
      backgroundImage: {},
    },
    fontFamily: {
      "josefin-sans": "var(--ff)",
    },
    transitionDuration: {
      actions: "var(--actions-transition-time)",
    },
  },
  plugins: [],
};
