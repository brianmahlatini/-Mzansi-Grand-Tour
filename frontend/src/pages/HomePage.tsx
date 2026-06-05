// Purpose: Assembles the main public homepage from reusable route-ready modules
// that sell South Africa through destinations, journeys, experiences, and forms.
import type { TourismData } from "../types/tourism";
import { HeroSection } from "../components/sections/HeroSection";
import { DestinationsSection } from "../components/sections/DestinationsSection";
import { JourneysSection } from "../components/sections/JourneysSection";
import { GallerySection } from "../components/sections/GallerySection";
import { ExperiencesSection } from "../components/sections/ExperiencesSection";
import { VideoShowcaseSection } from "../components/sections/VideoShowcaseSection";
import { TrustSection } from "../components/sections/TrustSection";
import { StoriesSection } from "../components/sections/StoriesSection";
import { PlanSection } from "../components/sections/PlanSection";

export function HomePage({ destinations, experiences, packages, stories }: TourismData) {
  return (
    <>
      <HeroSection />
      <main>
        <DestinationsSection destinations={destinations} />
        <JourneysSection packages={packages} />
        <GallerySection />
        <VideoShowcaseSection />
        <ExperiencesSection experiences={experiences} />
        <TrustSection />
        <StoriesSection stories={stories} />
        <PlanSection destinations={destinations} />
      </main>
    </>
  );
}
