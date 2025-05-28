import { getMovieDetail } from "@/service/KKPhimService";
import tmdb from "@/service/TMDB";
import Image from "next/image";
import Link from "next/link";
import { Play, Star, Calendar, Clock, ChevronRight } from "lucide-react";
import MovieDetailClient from "@/app/movie/_components/MovieDetailClient";
import TiltCard from "../_components/TiltCard";
import { BiHeart } from "react-icons/bi";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const slug = (await params).id;
  const data = await getMovieDetail(slug);
  return {
    title: data.movie.name,
    description: data.movie.content.replace(/<[^>]*>/g, ""),
  };
}

export default async function MovieDetailEnhanced({ params }: Props) {
  const slug = (await params).id;

  const data = await getMovieDetail(slug);

  const [crew, photos] = await Promise.all([
    tmdb.getCast(
      +data.movie.tmdb.id,
      data.movie.type === "single" ? "movie" : "tv"
    ),
    tmdb.getPhotos(
      data.movie.type === "single" ? "movie" : "tv",
      +data.movie.tmdb.id
    ),
  ]);

  const { movie } = data;

  return (
    <div className="min-h-screen bg-base-100">
      <div className="h-screen overflow-hidden">
        <div className="image-container">
          <Image
            src={movie.thumb_url}
            alt={movie.name}
            width={1920}
            height={720}
            className="object-cover "
            priority
            quality={30}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-black/50 to-transparent " />
        <div className="absolute inset-0 bg-gradient-to-b from-base-100  to-transparent h-1/4 " />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base-100" />

        {/* Content */}

        <div className="absolute inset-0 z-10 h-full flex items-end">
          <div className="container mx-auto px-6 pb-20">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              {/* Poster */}
              <div className="lg:col-span-3">
                <TiltCard>
                  <div className="relative group">
                    <Image
                      src={movie.poster_url}
                      alt={movie.name}
                      width={300}
                      height={450}
                      className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                </TiltCard>
              </div>

              {/* Movie Info */}
              <div className="lg:col-span-9">
                {/* Title */}
                <div className="mb-6">
                  <h1 className="text-5xl lg:text-7xl font-black mb-4  ">
                    {movie.name}
                  </h1>
                  <p className="text-xl lg:text-2xl font-light">
                    {movie.origin_name}
                  </p>
                </div>

                {/* Rating & Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  {movie.tmdb && (
                    <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-bold text-lg">
                        {movie.tmdb.vote_average.toFixed(1)}
                      </span>
                      <span className="text-sm ">
                        ({movie.tmdb.vote_count.toLocaleString()})
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Clock className="w-4 h-4" />
                    <span>{movie.time}</span>
                  </div>
                  <div className="badge badge-primary badge-lg">
                    {movie.quality}
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.category?.slice(0, 4).map((cat) => (
                    <span key={cat.id} className="badge badge-neutral badge-lg">
                      {cat.name}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-8 max-w-4xl">
                  <div
                    className=" text-lg leading-relaxed line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: movie.content }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/watch/${movie.slug}`}
                    className="btn btn-primary btn-lg gap-3 shadow-2xl hover:shadow-primary/50 transition-all duration-300"
                  >
                    <Play className="w-6 h-6 fill-current" />
                    Xem Ngay
                  </Link>
                  <Link
                    href={`/watch/${movie.slug}`}
                    className="btn btn-outline btn-lg gap-3 shadow-2xl hover:shadow-secondary/50 transition-all duration-300"
                  >
                    <BiHeart className="w-6 h-6 fill-current" />
                    Thêm vào yêu thích
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-20 bg-base-100">
        <MovieDetailClient
          movie={movie}
          data={data}
          crew={crew}
          photos={photos}
          slug={slug}
        />
      </div>
    </div>
  );
}
