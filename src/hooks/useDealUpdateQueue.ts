import { useQueryClient } from "@tanstack/react-query"

type Queue = (() => void)[]

export const useDealUpdateQueue = (dealId: string) => {
  const cacheKey = ["queued-deal-updates", dealId]
  const queryClient = useQueryClient()

  const queueUpdate = (callback: () => void) => {
    const queue = queryClient.getQueryData<Queue>(cacheKey) ?? []

    queue.push(callback)

    queryClient.setQueryData(cacheKey, queue)
  }

  const processUpdates = async () => {
    const queue = queryClient.getQueryData<Queue>(cacheKey) ?? []

    await Promise.all(
      queue.map(async (callback) => {
        callback()
      }),
    )

    queryClient.setQueryData(cacheKey, [])
  }

  return { queueUpdate, processUpdates }
}
