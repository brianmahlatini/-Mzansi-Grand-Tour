// Purpose: Provides a dedicated conversion route for booking requests and lead
// capture, backed by PostgreSQL through the Node API.
import type { Destination } from "../types/tourism";
import { PlanSection } from "../components/sections/PlanSection";
import { PageHero } from "./PageHero";

export function PlanPage({ destinations }: { destinations: Destination[] }) {
  return (
    <>
      <PageHero
        eyebrow="Planning desk"
        title="Build a proposal-ready South Africa journey."
        copy="Capture the essentials, qualify the traveler, and give your sales team the detail they need to respond beautifully."
      />
      <main>
        <PlanSection destinations={destinations} />
      </main>
    </>
  );
}
