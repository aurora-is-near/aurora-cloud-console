import { adminSupabase, serverSupabase } from "@/utils/supabase"
import Heading from "@/components/Heading"
import Card from "@/components/Card"

const Page = async () => {
  const supabase = serverSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("No user found.")

  const { data: company, error } = await adminSupabase()
    .from("companies")
    .select("name, website, email, users!inner(*)")
    .eq("users.user_id", user.id)
    .maybeSingle()

  if (error) throw new Error("No company found.")

  return (
    <div className="space-y-4 sm:space-y-5">
      <Heading tag="h2">Company</Heading>

      <Card>
        <Card.Title tag="h3">Company information</Card.Title>
        {!company ? (
          <Card.Subtitle>Company information not found.</Card.Subtitle>
        ) : (
          <dl className="px-6 space-y-10 pb-7">
            <div className="sm:grid sm:grid-cols-2">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Company name
              </dt>
              <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
                {company.name}
              </dd>
            </div>
            <div className="sm:grid sm:grid-cols-2">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Business website
              </dt>
              <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
                {company.website}
              </dd>
            </div>
            <div className="sm:grid sm:grid-cols-2">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Support email
              </dt>
              <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
                {company.email}
              </dd>
            </div>
          </dl>
        )}
      </Card>
    </div>
  )
}

export default Page
