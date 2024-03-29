import { AuthPage } from "@/components/AuthPage"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthPage>{children}</AuthPage>
}
