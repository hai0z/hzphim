"use client";

import React, { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { usePlayer } from "@/hooks/useStores";
import { MovieDetailRespone } from "@/type/MovieDetailRespone";
import ReactPlayers from "react-player";
import { ContinueWatching } from "@/store/playerStore";
import ContinuedModal from "./ContinuedModal";
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

  const { addContinueWatching, continueWatching } = usePlayer();

  const [isContinuedModalOpen, setIsContinuedModalOpen] = useState(false);

  const [continueWatchingData, setContinueWatchingData] =
    useState<ContinueWatching>({} as ContinueWatching);

  const [shouldPlay, setShouldPlay] = useState(true);

  useEffect(() => {
    setMounted(true);
    setReloadKey((prev) => prev + 1);
  }, []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4" id="player" key={reloadKey}>
      <ReactPlayer
        ref={playerRef}
        light={<img src={data.movie.thumb_url} alt="Thumbnail" />}
        url={link}
        playing={shouldPlay}
        controls={true}
        width={"100%"}
        height={"90%"}
        onProgress={(e) => {
          if (
            Math.floor(e.playedSeconds) > 5 &&
            Math.floor(e.playedSeconds) % 5 === 0
          ) {
            addContinueWatching(data, {
              timestamp: Math.floor(e.playedSeconds),
              duration: Number(data.movie.time.split(" ")[0]) * 60,
              ep: ep,
              ver: ver,
            });
          }
        }}
        onSeek={(e) => {
          addContinueWatching(data, {
            timestamp: Math.floor(e),
            duration: Number(data.movie.time.split(" ")[0]) * 60,
            ep: ep,
            ver: ver,
          });
        }}
        onError={(e) => {
          // alert("lỗi gêm rồi");
        }}
        onReady={() => {
          const movie = continueWatching.find(
            (m) => m.movie._id == data.movie._id
          );
          if (movie) {
            if (movie.ep !== ep || movie.ver !== ver) {
              return;
            }
            setShouldPlay(false);
            setContinueWatchingData(movie);
            setIsContinuedModalOpen(true);
          }
        }}
        onStart={() => {
          document.getElementById("player")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }}
        onPlay={() => {
          document.getElementById("player")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }}
      />
      <ContinuedModal
        onContinue={() => {
          setIsContinuedModalOpen(false);
          playerRef.current?.seekTo(continueWatchingData.timestamp, "seconds");
          setShouldPlay(true);
        }}
        visible={isContinuedModalOpen}
        data={continueWatchingData}
        onClose={() => {
          setIsContinuedModalOpen(false);
          setShouldPlay(true);
        }}
      />
    </div>
  );
}
