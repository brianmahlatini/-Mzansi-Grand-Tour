// Purpose: Adds real video-led destination storytelling so the site feels like
// a modern tourism campaign rather than a static brochure.
import { useState } from "react";
import { Play } from "lucide-react";
import { videoStories } from "../../data/media";

function VideoCard({ title, video, poster }: { title: string; video: string; poster: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="video-card">
      {!failed ? (
        <video controls muted playsInline poster={poster} preload="metadata" onError={() => setFailed(true)}>
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt={title} loading="lazy" decoding="async" />
      )}
      <div>
        <Play size={18} />
        <h3>{title}</h3>
      </div>
    </article>
  );
}

export function VideoShowcaseSection() {
  return (
    <section className="section-block video-showcase">
      <div className="section-heading">
        <p className="eyebrow">Real movement</p>
        <h2>Videos that make the trip feel alive.</h2>
        <p>
          Use motion to sell the scale: Cape Town's coast, safari country, and the road-trip freedom that makes South
          Africa feel bigger than a normal holiday.
        </p>
      </div>
      <div className="video-grid">
        {videoStories.map((story) => (
          <VideoCard key={story.title} {...story} />
        ))}
      </div>
    </section>
  );
}
