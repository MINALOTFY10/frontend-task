import { Navigate } from "react-router"
import { useAuth } from "../context/auth-context"

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) return <>Loading....</>
  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}