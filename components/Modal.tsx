"use client"

import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Fragment, ReactNode } from "react"

const Modal = ({
  title,
  children,
  open,
  close,
}: {
  title: string
  children: ReactNode
  open: boolean
  close: () => void
}) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={close}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative p-5 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-base font-medium leading-4 text-gray-900">
                  {title}
                </Dialog.Title>
                <button
                  type="button"
                  className="absolute text-gray-400 bg-white rounded-md top-4 right-4 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                  onClick={close}
                >
                  <span className="sr-only">Close modal</span>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-1.5">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
)

export default Modal
