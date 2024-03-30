import { SubMenuButton } from "@/components/menu/MenuButtons"
import { PlusCircleIcon, TicketIcon } from "@heroicons/react/24/outline"

export const AdminDealsMenu = () => (
  <ul className="space-y-4">
    <li>
      <SubMenuButton
        href="/admin/deals"
        name="All deals"
        icon={<TicketIcon />}
      />
    </li>
    <li>
      <SubMenuButton
        href="/admin/deals/add"
        name="Add deal"
        icon={<PlusCircleIcon />}
      />
    </li>
  </ul>
)
