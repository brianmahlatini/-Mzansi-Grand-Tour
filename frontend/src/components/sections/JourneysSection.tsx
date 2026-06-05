// Purpose: Presents route/package products from PostgreSQL as premium journeys
// with clear pricing, duration, and commercial highlights.
import { Compass } from "lucide-react";
import type { JourneyPackage } from "../../types/tourism";
import { formatCurrency } from "../../lib/format";

interface JourneysSectionProps {
  packages: JourneyPackage[];
}

export function JourneysSection({ packages }: JourneysSectionProps) {
  return (
    <section id="journeys" className="journeys-section">
      <div className="section-heading compact-heading">
        <p className="eyebrow">Curated journeys</p>
        <h2>Signature routes built to convert dreamers into travelers.</h2>
      </div>
      <div className="journey-layout">
        <div className="journey-feature">
          <Compass size={34} />
          <h3>Designed for international travelers who want ease, beauty, and depth.</h3>
          <p>
            Combine private transfers, trusted lodges, conservation-led guides, coastal dining, and city culture into
            one confident itinerary.
          </p>
        </div>
        <div className="package-list">
          {packages.map((trip) => (
            <article key={trip.slug} className="package-row">
              <div>
                <span>{trip.region}</span>
                <h3>{trip.title}</h3>
                <p>
                  {trip.duration_days} days from {formatCurrency(trip.price_from_usd)}
                </p>
              </div>
              <ul>
                {trip.highlights.slice(0, 4).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
