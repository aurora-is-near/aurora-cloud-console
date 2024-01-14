import localFont from "next/font/local"

export const circular = localFont({
  variable: "--font-circular",
  display: "swap",
  src: [
    {
      path: "./CircularXXSub-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./CircularXXSub-BookItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./CircularXXSub-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./CircularXXSub-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./CircularXXSub-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
})
