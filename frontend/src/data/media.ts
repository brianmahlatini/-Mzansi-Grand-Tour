// Purpose: Centralizes real destination photo and video URLs so the frontend
// consistently markets South Africa with photographic media instead of artwork.
export const heroMedia = {
  video:
    "https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4",
  poster:
    "https://commons.wikimedia.org/wiki/Special:FilePath/CapeTownPanoramaFromTableMountain.jpg?width=1800"
};

export const galleryImages = [
  "https://commons.wikimedia.org/wiki/Special:FilePath/CapeTownPanoramaFromTableMountain.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Kruger_National_Park_%28ZA%29%2C_Elefanten_--_2024_--_0579.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa-Garden_Route01.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa_-_Drakensberg_%2816261209430%29.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Durban_beach_front%2C_KwaZulu_Natal%2C_South_Africa_%2819892207393%29.jpg?width=1400",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Cape_Town_Bo-Kaap_02.jpg?width=1400"
];

export const destinationMedia: Record<string, string> = {
  "cape-town":
    "https://commons.wikimedia.org/wiki/Special:FilePath/CapeTownPanoramaFromTableMountain.jpg?width=1800",
  "kruger-national-park":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Kruger_National_Park_%28ZA%29%2C_Elefanten_--_2024_--_0579.jpg?width=1800",
  "garden-route":
    "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa-Garden_Route01.jpg?width=1800",
  drakensberg:
    "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa_-_Drakensberg_%2816261209430%29.jpg?width=1800",
  durban:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Durban_beach_front%2C_KwaZulu_Natal%2C_South_Africa_%2819892207393%29.jpg?width=1800",
  johannesburg:
    "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa-Gauteng-Johannesburg_Skyline01.jpg?width=1800"
};

export const categoryMedia: Record<string, string> = {
  Culture: "https://commons.wikimedia.org/wiki/Special:FilePath/Cape_Town_Bo-Kaap_02.jpg?width=1400",
  Wildlife:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Kruger_National_Park_%28ZA%29%2C_Elefanten_--_2024_--_0579.jpg?width=1400",
  Adventure: "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa-Garden_Route01.jpg?width=1400",
  Wellness:
    "https://commons.wikimedia.org/wiki/Special:FilePath/South_Africa_-_Drakensberg_%2816261209430%29.jpg?width=1400"
};

export const defaultMedia =
  "https://commons.wikimedia.org/wiki/Special:FilePath/CapeTownPanoramaFromTableMountain.jpg?width=1400";

export const videoStories = [
  {
    title: "Cape Town from mountain to ocean",
    poster: destinationMedia["cape-town"],
    video: "https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4"
  },
  {
    title: "Safari wilderness, Big Five country",
    poster: destinationMedia["kruger-national-park"],
    video: "https://videos.pexels.com/video-files/855560/855560-hd_1920_1080_25fps.mp4"
  },
  {
    title: "Coastal road trip energy",
    poster: destinationMedia["garden-route"],
    video: "https://videos.pexels.com/video-files/1550080/1550080-hd_1920_1080_30fps.mp4"
  }
];
