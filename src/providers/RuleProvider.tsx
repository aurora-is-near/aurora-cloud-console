"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Rule, RuleUser, RuleUserlist, Team } from "@/types/types"
import { getRuleUserlists } from "@/actions/rule-userlists/get-rule-userlists"
import { getRuleUsers } from "@/actions/rule-users/get-rule-users"
import { createRuleUserlist } from "@/actions/rule-userlists/create-rule-userlist"

type RuleContextType = {
  rule: Rule
  ruleUserlists: RuleUserlist[]
  ruleUsers: Record<number, RuleUser[]>
  setRule: (rule: Rule) => void
  setRuleUserlists: (userlists: RuleUserlist[]) => void
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
  const [ruleUserlists, setRuleUserlists] = useState<RuleUserlist[]>([])
  const [ruleUsers, _setRuleUsers] = useState<Record<number, RuleUser[]>>({})

  useEffect(() => {
    if (rule?.id) {
      void getRuleUserlists({ rule_id: rule.id })
        .then((data) => {
          if (data.length === 0) {
            void createRuleUserlist({
              team_id: team.id,
              rule_id: rule.id,
            }).then((newUserlist) => {
              setRuleUserlists([newUserlist])
            })
          } else {
            setRuleUserlists(data)
          }
        })
        .catch((error) => {
          console.error("Failed to load rule userlists:", error)
          setRuleUserlists([])
        })
    } else {
      setRuleUserlists([])
    }
  }, [rule?.id, team.id])

  const value = useMemo(
    () => ({
      rule,
      ruleUserlists,
      ruleUsers,
      setRule,
      setRuleUserlists,
    }),
    [rule, ruleUserlists, ruleUsers],
  )

  return <RuleContext.Provider value={value}>{children}</RuleContext.Provider>
}

export function useRule() {
  const context = useContext(RuleContext)

  if (context === undefined) {
    throw new Error("useRule must be used within a RuleProvider")
  }

  return context
}
