import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        questrial: ['Questrial', 'sans-serif']
      },
    },
  },
  plugins: [
    forms,
  ],
}

