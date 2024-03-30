import { SubMenuButton } from "@/components/menu/MenuButtons"
import { CurrencyDollarIcon, PlusCircleIcon } from "@heroicons/react/24/outline"

export const AdminTokensMenu = () => (
  <ul className="space-y-4">
    <li>
      <SubMenuButton
        href="/admin/tokens"
        name="All tokens"
        icon={<CurrencyDollarIcon />}
      />
    </li>
    <li>
      <SubMenuButton
        href="/admin/tokens/add"
        name="Add token"
        icon={<PlusCircleIcon />}
      />
    </li>
  </ul>
)
