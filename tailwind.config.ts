import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        verdana: "Verdana",
        opensans: "OpenSans",
      },
      animation: {
        "blink-cursor": "blink-cursor 1.5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
