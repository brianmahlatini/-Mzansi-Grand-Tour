// Purpose: Defines public, authenticated user, and administrator route trees
// while passing typed tourism data into public route modules.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { EnterpriseChatbot } from "./components/chat/EnterpriseChatbot";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { useTourismData } from "./hooks/useTourismData";
import { AdminBookingsPage } from "./pages/AdminBookingsPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { AuthPage } from "./pages/AuthPage";
import { DestinationDetailPage } from "./pages/DestinationDetailPage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { ExperiencesPage } from "./pages/ExperiencesPage";
import { HomePage } from "./pages/HomePage";
import { JourneysPage } from "./pages/JourneysPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlanPage } from "./pages/PlanPage";
import { StoriesPage } from "./pages/StoriesPage";
import { UserDashboardPage } from "./pages/UserDashboardPage";

export function App() {
  const tourismData = useTourismData();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage {...tourismData} />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="destinations" element={<DestinationsPage destinations={tourismData.destinations} />} />
            <Route path="destinations/:slug" element={<DestinationDetailPage destinations={tourismData.destinations} />} />
            <Route path="journeys" element={<JourneysPage packages={tourismData.packages} />} />
            <Route path="experiences" element={<ExperiencesPage experiences={tourismData.experiences} />} />
            <Route path="stories" element={<StoriesPage stories={tourismData.stories} />} />
            <Route path="plan" element={<PlanPage destinations={tourismData.destinations} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="admin" element={<AdminDashboardPage />} />
              <Route path="admin/bookings" element={<AdminBookingsPage />} />
              <Route path="admin/users" element={<AdminUsersPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roles={["USER", "ADMIN"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="account" element={<UserDashboardPage />} />
            </Route>
          </Route>
        </Routes>
        <EnterpriseChatbot />
      </AuthProvider>
    </BrowserRouter>
  );
}
