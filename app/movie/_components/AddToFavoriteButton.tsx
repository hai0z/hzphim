"use client";
import { usePlayerStore } from "@/store";
import { Item } from "@/type/ListMovieRespone";
import { X } from "lucide-react";
import React from "react";
import { BiHeart } from "react-icons/bi";
import { toast } from "react-toastify";

interface IProps {
  movie: Item;
}

const AddToFavoriteButton = ({ movie }: IProps) => {
  const { addFavorite, removeFavorite } = usePlayerStore();
  const listFavorite = usePlayerStore((state) => state.listFavorite);
  const isFavorite = listFavorite.some((item) => item._id == movie._id);

  const handleAddToFavorites = () => {
    if (isFavorite) {
      removeFavorite(movie._id);
      toast.success("Đã xóa khỏi danh sách yêu thích", {
        autoClose: 1000,
      });
    } else {
      addFavorite(movie);
      toast.success("Đã thêm vào danh sách yêu thích", {
        autoClose: 1000,
      });
    }
  };
  return (
    <div
      className="btn btn-outline btn-sm sm:btn-md lg:btn-lg gap-2 sm:gap-3 shadow-2xl hover:shadow-primary/50 transition-all duration-300 w-full sm:w-auto"
      onClick={handleAddToFavorites}
    >
      {isFavorite ? (
        <X className="w-6 h-6 fill-current text-error" />
      ) : (
        <BiHeart className="w-6 h-6 fill-current text-error" />
      )}
      {isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
    </div>
  );
};

export default AddToFavoriteButton;
