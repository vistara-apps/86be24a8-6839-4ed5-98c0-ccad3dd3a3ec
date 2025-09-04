/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(210 40% 5%)',
        foreground: 'hsl(210 40% 95%)',
        accent: 'hsl(250 40% 50%)',
        border: 'hsl(210 40% 20%)',
        primary: 'hsl(210 40% 9%)',
        surface: 'hsl(210 40% 8%)',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      spacing: {
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
        'xl': '24px',
      },
      boxShadow: {
        'md': '0 4px 6px -1px hsla(0,0%,0%,0.1), 0 2px 4px -2px hsla(0,0%,0%,0.06)',
        'sm': '0 1px 3px 0 hsla(0,0%,0%,0.1), 0 1px 2px 0 hsla(0,0%,0%,0.06)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
