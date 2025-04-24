export type MarketplaceApp = {
  title: string
  description: string
  slug: string
  logo: string
  categories: string[]
  content: {
    heading: string
    body: string
    image?: string
  }[]
  links?: {
    title: string
    url: string
  }[]
}
