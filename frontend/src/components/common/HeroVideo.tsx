// Purpose: Shows cinematic video when available and falls back to a polished
// poster treatment if the browser cannot load the remote video source.
import { useState } from "react";

interface HeroVideoProps {
  video: string;
  poster: string;
}

export function HeroVideo({ video, poster }: HeroVideoProps) {
  const [videoFailed, setVideoFailed] = useState(false);

  if (videoFailed) {
    return (
      <div
        className="hero-video hero-video-fallback"
        style={{ backgroundImage: `url(${poster})` }}
        aria-label="South Africa travel hero visual"
      />
    );
  }

  return (
    <video className="hero-video" autoPlay muted loop playsInline poster={poster} onError={() => setVideoFailed(true)}>
      <source src={video} type="video/mp4" />
    </video>
  );
}
