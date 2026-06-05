// Purpose: Communicates senior commercial credibility through concise proof
// points that support conversion for international South Africa travel.
import { Globe2, HeartHandshake, Mountain, Star } from "lucide-react";

const trustItems = [
  {
    icon: Globe2,
    title: "International-ready",
    copy: "Clear routing, realistic pacing, airport logic, and premium hosting standards."
  },
  {
    icon: HeartHandshake,
    title: "Local relationships",
    copy: "Guides, lodges, restaurants, and operators selected for experience quality."
  },
  {
    icon: Mountain,
    title: "Beyond the obvious",
    copy: "Cape icons, safari, wine country, culture, mountains, beaches, and design-led city stays."
  },
  {
    icon: Star,
    title: "Conversion focused",
    copy: "Visual storytelling, persuasive journeys, and working forms for sales follow-up."
  }
];

export function TrustSection() {
  return (
    <section className="trust-section">
      {trustItems.map(({ icon: Icon, title, copy }) => (
        <article key={title}>
          <Icon size={26} />
          <h3>{title}</h3>
          <p>{copy}</p>
        </article>
      ))}
    </section>
  );
}
