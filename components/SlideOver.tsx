import { Fragment, ReactNode } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"

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
}) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={close}>
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-screen max-w-2xl pointer-events-auto">
                <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1">
                    {/* Header */}
                    <header className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            {title}
                          </Dialog.Title>
                        </div>
                        <div className="flex items-center h-7">
                          <button
                            type="button"
                            className="relative text-gray-400 hover:text-gray-500"
                            onClick={close}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </header>

                    {/* Main content */}
                    <div>{children}</div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6">
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={close}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
)

export default SlideOver
