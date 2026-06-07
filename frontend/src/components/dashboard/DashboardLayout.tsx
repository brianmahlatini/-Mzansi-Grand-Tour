// Purpose: Provides shared dashboard chrome for admin and user panels with
// role-aware navigation, logout, and nested secure content.
import { BarChart3, BriefcaseBusiness, CalendarCheck, Home, LogOut, Shield, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <NavLink className="dashboard-brand" to="/">
          <span className="brand-icon">SA</span>
          <strong>Mzansi Ops</strong>
        </NavLink>
        <nav>
          {isAdmin ? (
            <>
              <NavLink to="/admin">
                <BarChart3 size={18} />
                Overview
              </NavLink>
              <NavLink to="/admin/bookings">
                <CalendarCheck size={18} />
                Bookings
              </NavLink>
              <NavLink to="/admin/users">
                <Users size={18} />
                Users
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/account">
                <BriefcaseBusiness size={18} />
                My trips
              </NavLink>
              <NavLink to="/plan">
                <CalendarCheck size={18} />
                New booking
              </NavLink>
            </>
          )}
          <NavLink to="/">
            <Home size={18} />
            Public site
          </NavLink>
        </nav>
        <button type="button" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="eyebrow">{isAdmin ? "Admin control center" : "Traveler panel"}</p>
            <h1>{isAdmin ? "System dashboard" : "My South Africa trips"}</h1>
          </div>
          <div className="role-pill">
            <Shield size={16} />
            {user?.username} · {user?.role}
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
