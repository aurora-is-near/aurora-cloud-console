import { ReactNode } from "react"
import { ModalsContext } from "@/providers/ModalsProvider"
import { MenuContext } from "@/providers/MenuProvider"
import { AnalyticsContext } from "@/providers/AnalyticsProvider"
import { QueryProvider } from "@/providers/QueryProvider"

type WrapperProps = {
  children: ReactNode
}

export const createWrapper = () =>
  function wrapper({ children }: WrapperProps) {
    return (
      <QueryProvider>
        <AnalyticsContext.Provider
          value={{
            mixPanel: null,
          }}
        >
          <MenuContext.Provider
            value={{
              isMenuOpen: false,
              openMenu: () => {},
              closeMenu: () => {},
            }}
          >
            <ModalsContext.Provider
              value={{
                activeModal: null,
                openModal: () => {},
                closeModal: () => {},
              }}
            >
              {children}
            </ModalsContext.Provider>
          </MenuContext.Provider>
        </AnalyticsContext.Provider>
      </QueryProvider>
    )
  }
