import { MovieDetailRespone } from "@/type/MovieDetailRespone";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ContinueWatching = MovieDetailRespone & {
  timestamp: number;
  duration: number;
  ep: string | number;
  ver: string | number;
};

interface IPlayerState {
  theaterMode: boolean;
  setTheaterMode: (mode: boolean) => void;

  continueWatching: Array<ContinueWatching>;

  removeContinueWatching: (movieId: string) => void;

  addContinueWatching: (
    movie: MovieDetailRespone,
    data: {
      timestamp: number;
      duration: number;
      ep: string | number;
      ver: string | number;
    }
  ) => void;

  listFavorite: Array<MovieDetailRespone>;
  addFavorite: (movie: MovieDetailRespone) => void;
  removeFavorite: (movieId: string) => void;
}

const usePlayerStore = create<IPlayerState>()(
  persist(
    (set, get) => ({
      // Theater mode
      theaterMode: false,
      setTheaterMode: (mode: boolean) => set({ theaterMode: mode }),

      // Continue watching
      continueWatching: [] as ContinueWatching[],
      addContinueWatching: (movie: MovieDetailRespone, data) => {
        const { continueWatching } = get();
        if (!continueWatching.find((m) => m.movie._id === movie.movie._id)) {
          set({
            continueWatching: [{ ...movie, ...data }, ...continueWatching],
          });
        } else {
          set({
            continueWatching: continueWatching.map((m) => {
              if (m.movie._id === movie.movie._id) {
                return { ...m, ...data };
              }
              return m;
            }),
          });
        }
      },

      removeContinueWatching: (movieId: string) => {
        const { continueWatching } = get();
        const newContinueWatching = continueWatching.filter(
          (m) => m.movie._id !== movieId
        );
        set({ continueWatching: newContinueWatching });
      },
      listFavorite: [],
      addFavorite: (movie: MovieDetailRespone) => {
        const { listFavorite } = get();
        if (!listFavorite.find((m) => m.movie._id === movie.movie._id)) {
          set({ listFavorite: [...listFavorite, movie] });
        }
      },
      removeFavorite: (movieId: string) => {
        const { listFavorite } = get();
        const newListFavorite = listFavorite.filter(
          (m) => m.movie._id !== movieId
        );
        set({ listFavorite: newListFavorite });
      },
    }),
    {
      name: "hzphim-player-storage", // unique name for localStorage key
      partialize: (state) => ({
        theaterMode: state.theaterMode,
        continueWatching: state.continueWatching,
      }),
    }
  )
);

export default usePlayerStore;
