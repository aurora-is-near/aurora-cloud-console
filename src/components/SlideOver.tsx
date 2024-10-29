import { Fragment, ReactNode } from "react"
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { findChildren, findOtherChildren } from "@/utils/helpers"
import { useModalAfterLeave } from "@/hooks/useModalAfterLeave"

const Actions = ({
  children,
  justifyClassName = "justify-end",
}: {
  children: ReactNode
  justifyClassName?: string
}) => (
  <div className="flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6">
    <div className={clsx("flex space-x-3", justifyClassName)}>{children}</div>
  </div>
)

Actions.displayName = "Actions"

const SlideOver = ({
  title,
  children,
  open,
  close,
}: {
  title: string
  children: ReactNode
  open: boolean
  close: () => void
}) => {
  const { afterLeave } = useModalAfterLeave()
  const actions = findChildren(children, "Actions")
  const content = findOtherChildren(children, ["Actions"])

  return (
    <Transition show={open}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                afterLeave={afterLeave}
              >
                <DialogPanel className="w-screen max-w-md pointer-events-auto">
                  <div className="flex flex-col h-full overflow-y-auto bg-white shadow-xl">
                    <div className="flex-1">
                      {/* Header */}
                      <header className="px-4 py-6 bg-gray-50 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <Dialog.Title className="text-base font-medium leading-6 text-gray-900">
                            {title}
                          </Dialog.Title>
                          <button
                            type="button"
                            className="relative text-gray-900"
                            onClick={close}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </header>

                      {/* Main content */}
                      <div className="relative px-4 py-6 sm:px-6">
                        {content}
                      </div>
                    </div>

                    {actions}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

SlideOver.Actions = Actions

export default SlideOver
