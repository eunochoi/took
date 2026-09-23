import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { CALENDAR_BADGE_SCALE } from "./src/common/constants/calendar";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
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
        "theme-overlay": "rgb(var(--theme-overlay) / <alpha-value>)",
        "theme-accent": "rgb(var(--theme-accent) / <alpha-value>)",
        "theme-accent-deep": "rgb(var(--theme-accent-deep) / <alpha-value>)",
        "theme-accent-text": "var(--theme-accent-text)",
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
        "theme-calendar-saturday": "rgb(var(--theme-calendar-saturday) / <alpha-value>)",
        "theme-calendar-sunday": "rgb(var(--theme-calendar-sunday) / <alpha-value>)",
        "brand-google": "#ffffff",
        "brand-naver": "#02c73c",
        "brand-kakao": "#fae100",
        "brand-kakao-text": "#39181d",
      },
      backgroundImage: {
        "scroll-fade-top": "linear-gradient(in oklch to bottom, rgb(var(--theme-bg)) 0%,  rgb(var(--theme-bg) / 0) 100%)",
        "scroll-fade-bottom": "linear-gradient(in oklch to top, rgb(var(--theme-bg)) 0%,  rgb(var(--theme-bg) / 0) 100%)",
      },
      fontFamily: {
        paperozi: ["Paperozi", "sans-serif"],
        title: ["SUIT", "-apple-system", "BlinkMacSystemFont", "Apple SD Gothic Neo", "sans-serif"],
      },
      fontSize: {
        app: "var(--app-font-size)",
      },
      borderRadius: {
        theme: "16px",
      },
      screens: {
        tablet: "480px",
        desktop: "1024px",
      },
      boxShadow: {
        card: "0 4px 8px rgb(var(--theme-shadow-color) / 0.02)",
        "theme-soft": "0 2px 8px rgb(var(--theme-shadow-color) / 0.08)",
        "theme-section": "0 2px 12px rgb(var(--theme-shadow-color) / 0.06)",
        "theme-action": "0 2px 8px rgb(var(--theme-shadow-color) / 0.1)",
        "theme-sidebar": "2px 0 20px rgb(var(--theme-shadow-color) / 0.04)",
        "theme-panel-mobile": "0 2px 8px rgba(0, 0, 0, 0.1)",
        "theme-panel": "0 4px 24px rgba(0, 0, 0, 0.1)",
        "theme-modal": "0 8px 32px rgb(var(--theme-shadow-color) / 0.12)",
        "theme-floating": "0 2px 12px rgb(var(--theme-shadow-color) / 0.08)",
      },
      keyframes: {
        rotateCustom: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(10deg)' },
        },
        calendarSelectedBounce: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '20%': { transform: 'translateY(-3px) scale(1.02)' },
          '40%': { transform: 'translateY(0) scale(0.98)' },
          '55%': { transform: 'translateY(-1px) scale(1.01)' },
          '70%': { transform: 'translateY(0) scale(1)' },
        },
        calendarSelectedBadgeBounce: {
          '0%, 100%': { transform: `translateY(0) scale(${CALENDAR_BADGE_SCALE})` },
          '20%': { transform: `translateY(-3px) scale(${CALENDAR_BADGE_SCALE + 0.05})` },
          '40%': { transform: `translateY(0) scale(${CALENDAR_BADGE_SCALE - 0.03})` },
          '55%': { transform: `translateY(-1px) scale(${CALENDAR_BADGE_SCALE + 0.015})` },
          '70%': { transform: `translateY(0) scale(${CALENDAR_BADGE_SCALE})` },
        },
      },
      animation: {
        'rotate-slow': 'rotateCustom 500ms ease-in-out infinite alternate',
        'calendar-selected-bounce': 'calendarSelectedBounce 1200ms ease-in-out infinite',
        'calendar-selected-badge-bounce': 'calendarSelectedBadgeBounce 1200ms ease-in-out infinite',
      }
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("landscape-short", "@media (orientation: landscape) and (max-height: 600px)");
    }),
  ],
};
export default config;
