import { LinkButton } from "@/components/LinkButton"
import { Silo } from "@/types/types"
import { PlusCircleIcon } from "@heroicons/react/24/outline"

type AddTokenButtonProps = {
  teamKey: string
  silo: Silo
}

export const AddTokenButton = ({ teamKey, silo }: AddTokenButtonProps) => (
  <LinkButton
    href={`/dashboard/${teamKey}/admin/silos/edit/${silo.id}/tokens/add`}
  >
    <PlusCircleIcon className="w-5 h-5" />
    <span>Add token</span>
  </LinkButton>
)
