// Purpose: Defines shared frontend domain models so pages, forms, and API
// helpers use the same typed contract for tourism content and conversions.
export interface Destination {
  slug: string;
  name: string;
  province: string;
  tagline: string;
  description: string;
  image: string;
  video?: string;
  bestFor: string[];
  signatureMoments: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  season: string;
}

export interface Experience {
  title: string;
  category: string;
  region: string;
  duration: string;
  intensity: string;
  image: string;
  summary: string;
  inclusions: string[];
}

export interface Story {
  title: string;
  kicker: string;
  readTime: string;
  image: string;
  excerpt: string;
  author: string;
}

export interface JourneyPackage {
  slug: string;
  title: string;
  region: string;
  duration_days: number;
  price_from_usd: number;
  highlights: string[];
}

export interface LeadPayload {
  fullName: string;
  email: string;
  travelStyle: string;
  dreamTrip: string;
}

export interface BookingPayload {
  fullName: string;
  email: string;
  destination: string;
  guests: number;
  arrivalDate: string;
  budgetRange: string;
  notes: string;
}

export interface TourismData {
  destinations: Destination[];
  experiences: Experience[];
  packages: JourneyPackage[];
  stories: Story[];
}
