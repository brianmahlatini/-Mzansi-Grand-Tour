// Purpose: Defines the public React Router tree and passes typed tourism data
// from the shared loader hook into route-specific page modules.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import { useTourismData } from "./hooks/useTourismData";
import { DestinationDetailPage } from "./pages/DestinationDetailPage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { ExperiencesPage } from "./pages/ExperiencesPage";
import { HomePage } from "./pages/HomePage";
import { JourneysPage } from "./pages/JourneysPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlanPage } from "./pages/PlanPage";
import { StoriesPage } from "./pages/StoriesPage";

export function App() {
  const tourismData = useTourismData();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage {...tourismData} />} />
          <Route path="destinations" element={<DestinationsPage destinations={tourismData.destinations} />} />
          <Route path="destinations/:slug" element={<DestinationDetailPage destinations={tourismData.destinations} />} />
          <Route path="journeys" element={<JourneysPage packages={tourismData.packages} />} />
          <Route path="experiences" element={<ExperiencesPage experiences={tourismData.experiences} />} />
          <Route path="stories" element={<StoriesPage stories={tourismData.stories} />} />
          <Route path="plan" element={<PlanPage destinations={tourismData.destinations} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
