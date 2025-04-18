const TransitionRoot = ({
  children,
  className,
  show = true,
}: {
  children: React.ReactNode
  className: string
  show?: boolean
}) => (show ? <div className={className}>{children}</div> : null)

const createReturnChildren =
  () =>
  ({
    className,
    children,
  }: {
    className: string
    children: React.ReactNode
  }) => <div className={className}>{children}</div>

export const headlessUITransitionMock = (
  originalModule: Record<string, any>,
) => ({
  ...originalModule,
  Dialog: TransitionRoot,
  DialogPanel: createReturnChildren(),
  DialogTitle: createReturnChildren(),
  Listbox: TransitionRoot,
  ListboxOptions: TransitionRoot,
  ListboxButton: createReturnChildren(),
  ListboxOption: createReturnChildren(),
  Transition: TransitionRoot,
  TransitionChild: createReturnChildren(),
})

// Usage. In a test file:
//
// jest.mock("@headlessui/react", () => {
//   return headlessUITransitionMock(jest.requireActual("@headlessui/react"))
// })
