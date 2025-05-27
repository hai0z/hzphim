import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import { getMovieDetail } from "@/service/KKPhimService";
import tmdb from "@/service/TMDB";
import Player from "../_components/Player";
import Image from "next/image";
import ListEpisodes from "@/components/ListEpisodes";
import PlayerActionButton from "@/app/watch/_components/PlayerActionButton";
import TheaterModeWraper from "@/app/watch/_components/TheaterModeWraper";
interface IProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    ver: string | undefined;
    ep: string | undefined;
  }>;
}
const Page: React.FC<IProps> = async ({ params, searchParams }) => {
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
    <TheaterModeWraper className="min-h-screen pt-20 px-6 pb-20">
      <div className="flex flex-row items-center gap-x-4">
        <Link
          href={`/movie/${movie.slug}`}
          className="btn btn-circle btn-outline btn-sm ml-4"
        >
          <ChevronLeft />
        </Link>
        <p className="text-lg font-semibold">{movie.name}</p>
      </div>
      <div className="w-full mt-8" id="player">
        <Player link={link} key={link} data={data} ver={ver} ep={ep} />
      </div>
      <div id="player">
        <PlayerActionButton data={data} />
      </div>
      <div>
        <div className="flex flex-row w-full">
          <div className="flex-2 py-4 px-3">
            <div className="flex flex-row">
              <div className="flex flex-row w-full">
                <div>
                  <Image
                    src={movie.poster_url}
                    alt={movie.name}
                    width={90}
                    height={120}
                    className="rounded-lg object-cover"
                    priority
                  />
                </div>
                <div className="ml-6">
                  <p className="text-xl font-semibold">{movie.name}</p>
                  <p className="text-primary text-sm mt-6">
                    {movie.origin_name}
                  </p>
                  <div className="flex flex-row gap-x-2 mt-6">
                    <div className="border border-primary rounded-md flex justify-center items-center p-1 ">
                      <span className="text-xs text-primary">TMDB </span>
                      <span className="text-xs font-semibold ml-1">
                        {movie.tmdb.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-secondary to-accent flex justify-center items-center p-1   rounded-md">
                      <span className="text-xs font-semibold ">
                        {movie.quality}
                      </span>
                    </div>
                    <div className="border border-base-content flex justify-center items-center p-1  rounded-md">
                      <span className="text-xs font-semibold ">
                        {movie.year}
                      </span>
                    </div>
                    <div className="border border-base-content flex justify-center items-center p-1  rounded-md">
                      <span className="text-xs font-semibold ">
                        {movie.episode_current}
                      </span>
                    </div>
                    {movie.type === "single" && (
                      <div className="border border-base-content flex justify-center items-center p-1  rounded-md">
                        <span className="text-xs font-semibold ">
                          {movie.time}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row gap-x-2 mt-4 flex-wrap gap-y-2">
                    {movie.category.map((cate, index) => (
                      <Link
                        href={"/"}
                        key={index}
                        className="badge bg-neutral hover:text-primary"
                      >
                        <p>{cate.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div>
                  <p className="text-justify text-[14px] line-clamp-4">
                    {movie.content}
                  </p>
                  <Link
                    href={`/movie/${movie.slug}`}
                    className="flex flex-row gap-x-1 items-center mt-6  "
                  >
                    <span className="text-[14px] text-primary ">
                      {" "}
                      Thông tin phim
                    </span>{" "}
                    <ChevronRight color="var(--color-primary)" size={20} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div>
              {data.movie.type === "single" && (
                <div>
                  <p className="pb-6 text-2xl font-semibold">Các bản chiếu</p>
                  <div className="relative w-96 h-48 flex flex-row justify-between hover:-translate-y-2 transition-transform duration-150 border-primary rounded-xl border-2">
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
              )}
              {(data.movie.type === "series" ||
                data.movie.type === "hoathinh") && (
                <ListEpisodes
                  episodes={data.episodes}
                  slug={slug}
                  ver={ver}
                  ep={ep}
                />
              )}
            </div>
          </div>
          <div className="divider-horizontal divider"></div>
          <div className="flex-1 flex flex-col">
            <p className="font-semibold text-lg py-4">Diễn viên</p>
            <div className="flex flex-row gap-x-4 flex-wrap gap-y-4">
              {crew?.cast?.map((cast) => (
                <div key={cast.id} className="w-24">
                  <Image
                    src={tmdb.getImage(cast.profile_path)}
                    alt={cast.name}
                    className="object-cover rounded-full w-24 h-24"
                    width={80}
                    height={80}
                    priority
                  />
                  <p className="text-[13px] text-center">{cast.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TheaterModeWraper>
  );
};

export default Page;
