/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0F172A",      // Primary
        action: "#2563EB",    // Secondary
        danger: "#DC2626",
        warning: "#F59E0B",
        success: "#10B981",
        canvas: "#F8FAFC",    // Background
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
