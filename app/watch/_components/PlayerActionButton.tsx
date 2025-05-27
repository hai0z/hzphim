"use client";
import { usePlayer } from "@/hooks/useStores";
import { MovieDetailRespone } from "@/type/MovieDetailRespone";
import { Heart, Plus } from "lucide-react";
import React from "react";

interface IProps {
  data: MovieDetailRespone;
}

const PlayerActionButton = ({ data }: IProps) => {
  const { theaterMode, setTheaterMode } = usePlayer();

  const handleChangeTheaterMode = () => {
    setTheaterMode(!theaterMode);
  };

  return (
    <div
      className={` group w-full h-10 flex flex-row items-center py-8 bg-base-300 rounded-b-lg gap-x-8 px-2 ${
        theaterMode ? "bg-black" : ""
      }`}
    >
      <div
        className={`flex flex-row items-center gap-x-2 p-2 hover:bg-base-100 cursor-pointer rounded-lg ${
          theaterMode ? "invisible" : ""
        }`}
      >
        <Heart />
        Yêu thích
      </div>
      <div
        className={`flex flex-row items-center gap-x-2 p-2 hover:bg-base-100 cursor-pointer rounded-lg ${
          theaterMode ? "invisible" : ""
        }`}
      >
        <Plus />
        Thêm vào
      </div>
      <div
        onClick={handleChangeTheaterMode}
        className={`flex flex-row items-center gap-x-2 p-2 hover:bg-base-200 cursor-pointer rounded-lg ${
          theaterMode ? "opacity-0 bg-base-100" : ""
        } group-hover:opacity-100`}
      >
        <p>Rạp phim</p>
        <div
          className={`border ${
            theaterMode ? "border-primary" : "border-base-content"
          } w-8 h-6 flex justify-center items-center rounded-md `}
        >
          <span
            className={`text-xs font-bold ${theaterMode ? "text-primary" : ""}`}
          >
            {theaterMode ? "ON" : "OFF"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerActionButton;
