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
        'bg-blur-clr': '#1B1212',
        'gry-counterClr': '#EFEFF0',
        'grn-50': '#EAFAF4',
        'grn-100': '#D6F5EA',
        'grn-200': '#ACECD5',
        'grn-300': '#83E2BF',
        'grn-400': '#59D9AA',
        'grn-500': '#67DCB1',
        'grn-600': '#26A677',
        'grn-700': '#1D7C59',
        'grn-800': '#13533C',
        'grn-950': '#05150F',
        'ble-50': '#E6F2FF',
        'ble-100': '#CDE5FE',
        'ble-200': '#9BCAFD',
        'ble-300': '#68B0FD',
        'ble-400': '#3696FC',
        'ble-500': '#459DFC',
        'ble-600': '#0363C9',
        'ble-700': '#024A97',
        'ble-800': '#023164',
        'ble-950': '#000C19',
      },
    },
  },
  plugins: [],
}
