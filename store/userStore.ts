import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: 'vi' | 'en';
    autoplay: boolean;
    notifications: boolean;
  };
}

interface IUserState {
  // User authentication
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  
  // User preferences
  theme: 'light' | 'dark' | 'system';
  language: 'vi' | 'en';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'vi' | 'en') => void;
  
  // Favorites
  favorites: string[]; // Array of movie IDs
  addToFavorites: (movieId: string) => void;
  removeFromFavorites: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  
  // Watchlist
  watchlist: string[]; // Array of movie IDs
  addToWatchlist: (movieId: string) => void;
  removeFromWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  
  // Recently viewed
  recentlyViewed: Array<{
    movieId: string;
    viewedAt: Date;
  }>;
  addToRecentlyViewed: (movieId: string) => void;
  clearRecentlyViewed: () => void;
  
  // User ratings
  ratings: Record<string, number>; // movieId -> rating (1-5)
  rateMovie: (movieId: string, rating: number) => void;
  removeRating: (movieId: string) => void;
  getUserRating: (movieId: string) => number | null;
}

const useUserStore = create<IUserState>()(
  persist(
    (set, get) => ({
      // User authentication
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) => set({ 
        user, 
        isAuthenticated: !!user,
        theme: user?.preferences.theme || get().theme,
        language: user?.preferences.language || get().language,
      }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
      
      // User preferences
      theme: 'system',
      language: 'vi',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      
      // Favorites
      favorites: [],
      addToFavorites: (movieId: string) => {
        const { favorites } = get();
        if (!favorites.includes(movieId)) {
          set({ favorites: [...favorites, movieId] });
        }
      },
      removeFromFavorites: (movieId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(id => id !== movieId) });
      },
      isFavorite: (movieId: string) => {
        const { favorites } = get();
        return favorites.includes(movieId);
      },
      
      // Watchlist
      watchlist: [],
      addToWatchlist: (movieId: string) => {
        const { watchlist } = get();
        if (!watchlist.includes(movieId)) {
          set({ watchlist: [...watchlist, movieId] });
        }
      },
      removeFromWatchlist: (movieId: string) => {
        const { watchlist } = get();
        set({ watchlist: watchlist.filter(id => id !== movieId) });
      },
      isInWatchlist: (movieId: string) => {
        const { watchlist } = get();
        return watchlist.includes(movieId);
      },
      
      // Recently viewed
      recentlyViewed: [],
      addToRecentlyViewed: (movieId: string) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter(item => item.movieId !== movieId);
        const newRecentlyViewed = [
          { movieId, viewedAt: new Date() },
          ...filtered
        ].slice(0, 50); // Keep only last 50 items
        set({ recentlyViewed: newRecentlyViewed });
      },
      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
      
      // User ratings
      ratings: {},
      rateMovie: (movieId: string, rating: number) => {
        const { ratings } = get();
        set({
          ratings: {
            ...ratings,
            [movieId]: Math.max(1, Math.min(5, rating))
          }
        });
      },
      removeRating: (movieId: string) => {
        const { ratings } = get();
        const newRatings = { ...ratings };
        delete newRatings[movieId];
        set({ ratings: newRatings });
      },
      getUserRating: (movieId: string) => {
        const { ratings } = get();
        return ratings[movieId] || null;
      },
    }),
    {
      name: 'hzphim-user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        language: state.language,
        favorites: state.favorites,
        watchlist: state.watchlist,
        recentlyViewed: state.recentlyViewed,
        ratings: state.ratings,
      }),
    }
  )
);

export default useUserStore;
