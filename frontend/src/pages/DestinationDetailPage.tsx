// Purpose: Renders a typed destination detail route with resilient imagery,
// planning context, and direct conversion into the trip planning form.
import { Link, useParams } from "react-router-dom";
import type { Destination } from "../types/tourism";
import { SmartImage } from "../components/common/SmartImage";
import { seasonSummary } from "../lib/format";
import { PageHero } from "./PageHero";

export function DestinationDetailPage({ destinations }: { destinations: Destination[] }) {
  const { slug } = useParams();
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    return (
      <>
        <PageHero
          eyebrow="Destination not found"
          title="That route is still being scouted."
          copy="Head back to the destination portfolio and choose another South Africa experience."
        />
        <main className="section-block">
          <Link className="primary-button inline-button" to="/destinations">
            Back to destinations
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow={destination.province} title={destination.name} copy={destination.tagline} />
      <main className="section-block destination-detail-grid">
        <SmartImage
          src={destination.image}
          destinationSlug={destination.slug}
          alt={`${destination.name} highlight`}
          preferCurated
        />
        <article>
          <p className="eyebrow">Why it sells</p>
          <h2>{destination.name} belongs in the proposal.</h2>
          <p>{destination.description}</p>
          <div className="detail-columns">
            <div>
              <h3>Best for</h3>
              <ul>
                {destination.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Signature moments</h3>
              <ul>
                {destination.signatureMoments.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="season-note">{seasonSummary(destination.season)}</p>
          <Link className="primary-button inline-button" to="/plan">
            Build this into a trip
          </Link>
        </article>
      </main>
    </>
  );
}
