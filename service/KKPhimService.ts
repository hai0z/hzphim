import { Item, ListMovieRespone, Pagination } from "@/type/ListMovieRespone";
import { Movie, MovieDetailRespone } from "@/type/MovieDetailRespone";
import { MovieListParams } from "@/type/MovieListParams";

const APIURL: string = `https://phimapi.com` as const;

const getNewReleaseMovie = async (page: number): Promise<ListMovieRespone> => {
  const response = await fetch(
    `${APIURL}/danh-sach/phim-moi-cap-nhat-v3?page=${page}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 10,
      },
    }
  );
  return response.json();
};
const getMovieDetail = async (slug: string): Promise<MovieDetailRespone> => {
  const response = await fetch(`${APIURL}/phim/${slug}`, {
    cache: "force-cache",
    next: {
      revalidate: 5,
    },
  });
  return response.json();
};

const getListMovieByType = async (
  params: MovieListParams
): Promise<{
  data: {
    items: Item[];
    params: {
      pagination: Pagination;
    };
  };
}> => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.sort_field) queryParams.append("sort_field", params.sort_field);
  if (params.sort_type) queryParams.append("sort_type", params.sort_type);
  if (params.sort_lang) queryParams.append("sort_lang", params.sort_lang);
  if (params.category) queryParams.append("category", params.category);
  if (params.country) queryParams.append("country", params.country);
  if (params.year) queryParams.append("year", params.year.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());

  const response = await fetch(
    `${APIURL}/v1/api/danh-sach/${params.type_list}?${queryParams.toString()}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 10,
      },
    }
  );
  return response.json();
};
const getListMovieByCategory = async (
  params: MovieListParams
): Promise<{
  data: {
    items: Item[];
    params: {
      pagination: Pagination;
    };
  };
}> => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.sort_field) queryParams.append("sort_field", params.sort_field);
  if (params.sort_type) queryParams.append("sort_type", params.sort_type);
  if (params.sort_lang) queryParams.append("sort_lang", params.sort_lang);
  if (params.country) queryParams.append("country", params.country);
  if (params.year) queryParams.append("year", params.year.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());

  const response = await fetch(
    `${APIURL}/v1/api/the-loai/${params.type_list}?${queryParams.toString()}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 10,
      },
    }
  );
  return response.json();
};
const getListMovieByCountry = async (
  params: MovieListParams
): Promise<{
  data: {
    items: Item[];
    params: {
      pagination: Pagination;
    };
  };
}> => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.sort_field) queryParams.append("sort_field", params.sort_field);
  if (params.sort_type) queryParams.append("sort_type", params.sort_type);
  if (params.sort_lang) queryParams.append("sort_lang", params.sort_lang);
  if (params.year) queryParams.append("year", params.year.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());

  const response = await fetch(
    `${APIURL}/v1/api/quoc-gia/${params.type_list}?${queryParams.toString()}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 10,
      },
    }
  );
  return response.json();
};
const searchMovie = async (
  params: MovieListParams
): Promise<{
  data: {
    items: Item[];
    params: {
      pagination: Pagination;
    };
  };
}> => {
  const queryParams = new URLSearchParams();
  queryParams.delete("type_list");

  if (params.page) queryParams.append("page", params.page.toString());
  if (params.sort_field) queryParams.append("sort_field", params.sort_field);
  if (params.sort_type) queryParams.append("sort_type", params.sort_type);
  if (params.sort_lang) queryParams.append("sort_lang", params.sort_lang);
  if (params.year) queryParams.append("year", params.year.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.category) queryParams.append("category", params.category);
  if (params.country) queryParams.append("country", params.country);

  console.log(queryParams.toString(), "hehehe");
  const response = await fetch(
    `${APIURL}/v1/api/tim-kiem?keyword=${
      params.keyword
    }&${queryParams.toString()}`,
    {
      cache: "no-cache",
    }
  );
  return response.json();
};

export {
  getNewReleaseMovie,
  getMovieDetail,
  getListMovieByType,
  getListMovieByCategory,
  getListMovieByCountry,
  searchMovie,
};
