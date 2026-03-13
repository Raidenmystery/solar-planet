export type ApiBody = {
  id: string;
  englishName: string;
  meanRadius: number;
  gravity: number;
  density: number;
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  sideralOrbit: number;
  sideralRotation: number;
  moons: Array<{ moon: string; rel: string }> | null;
  mass?: {
    massValue: number;
    massExponent: number;
  };
  vol?: {
    volValue: number;
    volExponent: number;
  };
};

export type ApiResponse = {
  bodies: ApiBody[];
};
