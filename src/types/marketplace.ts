export type MarketplaceApp = {
  id: string
  title: string
  description?: string
  slug: string
  logo?: {
    id: string
    url: string
    alt?: string
  }
  categories: {
    id: string
    slug: string
    title: string
  }[]
  content: {
    heading?: string
    body?: string
    image?: {
      id: string
      url: string
      alt?: string
    }
  }[]
  heroImage?: {
    id: string
    url: string
    alt?: string
  }
  links?: {
    id: string
    text: string
    url: string
  }[]
  _allReferencingMarketplaceCollections: {
    id: string
    title: string
    slug: string
    builtByAurora: boolean
  }[]
}

export type MarketplaceAppCard = Pick<
  MarketplaceApp,
  | "id"
  | "title"
  | "description"
  | "slug"
  | "logo"
  | "categories"
  | "heroImage"
  | "_allReferencingMarketplaceCollections"
>
