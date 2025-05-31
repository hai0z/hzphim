"use client";

import React, { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { MovieDetailRespone } from "@/type/MovieDetailRespone";
import ReactPlayers from "react-player";
import { useContinueWatching } from "@/hooks/useContinueWatching";
import ContinuedModalSimple from "./ContinuedModalSimple";
import Image from "next/image";
import { AlertTriangle, Monitor, X, RefreshCw } from "lucide-react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
interface IProps {
  link: string;
  data: MovieDetailRespone;
  ver: string | number;
  ep: string | number;
}

export default function Player({ link, data, ep, ver }: IProps) {
  const [mounted, setMounted] = useState(false);

  const [reloadKey, setReloadKey] = useState(0);

  const playerRef = useRef<ReactPlayers>(null);

  const [showErrorModal, setShowErrorModal] = useState(false);

  const [switchToEmbed, setSwitchToEmbed] = useState(false);

  const {
    checkContinueWatching,
    saveContinueWatching,
    handleContinue,
    handleCloseModal,
    handleStartFromBeginning,
    showModal,
    continueData,
  } = useContinueWatching({
    movieData: data,
    currentEpisode: ep,
    currentVersion: ver,
    onSeekTo: (time) => {
      playerRef.current?.seekTo(time, "seconds");
    },
  });

  const handleSwitchToEmbed = () => {
    setSwitchToEmbed(true);
    setShowErrorModal(false);
  };

  const handleRetry = () => {
    setShowErrorModal(false);
    setReloadKey((prev) => prev + 1);
  };

  const handlePlayerError = (e: any) => {
    console.log("Player error:", e);
    if (e.code !== 20) setShowErrorModal(true);
  };

  useEffect(() => {
    setMounted(true);
    setReloadKey((prev) => prev + 1);
  }, []);

  // Reset error state when link changes
  useEffect(() => {
    setShowErrorModal(false);
    setSwitchToEmbed(false);
  }, [link, ep, ver]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4" id="player" key={reloadKey}>
      {!switchToEmbed ? (
        // ReactPlayer
        <ReactPlayer
          ref={playerRef}
          light={
            <Image
              src={data.movie.thumb_url}
              alt="Thumbnail"
              width={1024}
              height={720}
              quality={25}
            />
          }
          url={link}
          playing={!showModal}
          controls={true}
          width={"100%"}
          height={"90%"}
          style={{ aspectRatio: "16/9" }}
          onProgress={(e) => {
            if (
              Math.floor(e.playedSeconds) > 5 &&
              Math.floor(e.playedSeconds) % 5 === 0
            ) {
              saveContinueWatching(
                Math.floor(e.playedSeconds),
                Number(data.movie.time.split(" ")[0]) * 60
              );
            }
          }}
          onSeek={(e) => {
            saveContinueWatching(
              Math.floor(e),
              Number(data.movie.time.split(" ")[0]) * 60
            );
          }}
          onError={(e) => handlePlayerError(e)}
          onReady={checkContinueWatching}
          onPlay={() => {
            document.getElementById("player")?.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          }}
        />
      ) : (
        // Embed Player
        <div className="aspect-video">
          <iframe
            src={data.episodes[+ver].server_data[+ep - 1].link_embed}
            title="Player"
            width="100%"
            height="100%"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}

      {/* Continue Watching Modal */}
      <ContinuedModalSimple
        onContinue={handleContinue}
        onStartFromBeginning={handleStartFromBeginning}
        visible={showModal}
        data={continueData!}
        onClose={handleCloseModal}
      />

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-error/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-error" />
              </div>
              <h3 className="font-bold text-lg">Lỗi phát video</h3>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <p className="text-base-content/70">
                Không thể phát video từ nguồn hiện tại. Bạn có thể thử:
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Chuyển sang trình phát nhúng (embed)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Thử lại với trình phát hiện tại</span>
                </div>
              </div>

              <div className="alert alert-info">
                <Monitor className="w-4 h-4" />
                <span className="text-sm">
                  Trình phát nhúng có thể hoạt động tốt hơn với một số nguồn
                  video.
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button
                onClick={() => setShowErrorModal(false)}
                className="btn btn-outline gap-2"
              >
                <X className="w-4 h-4" />
                Đóng
              </button>
              <button onClick={handleRetry} className="btn btn-outline gap-2">
                <RefreshCw className="w-4 h-4" />
                Thử lại
              </button>
              <button
                onClick={handleSwitchToEmbed}
                className="btn btn-primary gap-2"
              >
                <Monitor className="w-4 h-4" />
                Chuyển sang Embed
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowErrorModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
}
