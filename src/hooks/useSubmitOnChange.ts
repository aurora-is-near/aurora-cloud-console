import { SubmitHandler, UseFormWatch } from "react-hook-form"
import { useEffect } from "react"

export const useSubmitOnChange = <Inputs extends Record<string, unknown>>(
  watch: UseFormWatch<Inputs>,
  submit: SubmitHandler<Inputs>,
) => {
  useEffect(() => {
    const subscription = watch((value, { name, type: operation }) => {
      if (operation === "change" && name) {
        submit(value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, submit])
}
