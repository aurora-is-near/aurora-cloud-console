export type UserInfo = {
  email: string
  name: string | null
}

type Contract = {
  address: string
  name: string
}

export type Deal = {
  contracts: Contract[]
  created_at: string
  id: string
  name: string
}

export type Silo = {
  href: string
  name: string
}

export type List = {
  href: string
  name: string
}
