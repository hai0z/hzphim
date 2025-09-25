"use client";
import { FaPlay } from "react-icons/fa";
import React, { useState, Fragment, useRef, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Autoplay, Pagination, Controller, EffectFade } from "swiper/modules";
import Link from "next/link";
import ShadowImg from "./ShadowImg";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { Item } from "@/type/ListMovieRespone";
import { FaCircleInfo, FaHeart } from "react-icons/fa6";
import { defaultPoster } from "@/constants";
import { usePlayer } from "@/hooks/useStores";
import { toast } from "react-toastify";
import { imgResize } from "@/app/utils/imgResize";

interface IHomeSwiperProps {
  data: Item[];
  listOverView: any;
}
const HomeSwiper: React.FC<IHomeSwiperProps> = ({ data, listOverView }) => {
  const swiper1Ref = useRef<any>(null);
  const swiper2Ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { width } = useWindowDimensions();

  const { addFavorite, listFavorite, removeFavorite } = usePlayer();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  return (
    <Fragment>
      <Swiper
        effect="fade"
        onSlideChange={(e) => {
          setCurrentIndex(e.realIndex);
        }}
        autoplay={{
          delay: 10000,
        }}
        fadeEffect={{
          crossFade: true,
        }}
        pagination={width < 768 ? true : false}
        slidesPerView={1}
        grabCursor={true}
        modules={[Autoplay, Pagination, Controller, EffectFade]}
        spaceBetween={15}
        centeredSlides
        loop
      >
        <AnimatePresence initial={false}>
          {data?.slice(0, 4).map((m, index) => {
            const isFavorite = listFavorite.some((item) => item._id == m._id);
            return (
              <SwiperSlide key={index} className={`${width < 768 && "pt-16"}`}>
                <motion.div className="w-full z-10" key={currentIndex}>
                  <Link href={`${"/movie/" + m._id}#top`} prefetch={false}>
                    <Image
                      src={imgResize(m.thumb_url) || defaultPoster}
                      alt="film"
                      className="w-full object-cover h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]"
                      width={1920}
                      height={1080}
                      priority
                      quality={50}
                    />
                  </Link>
                  <div
                    className="hidden md:block absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgb(0, 0, 0) 1px, transparent 1px)",
                      backgroundSize: "3px 3px",
                      opacity: 0.3,
                    }}
                  ></div>
                  <ShadowImg />

                  <div className="absolute left-0 bottom-0 right-0 top-0 ">
                    <div className="w-full h-1/4 bg-gradient-to-b from-[var(--color-base-100)] to-transparent"></div>
                  </div>
                </motion.div>
                <div>
                  <motion.div className="absolute bottom-6 sm:bottom-10 md:top-0 flex flex-col md:justify-around lg:px-0 md:flex-row w-full px-4 sm:px-6 md:px-8 xl:-mt-20">
                    <div
                      className={`${
                        currentIndex === index ? "opacity-100" : "opacity-0"
                      } w-full flex flex-col px-4 sm:px-8 md:px-12 justify-end h-full`}
                    >
                      <motion.div
                        initial={{
                          x: 100,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5,
                        }}
                        key={currentIndex}
                      >
                        <motion.div>
                          <Link
                            href={`${"/movie/" + m.slug}#top`}
                            className="flex justify-center items-center md:block"
                          >
                            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-base-content font-bold py-1 text-center md:text-left hover:text-primary line-clamp-2 md:line-clamp-1 w-fit leading-tight">
                              {m.name}
                            </p>
                          </Link>
                          <p className="pb-2 sm:pb-3 md:pb-4 text-sm sm:text-base md:text-lg text-base-content/80 text-center md:text-left">
                            {m.origin_name}
                          </p>
                        </motion.div>
                        <div className="md:flex items-center mb-6 hidden gap-x-2">
                          <p className="badge badge-outline ">
                            <span> TMDB </span>
                            <span className="text-base-content">
                              {m.tmdb.vote_average.toFixed(1)}
                            </span>
                          </p>
                          <p className="badge badge-outline">
                            {listOverView?.[index]?.movie?.time}
                          </p>
                          <p className="badge badge-outline">
                            {m.type === "movie" ? "phim lẻ" : "phim bộ"}
                          </p>
                          <p className="badge badge-outline">
                            {listOverView?.[index]?.movie?.year}
                          </p>
                        </div>
                        <div className="flex gap-1 sm:gap-2 flex-wrap my-1 justify-center md:justify-start">
                          {m?.category?.slice(0, 4).map((cat, index) => (
                            <Link
                              href={`/the-loai/${cat.slug}`}
                              key={index}
                              className="badge badge-neutral badge-sm sm:badge-md"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                        <div className="hidden md:block mt-4 mb-6">
                          <p
                            className=" text-base-content  text-justify max-w-2/3 line-clamp-4"
                            dangerouslySetInnerHTML={{
                              __html: listOverView?.[index]?.movie?.content,
                            }}
                          ></p>
                        </div>
                        <motion.div
                          initial={{
                            opacity: 0,
                            x: 50,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.9,
                          }}
                          key={currentIndex + m.name}
                          className="flex flex-row gap-x-4 sm:gap-x-6 md:gap-x-8 items-center justify-center md:justify-start mt-2"
                        >
                          <Link href={`/watch/${m.slug}`}>
                            <div
                              className={`btn btn-circle btn-primary w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shadow-primary/50 shadow-md hover:shadow-lg`}
                            >
                              <FaPlay
                                size={width < 640 ? 16 : width < 768 ? 18 : 24}
                              />
                            </div>
                          </Link>
                          <div className="flex flex-row p-2 sm:p-3 md:p-4 rounded-full border border-zinc-600 hover:border-base-content hover:border-2">
                            <div
                              className="w-full"
                              onClick={() => {
                                if (isFavorite) {
                                  removeFavorite(m._id);
                                  toast.success(
                                    "Đã xóa khỏi danh sách yêu thích",
                                    {
                                      autoClose: 2500,
                                    }
                                  );
                                } else {
                                  addFavorite(m);
                                  toast.success(
                                    "Đã thêm vào danh sách yêu thích",
                                    {
                                      autoClose: 2500,
                                    }
                                  );
                                }
                              }}
                            >
                              <FaHeart
                                size={width < 640 ? 16 : width < 768 ? 18 : 24}
                                className={
                                  isFavorite ? "text-error" : "hover:text-error"
                                }
                              />
                            </div>
                            <div className="divider divider-horizontal mx-1 sm:mx-2"></div>
                            <Link href={`/movie/${m.slug}`} className="w-full">
                              <FaCircleInfo
                                size={width < 640 ? 16 : width < 768 ? 18 : 24}
                                className="hover:text-warning"
                              />
                            </Link>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                    <div
                      className={`hidden lg:flex mr-12  h-full justify-center items-end`}
                    >
                      <motion.div
                        key={currentIndex}
                        className="rounded-3xl w-72"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 1 }}
                        layout
                      >
                        <Image
                          src={imgResize(m.poster_url) || defaultPoster}
                          width={300}
                          height={450}
                          loading="lazy"
                          className="object-cover rounded-3xl "
                          alt="film"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            );
          })}
        </AnimatePresence>
      </Swiper>
    </Fragment>
  );
};

export default HomeSwiper;
