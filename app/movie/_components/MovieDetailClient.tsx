"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Users,
  Camera,
  Film,
  Star,
  Calendar,
  Globe,
  Eye,
  Grid3X3,
  List,
} from "lucide-react";
import ListEpisodes from "@/components/Shared/ListEpisodes";
import tmdb from "@/service/TMDB";

interface MovieDetailClientProps {
  movie: any;
  data: any;
  crew: any;
  photos: any;
  slug: string;
}

type TabType = "episodes" | "photos" | "cast" | "info";

const MovieDetailClient: React.FC<MovieDetailClientProps> = ({
  movie,
  data,
  crew,
  photos,
  slug,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("episodes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const tabs = [
    {
      id: "episodes",
      label: "Tập phim",
      icon: Film,
      count: data.episodes?.length,
    },
    {
      id: "photos",
      label: "Hình ảnh",
      icon: Camera,
      count: photos.backdrops?.length + photos.posters?.length,
    },
    { id: "cast", label: "Diễn viên", icon: Users, count: crew.cast?.length },
    { id: "info", label: "Thông tin", icon: Eye, count: null },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 text-center"
        >
          <Star className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">
            {movie.tmdb?.vote_average?.toFixed(1) || "N/A"}
          </div>
          <div className="text-sm text-base-content/60">Đánh giá</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl p-6 text-center"
        >
          <Calendar className="w-8 h-8 text-secondary mx-auto mb-2" />
          <div className="text-2xl font-bold text-secondary">{movie.year}</div>
          <div className="text-sm text-base-content/60">Năm sản xuất</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl p-6 text-center"
        >
          <Film className="w-8 h-8 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-accent">{movie.quality}</div>
          <div className="text-sm text-base-content/60">Chất lượng</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-info/20 to-info/5 rounded-2xl p-6 text-center"
        >
          <Globe className="w-8 h-8 text-info mx-auto mb-2" />
          <div className="text-2xl font-bold text-info">
            {movie.country?.[0]?.name || "N/A"}
          </div>
          <div className="text-sm text-base-content/60">Quốc gia</div>
        </motion.div>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`btn btn-lg gap-3 transition-all duration-300 ${
                activeTab === tab.id
                  ? "btn-primary shadow-lg shadow-primary/30"
                  : "btn-ghost hover:btn-outline"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              {tab.count && <div className="badge badge-sm">{tab.count}</div>}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        {(activeTab === "photos" || activeTab === "cast") && (
          <div className="flex justify-end mb-4">
            <div className="join">
              <button
                onClick={() => setViewMode("grid")}
                className={`btn join-item btn-sm ${
                  viewMode === "grid" ? "btn-primary" : "btn-outline"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`btn join-item btn-sm ${
                  viewMode === "list" ? "btn-primary" : "btn-outline"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {activeTab === "episodes" && (
            <div className="space-y-6">
              {data.movie.type === "single" ? (
                <div>
                  <p className="pb-6 text-2xl font-semibold">Các bản chiếu</p>
                  <div className="relative w-96 h-48 flex flex-row justify-between hover:-translate-y-2 transition-transform duration-150 rounded-xl">
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
                              Xem bản này
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
              ) : (
                <ListEpisodes episodes={data.episodes} slug={slug} />
              )}
            </div>
          )}

          {activeTab === "photos" && (
            <div className="space-y-8">
              {photos.backdrops && photos.backdrops.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Camera className="w-6 h-6 text-primary" />
                    Hình nền ({photos.backdrops.length})
                  </h3>
                  <div
                    className={`grid gap-4 ${
                      viewMode === "grid"
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {photos.backdrops
                      .slice(0, 12)
                      .map((photo: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                          <Image
                            src={tmdb.getImage(photo.file_path)}
                            alt="Backdrop"
                            width={500}
                            height={281}
                            className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}

              {photos.posters && photos.posters.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Film className="w-6 h-6 text-secondary" />
                    Poster ({photos.posters.length})
                  </h3>
                  <div
                    className={`grid gap-4 ${
                      viewMode === "grid"
                        ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
                        : "grid-cols-2 md:grid-cols-3"
                    }`}
                  >
                    {photos.posters
                      .slice(0, 12)
                      .map((photo: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                          <Image
                            src={tmdb.getImage(photo.file_path)}
                            alt="Poster"
                            width={300}
                            height={450}
                            className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                          />
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "cast" && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-accent" />
                Diễn viên ({crew.cast?.length || 0})
              </h3>
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    : "grid-cols-1 md:grid-cols-2"
                }`}
              >
                {crew.cast?.map((cast: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-base-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={tmdb.getImage(cast.profile_path)}
                        alt={cast.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm line-clamp-2 mb-1">
                        {cast.name}
                      </h4>
                      <p className="text-xs text-base-content/60 line-clamp-1">
                        {cast.character}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "info" && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Movie Details */}
              <div className="space-y-6">
                <div className="bg-base-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <Film className="w-5 h-5 text-primary" />
                    Thông tin phim
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Trạng thái:</span>
                      <span className="font-medium">
                        {movie.status === "completed"
                          ? "Hoàn tất"
                          : movie.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Thời lượng:</span>
                      <span className="font-medium">{movie.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Ngôn ngữ:</span>
                      <span className="font-medium">{movie.lang}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Chất lượng:</span>
                      <span className="font-medium">{movie.quality}</span>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-base-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Thể loại</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.category?.map((cat: any) => (
                      <span
                        key={cat.id}
                        className="badge badge-primary badge-lg"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Countries */}
                <div className="bg-base-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Quốc gia</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.country?.map((country: any) => (
                      <span
                        key={country.id}
                        className="badge badge-secondary badge-lg"
                      >
                        {country.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Credits */}
              <div className="space-y-6">
                {movie.director.length > 0 && (
                  <div className="bg-base-200 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Đạo diễn</h3>
                    <p className="text-base-content/80">
                      {movie.director.join(", ")}
                    </p>
                  </div>
                )}

                {movie.actor.length > 0 && (
                  <div className="bg-base-200 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Diễn viên chính</h3>
                    <p className="text-base-content/80">
                      {movie.actor.slice(0, 5).join(", ")}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div className="bg-base-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Nội dung phim</h3>
                  <div
                    className="prose prose-sm max-w-none text-base-content/80"
                    dangerouslySetInnerHTML={{ __html: movie.content }}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MovieDetailClient;
