export type PlanetSortOrder = "asc" | "desc";

export type PlanetUiStore = {
  searchTerm: string;
  sortOrder: PlanetSortOrder;
  currentPage: number;
  favoriteSlugs: string[];
  setSearchTerm: (value: string, options?: { resetPage?: boolean }) => void;
  setSortOrder: (value: PlanetSortOrder, options?: { resetPage?: boolean }) => void;
  setCurrentPage: (value: number) => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
};