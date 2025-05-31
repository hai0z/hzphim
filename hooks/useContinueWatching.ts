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

  const checkContinueWatching = useCallback(() => {
    if (!movieData?.movie?._id) return;

    const existingData = continueWatching.find(
      (item) => item.movie._id === movieData.movie._id
    );

    console.log(existingData);
    if (existingData) {
      if (
        existingData.ep == currentEpisode &&
        existingData.ver == currentVersion
      ) {
        setContinueData(existingData);
        setShowModal(true);
      }
    }
  }, [movieData, currentEpisode, currentVersion, continueWatching]);

  const saveContinueWatching = useCallback(
    (timestamp: number, duration: number) => {
      if (!movieData?.movie) return;

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

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
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
    (limit: number = 999) => {
      return continueWatching
        .filter((item) => {
          const progressPercentage = getWatchProgress(
            item.timestamp,
            item.duration
          );
          return progressPercentage > 5 && progressPercentage < 90;
        })
        .sort((a, b) => {
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return dateB - dateA;
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
