// Purpose: Guards authenticated and role-specific routes so users land in the
// correct dashboard and admin-only tools are protected in the UI.
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import type { UserRole } from "../types/tourism";

export function ProtectedRoute({ roles }: { roles?: UserRole[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="route-loading">Loading secure travel workspace...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/account"} replace />;
  }

  return <Outlet />;
}
