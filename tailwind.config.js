/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidthwidth: {
        'custom': '8rem'
      },

    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
