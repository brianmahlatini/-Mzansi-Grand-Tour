// Purpose: Wraps public route content with a consistent footer while allowing
// hero sections to own their own top navigation treatment.
import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";

export function PublicLayout() {
  return (
    <>
      <Outlet />
      <SiteFooter />
    </>
  );
}
