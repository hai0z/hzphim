export interface ListMovieRespone {
  status: boolean;
  items: Item[];
  pagination: Pagination;
}

export interface Item {
  tmdb: Tmdb;
  imdb: Imdb;
  modified: Modified;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: Category[];
  country: Country[];
}

export interface Tmdb {
  type?: string;
  id?: string;
  season?: number;
  vote_average: number;
  vote_count: number;
}

export interface Imdb {
  id: any;
}

export interface Modified {
  time: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
  updateToday: number;
}
