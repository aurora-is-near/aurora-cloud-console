import { SidebarMenu } from "@/components/menu/SidebarMenu"

export const MarketplaceMainSidebarMenu = async () => {
  return (
    <SidebarMenu
      variant="compact"
      sections={[
        {
          heading: "Featured",
          items: [
            {
              name: "Popular",
              href: `/marketplace/popular`,
            },
            {
              name: "Built by Aurora",
              href: `/marketplace/built-by-aurora`,
            },
            {
              name: "Essentials",
              href: `/marketplace/essentials`,
            },
            {
              name: "New & noteworthy",
              href: `/marketplace/new`,
            },
          ],
        },
      ]}
    />
  )
}
