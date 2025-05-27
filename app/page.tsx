import { WatchedMoviesSwiper, WatchHistorySwiper } from "@/components/Swiper";
import HomeSwiper from "@/components/Swiper/HomeSwiper";
import MovieSectionSwiper from "@/components/Swiper/MovieSectionSwiper";
import {
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
  const [overviews, singleMovie, tvSeries, animation, koreaTvSeries] =
    await Promise.all([
      Promise.all(OverviewPromise),
      getListMovieByType({
        type_list: "phim-le",
        page: 1,
        limit: 8,
      }),
      getListMovieByType({
        type_list: "phim-bo",
        page: 1,
        limit: 8,
      }),
      getListMovieByType({
        type_list: "hoat-hinh",
        page: 1,
        limit: 8,
      }),
      getListMovieByType({
        type_list: "phim-bo",
        page: 1,
        limit: 8,
        country: "han-quoc",
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
      <div className="px-6">
        <WatchedMoviesSwiper
          title="Lịch sử xem phim"
          href="/history"
          maxItems={20}
        />
      </div>
      <div className="px-6">
        <MovieSectionSwiper
          href="/the-loai/phim-le"
          data={singleMovie?.data?.items || []}
          title="Phim lẻ"
        />
      </div>
      <div className="px-6 mt-8">
        <MovieSectionSwiper
          href="/the-loai/phim-bo"
          data={tvSeries?.data?.items || []}
          title="Phim bộ"
        />
      </div>
      <div className="px-6 mt-8">
        <MovieSectionSwiper
          href="/the-loai/hoat-hinh"
          data={animation?.data?.items || []}
          title="Phim hoạt hình"
        />
      </div>
      <div className="px-6 mt-8">
        <MovieSectionSwiper
          href="/the-loai/phim-bo-han-quoc"
          data={koreaTvSeries?.data?.items || []}
          title="Phim bộ hàn quốc"
        />
      </div>
    </div>
  );
};

export default Page;
