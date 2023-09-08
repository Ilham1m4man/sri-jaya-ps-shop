/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'mainBg_clr': '#F5F5F5',
        'green_cardClr': '#9AE8CC',
        'danger_clr': '#D81010',
        'footer_fontClr': '#464646',
        'grn-300': '#83E2BF',
        'grn-950': '#05150F',
      },
    },
  },
  plugins: [],
}
