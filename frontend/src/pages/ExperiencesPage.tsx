// Purpose: Gives bookable experiences their own route for travelers comparing
// wildlife, culture, adventure, and wellness reasons to visit South Africa.
import type { Experience } from "../types/tourism";
import { ExperiencesSection } from "../components/sections/ExperiencesSection";
import { GallerySection } from "../components/sections/GallerySection";
import { VideoShowcaseSection } from "../components/sections/VideoShowcaseSection";
import { PageHero } from "./PageHero";

export function ExperiencesPage({ experiences }: { experiences: Experience[] }) {
  return (
    <>
      <PageHero
        eyebrow="Bookable experiences"
        title="Turn scenery into something travelers can choose."
        copy="From private culture days to conservation safari, the experience catalogue makes the destination tangible."
      />
      <main>
        <VideoShowcaseSection />
        <ExperiencesSection experiences={experiences} />
        <GallerySection />
      </main>
    </>
  );
}
