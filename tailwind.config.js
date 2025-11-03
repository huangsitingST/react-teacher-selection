/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // ✅ v3 需要 content 扫描
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
};
