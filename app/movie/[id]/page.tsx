import { getMovieDetail } from "@/service/KKPhimService";
import tmdb from "@/service/TMDB";
import Image from "next/image";
import Link from "next/link";
import { Play, Star, Calendar, Clock, ChevronRight } from "lucide-react";
import MovieDetailClient from "@/app/movie/_components/MovieDetailClient";
import TiltCard from "../_components/TiltCard";
import { BiHeart } from "react-icons/bi";
import { defaultPoster } from "@/constants";
import AddToFavoriteButton from "../_components/AddToFavoriteButton";
import ParallaxImage from "../_components/ParallaxImage";

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
      {/* Parallax Hero Section */}
      <ParallaxImage
        src={movie.thumb_url || defaultPoster}
        alt={movie.name}
        className="h-[75vh] sm:h-screen"
        intensity={0.3}
      >
        <div className="h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
              {/* Poster - Hidden on mobile, shown on tablet+ */}
              <div className="hidden lg:block lg:col-span-3">
                <TiltCard>
                  <div className="relative group">
                    <Image
                      src={movie.poster_url || defaultPoster}
                      alt={movie.name}
                      width={300}
                      height={450}
                      className="rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105 w-full max-w-[250px] lg:max-w-[300px] mx-auto"
                      priority
                    />
                  </div>
                </TiltCard>
              </div>

              {/* Movie Info */}
              <div className="lg:col-span-9 text-center md:text-left">
                {/* Title */}
                <div className="mb-4 sm:mb-6">
                  <p
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 sm:mb-4 text-base-content leading-tight"
                    style={{
                      textShadow:
                        "0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)",
                    }}
                  >
                    {movie.name}
                  </p>
                  <p
                    className="text-lg sm:text-xl lg:text-2xl font-light text-base-content/90"
                    style={{
                      textShadow:
                        "0 0 15px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6)",
                    }}
                  >
                    {movie.origin_name}
                  </p>
                </div>

                {/* Rating & Stats */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                  {movie.tmdb && (
                    <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      <span className="font-bold text-sm sm:text-base lg:text-lg">
                        {movie.tmdb.vote_average.toFixed(1)}
                      </span>
                      <span className="text-xs sm:text-sm hidden sm:inline">
                        ({movie.tmdb.vote_count.toLocaleString()})
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-sm sm:text-base">{movie.year}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-sm sm:text-base">{movie.time}</span>
                  </div>
                  <div className="badge badge-primary badge-sm sm:badge-md lg:badge-lg">
                    {movie.quality}
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 sm:mb-6">
                  {movie.category?.slice(0, 4).map((cat) => (
                    <Link
                      href={`/the-loai/${cat.slug}`}
                      key={cat.id}
                      className="badge badge-neutral badge-sm sm:badge-md lg:badge-lg"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-6 sm:mb-8 max-w-4xl mx-auto md:mx-0">
                  <div
                    className="text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-3 sm:line-clamp-4 text-center md:text-left"
                    style={{
                      textShadow: "0 0 10px rgba(0,0,0,0.8)",
                    }}
                    dangerouslySetInnerHTML={{ __html: movie.content }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
                  <Link
                    href={`/watch/${movie.slug}`}
                    className="btn btn-primary btn-sm sm:btn-md lg:btn-lg gap-2 sm:gap-3 shadow-2xl hover:shadow-primary/50 transition-all duration-300 w-full sm:w-auto"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current" />
                    Xem Ngay
                  </Link>
                  <div className="w-full sm:w-auto">
                    <AddToFavoriteButton movie={movie} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-0 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <ChevronRight className="w-6 h-6 rotate-90 text-white drop-shadow-lg" />
        </div>
      </ParallaxImage>

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
