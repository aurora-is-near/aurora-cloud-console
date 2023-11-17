import Heading from "@/components/Heading"
import Table from "@/components/Table"
import { adminSupabase, serverSupabase } from "@/utils/supabase"
import { Tables } from "@/types/types"
import InviteButton from "./InviteButton"

type User = Pick<Tables<"users">, "name" | "email"> & {
  companies: Pick<Tables<"companies">, "id">
}

const Page = async () => {
  const supabase = serverSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("No user found.")

  const { data: company, error: companyError } = await adminSupabase()
    .from("companies")
    .select("id, users!inner(user_id)")
    .eq("users.user_id", user.id)
    .maybeSingle()

  if (companyError || !company) throw new Error("No company found.")

  const { data: users, error } = await adminSupabase()
    .from("users")
    .select("name, email, companies!inner(id))")
    .eq("companies.id", company.id)
    .returns<User[]>()

  if (error) throw new Error("No users found.")

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading tag="h2">Team</Heading>
        <InviteButton />
      </div>

      <Table className="mt-7">
        <Table.TH>Name</Table.TH>
        <Table.TH>Email</Table.TH>
        {users.map((user) => (
          <Table.TR key={user.email}>
            <Table.TD dark>{user.name}</Table.TD>
            <Table.TD>{user.email}</Table.TD>
          </Table.TR>
        ))}
      </Table>
    </>
  )
}

export default Page
