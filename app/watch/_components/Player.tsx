"use client";

import React, { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { MovieDetailRespone } from "@/type/MovieDetailRespone";
import ReactPlayers from "react-player";
import { useContinueWatching } from "@/hooks/useContinueWatching";
import ContinuedModalSimple from "./ContinuedModalSimple";
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

  useEffect(() => {
    setMounted(true);
    setReloadKey((prev) => prev + 1);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4" id="player" key={reloadKey}>
      <ReactPlayer
        ref={playerRef}
        light={
          <img
            src={data.movie.thumb_url}
            alt="Thumbnail"
            width={"100%"}
            height={"90%"}
          />
        }
        url={link}
        playing={!showModal}
        controls={true}
        width={"100%"}
        height={"90%"}
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
        onError={(e) => {
          console.log(e.message);
        }}
        onReady={checkContinueWatching}
        onPlay={() => {
          document.getElementById("player")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }}
      />
      <ContinuedModalSimple
        onContinue={handleContinue}
        onStartFromBeginning={handleStartFromBeginning}
        visible={showModal}
        data={continueData!}
        onClose={handleCloseModal}
      />
    </div>
  );
}
