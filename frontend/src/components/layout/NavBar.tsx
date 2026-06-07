// Purpose: Provides responsive, route-aware site navigation for the public
// tourism app with desktop links, mobile menu, and planning call to action.
import { useState } from "react";
import { Menu, Plane } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { navigationItems } from "./navigation";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const dashboardPath = user?.role === "ADMIN" ? "/admin" : "/account";

  return (
    <header className="site-header">
      <NavLink className="brand-mark" to="/" aria-label="Mzansi Grand Tour home">
        <span className="brand-icon">SA</span>
        <span>
          <strong>Mzansi Grand Tour</strong>
          <small>South Africa, curated</small>
        </span>
      </NavLink>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <NavLink className="nav-cta" to={user ? dashboardPath : "/auth"}>
        <Plane size={17} />
        {user ? "Dashboard" : "Login"}
      </NavLink>
      <button
        className="icon-button mobile-menu"
        aria-label="Open navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <Menu size={22} />
      </button>
      {isMenuOpen && (
        <nav className="mobile-nav-panel" aria-label="Mobile navigation">
          {navigationItems.map((item) => (
            <NavLink key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
