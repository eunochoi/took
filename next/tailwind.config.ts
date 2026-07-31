import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-accent": "rgb(var(--theme-accent) / <alpha-value>)",
        "theme-bg": "rgb(var(--theme-bg) / <alpha-value>)",
        "theme-surface": "rgb(var(--theme-surface) / <alpha-value>)",
        "theme-surface-muted": "rgb(var(--theme-surface-muted) / <alpha-value>)",
        "theme-surface-elevated": "rgb(var(--theme-surface-elevated) / <alpha-value>)",
        "theme-text-primary": "rgb(var(--theme-text-primary) / <alpha-value>)",
        "theme-text-secondary": "rgb(var(--theme-text-secondary) / <alpha-value>)",
        "theme-text-tertiary": "rgb(var(--theme-text-tertiary) / <alpha-value>)",
        "theme-text-disabled": "rgb(var(--theme-text-disabled) / <alpha-value>)",
        "theme-text-on-accent": "rgb(var(--theme-text-on-accent) / <alpha-value>)",
        "theme-border": "rgb(var(--theme-border) / <alpha-value>)",
        "theme-border-muted": "rgb(var(--theme-border-muted) / <alpha-value>)",
        "theme-danger": "rgb(var(--theme-danger) / <alpha-value>)",
        "theme-warning": "rgb(var(--theme-warning) / <alpha-value>)",
        "theme-success": "rgb(var(--theme-success) / <alpha-value>)",
        "brand-google": "#ffffff",
        "brand-naver": "#02c73c",
        "brand-kakao": "#fae100",
        "brand-kakao-text": "#39181d",
      },
      fontFamily: {
        title: ["Paperozi", "sans-serif"],
      },
      fontSize: {
        app: "var(--app-font-size)",
      },
      borderRadius: {
        theme: "20px",
      },
      boxShadow: {
        card: "0 1px 4px rgb(var(--theme-shadow-color) / 0.05)",
        "theme-modal": "0 8px 32px rgb(var(--theme-shadow-color) / 0.12)",
        "theme-floating": "0 2px 12px rgb(var(--theme-shadow-color) / 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
