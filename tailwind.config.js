/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors :{
        primary :"#1e3a8a"   ,             //"#1565c0",
        secondary : "#1565c0",
        tertiary : "#f7f7f7",
      },
    },
  },
  plugins: [],
};
