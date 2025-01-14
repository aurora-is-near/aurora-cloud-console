"use client"

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Rule, RuleUser, Team, Userlist } from "@/types/types"
import { getUserlists } from "@/actions/userlists/get-userlists"
import { getRuleUsers } from "@/actions/rule-users/get-rule-users"
import { createRuleUser } from "@/actions/rule-users/create-rule-user"
import { deleteRuleUser } from "@/actions/rule-users/delete-rule-user"

type RuleContextType = {
  rule: Rule
  userlist: Userlist | undefined
  ruleUsers: RuleUser[]
  setRule: (rule: Rule) => void
  setUserlist: (userlist: Userlist) => void
  setRuleUsers: (ruleUsers: RuleUser[]) => void
  addRuleUser: (address: string) => void
  removeRuleUser: (id: number) => void
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
    },
    [userlist, ruleUsers],
  )

  const removeRuleUser = useCallback(
    async (id: number) => {
      await deleteRuleUser(id)
      setRuleUsers(ruleUsers.filter((user) => user.id !== id))
    },
    [ruleUsers],
  )

  useEffect(() => {
    if (rule?.id) {
      void getUserlists({ rule_id: rule.id })
        .then((data) => {
          setUserlist(data[0]) // We use the first Userlist, that was created when the Rule was created
          void getRuleUsers({
            userlist_id: data[0].id,
          })
            .then((userData) => setRuleUsers(userData))
            .catch((error) => {
              console.error("Failed to load rule users:", error)
              setRuleUsers([])
            })
        })
        .catch((error) => {
          console.error("Failed to load rule userlists:", error)
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
    }),
    [rule, userlist, ruleUsers, addRuleUser, removeRuleUser],
  )

  return <RuleContext.Provider value={value}>{children}</RuleContext.Provider>
}
