// Purpose: Displays high-impact destination cards using typed content and local
// fallback-backed imagery for resilient destination marketing.
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import type { Destination } from "../../types/tourism";
import { seasonSummary } from "../../lib/format";
import { SmartImage } from "../common/SmartImage";

interface DestinationsSectionProps {
  destinations: Destination[];
  showIntro?: boolean;
}

function DestinationCard({ destination, index }: { destination: Destination; index: number }) {
  return (
    <Link
      className="destination-card reveal-card"
      style={{ "--delay": `${index * 90}ms` } as CSSProperties}
      to={`/destinations/${destination.slug}`}
    >
      <SmartImage
        src={destination.image}
        destinationSlug={destination.slug}
        alt={`${destination.name} travel scenery`}
        preferCurated
      />
      <div className="destination-content">
        <div className="card-meta">
          <span>{destination.province}</span>
          <span>{seasonSummary(destination.season)}</span>
        </div>
        <h3>{destination.name}</h3>
        <p>{destination.tagline}</p>
        <div className="chip-row">
          {destination.bestFor.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function DestinationsSection({ destinations, showIntro = true }: DestinationsSectionProps) {
  return (
    <section id="destinations" className="section-block">
      {showIntro && (
        <div className="section-heading">
          <p className="eyebrow">Destination intelligence</p>
          <h2>Every region has a different rhythm.</h2>
          <p>
            Sell South Africa properly: iconic routes for first timers, private corners for luxury travelers, and
            enough variety to make repeat visits obvious.
          </p>
        </div>
      )}
      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <DestinationCard key={destination.slug} destination={destination} index={index} />
        ))}
      </div>
    </section>
  );
}
