"use client";
import { ContinueWatching } from "@/store/playerStore";
import React, { useEffect, useState } from "react";
import { Play, X, Clock, Film, RotateCcw, Zap } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "./continueWatching.css";

interface Props {
  visible: boolean;
  data: ContinueWatching;
  onClose: () => void;
  onContinue: () => void;
  onStartFromBeginning?: () => void;
}

const ContinuedModal = ({
  visible,
  data,
  onClose,
  onContinue,
  onStartFromBeginning,
}: Props) => {
  const [countdown, setCountdown] = useState(10);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    if (visible && data.movie) {
      setCountdown(10);
      setIsCountdownActive(true);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCountdownActive(false);
            onContinue();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        setIsCountdownActive(false);
      };
    }
  }, [visible, data.movie, onContinue]);

  // Helper function to format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage =
    data.duration > 0 ? (data.timestamp / data.duration) * 100 : 0;

  const getEpisodeInfo = () => {
    if (data.movie?.type === "single") {
      return "Phim lẻ";
    }
    return `Tập ${data.ep}`;
  };

  const getQualityColor = () => {
    const quality = data.movie?.quality?.toLowerCase();
    if (quality?.includes("4k") || quality?.includes("2160p"))
      return "badge-error";
    if (quality?.includes("1080p") || quality?.includes("fhd"))
      return "badge-warning";
    if (quality?.includes("720p") || quality?.includes("hd"))
      return "badge-info";
    return "badge-neutral";
  };

  const handleStartFromBeginning = () => {
    setIsCountdownActive(false);
    if (onStartFromBeginning) {
      onStartFromBeginning();
    } else {
      onClose();
    }
  };

  const handleContinue = () => {
    setIsCountdownActive(false);
    onContinue();
  };

  const handleClose = () => {
    setIsCountdownActive(false);
    onClose();
  };

  if (!visible || !data.movie) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal modal-open"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="modal-box max-w-lg p-0 bg-base-100 shadow-2xl border border-base-300"
          >
            <div className="flex justify-between items-center p-4 border-b border-base-300 bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-base-content">
                    Tiếp tục xem?
                  </h3>
                  {isCountdownActive && (
                    <p className="text-xs text-base-content/60">
                      Tự động tiếp tục sau {countdown}s
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isCountdownActive && (
                  <div
                    className="radial-progress text-primary text-xs"
                    style={
                      {
                        "--value": (countdown / 10) * 100,
                      } as React.CSSProperties
                    }
                  >
                    {countdown}
                  </div>
                )}
                <button
                  onClick={handleClose}
                  className="btn btn-ghost btn-sm btn-circle hover:bg-error/20 hover:text-error"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-4">
                {/* Movie poster */}
                <div className="flex-shrink-0 relative">
                  <Image
                    src={data.movie.poster_url}
                    alt={data.movie.name}
                    width={90}
                    height={135}
                    className="rounded-lg object-cover shadow-lg"
                    priority
                  />
                  <div
                    className={`badge ${getQualityColor()} badge-sm absolute -top-2 -right-2`}
                  >
                    {data.movie.quality}
                  </div>
                </div>

                {/* Movie details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg text-base-content line-clamp-2">
                    {data.movie.name}
                  </h4>
                  <p className="text-sm text-base-content/70 mt-1 line-clamp-1">
                    {data.movie.origin_name}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="badge badge-outline badge-sm">
                      <Film className="w-3 h-3 mr-1" />
                      {getEpisodeInfo()}
                    </div>
                    <div className="badge badge-outline badge-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {data.movie.time}
                    </div>
                    <div className="badge badge-outline badge-sm">
                      {data.movie.year}
                    </div>
                  </div>

                  <div className="mt-3 p-2 bg-base-200 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-base-content/80">
                        Thời gian xem:
                      </span>
                      <span className="font-medium text-primary">
                        {formatTime(data.timestamp)} /{" "}
                        {formatTime(data.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress section */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-base-content/70 mb-2">
                  <span>Tiến độ xem</span>
                  <span>{Math.round(progressPercentage)}% hoàn thành</span>
                </div>

                <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-primary h-3 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>

                <div className="flex justify-between text-xs text-base-content/60 mt-1">
                  <span>Đã xem</span>
                  <span>
                    Còn lại {formatTime(data.duration - data.timestamp)}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6 p-4 bg-gradient-to-r from-info/10 to-success/10 rounded-lg border border-info/20">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-base-content font-medium">
                      Bạn đã dừng lại ở phút thứ {formatTime(data.timestamp)}
                    </p>
                    <p className="text-xs text-base-content/70 mt-1">
                      Chọn "Tiếp tục xem" để xem từ vị trí này hoặc "Xem từ đầu"
                      để bắt đầu lại.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={handleStartFromBeginning}
                className="btn btn-outline flex-1 group"
              >
                <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Xem từ đầu
              </button>
              <button
                onClick={handleContinue}
                className="btn btn-primary flex-1 group relative overflow-hidden"
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Tiếp tục xem
                {isCountdownActive && (
                  <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
                )}
              </button>
            </div>
          </motion.div>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContinuedModal;
