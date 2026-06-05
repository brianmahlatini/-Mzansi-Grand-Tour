// Purpose: Shows the full destination catalogue route with reusable destination
// cards and dependable local fallback images.
import type { Destination } from "../types/tourism";
import { DestinationsSection } from "../components/sections/DestinationsSection";
import { PageHero } from "./PageHero";

export function DestinationsPage({ destinations }: { destinations: Destination[] }) {
  return (
    <>
      <PageHero
        eyebrow="Destination portfolio"
        title="South Africa has more than one headline."
        copy="Give travelers Cape Town, safari country, coastlines, mountains, warm Indian Ocean beaches, and cities with culture that moves."
      />
      <main>
        <DestinationsSection destinations={destinations} showIntro={false} />
      </main>
    </>
  );
}
