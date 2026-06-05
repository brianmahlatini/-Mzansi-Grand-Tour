// Purpose: Gives unknown routes a polished recovery path back into the main
// tourism experience instead of leaving travelers at a browser error.
import { Link } from "react-router-dom";
import { PageHero } from "./PageHero";

export function NotFoundPage() {
  return (
    <>
      <PageHero
        eyebrow="Route not found"
        title="This path is not on the itinerary."
        copy="Return to the South Africa travel experience and choose a route that is ready to explore."
      />
      <main className="section-block">
        <Link className="primary-button inline-button" to="/">
          Back home
        </Link>
      </main>
    </>
  );
}
