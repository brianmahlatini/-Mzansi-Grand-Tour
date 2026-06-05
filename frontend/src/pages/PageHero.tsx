// Purpose: Provides a reusable route hero with navigation for non-home pages so
// every page has a strong destination-marketing entry point.
import { NavBar } from "../components/layout/NavBar";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  copy: string;
}

export function PageHero({ eyebrow, title, copy }: PageHeroProps) {
  return (
    <section className="page-hero">
      <NavBar />
      <div className="page-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}
