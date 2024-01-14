"use client"

import Button from "@/components/Button"
import { PlusIcon } from "@heroicons/react/20/solid"

const AddListButton = () => {
  return (
    <Button>
      <PlusIcon className="w-5 h-5" />
      <span>Add list</span>
    </Button>
  )
}

export default AddListButton
