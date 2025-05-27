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
import { useRouter } from "next/navigation";
import { Item } from "@/type/ListMovieRespone";
import { FaCircleInfo, FaHeart } from "react-icons/fa6";

interface IHomeSwiperProps {
  data: Item[];
  listOverView: any;
}
const HomeSwiper: React.FC<IHomeSwiperProps> = ({ data, listOverView }) => {
  const router = useRouter();
  const swiper1Ref = useRef<any>(null);
  const swiper2Ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { width } = useWindowDimensions();

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
          {data?.slice(0, 4).map((m, index) => (
            <SwiperSlide key={m._id} className={`${width < 768 && "pt-16"}`}>
              <motion.div
                onClick={() => router.push("/movie/" + m.slug)}
                className="w-full z-10"
                initial={{
                  scale: 1.1,
                }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.1 }}
                transition={{ duration: 1 }}
                key={currentIndex}
              >
                <Link href={`${"/movie/" + m._id}#top`} prefetch={false}>
                  <Image
                    src={m.thumb_url}
                    alt="film"
                    className="w-full object-center md:h-[90vh]"
                    width={1920}
                    height={1080}
                    priority
                    quality={50}
                  />
                </Link>
                <ShadowImg />
                <div className="absolute left-0 bottom-0 right-0 top-0 ">
                  <div className="w-2/3 h-full bg-gradient-to-r from-[var(--color-base-100)] to-transparent"></div>
                </div>
              </motion.div>
              <motion.div className="absolute bottom-0 md:top-0 flex flex-col md:justify-around lg:px-0 md:flex-row w-full px-8 justify-center xl:-mt-20">
                <div
                  className={`${
                    currentIndex === index ? "opacity-100" : "opacity-0"
                  } w-full flex flex-col px-12 self-center`}
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
                        className="lg:text-[3rem] md:text-[2rem]  text-base-content font-bold py-1 text-center md:text-left hover:text-primary"
                      >
                        {m.name}
                      </Link>
                      <p className="pb-4 text-primary">{m.origin_name}</p>
                    </motion.div>
                    <div className="md:flex items-center mb-6 hidden gap-x-2">
                      <p className="badge badge-outline badge-primary">
                        <span className="text-primary"> TMDB </span>
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
                    <div className="md:flex gap-2 flex-wrap my-1">
                      {m?.category?.map((cat) => (
                        <div key={cat.id} className="badge  badge-neutral">
                          {cat.name}
                        </div>
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
                      className="flex flex-row gap-x-8 items-center"
                    >
                      <Link href={`/watch/${m.slug}`}>
                        <div
                          className={`btn btn-circle btn-primary w-20 h-20 shadow-primary/50 shadow-md hover:shadow-lg`}
                        >
                          <FaPlay size={24} />
                        </div>
                      </Link>
                      <div className="flex flex-row p-4 rounded-full border border-zinc-600 hover:border-base-content hover:border-2">
                        <div className="w-full">
                          <FaHeart size={24} className="hover:text-error" />
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <Link href={`/movie/${m.slug}`} className="w-full">
                          <FaCircleInfo
                            size={24}
                            className="hover:text-warning"
                          />
                        </Link>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                <div className={`hidden lg:block mr-12 self-center`}>
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
                      src={m.poster_url}
                      width={300}
                      height={450}
                      loading="lazy"
                      className="object-cover rounded-3xl"
                      alt="film"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </AnimatePresence>
      </Swiper>
    </Fragment>
  );
};

export default HomeSwiper;
