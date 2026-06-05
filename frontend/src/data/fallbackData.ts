// Purpose: Supplies frontend demo content when the API is offline, mirroring
// the backend seed data closely enough for development and screenshots.
import type { Destination, Experience, JourneyPackage, Story } from "../types/tourism";

export const fallbackDestinations: Destination[] = [
  {
    slug: "cape-town",
    name: "Cape Town",
    province: "Western Cape",
    tagline: "Ocean, mountain, culture, and world-class design in one cinematic city.",
    description:
      "Cape Town gives first-time visitors the big reveal: Table Mountain, Atlantic beaches, Cape Malay food, Robben Island history, wine country within reach, and neighborhoods with serious creative energy.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/CapeTownPanoramaFromTableMountain.jpg?width=1800",
    video:
      "https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4",
    bestFor: ["First-time visitors", "Food and wine", "Coastal luxury"],
    signatureMoments: ["Table Mountain", "Bo-Kaap", "Boulders penguins", "Chapman's Peak"],
    season: "October to April for beach energy, May to September for whales."
  },
  {
    slug: "kruger-national-park",
    name: "Greater Kruger",
    province: "Mpumalanga & Limpopo",
    tagline: "Big Five wilderness with the polish of private lodges and expert trackers.",
    description:
      "The Kruger region pairs open-vehicle game drives with conservation-led lodges, fireside dinners, and sunrise coffee in the bush.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kruger_National_Park_%28ZA%29%2C_Elefanten_--_2024_--_0579.jpg?width=1800",
    video:
      "https://videos.pexels.com/video-files/855560/855560-hd_1920_1080_25fps.mp4",
    bestFor: ["Safari", "Families", "Honeymoons"],
    signatureMoments: ["Dawn game drive", "Bush dinner", "Tracker walks", "Panorama Route"],
    season: "May to September for dry-season sightings."
  },
  {
    slug: "garden-route",
    name: "Garden Route",
    province: "Western Cape & Eastern Cape",
    tagline: "A driveable coastline of forests, lagoons, cliffs, and slow adventure.",
    description:
      "Boutique stays, whale lookouts, forest hikes, oyster bars, and dramatic passes between coastal towns.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa-Garden_Route01.jpg?width=1800",
    video:
      "https://videos.pexels.com/video-files/1550080/1550080-hd_1920_1080_30fps.mp4",
    bestFor: ["Road trips", "Nature", "Soft adventure"],
    signatureMoments: ["Knysna Heads", "Tsitsikamma", "Plettenberg Bay", "Addo add-on"],
    season: "September to May for warm road-trip days."
  },
  {
    slug: "drakensberg",
    name: "Drakensberg",
    province: "KwaZulu-Natal",
    tagline: "Epic basalt peaks, ancient rock art, and mountain lodges under clear stars.",
    description:
      "The Drakensberg brings scale and silence: amphitheatre hikes, San rock art, trout streams, and lodge fireplaces for travelers who want South Africa's alpine side.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa_-_Drakensberg_%2816261209430%29.jpg?width=1800",
    video: "https://videos.pexels.com/video-files/3121327/3121327-uhd_2560_1440_24fps.mp4",
    bestFor: ["Hiking", "Photography", "Slow retreats"],
    signatureMoments: ["Amphitheatre views", "San rock art", "Horse trails", "Mountain lodges"],
    season: "March to May for clear hiking weather."
  }
];

export const fallbackExperiences: Experience[] = [
  {
    title: "Private Cape Peninsula Design Day",
    category: "Culture",
    region: "Cape Town",
    duration: "Full day",
    intensity: "Easy",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cape_Town_Bo-Kaap_02.jpg?width=1400",
    summary: "A hosted coastal loop through art studios, ocean roads, penguin boardwalks, and chef-led dining.",
    inclusions: ["Specialist guide", "Private vehicle", "Studio access", "Lunch reservation"]
  },
  {
    title: "Conservation Safari Masterclass",
    category: "Wildlife",
    region: "Greater Kruger",
    duration: "3 nights",
    intensity: "Moderate",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kruger_National_Park_%28ZA%29%2C_Elefanten_--_2024_--_0579.jpg?width=1400",
    summary: "Track wildlife with rangers and stay in a low-impact lodge built around conservation impact.",
    inclusions: ["Game drives", "Tracker walk", "Conservation briefing", "All meals"]
  },
  {
    title: "Garden Route Ocean & Forest Week",
    category: "Adventure",
    region: "Garden Route",
    duration: "7 days",
    intensity: "Active",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa-Garden_Route01.jpg?width=1400",
    summary: "A seamless route with lagoon cruises, canopy trails, boutique stays, and coastal tasting rooms.",
    inclusions: ["Route design", "Boutique hotels", "Activity bookings", "24/7 support"]
  }
];

export const fallbackPackages: JourneyPackage[] = [
  {
    slug: "cape-safari-wine",
    title: "Cape, Safari & Wine Signature Journey",
    region: "Western Cape + Greater Kruger",
    duration_days: 10,
    price_from_usd: 3850,
    highlights: ["Table Mountain", "Private safari", "Franschhoek", "Cape Peninsula"]
  },
  {
    slug: "garden-route-blueprint",
    title: "Garden Route Ocean Blueprint",
    region: "Western Cape + Eastern Cape",
    duration_days: 8,
    price_from_usd: 2450,
    highlights: ["Whale watching", "Knysna lagoon", "Tsitsikamma", "Addo elephants"]
  }
];

export const fallbackStories: Story[] = [
  {
    title: "Why South Africa Feels Like Ten Trips in One",
    kicker: "Trip strategy",
    readTime: "5 min read",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/CapeTownPanoramaFromTableMountain.jpg?width=1400",
    excerpt: "How to combine safari, coast, wine, culture, and mountains without turning your holiday into a checklist.",
    author: "Naledi Mokoena"
  },
  {
    title: "The Art of the First Safari",
    kicker: "Wildlife",
    readTime: "4 min read",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kruger_National_Park_%28ZA%29%2C_Elefanten_--_2024_--_0579.jpg?width=1400",
    excerpt: "What travelers should know before choosing between national parks, private reserves, and conservation lodges.",
    author: "Sipho Dlamini"
  }
];
