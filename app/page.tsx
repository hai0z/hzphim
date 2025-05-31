import HomeSwiper from "@/components/Swiper/HomeSwiper";
import MovieSectionSwiper from "@/components/Swiper/MovieSectionSwiper";
import WatchedMoviesSwiper from "@/components/Swiper/WatchedMoviesSwiper";
import {
  getListMovieByCategory,
  getListMovieByCountry,
  getListMovieByType,
  getMovieDetail,
  getNewReleaseMovie,
} from "@/service/KKPhimService";
import React from "react";

const Page = async () => {
  const newReleaseMovie = await getNewReleaseMovie(1);

  const OverviewPromise = [];

  for (const m of newReleaseMovie?.items.slice(0, 4)) {
    OverviewPromise.push(getMovieDetail(m.slug));
  }
  const [
    overviews,
    singleMovie,
    tvSeries,
    animation,
    korea,
    vn,
    action,
    horror,
    china,
  ] = await Promise.all([
    Promise.all(OverviewPromise),
    getListMovieByType({
      type_list: "phim-le",
      page: 1,
      limit: 8,
      sort_field: "year",
    }),
    getListMovieByType({
      type_list: "phim-bo",
      page: 1,
      limit: 8,
      sort_field: "year",
    }),
    getListMovieByType({
      type_list: "hoat-hinh",
      page: 1,
      limit: 8,
      sort_field: "year",
    }),
    getListMovieByCountry({
      type_list: "han-quoc",
      page: 1,
      limit: 8,
      sort_field: "year",
    }),
    getListMovieByCountry({
      type_list: "viet-nam",
      page: 1,
      limit: 8,
      sort_field: "year",
    }),
    getListMovieByCategory({
      type_list: "hanh-dong",
      page: 1,
      limit: 8,
      sort_field: "year",
    }),
    getListMovieByCategory({
      type_list: "kinh-di",
      page: 1,
      limit: 8,
      sort_field: "year",
    }),
    getListMovieByCountry({
      type_list: "trung-quoc",
      page: 1,
      limit: 8,
      sort_field: "year",
    }),
  ]);

  return (
    <div className="min-h-screen">
      <div>
        <HomeSwiper
          data={newReleaseMovie?.items || []}
          listOverView={overviews}
        />
      </div>
      <div className="md:px-6">
        <WatchedMoviesSwiper
          title="Tiếp tục xem"
          href="/history"
          maxItems={20}
        />
      </div>
      <div className="md:px-6">
        <MovieSectionSwiper
          href="/phim-le"
          data={singleMovie?.data?.items || []}
          title="Phim lẻ"
        />
      </div>
      <div className="md:px-6 mt-8">
        <MovieSectionSwiper
          href="/phim-bo"
          data={tvSeries?.data?.items || []}
          title="Phim bộ"
        />
      </div>
      <div className="md:px-6 mt-8">
        <MovieSectionSwiper
          href="/hoat-hinh"
          data={animation?.data?.items || []}
          title="Phim hoạt hình"
        />
      </div>
      <div className="md:px-6 mt-8">
        <MovieSectionSwiper
          href="/quoc-gia/han-quoc"
          data={korea?.data?.items || []}
          title="Phim hàn quốc"
        />
      </div>
      <div className="md:px-6 mt-8">
        <MovieSectionSwiper
          href="/quoc-gia/viet-nam"
          data={vn?.data?.items || []}
          title="Phim việt nam"
        />
      </div>
      <div className="md:px-6 mt-8">
        <MovieSectionSwiper
          href="/the-loai/hanh-dong"
          data={action?.data?.items || []}
          title="Phim hành động"
        />
      </div>
      <div className="md:px-6 mt-8">
        <MovieSectionSwiper
          href="/the-loai/kinh-di"
          data={horror?.data?.items || []}
          title="Phim kinh dị"
        />
      </div>
      <div className="md:px-6 mt-8">
        <MovieSectionSwiper
          href="/quoc-gia/trung-quoc"
          data={china?.data?.items || []}
          title="Phim trung quốc"
        />
      </div>
    </div>
  );
};

export default Page;
