"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Item } from "@/type/ListMovieRespone";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MovieCardEnhanced from "../MovieCard/MovieCardEnhanced";
interface IMovieSectionSwiperProps {
  data: Item[];
  title?: string;
  href: string;
}

const MovieSectionSwiper: React.FC<IMovieSectionSwiperProps> = ({
  data,
  title,
  href,
}) => {
  return (
    <div className="md:px-4">
      <div className="flex flex-row items-center gap-x-4 my-4">
        {title && (
          <h2 className="text-2xl font-semibold text-base-content px-2 md:px-0">
            {title}
          </h2>
        )}
        <Link
          href={href}
          className="btn btn-circle btn-outline btn-sm hover:w-24 transition-all duration-200 hover:flex hover:flex-row hover:justify-evenly group hover:text-warning hover:px-1"
        >
          <p className="text-[10px] hidden group-hover:block whitespace-nowrap">
            Xem thêm
          </p>
          <ChevronRight size={20} />
        </Link>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        slidesPerView={"auto"}
        spaceBetween={4}
      >
        {data?.map((movie, index) => (
          <SwiperSlide
            key={movie._id}
            style={{
              paddingLeft: 4,
              width: "auto",
            }}
          >
            <MovieCardEnhanced m={movie} showRating index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSectionSwiper;
