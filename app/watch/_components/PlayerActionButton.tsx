"use client";
import { usePlayer } from "@/hooks/useStores";
import { usePlayerStore } from "@/store";
import { MovieDetailRespone } from "@/type/MovieDetailRespone";
import { Heart, Plus, X } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

interface IProps {
  data: MovieDetailRespone;
}

const PlayerActionButton = ({ data }: IProps) => {
  const { theaterMode, setTheaterMode } = usePlayer();

  const { listFavorite, addFavorite, removeFavorite } = usePlayerStore();

  const isFavorite = listFavorite.some((item) => item._id == data.movie._id);

  const handleChangeTheaterMode = () => {
    setTheaterMode(!theaterMode);
  };
  const handleAddToFavorites = () => {
    if (isFavorite) {
      removeFavorite(data.movie._id);
      toast.success("Đã xóa khỏi danh sách yêu thích", {
        autoClose: 1000,
      });
    } else {
      addFavorite(data.movie);
      toast.success("Đã thêm vào danh sách yêu thích", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div
      className={` group h-10 flex flex-row items-center py-8 bg-base-300 md:rounded-b-2xl gap-x-8 px-2 ${
        theaterMode ? "bg-black" : ""
      }`}
    >
      <div
        onClick={handleAddToFavorites}
        className={`flex flex-row items-center gap-x-2 p-2 hover:bg-base-100 cursor-pointer rounded-lg  ${
          theaterMode ? "invisible!" : ""
        }`}
      >
        {isFavorite ? (
          <X className={`w-5 h-5 text-error ${theaterMode ? "hidden!" : ""}`} />
        ) : (
          <Heart className={`w-5 h-5    ${theaterMode ? "hidden!" : ""}`} />
        )}
        <span className={`hidden md:block ${theaterMode ? "hidden!" : ""}`}>
          {isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
        </span>
      </div>

      <div
        onClick={handleChangeTheaterMode}
        className={`  hidden md:flex flex-row items-center gap-x-2 p-2 hover:bg-base-200 cursor-pointer rounded-lg ${
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
