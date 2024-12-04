type Params = {
  date: string
}

export const queryGasCollected = async (_chainId: string, _params: Params) => {
  const mockedData = Array.from({ length: 31 }, (_, index) => {
    const day = new Date(2024, 11, index + 1).toISOString().split("T")[0]

    return { day, count: 0 }
  })

  return Promise.all([
    Promise.resolve({ rows: [{ count: 0 }] }),
    Promise.resolve({ rows: mockedData }),
  ])
}
