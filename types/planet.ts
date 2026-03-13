export type TPlanetStat = {
  /**
   * The label for the statistic, e.g., "Diameter", "Mass", etc.
   */
  label: string;
  /**
   * The value of the statistic, e.g., "12,742 km", "5.97 × 10^24 kg", etc.
   */
  value: string;
};

export type TPlanetFactSection = {
  /**
   * The title of the fact section, e.g., "Physical Characteristics", "Orbital Properties", etc.
   */
  title: string;
  /**
   * An array of statistics related to the planet, each containing a label and a value.
   */
  stats: TPlanetStat[];
};

export type TPlanet = {
  /**
   * A unique identifier for the planet.
   */
  apiId: string;
  /**
   * A URL-friendly string used to identify the planet in routes.
   */
  slug: string;
  /**
   * The name of the planet.
   */
  name: string;
  /**
   * A short tagline or description for the planet.
   */
  tagline: string;
  /**
   * A brief description of the planet, suitable for display in a card or summary view.
   */
  shortDescription: string;
  /**
   * A detailed description of the planet, suitable for display in a detailed view or article.
   */
  longDescription: string;
  /**
   * The URL of an image representing the planet, used in the card view and other summary displays.
   */
  image: string;
  /**
   * A CSS gradient string used for the background of the planet card.
   */
  cardGradient: string;
  /**
   * An array of strings representing the components of the planet's atmosphere.
   */
  atmosphere: string[];
  /**
   * An array of fact sections.
   */
  factSections: TPlanetFactSection[];
};
