import { MarketplaceCategoryPage } from "../MarketplaceCategoryPage"

const Page = ({
  searchParams: { query },
}: {
  searchParams: { query?: string }
}) => {
  return (
    <MarketplaceCategoryPage
      isSearchQuery
      title={`Results for "${query}"`}
      query={{ search: query ?? "" }}
    />
  )
}

export default Page
