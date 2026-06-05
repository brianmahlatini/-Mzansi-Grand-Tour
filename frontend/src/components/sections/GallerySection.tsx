// Purpose: Provides an animated visual band using local assets so the homepage
// always has motion and depth without relying on external image hosts.
import { galleryImages } from "../../data/media";
import { SmartImage } from "../common/SmartImage";

export function GallerySection() {
  return (
    <section className="gallery-band" aria-label="South Africa visual gallery">
      <div className="marquee-track">
        {[...galleryImages, ...galleryImages].map((image, index) => (
          <SmartImage key={`${image}-${index}`} src={image} alt="South Africa travel highlight" />
        ))}
      </div>
    </section>
  );
}
