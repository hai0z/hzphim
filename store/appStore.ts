import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchHistory {
  query: string;
  searchedAt: Date;
}

interface IAppState {
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Search functionality
  searchQuery: string;
  searchHistory: SearchHistory[];
  searchResults: any[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  setSearchResults: (results: any[]) => void;
  setSearching: (searching: boolean) => void;
  
  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;
  
  // Modal states
  isMovieModalOpen: boolean;
  selectedMovieId: string | null;
  openMovieModal: (movieId: string) => void;
  closeMovieModal: () => void;
  
  // Sidebar
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    createdAt: Date;
    read: boolean;
  }>;
  addNotification: (notification: {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }) => void;
  markNotificationAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  
  // App settings
  settings: {
    enableNotifications: boolean;
    enableSounds: boolean;
    autoplayTrailers: boolean;
    showSpoilers: boolean;
    dataUsageMode: 'low' | 'medium' | 'high';
  };
  updateSettings: (settings: Partial<IAppState['settings']>) => void;
  
  // Cache management
  lastCacheUpdate: Date | null;
  setLastCacheUpdate: (date: Date) => void;
  
  // Error handling
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const useAppStore = create<IAppState>()(
  persist(
    (set, get) => ({
      // Loading states
      isLoading: false,
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      // Search functionality
      searchQuery: '',
      searchHistory: [],
      searchResults: [],
      isSearching: false,
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      addToSearchHistory: (query: string) => {
        if (!query.trim()) return;
        
        const { searchHistory } = get();
        const filtered = searchHistory.filter(item => item.query !== query);
        const newHistory = [
          { query, searchedAt: new Date() },
          ...filtered
        ].slice(0, 20); // Keep only last 20 searches
        set({ searchHistory: newHistory });
      },
      clearSearchHistory: () => set({ searchHistory: [] }),
      setSearchResults: (results: any[]) => set({ searchResults: results }),
      setSearching: (searching: boolean) => set({ isSearching: searching }),
      
      // Navigation
      currentPage: 'home',
      setCurrentPage: (page: string) => set({ currentPage: page }),
      
      // Modal states
      isMovieModalOpen: false,
      selectedMovieId: null,
      openMovieModal: (movieId: string) => set({ 
        isMovieModalOpen: true, 
        selectedMovieId: movieId 
      }),
      closeMovieModal: () => set({ 
        isMovieModalOpen: false, 
        selectedMovieId: null 
      }),
      
      // Sidebar
      isSidebarOpen: false,
      setSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
      toggleSidebar: () => {
        const { isSidebarOpen } = get();
        set({ isSidebarOpen: !isSidebarOpen });
      },
      
      // Notifications
      notifications: [],
      addNotification: (notification) => {
        const { notifications } = get();
        const newNotification = {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date(),
          read: false,
        };
        set({ 
          notifications: [newNotification, ...notifications].slice(0, 50) 
        });
      },
      markNotificationAsRead: (id: string) => {
        const { notifications } = get();
        set({
          notifications: notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
          )
        });
      },
      removeNotification: (id: string) => {
        const { notifications } = get();
        set({
          notifications: notifications.filter(notif => notif.id !== id)
        });
      },
      clearAllNotifications: () => set({ notifications: [] }),
      
      // App settings
      settings: {
        enableNotifications: true,
        enableSounds: true,
        autoplayTrailers: false,
        showSpoilers: false,
        dataUsageMode: 'medium',
      },
      updateSettings: (newSettings) => {
        const { settings } = get();
        set({ settings: { ...settings, ...newSettings } });
      },
      
      // Cache management
      lastCacheUpdate: null,
      setLastCacheUpdate: (date: Date) => set({ lastCacheUpdate: date }),
      
      // Error handling
      error: null,
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'hzphim-app-storage',
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        settings: state.settings,
        lastCacheUpdate: state.lastCacheUpdate,
        // Don't persist loading states, modals, errors, etc.
      }),
    }
  )
);

export default useAppStore;
