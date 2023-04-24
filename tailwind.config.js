/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        screen: "drop-shadow(4px 30px 20px rgba(255, 255, 255, 0.5))",
      },
      colors: {
        shadowScreen: "#ffffff33",
      },
    },
  },
  plugins: [],
};
