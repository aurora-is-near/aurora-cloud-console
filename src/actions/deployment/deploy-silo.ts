"use server"

export const deploySilo = async (teamId: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(`Do stuff for team: ${teamId}`)
      resolve()
    }, 2000)
  })
