"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { ArrowsRightLeftIcon, TrashIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

type Inputs = Partial<Record<string, boolean>>

type RequestOraclePriceFeedModalProps = {
  siloId: number
}

const RequestOraclePriceFeedModal = ({
  siloId,
}: RequestOraclePriceFeedModalProps) => {
  const { closeModal, activeModal } = useModals()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const submit = () => {}

  return (
    <SlideOver
      title={`Request Price Feed for ${siloId}`}
      open={activeModal === Modals.RequestOraclePriceFeed}
      close={closeModal}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <div className="flex flex-row gap-2 justify-between">
            <div className="flex flex-row gap-2 justify-start items-center">
              <div>
                <label htmlFor="token_a" className="sr-only">
                  Token A
                </label>
                <select
                  id="token_a"
                  {...register("token_a")}
                  className="border-slate-200 rounded-md w-24 p-2 text-sm text-slate-500"
                >
                  <option value="">Select</option>
                  <option value="1">Token 1</option>
                  <option value="2">Token 2</option>
                </select>
              </div>
              <ArrowsRightLeftIcon className="w-5 h-5 text-slate-900" />
              <div>
                <label htmlFor="token_b" className="sr-only">
                  Token B
                </label>
                <select
                  id="token_b"
                  {...register("token_b")}
                  className="border-slate-200 rounded-md w-24 p-2 text-sm text-slate-500"
                >
                  <option value="">Select</option>
                  <option value="1">Token 1</option>
                  <option value="2">Token 2</option>
                </select>
              </div>
            </div>
            <Button variant="secondary">
              <TrashIcon className="w-5 h-5 text-slate-500" />
            </Button>
          </div>
        </div>
      </form>
      <SlideOver.Actions>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          loading={isSubmitting}
          onClick={handleSubmit(submit)}
          disabled={isSubmitting}
        >
          <CheckIcon className="w-5 h-5" />
          Request deployment
        </Button>
      </SlideOver.Actions>
    </SlideOver>
  )
}

export default RequestOraclePriceFeedModal
