"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play, X, Clock, Film, Star } from "lucide-react";
import { ContinueWatching } from "@/store/playerStore";
import { formatWatchTime, getWatchProgress } from "@/hooks/useContinueWatching";

interface WatchedMovieCardProps {
  item: ContinueWatching;
  onRemove?: () => void;
  index?: number;
  showProgress?: boolean;
  showRemoveButton?: boolean;
}

const WatchedMovieCard: React.FC<WatchedMovieCardProps> = ({
  item,
  onRemove,
  index = 0,
  showProgress = true,
  showRemoveButton = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const progressPercentage = getWatchProgress(item.timestamp, item.duration);

  const getEpisodeInfo = () => {
    if (item.movie.type === "single") {
      return "Phim lẻ";
    }
    return `Tập ${item.ep}`;
  };

  const getWatchUrl = () => {
    const baseUrl = `/watch/${item.movie.slug}`;
    if (item.movie.type === "single") {
      return item.ver ? `${baseUrl}?ver=${item.ver}` : baseUrl;
    }
    return `${baseUrl}?ep=${item.ep}&ver=${item.ver}`;
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (showRemoveConfirm) {
      onRemove?.();
      setShowRemoveConfirm(false);
    } else {
      setShowRemoveConfirm(true);
      setTimeout(() => setShowRemoveConfirm(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-base-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 w-[220px]"
    >
      {/* Remove button */}
      {showRemoveButton && onRemove && (
        <button
          onClick={handleRemoveClick}
          className={`absolute top-2 right-2 z-20 btn btn-xs btn-circle transition-all duration-200 ${
            showRemoveConfirm
              ? "bg-error text-error-content opacity-100"
              : "bg-black/50 text-white opacity-0 group-hover:opacity-100"
          }`}
          title={
            showRemoveConfirm
              ? "Nhấn lại để xác nhận xóa"
              : "Xóa khỏi danh sách"
          }
        >
          <X className="w-3 h-3" />
        </button>
      )}

      <Link href={getWatchUrl()} className="block">
        {/* Poster container */}
        <div className="relative aspect-[2/3] overflow-hidden bg-base-300">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-base-300 via-base-200 to-base-300 animate-pulse" />
          )}

          <Image
            src={item.movie.poster_url}
            alt={item.movie.name}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="200px"
          />

          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-primary/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
          </div>

          {/* Top badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <div className="badge badge-neutral badge-sm">
              {getEpisodeInfo()}
            </div>
          </div>

          {/* Progress bar */}
          {showProgress && (
            <div className="absolute bottom-0 left-0 right-0">
              <div className="h-1 bg-black/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-primary relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>

              {/* Progress text */}
            </div>
          )}
        </div>

        {/* Movie info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm text-base-content line-clamp-1 mb-1 group-hover:text-primary transition-colors duration-200">
            {item.movie.name}
          </h3>

          <p className="text-xs text-base-content/60 line-clamp-1 mb-2">
            {item.movie.origin_name}
          </p>

          {/* Watch info */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-base-content/70">
                <Clock className="w-3 h-3" />
                {formatWatchTime(item.timestamp)}
              </span>
              <span className="text-primary font-medium">
                {Math.round(progressPercentage)}%
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-base-content/60">
              <span>Còn lại</span>
              <span>{formatWatchTime(item.duration - item.timestamp)}</span>
            </div>
          </div>

          {/* Additional info */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-base-300">
            <div className="flex items-center gap-1 text-xs text-base-content/60">
              <Film className="w-3 h-3" />
              <span>{item.movie.time}</span>
            </div>

            {item.movie.tmdb?.vote_average && (
              <div className="flex items-center gap-1 text-xs text-warning">
                <Star className="w-3 h-3 fill-current" />
                <span>{item.movie.tmdb.vote_average.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 ring-2 ring-primary ring-opacity-0 group-hover:ring-opacity-50 transition-all duration-300 rounded-lg pointer-events-none" />
    </motion.div>
  );
};

export default WatchedMovieCard;
