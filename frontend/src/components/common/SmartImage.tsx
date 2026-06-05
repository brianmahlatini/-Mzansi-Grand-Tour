// Purpose: Renders images with curated real-photo fallbacks so broken or blocked
// media never leaves empty visual spaces in destination, story, or gallery UI.
import { useMemo, useState } from "react";
import { categoryMedia, defaultMedia, destinationMedia } from "../../data/media";

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  destinationSlug?: string;
  category?: string;
  preferCurated?: boolean;
}

function resolveCuratedFallback(destinationSlug?: string, category?: string): string {
  if (destinationSlug && destinationMedia[destinationSlug]) {
    return destinationMedia[destinationSlug];
  }

  if (category && categoryMedia[category]) {
    return categoryMedia[category];
  }

  return defaultMedia;
}

export function SmartImage({ src, alt, className, destinationSlug, category, preferCurated = false }: SmartImageProps) {
  const fallback = useMemo(() => resolveCuratedFallback(destinationSlug, category), [category, destinationSlug]);
  const [activeSrc, setActiveSrc] = useState(preferCurated ? fallback : src || fallback);

  return (
    <img
      className={className}
      src={activeSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setActiveSrc(fallback)}
    />
  );
}
