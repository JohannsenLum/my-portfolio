module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      // The one easing curve used everywhere on the site (see
      // src/hooks/useReveal.ts). Exposed as `ease-signature` so plain
      // CSS transitions (e.g. the navbar's scroll-aware background)
      // match the same feel as the framer-motion reveals.
      transitionTimingFunction: {
        signature: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        // Very slow ambient drift for the global background mesh in
        // index.css. Kept as a config-driven keyframe (rather than a
        // hand-rolled @keyframes block) so the global prefers-reduced-motion
        // safety net in index.css — which caps animation-duration on
        // every element — also neutralises it for free.
        'mesh-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-1.5%, 1.5%, 0) scale(1.05)' },
        },
      },
      animation: {
        'mesh-drift': 'mesh-drift 28s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
    },
  },
  plugins: [],
}