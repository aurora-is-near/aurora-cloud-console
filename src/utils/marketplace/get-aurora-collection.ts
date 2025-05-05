export const getAuroraCollection = <T extends { builtByAurora: boolean }>(app: {
  _allReferencingMarketplaceCollections: T[]
}): T | undefined =>
  app._allReferencingMarketplaceCollections.find(
    (collection) => collection.builtByAurora,
  )
