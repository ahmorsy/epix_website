/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#0B1220',
          steel: '#1A2740',
          cyan: '#0EA5A8',
          mint: '#59D6B8',
          sand: '#F4EBDC',
          coral: '#F76D57',
        },
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 20px 60px rgba(11, 18, 32, 0.22)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(14, 165, 168, 0.16) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}

