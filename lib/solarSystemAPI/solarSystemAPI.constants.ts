export const API_URL = process.env.SOLAR_SYSTEM_API_URL ?? "";

export const NASA_IMAGE_SEARCH_URL = process.env.NASA_IMAGE_SEARCH_URL ?? "";

export const VISUALS: Record<
  string,
  { image: string; cardGradient: string; tagline: string; atmosphere: string[] }
> = {
  mercury: {
    image: "/globe.svg",
    cardGradient: "from-zinc-500/30 to-orange-300/20",
    tagline: "Swift and scorched",
    atmosphere: ["Oxygen", "Sodium", "Hydrogen"],
  },
  venus: {
    image: "/globe.svg",
    cardGradient: "from-amber-400/35 to-rose-300/20",
    tagline: "A furnace under clouds",
    atmosphere: ["Carbon dioxide", "Nitrogen", "Sulfur dioxide"],
  },
  earth: {
    image: "/globe.svg",
    cardGradient: "from-sky-400/35 to-emerald-300/20",
    tagline: "The blue oasis",
    atmosphere: ["Nitrogen", "Oxygen", "Argon"],
  },
  mars: {
    image: "/globe.svg",
    cardGradient: "from-red-500/35 to-orange-300/20",
    tagline: "The red frontier",
    atmosphere: ["Carbon dioxide", "Nitrogen", "Argon"],
  },
  jupiter: {
    image: "/globe.svg",
    cardGradient: "from-amber-600/35 to-orange-300/20",
    tagline: "The giant protector",
    atmosphere: ["Hydrogen", "Helium", "Ammonia"],
  },
  saturn: {
    image: "/globe.svg",
    cardGradient: "from-yellow-500/35 to-amber-200/20",
    tagline: "Master of rings",
    atmosphere: ["Hydrogen", "Helium", "Methane"],
  },
  uranus: {
    image: "/globe.svg",
    cardGradient: "from-cyan-400/35 to-sky-200/20",
    tagline: "The tilted ice giant",
    atmosphere: ["Hydrogen", "Helium", "Methane"],
  },
  neptune: {
    image: "/globe.svg",
    cardGradient: "from-blue-600/35 to-cyan-300/20",
    tagline: "Winds at the edge",
    atmosphere: ["Hydrogen", "Helium", "Methane"],
  },
};
