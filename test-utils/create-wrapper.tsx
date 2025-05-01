import { ReactNode } from "react"
import { ModalsContext } from "@/providers/ModalsProvider"
import { MenuContext } from "@/providers/MenuProvider"
import { AnalyticsContext } from "@/providers/AnalyticsProvider"
import { QueryProvider } from "@/providers/QueryProvider"
import { SiloContext, SiloContextType } from "@/providers/SiloProvider"
import { TeamContext, TeamContextType } from "@/providers/TeamProvider"

type WrapperProps = {
  children: ReactNode
}

type CreateWrapperProps = {
  siloContext?: SiloContextType
  teamContext?: TeamContextType
}

export const createWrapper = ({
  siloContext,
  teamContext,
}: CreateWrapperProps = {}) =>
  function wrapper({ children }: WrapperProps) {
    let jsx = (
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
              setHasMenu: () => {},
              hasMenu: false,
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

    if (siloContext) {
      jsx = (
        <SiloContext.Provider value={siloContext}>{jsx}</SiloContext.Provider>
      )
    }

    if (teamContext) {
      jsx = (
        <TeamContext.Provider value={teamContext}>{jsx}</TeamContext.Provider>
      )
    }

    return jsx
  }
