// Purpose: Converts flexible MongoDB experience content into polished cards
// that help travelers understand what they can actually book.
import type { Experience } from "../../types/tourism";
import { SmartImage } from "../common/SmartImage";

interface ExperiencesSectionProps {
  experiences: Experience[];
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="experience-card">
      <SmartImage src={experience.image} category={experience.category} alt={experience.title} preferCurated />
      <div>
        <div className="card-meta">
          <span>{experience.category}</span>
          <span>{experience.duration}</span>
        </div>
        <h3>{experience.title}</h3>
        <p>{experience.summary}</p>
      </div>
    </article>
  );
}

export function ExperiencesSection({ experiences }: ExperiencesSectionProps) {
  return (
    <section id="experiences" className="section-block split-section">
      <div className="section-heading sticky-heading">
        <p className="eyebrow">Experiences</p>
        <h2>Not just places. Reasons to book now.</h2>
        <p>
          The best tourism websites help people picture themselves inside the moment. These experiences turn scenery
          into a decision.
        </p>
      </div>
      <div className="experience-grid">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.title} experience={experience} />
        ))}
      </div>
    </section>
  );
}
