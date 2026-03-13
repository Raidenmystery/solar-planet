import { TPlanet } from "@/types/planet";

export const buildPlanet = (overrides: Partial<TPlanet> = {}): TPlanet => ({
  apiId: "earth-id",
  slug: "earth",
  name: "Earth",
  tagline: "Blue world",
  shortDescription: "A rocky world with oceans.",
  longDescription: "Earth is the third planet from the Sun and supports life.",
  image: "https://example.com/earth.png",
  cardGradient: "from-cyan-200 to-blue-300",
  atmosphere: ["Nitrogen", "Oxygen"],
  factSections: [
    {
      title: "Physical",
      stats: [
        { label: "Diameter", value: "12,742 km" },
        { label: "Mass", value: "5.97 x 10^24 kg" },
      ],
    },
  ],
  ...overrides,
});
