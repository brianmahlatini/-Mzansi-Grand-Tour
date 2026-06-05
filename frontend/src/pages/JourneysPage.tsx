// Purpose: Presents commercial route products as a dedicated page for travelers
// who are ready to compare curated South Africa itinerary concepts.
import type { JourneyPackage } from "../types/tourism";
import { JourneysSection } from "../components/sections/JourneysSection";
import { PageHero } from "./PageHero";

export function JourneysPage({ packages }: { packages: JourneyPackage[] }) {
  return (
    <>
      <PageHero
        eyebrow="Signature journeys"
        title="Routes that feel effortless before the traveler even arrives."
        copy="These itinerary products are designed around pacing, airport logic, sales clarity, and the emotional arc of a premium South Africa trip."
      />
      <main>
        <JourneysSection packages={packages} />
      </main>
    </>
  );
}
