// Purpose: Provides polished default tourism content so a new environment can
// demonstrate the product immediately after MongoDB connects.
export const destinations = [
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
    signatureMoments: ["Table Mountain cableway", "Bo-Kaap walking tour", "Boulders penguins", "Chapman's Peak drive"],
    coordinates: { lat: -33.9249, lng: 18.4241 },
    season: "October to April for beach energy, May to September for whales and moody dining rooms."
  },
  {
    slug: "kruger-national-park",
    name: "Greater Kruger",
    province: "Mpumalanga & Limpopo",
    tagline: "Big Five wilderness with the polish of private lodges and expert trackers.",
    description:
      "The Kruger region is South Africa's legendary safari stage, pairing open-vehicle game drives with conservation-led lodges, fireside dinners, and sunrise coffee in the bush.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kruger_National_Park_%28ZA%29%2C_Elefanten_--_2024_--_0579.jpg?width=1800",
    video:
      "https://videos.pexels.com/video-files/855560/855560-hd_1920_1080_25fps.mp4",
    bestFor: ["Safari", "Families", "Honeymoons"],
    signatureMoments: ["Dawn game drive", "Bush dinner", "Tracker-led walks", "Panorama Route extension"],
    coordinates: { lat: -23.9884, lng: 31.5547 },
    season: "May to September for dry-season sightings; November to March for lush landscapes and birding."
  },
  {
    slug: "garden-route",
    name: "Garden Route",
    province: "Western Cape & Eastern Cape",
    tagline: "A driveable coastline of forests, lagoons, cliffs, and slow adventure.",
    description:
      "The Garden Route is built for travelers who want movement without rushing: boutique stays, whale lookouts, forest hikes, oyster bars, and dramatic passes between towns.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa-Garden_Route01.jpg?width=1800",
    video:
      "https://videos.pexels.com/video-files/1550080/1550080-hd_1920_1080_30fps.mp4",
    bestFor: ["Road trips", "Nature", "Soft adventure"],
    signatureMoments: ["Knysna Heads", "Tsitsikamma bridges", "Plettenberg Bay beaches", "Addo safari add-on"],
    coordinates: { lat: -34.0351, lng: 23.0473 },
    season: "September to May for warm road-trip days; June to November for whale season."
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
    video:
      "https://videos.pexels.com/video-files/3121327/3121327-uhd_2560_1440_24fps.mp4",
    bestFor: ["Hiking", "Landscape photography", "Slow retreats"],
    signatureMoments: ["Amphitheatre viewpoints", "San rock art", "Horse trails", "Mountain lodge firesides"],
    coordinates: { lat: -28.7351, lng: 29.3662 },
    season: "March to May for clear hiking weather; winter for crisp views and quiet lodges."
  }
];

export const experiences = [
  {
    title: "Private Cape Peninsula Design Day",
    category: "Culture",
    region: "Cape Town",
    duration: "Full day",
    intensity: "Easy",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cape_Town_Bo-Kaap_02.jpg?width=1400",
    summary:
      "A hosted coastal loop through art studios, ocean roads, penguin boardwalks, and a chef-led lunch overlooking the Atlantic.",
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
    summary:
      "Track wildlife with rangers, learn anti-poaching context, and stay in a low-impact lodge built around conservation impact.",
    inclusions: ["Game drives", "Tracker walk", "Conservation briefing", "All meals"]
  },
  {
    title: "Garden Route Ocean & Forest Week",
    category: "Adventure",
    region: "Garden Route",
    duration: "7 days",
    intensity: "Active",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa-Garden_Route01.jpg?width=1400",
    summary:
      "A seamless self-drive or chauffeur-led route with lagoon cruises, canopy trails, boutique stays, and coastal tasting rooms.",
    inclusions: ["Route design", "Boutique hotels", "Activity bookings", "24/7 support"]
  },
  {
    title: "Drakensberg Summit Reset",
    category: "Wellness",
    region: "KwaZulu-Natal",
    duration: "4 days",
    intensity: "Moderate",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa_-_Drakensberg_%2816261209430%29.jpg?width=1400",
    summary:
      "Guided hikes, fireside dinners, spa recovery, and stargazing in one of Southern Africa's most dramatic mountain landscapes.",
    inclusions: ["Mountain guide", "Spa credit", "Trail meals", "Astronomy evening"]
  }
];

export const stories = [
  {
    title: "Why South Africa Feels Like Ten Trips in One",
    kicker: "Trip strategy",
    readTime: "5 min read",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/CapeTownPanoramaFromTableMountain.jpg?width=1400",
    excerpt:
      "How to combine safari, coast, wine, culture, and mountains without turning your holiday into a checklist.",
    author: "Naledi Mokoena"
  },
  {
    title: "The Art of the First Safari",
    kicker: "Wildlife",
    readTime: "4 min read",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kruger_National_Park_%28ZA%29%2C_Elefanten_--_2024_--_0579.jpg?width=1400",
    excerpt:
      "What travelers should know before choosing between national parks, private reserves, and conservation lodges.",
    author: "Sipho Dlamini"
  },
  {
    title: "Cape Town Beyond the Postcard",
    kicker: "City guide",
    readTime: "6 min read",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cape_Town_Bo-Kaap_02.jpg?width=1400",
    excerpt:
      "A design-forward route through food, fashion, galleries, beaches, and historic neighborhoods.",
    author: "Ayesha Jacobs"
  }
];
