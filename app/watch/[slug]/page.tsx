import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Calendar,
  Clock,
  Film,
  Users,
  Info,
  Bookmark,
  Heart,
  Share2,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { getMovieDetail } from "@/service/KKPhimService";
import tmdb from "@/service/TMDB";
import Player from "../_components/Player";
import Image from "next/image";
import ListEpisodes from "@/components/Shared/ListEpisodes";
import PlayerActionButton from "@/app/watch/_components/PlayerActionButton";
import TheaterModeWraper from "@/app/watch/_components/TheaterModeWraper";
import CustomVideoPlayer from "../_components/CustomVideoPlayer";

interface IProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    ver: string | undefined;
    ep: string | undefined;
  }>;
}
export async function generateMetadata({ params }: IProps) {
  const slug = (await params).slug;
  const data = await getMovieDetail(slug);
  return {
    title: data.movie.name,
    description: data.movie.content.replace(/<[^>]*>/g, ""),
  };
}

const PageEnhanced: React.FC<IProps> = async ({ params, searchParams }) => {
  const slug = (await params).slug;
  let ep = (await searchParams).ep || 1;
  let ver = (await searchParams).ver || 0;

  const data = await getMovieDetail(slug);
  if (+ver > 1) {
    ver = "0";
  }
  if (+ep > data.episodes[+ver].server_data.length) {
    ep = "1";
  }

  const crew = await tmdb.getCast(
    +data.movie.tmdb.id,
    data.movie.type === "single" ? "movie" : "tv"
  );

  const { movie } = data;

  let link = data.episodes[0].server_data[0].link_m3u8;

  if (movie.type == "single") {
    if (ver) {
      link = data.episodes[+ver].server_data[0].link_m3u8;
    }
  }
  if (movie.type == "series" || movie.type == "hoathinh") {
    if (ver && ep) {
      link = data.episodes[+ver].server_data[+ep - 1].link_m3u8;
    }
  }

  return (
    <TheaterModeWraper className="min-h-screen bg-base-100">
      {/* Header Navigation */}
      <div className="navbar bg-base-100 md:px-6 pt-20">
        <div className="navbar-start">
          <Link
            href={`/movie/${movie.slug}`}
            className="btn btn-outline btn-circle btn-sm md:btn-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>

        <div className="navbar-center">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold line-clamp-1">{movie.name}</h1>
            <p className="text-sm text-base-content/70 line-clamp-1">
              {movie.origin_name}
            </p>
          </div>
        </div>

        <div className="navbar-end"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto md:px-6 py-8">
        <div className="mb-8">
          <div
            className="bg-black md:rounded-t-2xl overflow-hidden "
            id="player"
          >
            <Player link={link} key={link} data={data} ver={ver} ep={ep} />
          </div>
          <div id="action-button">
            <PlayerActionButton data={data} />
          </div>
        </div>

        {/* Movie Info & Episodes Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Movie Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Movie Details Card */}
            <div className="card bg-base-200">
              <div className="card-body">
                <div className="md:flex gap-6">
                  {/* Movie Poster */}
                  <div className="flex-shrink-0  flex justify-center md:justify-start ">
                    <div className="avatar">
                      <div className="w-32 h-48 rounded-xl">
                        <Image
                          src={movie.poster_url}
                          alt={movie.name}
                          width={128}
                          height={192}
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 space-y-4 ">
                    <div className="flex items-center md:items-start flex-col">
                      <h2 className="card-title text-2xl mb-2">{movie.name}</h2>
                      <p className="text-primary text-lg">
                        {movie.origin_name}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3">
                      <div className="btn bg-base-100 rounded-lg p-3 min-w-0">
                        <div className="stat-figure text-primary">
                          <Star className="w-5 h-5" />
                        </div>
                        <div className="stat-value text-lg text-primary">
                          {movie.tmdb.vote_average.toFixed(1)}
                        </div>
                      </div>

                      <div className="btn bg-base-100 rounded-lg p-3 min-w-0">
                        <div className="stat-figure text-secondary">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div className="stat-value text-lg">{movie.year}</div>
                      </div>

                      <div className="btn bg-base-100 rounded-lg p-3 min-w-0">
                        <div className="stat-figure text-accent">
                          <Film className="w-5 h-5" />
                        </div>
                        <div className="stat-value text-lg text-accent">
                          {movie.quality}
                        </div>
                      </div>

                      {movie.type === "single" && (
                        <div className="btn bg-base-100 rounded-lg p-3 min-w-0">
                          <div className="stat-figure text-info">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div className="stat-value text-lg text-info">
                            {movie.time}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2">
                      {movie.category
                        .slice(0, 6)
                        .map((cate: any, index: number) => (
                          <div key={index} className="badge badge-outline">
                            {cate.name}
                          </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-base-content/80 line-clamp-3 leading-relaxed">
                        {movie.content.replace(/<[^>]*>/g, "")}
                      </p>
                      <Link
                        href={`/movie/${movie.slug}`}
                        className="btn btn-link btn-sm p-0 h-auto min-h-0 mt-2"
                      >
                        Xem thêm thông tin
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Episodes Section */}
            <div className="card bg-base-200 p-4">
              {data.movie.type === "single" ? (
                <div>
                  <p className="pb-6 text-2xl font-semibold">Các bản chiếu</p>
                  <div className="relative w-full sm:w-96  h-48 flex flex-row justify-between hover:-translate-y-2 transition-transform duration-150 rounded-xl ring-2 ring-primary">
                    <div className="flex-3 bg-[#5e6070] rounded-tl-xl rounded-bl-xl">
                      <div className="flex flex-col items-start justify-evenly gap-4 px-4  h-full">
                        <p>{data.episodes[0].server_name}</p>
                        <h1 className="text-lg font-bold">{movie.name}</h1>
                        <div className="flex items-center gap-3">
                          <div>
                            <Link
                              href={"/watch/" + movie.slug}
                              className="btn btn-secondary"
                            >
                              Đang xem
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-2 relative">
                      <Image
                        src={movie.poster_url}
                        alt="film"
                        className="md:brightness-50 object-cover rounded-tr-xl rounded-br-xl h-full"
                        width={640}
                        height={480}
                        priority
                      />
                      <div className="absolute left-0 bottom-0 right-0  z-0 top-0 rounded-xl">
                        <div className="h-full bg-gradient-to-l from-transparent to-[#5e6070]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ListEpisodes
                  episodes={data.episodes}
                  slug={slug}
                  ver={ver}
                  ep={ep}
                />
              )}
            </div>
          </div>

          {/* Right Column - Cast */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 sticky top-8">
              <div className="card-body">
                <h3 className="card-title mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Diễn viên ({crew?.cast?.length || 0})
                </h3>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {crew?.cast?.slice(0, 10).map((cast: any) => (
                    <div
                      key={cast.id}
                      className="flex items-center gap-3 p-3 bg-base-100 rounded-lg hover:bg-base-300 transition-colors"
                    >
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full">
                          <Image
                            src={tmdb.getImage(cast.profile_path)}
                            alt={cast.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm line-clamp-1">
                          {cast.name}
                        </p>
                        <p className="text-xs text-base-content/70 line-clamp-1">
                          {cast.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {crew?.cast?.length > 10 && (
                  <Link
                    href={`/movie/${movie.slug}`}
                    className="btn btn-outline btn-sm mt-4"
                  >
                    Xem tất cả diễn viên
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-info" />
                Thông tin bổ sung
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stat bg-base-100 rounded-lg">
                  <div className="stat-title">Trạng thái</div>
                  <div className="stat-value text-lg">
                    <div className="badge badge-success">
                      {movie.status === "completed" ? "Hoàn tất" : movie.status}
                    </div>
                  </div>
                </div>

                <div className="stat bg-base-100 rounded-lg">
                  <div className="stat-title">Loại phim</div>
                  <div className="stat-value text-lg">
                    {movie.type === "single" ? "Phim lẻ" : "Phim bộ"}
                  </div>
                </div>

                <div className="stat bg-base-100 rounded-lg">
                  <div className="stat-title">Ngôn ngữ</div>
                  <div className="stat-value text-lg">{movie.lang}</div>
                </div>

                <div className="stat bg-base-100 rounded-lg">
                  <div className="stat-title">Quốc gia</div>
                  <div className="stat-value text-lg">
                    {movie.country?.[0]?.name || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TheaterModeWraper>
  );
};

export default PageEnhanced;
