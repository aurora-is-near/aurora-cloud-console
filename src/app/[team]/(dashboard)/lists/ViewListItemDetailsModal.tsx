"use client"

import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import { TrashIcon } from "@heroicons/react/20/solid"
import { Modals } from "@/utils/modals"
import { useQueryState } from "next-usequerystate"
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { Spinner } from "@/components/Spinner"
import { formatDate } from "@/utils/helpers"
import { ViewListItemDetailsRow } from "@/app/[team]/(dashboard)/lists/ViewListItemDetailsRow"

export const ViewListItemDetailsModal = () => {
  const { activeModal, closeModal, openModal } = useModals()
  const [item] = useQueryState("item")

  const deleteList = () => {
    openModal(Modals.DeleteList)
  }

  const { data } = useQuery({
    ...getQueryFnAndKey("getWallet", {
      address: encodeURIComponent(String(item)),
    }),
    enabled: !!item,
  })

  return (
    <SlideOver
      title={item ?? ""}
      open={activeModal === Modals.ViewListItemDetails}
      close={closeModal}
    >
      {!data ? (
        <Spinner className="mt-20" />
      ) : (
        <div>
          <ViewListItemDetailsRow label="First transaction at">
            {formatDate(data.firstTransactionAt)}
          </ViewListItemDetailsRow>
          <div className="border-b my-6" />
          <ViewListItemDetailsRow label="Number of transactions">
            {data.numberOfTransactions}
          </ViewListItemDetailsRow>
          <div className="border-b my-6" />
          <ViewListItemDetailsRow label="Last transaction at">
            {formatDate(data.lastTransactionAt)}
          </ViewListItemDetailsRow>
        </div>
      )}
      <SlideOver.Actions>
        <div className="flex items-center flex-1 justify-end">
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={deleteList}>
              <TrashIcon className="w-5 h-5 text-gray-900" />
              Delete
            </Button>
          </div>
        </div>
      </SlideOver.Actions>
    </SlideOver>
  )
}
