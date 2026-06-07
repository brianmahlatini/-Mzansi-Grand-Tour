// Purpose: Owns frontend authentication state, login/register/logout actions,
// and exposes the current role to route guards and dashboard navigation.
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/platformApi";
import { getStoredUser } from "../lib/session";
import type { AuthUser } from "../types/tourism";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (payload: { username?: string; email?: string; password: string }) => Promise<AuthUser>;
  register: (payload: { username: string; email: string; password: string }) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(Boolean(getStoredUser()));

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    getCurrentUser()
      .then(setUser)
      .catch(() => {
        logoutUser();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      async login(payload) {
        const response = await loginUser(payload);
        setUser(response.user);
        return response.user;
      },
      async register(payload) {
        const response = await registerUser(payload);
        setUser(response.user);
        return response.user;
      },
      logout() {
        logoutUser();
        setUser(null);
      }
    }),
    [isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
