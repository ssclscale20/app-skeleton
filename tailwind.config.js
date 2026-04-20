/** @type {import('tailwindcss').Config} */

// -----------------------------------------------------------------------------
// Rebranding tip:
// The single `accent` color below is what drives buttons, active nav states,
// and focus rings. To change the brand color of the entire dashboard, update
// the --accent and --accent-foreground CSS variables in src/index.css.
// -----------------------------------------------------------------------------

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--accent-foreground) / <alpha-value>)',
      },
      fontFamily: {
        // TODO: Swap the font stack here when branding. Try pairing with a
        // Google Font import in index.html (e.g., Inter, Geist, Manrope).
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
