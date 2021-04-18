module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        PRIMARY: '#F4A62B',
        WHITE: '#EFEFEF',
        GRAY: '#4B4B4B',
      },
    },
  },
  variants: {},
  plugins: [],
};
