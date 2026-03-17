/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#1c64f2',
          dark: '#0e2933',
          light: '#3e545c',
        },
        text: {
          primary: '#191918',
          heading: '#111928',
          secondary: '#464544',
          muted: '#706f69',
          gray: '#6b7280',
          dark: '#232529',
        },
        surface: {
          white: '#ffffff',
          light: '#fbfafd',
          gray: '#f9fafb',
          lightGray: '#f6f6f5',
          grayAlt: '#f3f5f5',
          surface: '#e7eaeb',
        },
        border: {
          light: '#d4d4d4',
          DEFAULT: '#e7e7e6',
          gray: '#e5e7eb',
          dark: '#dbdfe0',
        },
        sidebar: {
          bg: '#0e2933',
          text: '#ffffff',
          icon: '#3e545c',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
