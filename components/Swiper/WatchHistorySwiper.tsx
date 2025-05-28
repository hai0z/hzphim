"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  EffectFade,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  History,
  Trash2,
  Filter,
  Grid3X3,
  List,
  Play,
  Pause,
} from "lucide-react";
import WatchedMovieCard from "../MovieCard/WatchedMovieCard";
import { useContinueWatchingList } from "@/hooks/useContinueWatching";
import { motion, AnimatePresence } from "framer-motion";

interface IWatchHistorySwiperProps {
  title?: string;
  href?: string;
  showControls?: boolean;
  autoplay?: boolean;
  effect?: "slide" | "coverflow" | "fade";
  showFilters?: boolean;
  maxItems?: number;
}

type ViewMode = "swiper" | "grid";
type FilterType = "all" | "movies" | "series" | "recent";

const WatchHistorySwiper: React.FC<IWatchHistorySwiperProps> = ({
  title = "Lịch sử xem phim",
  href = "/history",
  showControls = true,
  autoplay = false,
  effect = "slide",
  showFilters = true,
  maxItems = 20,
}) => {
  const { recentItems, removeItem, clearOldItems } = useContinueWatchingList();
  const swiperRef = useRef<SwiperType>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("swiper");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isAutoplayRunning, setIsAutoplayRunning] = useState(autoplay);

  // Filter items based on selected filter
  const filteredItems = recentItems.filter((item) => {
    switch (filter) {
      case "movies":
        return item.movie.type === "single";
      case "series":
        return item.movie.type === "series" || item.movie.type === "hoathinh";
      case "recent":
        // Items watched in last 7 days (assuming we add timestamp later)
        return true; // For now, return all
      default:
        return true;
    }
  });

  const displayItems = maxItems
    ? filteredItems.slice(0, maxItems)
    : filteredItems;

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isAutoplayRunning) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsAutoplayRunning(!isAutoplayRunning);
    }
  };

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  if (displayItems.length === 0) {
    return (
      <div className="px-4 py-8">
        <div className="flex flex-row items-center gap-x-4 my-4">
          <h2 className="text-2xl font-semibold text-base-content flex items-center gap-2">
            <History className="w-6 h-6 text-primary" />
            {title}
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-base-200 to-base-300 rounded-xl p-12 text-center"
        >
          <History className="w-20 h-20 text-base-content/20 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-base-content/70 mb-2">
            Chưa có lịch sử xem
          </h3>
          <p className="text-base-content/50 text-sm max-w-md mx-auto">
            Bắt đầu xem phim để tạo lịch sử và có thể tiếp tục xem từ vị trí đã
            dừng
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-base-content flex items-center gap-2">
            <History className="w-6 h-6 text-primary" />
            {title}
          </h2>
          <div className="badge badge-primary badge-lg">
            {displayItems.length} phim
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filters */}
          {showFilters && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-outline btn-sm"
              >
                <Filter className="w-4 h-4" />
                Lọc
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button
                    onClick={() => setFilter("all")}
                    className={filter === "all" ? "active" : ""}
                  >
                    Tất cả
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setFilter("movies")}
                    className={filter === "movies" ? "active" : ""}
                  >
                    Phim lẻ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setFilter("series")}
                    className={filter === "series" ? "active" : ""}
                  >
                    Phim bộ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setFilter("recent")}
                    className={filter === "recent" ? "active" : ""}
                  >
                    Gần đây
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* View mode toggle */}
          <div className="join">
            <button
              onClick={() => setViewMode("swiper")}
              className={`btn btn-sm join-item ${
                viewMode === "swiper" ? "btn-primary" : "btn-outline"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`btn btn-sm join-item ${
                viewMode === "grid" ? "btn-primary" : "btn-outline"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>

          {/* Autoplay control */}
          {autoplay && showControls && (
            <button
              onClick={toggleAutoplay}
              className="btn btn-outline btn-sm"
              title={
                isAutoplayRunning
                  ? "Tạm dừng tự động chuyển"
                  : "Bật tự động chuyển"
              }
            >
              {isAutoplayRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Clear old items */}
          <button
            onClick={() => clearOldItems(7)}
            className="btn btn-outline btn-sm text-error hover:bg-error hover:text-error-content"
            title="Xóa phim đã xem cũ"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* View all link */}
          {href && (
            <Link href={href} className="btn btn-primary btn-sm">
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "swiper" ? (
          <motion.div
            key="swiper"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative"
          >
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[
                Navigation,
                Pagination,
                Autoplay,
                EffectCoverflow,
                EffectFade,
              ]}
              effect={effect}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              fadeEffect={{
                crossFade: true,
              }}
              autoplay={
                autoplay
                  ? {
                      delay: 3000,
                      disableOnInteraction: false,
                    }
                  : false
              }
              navigation={false}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              slidesPerView="auto"
              spaceBetween={20}
              centeredSlides={effect === "coverflow"}
              breakpoints={{
                320: { slidesPerView: 1.5, spaceBetween: 12 },
                640: { slidesPerView: 2.5, spaceBetween: 16 },
                768: { slidesPerView: 3.5, spaceBetween: 20 },
                1024: { slidesPerView: 4.5, spaceBetween: 24 },
                1280: { slidesPerView: 5.5, spaceBetween: 24 },
              }}
              className="watch-history-swiper"
            >
              {displayItems.map((item, index) => (
                <SwiperSlide key={`${item.movie._id}-${item.ep}-${item.ver}`}>
                  <WatchedMovieCard
                    item={item}
                    onRemove={() => removeItem(item.movie._id)}
                    index={index}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom navigation */}
            {showControls && (
              <>
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-primary btn-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 btn btn-circle btn-primary btn-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {displayItems.map((item, index) => (
              <WatchedMovieCard
                key={`${item.movie._id}-${item.ep}-${item.ver}`}
                item={item}
                onRemove={() => removeItem(item.movie._id)}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WatchHistorySwiper;
