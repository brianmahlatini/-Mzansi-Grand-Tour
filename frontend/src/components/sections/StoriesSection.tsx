// Purpose: Renders editorial story cards that add context and persuasion to the
// destination marketing experience.
import type { Story } from "../../types/tourism";
import { SmartImage } from "../common/SmartImage";

interface StoriesSectionProps {
  stories: Story[];
}

export function StoriesSection({ stories }: StoriesSectionProps) {
  return (
    <section id="stories" className="section-block">
      <div className="section-heading">
        <p className="eyebrow">Editorial stories</p>
        <h2>Give travelers context before they choose.</h2>
      </div>
      <div className="story-grid">
        {stories.map((story) => (
          <article key={story.title} className="story-card">
            <SmartImage src={story.image} alt={story.title} />
            <div>
              <span>
                {story.kicker} - {story.readTime}
              </span>
              <h3>{story.title}</h3>
              <p>{story.excerpt}</p>
              <small>By {story.author}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
