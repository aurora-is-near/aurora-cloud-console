import { ReactNode } from "react"
import { AddListModal } from "./AddListModal"
import { EditListModal } from "./EditListModal"
import { DeleteListModal } from "./DeleteListModal"
import { ImportListItemsModal } from "./ImportListItemsModal"
import { DeleteListItemModal } from "./DeleteListItemModal"
import { ViewListItemDetailsModal } from "./ViewListItemDetailsModal"

const Layout = ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => (
  <>
    {children}
    <EditListModal />
    <AddListModal />
    <DeleteListModal teamKey={teamKey} />
    <DeleteListItemModal />
    <ImportListItemsModal teamKey={teamKey} />
    <ViewListItemDetailsModal />
  </>
)

export default Layout
