/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-jetbrainsMono)",
    },
    extend: {
      colors: {
        primary: "#1c1c22",
        // accent: { // teal
        //   DEFAULT: "#FFBF00",
        //   hover: "#00e187",
        // },
        accent: {
          // amber
          DEFAULT: "#ffcc00",
          hover: "#ffe600", // #ffd900 (a bit darker)
        },
        // accent: { // mauve
        //   DEFAULT: "#8A00C4",
        //   hover: "#A600EB",
        // },
        // background: 'var(--background)',
        // foreground: 'var(--foreground)'
        palette: {
					DEFAULT: "ffcc00",
					
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
