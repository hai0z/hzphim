import { usePlayerStore, useUserStore, useAppStore } from "@/store";

// Custom hook to use all stores together
export const useStores = () => {
  const playerStore = usePlayerStore();
  const userStore = useUserStore();
  const appStore = useAppStore();

  return {
    player: playerStore,
    user: userStore,
    app: appStore,
  };
};

// Individual store hooks with commonly used selectors
export const usePlayer = () => {
  const store = usePlayerStore();

  return {
    // State
    theaterMode: store.theaterMode,
    continueWatching: store.continueWatching,
    listFavorite: store.listFavorite,

    // Actions
    setTheaterMode: store.setTheaterMode,
    removeContinueWatching: store.removeContinueWatching,
    addFavorite: store.addFavorite,
    removeFavorite: store.removeFavorite,
    addContinueWatching: store.addContinueWatching,
  };
};

export const useUser = () => {
  const store = useUserStore();

  return {
    // State
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    theme: store.theme,
    language: store.language,
    favorites: store.favorites,
    watchlist: store.watchlist,
    recentlyViewed: store.recentlyViewed,
    ratings: store.ratings,

    // Actions
    setUser: store.setUser,
    logout: store.logout,
    setTheme: store.setTheme,
    setLanguage: store.setLanguage,
    addToFavorites: store.addToFavorites,
    removeFromFavorites: store.removeFromFavorites,
    isFavorite: store.isFavorite,
    addToWatchlist: store.addToWatchlist,
    removeFromWatchlist: store.removeFromWatchlist,
    isInWatchlist: store.isInWatchlist,
    addToRecentlyViewed: store.addToRecentlyViewed,
    clearRecentlyViewed: store.clearRecentlyViewed,
    rateMovie: store.rateMovie,
    removeRating: store.removeRating,
    getUserRating: store.getUserRating,
  };
};

export const useApp = () => {
  const store = useAppStore();

  return {
    // State
    isLoading: store.isLoading,
    searchQuery: store.searchQuery,
    searchHistory: store.searchHistory,
    searchResults: store.searchResults,
    isSearching: store.isSearching,
    currentPage: store.currentPage,
    isMovieModalOpen: store.isMovieModalOpen,
    selectedMovieId: store.selectedMovieId,
    isSidebarOpen: store.isSidebarOpen,
    notifications: store.notifications,
    settings: store.settings,
    lastCacheUpdate: store.lastCacheUpdate,
    error: store.error,

    // Actions
    setLoading: store.setLoading,
    setSearchQuery: store.setSearchQuery,
    addToSearchHistory: store.addToSearchHistory,
    clearSearchHistory: store.clearSearchHistory,
    setSearchResults: store.setSearchResults,
    setSearching: store.setSearching,
    setCurrentPage: store.setCurrentPage,
    openMovieModal: store.openMovieModal,
    closeMovieModal: store.closeMovieModal,
    setSidebarOpen: store.setSidebarOpen,
    toggleSidebar: store.toggleSidebar,
    addNotification: store.addNotification,
    markNotificationAsRead: store.markNotificationAsRead,
    removeNotification: store.removeNotification,
    clearAllNotifications: store.clearAllNotifications,
    updateSettings: store.updateSettings,
    setLastCacheUpdate: store.setLastCacheUpdate,
    setError: store.setError,
    clearError: store.clearError,
  };
};

export const useUserPreferences = () => {
  const { theme, language, favorites, watchlist } = useUser();

  return {
    theme,
    language,
    favorites,
    watchlist,
  };
};

export const useNotifications = () => {
  const {
    notifications,
    addNotification,
    markNotificationAsRead,
    removeNotification,
    clearAllNotifications,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    markNotificationAsRead,
    removeNotification,
    clearAllNotifications,
  };
};
