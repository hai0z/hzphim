"use client";
import { ContinueWatching } from "@/store/playerStore";
import React, { useEffect, useState } from "react";
import { Play, RotateCcw, Clock } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  visible: boolean;
  data: ContinueWatching;
  onClose: () => void;
  onContinue: () => void;
  onStartFromBeginning?: () => void;
}

const ContinuedModalSimple = ({
  visible,
  data,
  onClose,
  onContinue,
  onStartFromBeginning,
}: Props) => {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    if (visible && data.movie) {
      setCountdown(8);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onContinue();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [visible, data?.movie, onContinue]);

  // Format time helper
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage =
    data?.duration > 0 ? (data?.timestamp / data?.duration) * 100 : 0;

  if (!visible || !data.movie) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-base-100  rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <Image
                src={data.movie.thumb_url}
                alt={data.movie.name}
                width={400}
                height={200}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              {/* Countdown Circle */}
              <div className="absolute top-4 right-4">
                <div className="relative w-12 h-12">
                  <svg
                    className="w-12 h-12 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                    />
                    <motion.path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "100, 100" }}
                      animate={{
                        strokeDasharray: `${(countdown / 8) * 100}, 100`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className=" font-bold text-sm">{countdown}</span>
                  </div>
                </div>
              </div>

              {/* Movie Title */}
              <div className="absolute bottom-4 left-4 right-16">
                <h3 className=" font-bold text-lg line-clamp-1">
                  {data.movie.name}
                </h3>
                <p className="text-sm">
                  {data.movie.type === "single" ? "Phim lẻ" : `Tập ${data.ep}`}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Progress Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 ">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      Đã xem {formatTime(data.timestamp)}
                    </span>
                  </div>
                  <span className="text-sm">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-base-content rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-primary h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="text-center mb-6">
                <p className="-gray-300 text-sm">
                  Bạn muốn tiếp tục xem từ phút thứ{" "}
                  <strong>{formatTime(data.timestamp)}</strong>?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onStartFromBeginning || onClose}
                  className="btn btn-neutral flex-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Xem từ đầu
                </button>

                <button
                  onClick={onContinue}
                  className="btn btn-primary flex-1 relative"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Tiếp tục ({countdown}s)
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContinuedModalSimple;
