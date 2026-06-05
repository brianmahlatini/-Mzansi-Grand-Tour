// Purpose: Combines commercial planning copy, lightweight lead capture, and
// detailed booking request capture into a single conversion-focused section.
import type { Destination } from "../../types/tourism";
import { LeadCapture } from "../forms/LeadCapture";
import { PlanningForm } from "../forms/PlanningForm";

export function PlanSection({ destinations }: { destinations: Destination[] }) {
  return (
    <section id="plan" className="plan-section">
      <div className="plan-copy">
        <p className="eyebrow">Plan the trip</p>
        <h2>Turn South Africa into a proposal-ready journey.</h2>
        <p>
          Capture traveler intent, route the enquiry into PostgreSQL, and let your team shape it into a premium
          itinerary with confidence.
        </p>
        <LeadCapture />
      </div>
      <PlanningForm destinations={destinations} />
    </section>
  );
}
