import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-circular)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: {
          50: "rgb(var(--green-50) / <alpha-value>)", // #F3FEF3
          100: "rgb(var(--green-100) / <alpha-value>)", // #DCFBDC
          200: "rgb(var(--green-200) / <alpha-value>)", // #BAF6B9
          300: "rgb(var(--green-300) / <alpha-value>)", // #8CF18A
          400: "rgb(var(--green-400) / <alpha-value>)", // #5DEB5A
          500: "rgb(var(--green-500) / <alpha-value>)", // #20DE1C
          600: "rgb(var(--green-600) / <alpha-value>)", // #17A615
          700: "rgb(var(--green-700) / <alpha-value>)", // #117C0F
          800: "rgb(var(--green-800) / <alpha-value>)", // #0E680D
          900: "rgb(var(--green-900) / <alpha-value>)", // #0B530A
        },
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss"), require("@tailwindcss/forms")],
}
export default config
