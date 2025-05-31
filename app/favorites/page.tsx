"use client";
import { usePlayerStore } from "@/store";
import React, { useState } from "react";

import MovieCardEnhanced from "@/components/MovieCard/MovieCardEnhanced";
import { Heart, Search, Trash2, AlertTriangle, X } from "lucide-react";

const FavoritesPage = () => {
  const favorites = usePlayerStore((state) => state.listFavorite);
  const removeFavorite = usePlayerStore((state) => state.removeFavorite);
  const [showClearModal, setShowClearModal] = useState(false);

  const handleRemoveFromFavorites = (movieId: string) => {
    removeFavorite(movieId);
  };

  const handleClearAll = () => {
    setShowClearModal(true);
  };

  const confirmClearAll = () => {
    favorites.forEach((movie) => {
      removeFavorite(movie._id);
    });
    setShowClearModal(false);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-base-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-base-200 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-base-content/30" />
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-4">
              Chưa có phim yêu thích
            </h1>
            <p className="text-base-content/70 mb-8">
              Hãy thêm những bộ phim bạn yêu thích để xem lại sau nhé!
            </p>
            <a href="/" className="btn btn-primary gap-2">
              <Search className="w-4 h-4" />
              Khám phá phim
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-base-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                Phim yêu thích
              </h1>
              <p className="text-base-content/70">{favorites.length} bộ phim</p>
            </div>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="btn btn-outline btn-error btn-sm gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Xóa tất cả
            </button>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
          {favorites.map((movie, index) => (
            <MovieCardEnhanced
              key={movie._id}
              m={movie}
              index={index}
              variant="grid"
              showActions={true}
              showRating={true}
              showInfo={true}
              onAddToFavorites={() => handleRemoveFromFavorites(movie._id)}
            />
          ))}
        </div>

        {/* Clear All Modal */}
        {showClearModal && (
          <div className="modal modal-open">
            <div className="modal-box modal-middle">
              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-error/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-error" />
                </div>
                <h3 className="font-bold text-lg">Xác nhận xóa tất cả</h3>
              </div>

              {/* Modal Content */}
              <p className="text-base-content/70 mb-6">
                Bạn có chắc chắn muốn xóa tất cả{" "}
                <span className="font-semibold text-primary">
                  {favorites.length} bộ phim
                </span>{" "}
                khỏi danh sách yêu thích không? Hành động này không thể hoàn
                tác.
              </p>

              {/* Modal Actions */}
              <div className="modal-action">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="btn btn-outline gap-2"
                >
                  <X className="w-4 h-4" />
                  Hủy
                </button>
                <button
                  onClick={confirmClearAll}
                  className="btn btn-error gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa tất cả
                </button>
              </div>
            </div>
            <div
              className="modal-backdrop"
              onClick={() => setShowClearModal(false)}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
