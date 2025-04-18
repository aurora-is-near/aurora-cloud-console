import { PlusIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"

type AddToMetaMaskButtonProps = {
  onClick: () => void
}

export const AddToMetaMaskButton = ({ onClick }: AddToMetaMaskButtonProps) => (
  <Button onClick={onClick} variant="border">
    <PlusIcon className="w-4 h-4" />
    <span>Add to MetaMask</span>
  </Button>
)
