"use client"

import toast from "react-hot-toast"
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { useIntentsTxTopUpLink } from "@/hooks/useIntentsTxTopUpLink"
import { Modals } from "@/utils/modals"
import type { Silo, Team } from "@/types/types"
import CopyButton from "@/components/CopyButton"
import { Tooltip } from "@/uikit/Tooltip"
import { useStripePaymentLink } from "@/hooks/useStripePaymentLink"
import { Skeleton } from "@/uikit"
import { NearToken } from "../../../../../../../public/static/v2/images/icons"

export const TopUpModal = ({ silo, team }: { silo: Silo; team: Team }) => {
  const { closeModal, activeModal } = useModals()
  const open = activeModal === Modals.TopUpOptions
  const stripeTopUpLink = useStripePaymentLink(team, "top_up")
  const { isLoading, link, relayerAccount } = useIntentsTxTopUpLink(silo)

  const openNearIntents = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer")
    }
  }

  const openStripeCheckout = () => {
    if (stripeTopUpLink) {
      window.open(stripeTopUpLink, "_blank", "noopener,noreferrer")
    } else {
      toast.error("Failed to open Stripe checkout")
    }
  }

  return (
    <SlideOver title="Top up options" open={open} close={closeModal}>
      <div>
        <h2 className="text-lg font-medium mb-2">Top up with crypto</h2>
        <div className="text-sm text-gray-600 mb-4">
          <span>
            You can top up your balance with NEAR to cover the cost of
            transactions.
          </span>{" "}
          <Tooltip
            className="justify-start inline"
            trigger={
              <span className="text-cyan-600 cursor-pointer hover:underline decoration-dotted">
                How much to send?
              </span>
            }
          >
            <div className="text-xs text-slate-50">
              <p className="mb-1">Estimated transaction costs in NEAR:</p>
              <ul className="space-y-1 ml-1">
                <li className="flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full bg-white mr-2" />
                  <span>5,000 transactions &ndash; 5 NEAR</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full bg-white mr-2" />
                  <span>10,000 transactions &ndash; 10 NEAR</span>
                </li>
              </ul>
            </div>
          </Tooltip>
        </div>

        <h3 className="font-medium mb-2">
          Send NEAR to the following address:
        </h3>
        <Button variant="border" size="lg" fullWidth>
          {relayerAccount ? (
            <div className="flex items-center justify-between w-full">
              <aside className="flex items-center">
                <NearToken
                  style={{
                    transform: "scale(0.6)",
                    transformOrigin: "center",
                  }}
                />
                <span className="text-sm flex-1">
                  {isLoading ? "Loading..." : relayerAccount}
                </span>
              </aside>
              <CopyButton
                size="md"
                value={relayerAccount}
                className="bg-[#E2E8F0]"
              />
            </div>
          ) : (
            <Skeleton className="w-full h-6 rounded-none" />
          )}
        </Button>
        <div className="bg-green-50 p-3 rounded-md mb-4 mt-[12px] flex items-center gap-[12px]">
          <p className="text-xs text-gray-700">
            <span className="font-medium">Don&apos;t have NEAR?</span>{" "}
            <span className="text-slate-500">
              Swap any token for NEAR using Near Intents, and withdraw it to the
              address above.
            </span>
          </p>
          <aside className="bg-green-200 w-fit rounded-lg">
            {link && !isLoading ? (
              <Button
                variant="transparent"
                onClick={openNearIntents}
                disabled={isLoading || !link}
              >
                <ArrowRightIcon className="w-5 h-5" />
              </Button>
            ) : (
              <Skeleton className="w-8 h-8 rounded-lg" />
            )}
          </aside>
        </div>

        <div className="bg-orange-50 p-3 rounded-md text-xs">
          <p className="font-medium">
            Make sure you&apos;re sending NEAR tokens only.
          </p>
          <p className="text-slate-500">
            Sending any other asset may result in permanent loss of funds.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-[26px]">
        <div className="border-t border-gray-300 flex-grow" />
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="border-t border-gray-300 flex-grow" />
      </div>
      <div className="mt-[26px]">
        <h2 className="text-lg font-medium mb-1">Top up with fiat</h2>
        <p className="text-sm text-gray-600 mb-4">
          Use Stripe Checkout to easily add funds to your balance using a credit
          or debit card.
        </p>

        {stripeTopUpLink ? (
          <Button
            variant="border"
            className="w-full justify-between"
            onClick={openStripeCheckout}
            fullWidth
            size="lg"
          >
            <span>Top up with fiat</span>
            <ArrowTopRightOnSquareIcon className="w-6 h-6" />
          </Button>
        ) : (
          <Skeleton className="w-full h-12 rounded-none" />
        )}
      </div>
    </SlideOver>
  )
}
