"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { ChevronRight, History, Trash2 } from "lucide-react";
import WatchedMovieCard from "@/components/MovieCard/WatchedMovieCard";
import { useContinueWatchingList } from "@/hooks/useContinueWatching";

interface IWatchedMoviesSwiperProps {
  title?: string;
  href?: string;
  showRemoveButton?: boolean;
  maxItems?: number;
}

const WatchedMoviesSwiper: React.FC<IWatchedMoviesSwiperProps> = ({
  title = "Phim đã xem",
  href = "/history",
  showRemoveButton = true,
  maxItems = 20,
}) => {
  const { recentItems, removeItem, clearOldItems } = useContinueWatchingList();

  const displayItems = maxItems ? recentItems.slice(0, maxItems) : recentItems;

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <div className="md:px-4 py-4">
      <div className="flex flex-row items-center justify-between my-4">
        <div className="flex flex-row items-center gap-x-4">
          <h2 className="text-2xl font-semibold text-base-content flex items-center gap-2 px-2 md:px-0">
            {title}
          </h2>
          {/* View all button */}
          {href && (
            <Link
              href={href}
              className="btn btn-circle btn-outline btn-sm hover:w-24 transition-all duration-200 hover:flex hover:flex-row hover:justify-evenly group hover:text-warning hover:px-1"
            >
              <p className="text-[10px] hidden group-hover:block whitespace-nowrap">
                Xem thêm
              </p>
              <ChevronRight size={20} />
            </Link>
          )}
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-watched",
          prevEl: ".swiper-button-prev-watched",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        slidesPerView="auto"
        spaceBetween={4}
        className="watched-movies-swiper"
      >
        {displayItems.map((item, index) => (
          <SwiperSlide
            key={`${item.movie._id}-${item.ep}-${item.ver}`}
            style={{
              width: "auto",
              paddingLeft: 4,
            }}
          >
            <WatchedMovieCard
              item={item}
              onRemove={
                showRemoveButton ? () => removeItem(item.movie._id) : undefined
              }
              index={index}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <div className="swiper-button-prev-watched absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-base-100/80 hover:bg-base-100 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100">
        <ChevronRight className="w-5 h-5 rotate-180 text-base-content" />
      </div>
      <div className="swiper-button-next-watched absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-base-100/80 hover:bg-base-100 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100">
        <ChevronRight className="w-5 h-5 text-base-content" />
      </div>

      <style jsx>{`
        .watched-movies-swiper {
          position: relative;
          padding: 0 50px;
        }

        .watched-movies-swiper:hover .swiper-button-prev-watched,
        .watched-movies-swiper:hover .swiper-button-next-watched {
          opacity: 1;
        }

        .swiper-pagination {
          position: relative;
          margin-top: 20px;
        }

        .swiper-pagination-bullet {
          background: hsl(var(--primary));
          opacity: 0.3;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default WatchedMoviesSwiper;
