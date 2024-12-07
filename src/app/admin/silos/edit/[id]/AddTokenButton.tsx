import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { LinkButton } from "@/components/LinkButton"
import { Silo } from "@/types/types"

type AddTokenButtonProps = {
  silo: Silo
}

export const AddTokenButton = ({ silo }: AddTokenButtonProps) => (
  <LinkButton href={`/admin/silos/edit/${silo.id}/tokens/add`}>
    <PlusCircleIcon className="w-5 h-5" />
    <span>Add token</span>
  </LinkButton>
)
