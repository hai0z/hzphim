export type TypeList =
  | "phim-bo"
  | "phim-le"
  | "tv-shows"
  | "hoat-hinh"
  | "phim-vietsub"
  | "phim-thuyet-minh"
  | "phim-long-tieng"
  | "hoat-hinh";

export type SortField = "modified.time" | "_id" | "year";

export type SortType = "desc" | "asc";

export type SortLang = "vietsub" | "thuyet-minh" | "long-tieng";

export interface MovieListParams {
  type_list?: TypeList | string;
  page?: number;
  sort_field?: SortField;
  sort_type?: SortType;
  sort_lang?: SortLang;
  category?: string;
  country?: string;
  year?: number;
  limit?: number;
  keyword?: string;
}
