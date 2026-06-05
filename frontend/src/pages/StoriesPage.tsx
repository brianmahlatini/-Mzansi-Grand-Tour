// Purpose: Houses editorial story content on a dedicated route to deepen
// traveler confidence before they enter the booking funnel.
import type { Story } from "../types/tourism";
import { StoriesSection } from "../components/sections/StoriesSection";
import { PageHero } from "./PageHero";

export function StoriesPage({ stories }: { stories: Story[] }) {
  return (
    <>
      <PageHero
        eyebrow="Travel editorial"
        title="Context makes South Africa easier to choose."
        copy="Use stories to answer the quiet questions travelers have about route design, safari style, cities, culture, and timing."
      />
      <main>
        <StoriesSection stories={stories} />
      </main>
    </>
  );
}
