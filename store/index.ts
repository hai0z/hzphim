// Export all stores
export { default as usePlayerStore } from './playerStore';
export { default as useUserStore } from './userStore';
export { default as useAppStore } from './appStore';

// Export types if needed
export type { default as IPlayerState } from './playerStore';
export type { default as IUserState } from './userStore';
export type { default as IAppState } from './appStore';

// Utility functions for stores
export const clearAllStores = () => {
  // Clear localStorage for all stores
  localStorage.removeItem('hzphim-player-storage');
  localStorage.removeItem('hzphim-user-storage');
  localStorage.removeItem('hzphim-app-storage');
  
  // Reload page to reset all stores
  window.location.reload();
};

// Store initialization helper
export const initializeStores = () => {
  // This function can be called on app startup
  // to perform any necessary store initialization
  console.log('Stores initialized');
};
