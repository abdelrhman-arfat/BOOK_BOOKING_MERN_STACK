/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#4B164C",
        second: "#DD88CF",
        third: "#F8E7F6",
        forth: "#F5F5F5",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
