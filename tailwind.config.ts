import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        verdana: "Verdana",
        opensans: "OpenSans",
      },
      keyframes: {
        blinkOpacity: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "blink-cursor": "blinkOpacity 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
