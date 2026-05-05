import { Navigate } from "react-router"
import { useAuth } from "../context/auth-context"
import LoadingSpinner from "../components/shared/loading-spinner"

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}
