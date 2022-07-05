module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        Fancy: ["Merriweather", "serif"],
        Lato: ["Lato", "sans-serif"],
      }
    },
  },
  plugins: [],
  variants: {},
  corePlugins: {
    preflight: true,
  },
};
