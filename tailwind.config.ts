/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Apply Tailwind to all files in app/
    "./components/**/*.{js,ts,jsx,tsx}", // Include a components folder if needed
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          950: '#0a0a0a',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode
};
