"use client"

import {
  CreditCardIcon,
  InformationCircleIcon,
  KeyIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import { SubMenuButton } from "@/components/menu/MenuButtons"
import { useSelectedLayoutSegments } from "next/navigation"
import SignoutButton from "@/components/menu/SignoutButton"

export const SettingsMenu = () => {
  const [, , teamKey] = useSelectedLayoutSegments()

  return (
    <>
      <ul className="space-y-4">
        <SubMenuButton
          name="Billing"
          href={`/dashboard/${teamKey}/settings/billing`}
          icon={<CreditCardIcon />}
        />
        <SubMenuButton
          name="Team"
          href={`/dashboard/${teamKey}/settings/team`}
          icon={<UsersIcon />}
        />
        <SubMenuButton
          name="Company"
          href={`/dashboard/${teamKey}/settings/company`}
          icon={<InformationCircleIcon />}
        />
        <SubMenuButton
          name="Account"
          href={`/dashboard/${teamKey}/settings/account`}
          icon={<UserIcon />}
        />
        <SubMenuButton
          name="API Keys"
          href={`/dashboard/${teamKey}/settings/api-keys`}
          icon={<KeyIcon />}
        />
      </ul>
      <div className="pt-4 border-t border-gray-200">
        <SignoutButton />
      </div>
    </>
  )
}
