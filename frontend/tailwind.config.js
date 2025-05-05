module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/ag-grid-community/dist/styles/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#64748B',
        success: '#10B981',
        danger: '#EF4444',
      },
    },
  },
  corePlugins: {
    preflight: false, // Disable default styles to prevent AG Grid conflicts
  },
  plugins: [],
};
