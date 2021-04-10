module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: ['IM Fell English', 'serif'],
      /*smallCaps: ['IM Fell Great Primer SC', 'serif'],*/
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
