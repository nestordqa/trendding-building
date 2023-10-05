/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Rubik: ["Rubik", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '0',
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      '2xl': '1536px'
    },
    extend: {
      colors: {
        blue: {
          50: "#00416A"
        },
        black: {
          50: "#191619",
        },
        red: {
          50: "#FF0000",
        },
        grey: {
          50: "#808080",
        },
        pink: {
          50: '#C746FF'
        }
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};

