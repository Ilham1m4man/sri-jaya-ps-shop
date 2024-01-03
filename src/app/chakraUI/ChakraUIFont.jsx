import localFont from 'next/font/local'

const OpenSauceOne = localFont({
  src: [
    {
      path: '../(font)/OpenSauceOne-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../(font)/OpenSauceOne-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../(font)/OpenSauceOne-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../(font)/OpenSauceOne-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
})

export const openSauceOne = {
  OpenSauceOne,
}