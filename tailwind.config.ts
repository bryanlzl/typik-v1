import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        verdana: "Verdana",
        opensans: "OpenSans",
      },
    },
  },
  plugins: [],
};
export default config;
