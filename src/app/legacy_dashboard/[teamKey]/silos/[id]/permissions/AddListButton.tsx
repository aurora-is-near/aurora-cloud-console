"use client"

import { PlusIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"

const AddListButton = () => {
  return (
    <Button>
      <PlusIcon className="w-5 h-5" />
      <span>Add list</span>
    </Button>
  )
}

export default AddListButton
