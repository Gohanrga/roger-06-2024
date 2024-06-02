/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "blue-dark": "#263238",
      "blue-light": "#ebf5f0",
    },
    extend: {
      height: {
        "100vh": "100vh",
      },
    },
    fontFamily: {
      arial: ["Arial", "sans-serif"],
    },
  },
  plugins: [],
};
