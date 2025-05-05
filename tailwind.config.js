/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'yale-blue': 'var(--yale-blue)',
        'beige': 'var(--beige)',
        'naples-yellow': 'var(--naples-yellow)',
        'sand-brown': 'var(--sand-brown)',
        'tomato': 'var(--tomato)',
        'snow-white': 'var(--snow-white)',
        'ghost-white': 'var(--ghost-white)',
      }
    },
  },
  plugins: [],
};
