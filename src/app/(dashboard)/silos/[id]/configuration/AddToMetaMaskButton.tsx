import { Button } from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"

type AddToMetaMaskButtonProps = {
  onClick: () => void
}

export const AddToMetaMaskButton = ({ onClick }: AddToMetaMaskButtonProps) => (
  <Button onClick={onClick} size="sm" variant="border">
    <PlusIcon className="w-4 h-4" />
    <span>Add to MetaMask</span>
  </Button>
)
