/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
