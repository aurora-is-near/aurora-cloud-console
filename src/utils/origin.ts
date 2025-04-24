export const getSiteOrigin = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return "https://app.auroracloud.dev"
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  return "http://localhost:3000"
}
