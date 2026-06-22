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
        theme: "var(--theme-color)",
        "theme-bg": "var(--theme-bg)",
        "grey-title": "rgb(var(--greyTitle))",
      },
      fontFamily: {
        bmjua: ["BMJUA", "sans-serif"],
        diary: ["HakgyoansimGeurimilgiTTF-R", "sans-serif"],
      },
      fontSize: {
        app: "var(--app-font-size)",
      },
      boxShadow: {
        card: "0 1px 4px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
