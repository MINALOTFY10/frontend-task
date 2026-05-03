import { createContext, useState, useEffect, useContext } from "react";
import { login as loginService, logout as logoutService, getStoredUser } from "../services/auth-service";
import type { User } from "../services/auth-service";

interface AuthContextType {
  user: Omit<User, "accessToken" | "refreshToken"> | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const { accessToken, refreshToken, ...user } = await loginService(username, password);
    setUser(user);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be in AuthProvider");
  return context;
}
