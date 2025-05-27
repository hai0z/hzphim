import { useCallback, useEffect, useState } from "react";
import { ContinueWatching } from "@/store/playerStore";
import { usePlayer } from "./useStores";
import { MovieDetailRespone } from "@/type/MovieDetailRespone";

interface UseContinueWatchingProps {
  movieData: MovieDetailRespone;
  currentEpisode: string | number;
  currentVersion: string | number;
  onSeekTo?: (time: number) => void;
}

export const useContinueWatching = ({
  movieData,
  currentEpisode,
  currentVersion,
  onSeekTo,
}: UseContinueWatchingProps) => {
  const { continueWatching, addContinueWatching, removeContinueWatching } =
    usePlayer();

  const [showModal, setShowModal] = useState(false);

  const [continueData, setContinueData] = useState<ContinueWatching | null>(
    null
  );
  const [hasChecked, setHasChecked] = useState(false);

  // Check if there's continue watching data for this movie
  const checkContinueWatching = useCallback(() => {
    if (!movieData?.movie?._id || hasChecked) return;

    const existingData = continueWatching.find(
      (item) => item.movie._id === movieData.movie._id
    );

    if (existingData) {
      // Check if it's the same episode and version
      if (
        existingData.ep === currentEpisode &&
        existingData.ver === currentVersion
      ) {
        const progressPercentage =
          (existingData.timestamp / existingData.duration) * 100;
        if (progressPercentage > 5 && progressPercentage < 90) {
          setContinueData(existingData);
          setShowModal(true);
        }
      }
    }

    setHasChecked(true);
  }, [movieData, currentEpisode, currentVersion, continueWatching, hasChecked]);

  // Save continue watching data
  const saveContinueWatching = useCallback(
    (timestamp: number, duration: number) => {
      if (!movieData?.movie) return;

      // Only save if watched more than 30 seconds and less than 90% of the movie
      const progressPercentage = (timestamp / duration) * 100;
      if (timestamp > 30 && progressPercentage < 90) {
        addContinueWatching(movieData, {
          timestamp,
          duration,
          ep: currentEpisode,
          ver: currentVersion,
        });
      }
    },
    [movieData, currentEpisode, currentVersion, addContinueWatching]
  );

  // Handle continue watching
  const handleContinue = useCallback(() => {
    if (continueData && onSeekTo) {
      onSeekTo(continueData.timestamp);
    }
    setShowModal(false);
  }, [continueData, onSeekTo]);

  // Handle start from beginning
  const handleStartFromBeginning = useCallback(() => {
    if (continueData) {
      removeContinueWatching(continueData.movie._id);
    }
    setShowModal(false);
  }, [continueData, removeContinueWatching]);

  // Handle close modal
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Reset when movie changes
  useEffect(() => {
    setHasChecked(false);
    setShowModal(false);
    setContinueData(null);
  }, [movieData?.movie?._id, currentEpisode, currentVersion]);

  return {
    showModal,
    continueData,
    checkContinueWatching,
    saveContinueWatching,
    handleContinue,
    handleStartFromBeginning,
    handleCloseModal,
  };
};

export const formatWatchTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export const getWatchProgress = (
  timestamp: number,
  duration: number
): number => {
  return duration > 0 ? (timestamp / duration) * 100 : 0;
};

export const getTimeRemaining = (
  timestamp: number,
  duration: number
): number => {
  return Math.max(0, duration - timestamp);
};

export const useContinueWatchingList = () => {
  const { continueWatching, removeContinueWatching } = usePlayer();

  const clearOldItems = useCallback(
    (daysOld: number = 30) => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      continueWatching.forEach((item) => {
        // Note: We need to add a timestamp field to ContinueWatching type
        // For now, we'll just remove items that are completed (>90%)
        const progressPercentage = getWatchProgress(
          item.timestamp,
          item.duration
        );
        if (progressPercentage >= 90) {
          removeContinueWatching(item.movie._id);
        }
      });
    },
    [continueWatching, removeContinueWatching]
  );

  const getRecentItems = useCallback(
    (limit: number = 20) => {
      return continueWatching
        .filter((item) => {
          const progressPercentage = getWatchProgress(
            item.timestamp,
            item.duration
          );
          return progressPercentage > 5 && progressPercentage < 90;
        })
        .slice(0, limit);
    },
    [continueWatching]
  );

  const removeItem = useCallback(
    (movieId: string) => {
      removeContinueWatching(movieId);
    },
    [removeContinueWatching]
  );

  return {
    items: continueWatching,
    recentItems: getRecentItems(),
    clearOldItems,
    removeItem,
  };
};
