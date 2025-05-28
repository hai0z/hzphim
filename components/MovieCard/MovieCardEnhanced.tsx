"use client";
import React, { useState } from "react";
import { Item } from "@/type/ListMovieRespone";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Star,
  Calendar,
  Clock,
  Film,
  Heart,
  Info,
  Bookmark,
  Share2,
} from "lucide-react";

interface MovieCardEnhancedProps {
  m: Item;
  index?: number;
  variant?: "default" | "compact" | "detailed" | "grid";
  showActions?: boolean;
  showRating?: boolean;
  showInfo?: boolean;
  onAddToFavorites?: (movieId: string) => void;
  onAddToWatchlist?: (movieId: string) => void;
  onShare?: (movie: Item) => void;
}

function MovieCardEnhanced({
  m,
  index = 0,
  variant = "default",
  showActions = true,
  showRating = false,
  showInfo = true,
  onAddToFavorites,
  onAddToWatchlist,
  onShare,
}: MovieCardEnhancedProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickInfo, setShowQuickInfo] = useState(false);

  const getRatingColor = () => {
    const rating = m.tmdb?.vote_average || 0;
    if (rating >= 8) return "text-green-500";
    if (rating >= 6) return "text-yellow-500";
    if (rating >= 4) return "text-orange-500";
    return "text-red-500";
  };

  const handleAction = (action: () => void, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  // Different card sizes based on variant
  const getCardClasses = () => {
    switch (variant) {
      case "compact":
        return "w-[160px]";
      case "detailed":
        return "w-[280px]";
      case "grid":
        return "w-full max-w-[240px]";
      default:
        return "md:w-[clamp(200px,16vw,220px)] w-[calc(100vw/2.75)]";
    }
  };

  const getImageAspect = () => {
    return variant === "detailed" ? "aspect-[3/4]" : "aspect-[2/3]";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative bg-base-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300  ${getCardClasses()}`}
    >
      {/* Action buttons */}
      {showActions && (
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          {onAddToFavorites && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAction(() => onAddToFavorites(m._id), e)}
              className="btn btn-xs btn-circle bg-black/70 text-white hover:bg-red-500 hover:text-white border-none backdrop-blur-sm"
              title="Thêm vào yêu thích"
            >
              <Heart className="w-3 h-3" />
            </motion.button>
          )}
          {onAddToWatchlist && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAction(() => onAddToWatchlist(m._id), e)}
              className="btn btn-xs btn-circle bg-black/70 text-white hover:bg-blue-500 hover:text-white border-none backdrop-blur-sm"
              title="Thêm vào danh sách xem"
            >
              <Bookmark className="w-3 h-3" />
            </motion.button>
          )}
          {onShare && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAction(() => onShare(m), e)}
              className="btn btn-xs btn-circle bg-black/70 text-white hover:bg-green-500 hover:text-white border-none backdrop-blur-sm"
              title="Chia sẻ"
            >
              <Share2 className="w-3 h-3" />
            </motion.button>
          )}
          {showInfo && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) =>
                handleAction(() => setShowQuickInfo(!showQuickInfo), e)
              }
              className="btn btn-xs btn-circle bg-black/70 text-white hover:bg-purple-500 hover:text-white border-none backdrop-blur-sm"
              title="Thông tin nhanh"
            >
              <Info className="w-3 h-3" />
            </motion.button>
          )}
        </div>
      )}

      <Link href={`/movie/${m.slug}#top`} className="block">
        {/* Poster container */}
        <div
          className={`relative ${getImageAspect()} overflow-hidden bg-base-300`}
        >
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-base-300 via-base-200 to-base-300 animate-pulse" />
          )}

          <Image
            width={variant === "detailed" ? 280 : 220}
            height={variant === "detailed" ? 373 : 330}
            src={`https://phimimg.com/${m.poster_url}`}
            alt={m.name}
            loading="lazy"
            quality={80}
            className={`object-cover w-full h-full transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.div
              initial={{ scale: 0.5, rotate: 0 }}
              animate={{
                scale: isHovered ? 1 : 0.5,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-primary/95 backdrop-blur-sm rounded-full p-3 shadow-2xl"
            >
              <Play className="w-8 h-8 text-white fill-current" />
            </motion.div>
          </div>

          {/* Rating badge */}
          {showRating && m.tmdb?.vote_average && m.tmdb.vote_average > 0 && (
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                <Star className={`w-3 h-3 fill-current ${getRatingColor()}`} />
                <span className={`text-xs font-bold ${getRatingColor()}`}>
                  {m.tmdb.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          )}

          {/* Episode info for series */}
          {(m.type === "series" || m.type === "hoathinh") &&
            m.episode_current && (
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-info/90 backdrop-blur-sm text-info-content px-2 py-1 rounded-full text-xs font-medium">
                  {m.episode_current}
                </div>
              </div>
            )}

          {/* Year badge */}
          {m.year && (
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                {m.year}
              </div>
            </div>
          )}
        </div>

        {/* Movie info */}
        <div className={`p-${variant === "compact" ? "2" : "4"}`}>
          <h3
            className={`font-bold ${
              variant === "compact" ? "text-xs" : "text-sm"
            } text-base-content line-clamp-1 mb-2 group-hover:text-primary transition-colors duration-200`}
          >
            {m.name}
          </h3>

          <p
            className={`${
              variant === "compact" ? "text-xs" : "text-sm"
            } text-base-content/60 line-clamp-1 mb-3`}
          >
            {m.origin_name}
          </p>

          {/* Additional info - only show in detailed variant */}
          {variant === "detailed" && (
            <div className="space-y-2 mb-3">
              {m.time && (
                <div className="flex items-center gap-2 text-xs text-base-content/70">
                  <Clock className="w-3 h-3" />
                  <span>{m.time}</span>
                </div>
              )}

              {m.category && m.category.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-base-content/60">
                  <Film className="w-3 h-3" />
                  <span className="line-clamp-1">
                    {m.category
                      .slice(0, 3)
                      .map((cat) => cat.name)
                      .join(", ")}
                  </span>
                </div>
              )}

              {m.country && m.country.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-base-content/60">
                  <span className="line-clamp-1">
                    {m.country
                      .slice(0, 2)
                      .map((country) => country.name)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          {variant !== "compact" && (
            <div className="flex items-center justify-between pt-2 border-t border-base-300">
              <div className="flex items-center gap-1 text-xs text-base-content/60">
                <Calendar className="w-3 h-3" />
                <span>{m.year}</span>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Quick info modal */}
      <AnimatePresence>
        {showQuickInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-base-300 backdrop-blur-sm z-30 p-4 flex flex-col justify-center "
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowQuickInfo(false);
            }}
          >
            <h4 className="font-bold text-sm mb-2 line-clamp-2">{m.name}</h4>
            <p className="text-xs mb-2 line-clamp-1">{m.origin_name}</p>

            <div className="space-y-1 text-xs">
              <div>Năm: {m.year}</div>
              <div>
                Thể loại:{" "}
                {m.category
                  ?.slice(0, 2)
                  .map((c) => c.name)
                  .join(", ")}
              </div>
              <div>
                Quốc gia:{" "}
                {m.country
                  ?.slice(0, 1)
                  .map((c) => c.name)
                  .join(", ")}
              </div>
              {m.tmdb?.vote_average !== 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-yellow-400" />
                  {m.tmdb.vote_average.toFixed(1)}/10
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MovieCardEnhanced;
