import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,msx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,msx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        "text-dark": "rgb(215, 217, 227)",
        green: "#02815A",
        yellow: "#eca232",
        red: "#ec323d",
        blue: "#0070F0",
      },
      backgroundImage: {
        "primary-img-light": "url('/image/background.png')",
        "primary-img-dark": "url('/image/menu.svg')",
      },

      flex: {
        "1/2": "1 1 50%",
      },
      spacing: {
        2.5: "10px",
        70: "280px",
      },
      width: {
        100: "400px",
      },
      minWidth: {
        700: "700px",
        100: "400px",
      },
      maxWidth: {
        100: "400px",
      },
      height: {
        100: "400px",
        "270": "270px",
      },
    },

    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",

      gray: {
        100: "rgba(var(--color-gray-100) / <alpha-value>)",
        200: "rgba(var(--color-gray-200) / <alpha-value>)",
        300: "rgba(var(--color-gray-300) / <alpha-value>)",
        400: "rgba(var(--color-gray-400) / <alpha-value>)",
        500: "rgba(var(--color-gray-500) / <alpha-value>)",
        600: "rgba(var(--color-gray-600) / <alpha-value>)",
        700: "rgba(var(--color-gray-700) / <alpha-value>)",
        800: "rgba(var(--color-gray-800) / <alpha-value>)",
        900: "rgba(var(--color-gray-900) / <alpha-value>)",
      },

      base: {
        white: "rgba(var(--color-base-white) / <alpha-value>)",
        black: "rgba(var(--color-base-black) / <alpha-value>)",
        blue: "rgba(var(--color-base-blue) / <alpha-value>)",
      },
      primary: {
        normal: "rgba(var(--color-primary) / <alpha-value>)",
      },
      secondary: {
        normal: "rgba(var(--color-secondary) / <alpha-value>)",
      },
      error: {
        normal: "rgba(var(--color-error) / <alpha-value>)",
      },
      warning: {
        normal: "rgba(var(--color-warning) / <alpha-value>)",
      },
      success: {
        normal: "rgba(var(--color-success) / <alpha-value>)",
        light: "rgba(var(--color-success-light) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
