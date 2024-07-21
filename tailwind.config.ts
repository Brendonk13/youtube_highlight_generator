import { type Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config = {
  content: [
    './src/**/*.{html,js,ts,tsx}', // Adjust these paths according to your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        blue: colors.blue,
        purple: colors.purple,
        pink: colors.pink,
        orange: colors.orange,
        green: colors.green,
        yellow: colors.yellow,
        // grayDark: colors.grayDark,
        gray: colors.gray,
        // grayLight: colors.grayLight,
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    },
  },
} satisfies Config

export default config
