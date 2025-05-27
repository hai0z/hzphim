"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WatchedMoviesSwiper, WatchHistorySwiper } from "@/components/Swiper";
import { Eye, Clock, TrendingUp, Star } from "lucide-react";

const WatchHistoryDemo = () => {
  const [activeTab, setActiveTab] = useState<"simple" | "advanced">("simple");

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-base-content mb-4"
          >
            🎬 Lịch sử xem phim
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base-content/70 text-lg max-w-2xl mx-auto"
          >
            Quản lý và theo dõi các phim bạn đã xem với giao diện đẹp mắt và
            tính năng thông minh
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="tabs tabs-boxed bg-base-200">
            <button
              onClick={() => setActiveTab("simple")}
              className={`tab ${activeTab === "simple" ? "tab-active" : ""}`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Swiper đơn giản
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`tab ${activeTab === "advanced" ? "tab-active" : ""}`}
            >
              <Star className="w-4 h-4 mr-2" />
              Swiper nâng cao
            </button>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "simple" ? (
            <div className="space-y-12">
              {/* Simple Swiper */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Swiper cơ bản
                  </h2>
                  <p className="text-base-content/60">
                    Hiển thị danh sách phim đã xem với progress bar và thông tin
                    cơ bản
                  </p>
                </div>
                <WatchedMoviesSwiper
                  title="Tiếp tục xem"
                  href="/history"
                  maxItems={10}
                />
              </section>

              {/* Features */}
              <section className="bg-base-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-center">
                  Tính năng của Swiper cơ bản
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-base-100 p-4 rounded-lg">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Progress Bar</h4>
                    <p className="text-sm text-base-content/70">
                      Hiển thị tiến độ xem phim với thanh progress đẹp mắt
                    </p>
                  </div>

                  <div className="bg-base-100 p-4 rounded-lg">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-3">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <h4 className="font-semibold mb-2">Thời gian xem</h4>
                    <p className="text-sm text-base-content/70">
                      Hiển thị thời gian đã xem và thời gian còn lại
                    </p>
                  </div>

                  <div className="bg-base-100 p-4 rounded-lg">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-3">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-semibold mb-2">Responsive</h4>
                    <p className="text-sm text-base-content/70">
                      Tự động điều chỉnh số lượng slide theo kích thước màn hình
                    </p>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Advanced Swiper */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                    <Star className="w-6 h-6 text-primary" />
                    Swiper nâng cao
                  </h2>
                  <p className="text-base-content/60">
                    Swiper với nhiều tính năng: filter, view modes, autoplay,
                    effects
                  </p>
                </div>
                <WatchHistorySwiper
                  title="Lịch sử xem nâng cao"
                  href="/history"
                  showControls={true}
                  autoplay={false}
                  effect="coverflow"
                  showFilters={true}
                  maxItems={15}
                />
              </section>

              {/* Advanced Features */}
              <section className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-center">
                  Tính năng nâng cao
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      Tính năng chính
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Filter theo loại phim (phim lẻ, phim bộ, gần đây)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        Chuyển đổi giữa Swiper và Grid view
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        Autoplay với điều khiển play/pause
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-info rounded-full"></div>
                        Effect Coverflow cho giao diện đẹp mắt
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                      Trải nghiệm người dùng
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        Animation mượt mà với Framer Motion
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        Hover effects và interactive elements
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-error rounded-full"></div>
                        Custom navigation buttons
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-neutral rounded-full"></div>
                        Responsive design cho mọi thiết bị
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Code Example */}
              <section className="bg-base-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Cách sử dụng</h3>
                <div className="mockup-code">
                  <pre data-prefix="$">
                    <code>npm install swiper framer-motion</code>
                  </pre>
                  <pre data-prefix=">" className="text-warning">
                    <code>Installing...</code>
                  </pre>
                  <pre data-prefix=">" className="text-success">
                    <code>Done!</code>
                  </pre>
                </div>
                <div className="mt-4 bg-base-100 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto">
                    {`import { WatchHistorySwiper } from '@/components/Swiper';

<WatchHistorySwiper 
  title="Lịch sử xem phim"
  href="/history"
  showControls={true}
  autoplay={true}
  effect="coverflow"
  showFilters={true}
  maxItems={20}
/>`}
                  </pre>
                </div>
              </section>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WatchHistoryDemo;
