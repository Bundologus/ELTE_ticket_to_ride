const svgToTinyDataUri = require('mini-svg-data-uri');
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      regular: ['IM Fell English', 'serif'],
      smallCaps: ['IM Fell Great Primer SC', 'serif'],
      number: ['Old Standard TT', 'serif'],
    },
    extend: {
      backgroundImage: {
        'ttr-locomotive':
          'linear-gradient(45deg, rgba(219,119,213,1) 5%, rgba(19,171,223,1) 21%, rgba(137,195,75,1) 42%, rgba(251,225,77,1) 63%, rgba(235,144,73,1) 84%, rgba(233,28,38,1) 100%)',
      },
      borderStyle: {
        outset: 'outset',
      },
      boxShadow: {
        'glow-black-sm': '0 0 8px #282f25',
        'glow-blue-sm': '0 0 8px #005796',
        'glow-green-sm': '0 0 8px #066b35',
        'glow-red-sm': '0 0 8px #b11017',
        'glow-yellow-sm': '0 0 8px #d09d01',
        'glow-black': '0 0 15px #282f25',
        'glow-blue': '0 0 15px #005796',
        'glow-green': '0 0 15px #066b35',
        'glow-red': '0 0 15px #b11017',
        'glow-yellow': '0 0 15px #d09d01',
      },
      colors: {
        'gray-550': '#5b6472',
        'player-black': '#282f25',
        'player-blue': '#005796',
        'player-green': '#066b35',
        'player-red': '#b11017',
        'player-yellow': '#d09d01',
        'ttr-black': '#827d7c',
        'ttr-blue': '#13abdf',
        'ttr-green': '#89c34b',
        'ttr-orange': '#eb9049',
        'ttr-pink': '#db77d5',
        'ttr-red': '#d14338',
        'ttr-white': '#f4f3e2',
        'ttr-yellow': '#fbe14d',
      },
      divideWidth: {
        0.5: '0.5px',
      },
      fontSize: {
        '2xs': ['.65rem', '.8rem'],
        '3xs': ['.5rem', '.7rem'],
      },
      height: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
      },
      lineHeight: {
        custom: '2.85rem',
      },
      maxHeight: {
        lg: '480px',
        xl: '624px',
        '2xl': '804px',
        '3xl': '976px',
      },
      minWidth: {
        '1/5': '20%',
      },
      screens: {
        '3xl': '2048px',
      },
      spacing: {
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        50: '12.5rem',
        108: '27rem',
        112: '28rem',
      },
      width: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
      },
    },
  },
  variants: {
    animation: ['motion-reduce'],
    extend: {
      backgroundColor: ['active', 'checked'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addUtilities }) => {
      const svgUri = svgToTinyDataUri(
        `<svg viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>`,
      );
      const newUtilities = {
        '.radio-dark': {
          'background-image': 'url("' + svgUri + '")',
        },
      };

      addUtilities(newUtilities, ['checked']);
    }),
  ],
};
