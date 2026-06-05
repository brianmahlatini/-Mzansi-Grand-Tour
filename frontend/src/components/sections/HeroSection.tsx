// Purpose: Renders the cinematic top-of-site hero with a video-first visual and
// reliable poster fallback for browsers that cannot load the remote MP4.
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { heroMedia } from "../../data/media";
import { HeroVideo } from "../common/HeroVideo";
import { NavBar } from "../layout/NavBar";

export function HeroSection() {
  return (
    <section className="hero-section">
      <HeroVideo video={heroMedia.video} poster={heroMedia.poster} />
      <div className="hero-overlay" />
      <NavBar />
      <div className="hero-content">
        <p className="eyebrow">Luxury safari, coast, wine, culture and wild open roads</p>
        <h1>South Africa, designed like the trip people talk about for years.</h1>
        <p className="hero-copy">
          Build a cinematic journey from Cape Town to Kruger, the Garden Route, the Drakensberg, Durban, Jozi,
          and beyond with local intelligence and premium planning.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/journeys">
            Explore journeys
            <ArrowRight size={18} />
          </Link>
          <Link className="secondary-button" to="/destinations">
            See destinations
          </Link>
        </div>
      </div>
      <div className="hero-stat-strip" aria-label="Travel highlights">
        <div>
          <strong>9</strong>
          <span>provinces</span>
        </div>
        <div>
          <strong>2,798 km</strong>
          <span>of coastline</span>
        </div>
        <div>
          <strong>Big Five</strong>
          <span>safari country</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>trip support</span>
        </div>
      </div>
    </section>
  );
}
