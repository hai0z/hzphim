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

export const useApp = () => {
  const store = useAppStore();

  return {
    // State
    theme: store.theme,

    // Actions
    setTheme: store.setTheme,
  };
};
