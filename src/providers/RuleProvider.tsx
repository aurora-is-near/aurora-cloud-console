"use client"

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import toast from "react-hot-toast"
import { Rule, RuleUser, Team, Userlist } from "@/types/types"
import { getRuleUsers } from "@/actions/rule-users/get-rule-users"
import { createRuleUser } from "@/actions/rule-users/create-rule-user"
import { deleteRuleUser } from "@/actions/rule-users/delete-rule-user"
import { updateRule } from "@/actions/rules/update-rule"
import { getUiUserlists } from "@/actions/userlists/get-ui-userlists"
import { createRuleUserlist } from "@/actions/rule-userlists/create-rule-userlist"

type RuleContextType = {
  rule: Rule
  userlist: Userlist | undefined
  ruleUsers: RuleUser[]
  setRule: (rule: Rule) => void
  setUserlist: (userlist: Userlist) => void
  setRuleUsers: (ruleUsers: RuleUser[]) => void
  addRuleUser: (address: string) => void
  removeRuleUser: (id: number) => void
  addRuleContract: (address: string) => void
  removeRuleContract: (address: string) => void
}

export const RuleContext = createContext<RuleContextType | null>(null)

type RuleProviderProps = {
  children: ReactNode
  initialRule: Rule
  team: Team
}

export const RuleProvider = ({
  children,
  initialRule,
  team,
}: RuleProviderProps) => {
  const [rule, setRule] = useState<Rule>(initialRule)
  const [userlist, setUserlist] = useState<Userlist>()
  const [ruleUsers, setRuleUsers] = useState<RuleUser[]>([])

  const addRuleUser = useCallback(
    async (address: string) => {
      if (!userlist) {
        return
      }

      const newUser = await createRuleUser({
        userlist_id: userlist.id,
        eoas: [address],
      })

      setRuleUsers([...ruleUsers, newUser])
      toast.success("Address added")
    },
    [userlist, ruleUsers],
  )

  const removeRuleUser = useCallback(
    async (id: number) => {
      await deleteRuleUser(id)
      setRuleUsers(ruleUsers.filter((user) => user.id !== id))
      toast.success("Address removed")
    },
    [ruleUsers],
  )

  const addRuleContract = useCallback(
    async (address: string) => {
      const contracts = rule.contracts ?? []
      const updatedContracts = [...contracts, address]

      const updatedRule = await updateRule(rule.id, rule.deal_id, {
        contracts: updatedContracts,
      })

      setRule(updatedRule)

      toast.success("Contract address added")
    },
    [rule.deal_id, rule.id, rule.contracts],
  )

  const removeRuleContract = useCallback(
    async (address: string) => {
      const contracts = rule.contracts ?? []
      const updatedContracts = contracts.filter((a: string) => a !== address)

      const updatedRule = await updateRule(rule.id, rule.deal_id, {
        contracts: updatedContracts,
      })

      setRule(updatedRule)

      toast.success("Contract address removed")
    },
    [rule.deal_id, rule.id, rule.contracts],
  )

  useEffect(() => {
    if (rule?.id) {
      void getUiUserlists({ rule_id: rule.id })
        .then((data) => {
          if (data.length === 0) {
            throw new Error("No userlist found")
          }

          setUserlist(data[0]) // We use the first Userlist, that was created when the Rule was created
          void getRuleUsers({
            userlist_id: data[0].id,
          })
            .then((userData) => setRuleUsers(userData.data))
            .catch(() => {
              setRuleUsers([])
            })
        })
        .catch(async (e) => {
          if (e.message === "No userlist found") {
            await createRuleUserlist({
              team_id: team.id,
              rule_id: rule.id,
            })

            void getUiUserlists({ rule_id: rule.id }).then((data) => {
              setUserlist(data[0])
            })
          }

          setUserlist(undefined)
        })
    } else {
      setUserlist(undefined)
    }
  }, [rule?.id, team.id])

  const value = useMemo(
    () => ({
      rule,
      userlist,
      ruleUsers,
      setRule,
      setUserlist,
      setRuleUsers,
      addRuleUser,
      removeRuleUser,
      addRuleContract,
      removeRuleContract,
    }),
    [
      rule,
      userlist,
      ruleUsers,
      addRuleUser,
      removeRuleUser,
      addRuleContract,
      removeRuleContract,
    ],
  )

  return <RuleContext.Provider value={value}>{children}</RuleContext.Provider>
}
