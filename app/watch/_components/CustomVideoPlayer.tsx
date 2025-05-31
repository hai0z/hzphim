"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  RotateCw,
  Settings,
  Loader2,
  RefreshCw,
  Monitor,
  AlertTriangle,
  X,
} from "lucide-react";
import { useContinueWatching } from "@/hooks/useContinueWatching";
import { MovieDetailRespone } from "@/type/MovieDetailRespone";
import ContinuedModalSimple from "./ContinuedModalSimple";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface CustomVideoPlayerProps {
  link: string;
  data: MovieDetailRespone;
  ver: string | number;
  ep: string | number;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  link,
  data,
  ver,
  ep,
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const initialState = {
    playing: false,
    controls: false,
    volume: 1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    seeking: false,
    loadedSeconds: 0,
    playedSeconds: 0,
  };

  const [reloadKey, setReloadKey] = useState(0);

  const [state, setState] = useState(initialState);

  const [showControls, setShowControls] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const [showSettings, setShowSettings] = useState(false);

  const [mounted, setMounted] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorType, setErrorType] = useState<"player" | "timeout">("player");

  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [switchToEmbed, setSwitchToEmbed] = useState(false);

  const handleSwitchToEmbed = () => {
    setSwitchToEmbed(true);
    setShowErrorModal(false);
  };

  const handleRetry = () => {
    setShowErrorModal(false);
    setReloadKey((prev) => prev + 1);
  };

  const handlePlayerError = () => {
    // Clear loading timeout when error occurs
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
    setErrorType("player");
    setShowErrorModal(true);
  };

  // Reset error state when link changes
  useEffect(() => {
    setShowErrorModal(false);
    setSwitchToEmbed(false);
    // Clear loading timeout when link changes
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
  }, [link, ep, ver, loadingTimeout]);

  // Loading timeout check - show error if loadedSeconds is still 0 after 8s
  useEffect(() => {
    if (state.playing && !showErrorModal) {
      // Clear any existing timeout
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }

      // Set new timeout
      const timeout = setTimeout(() => {
        if (state.loadedSeconds === 0 && state.playing) {
          console.log("Loading timeout: loadedSeconds still 0 after 8s");
          setErrorType("timeout");
          setShowErrorModal(true);
        }
      }, 8000);

      setLoadingTimeout(timeout);

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [state.playing, state.loadedSeconds, showErrorModal, loadingTimeout]);

  // Clear timeout when video starts loading
  useEffect(() => {
    if (state.loadedSeconds > 0 && loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
  }, [state.loadedSeconds, loadingTimeout]);

  const setPlayerRef = useCallback((player: any) => {
    if (!player) return;
    playerRef.current = player;
  }, []);

  // Mount effect
  useEffect(() => {
    setMounted(true);
    setReloadKey((prev) => prev + 1);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowControls(true);
      timeout = setTimeout(() => {
        if (state.playing) setShowControls(false);
      }, 3000);
    };

    const handleMouseMove = () => resetTimeout();
    const handleMouseLeave = () => {
      clearTimeout(timeout);
      if (state.playing) setShowControls(false);
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      clearTimeout(timeout);
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
        containerRef.current.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
    };
  }, [state.playing]);

  // ReactPlayer event handlers theo pattern của example
  const handleReady = () => {
    setIsLoading(false);
    // Clear loading timeout when video is ready
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
  };

  const handleProgress = (progressState: any) => {
    if (!state.seeking) {
      setState((prevState) => ({
        ...prevState,
        played: progressState.played,
        loaded: progressState.loaded,
        playedSeconds: progressState.playedSeconds,
        loadedSeconds: progressState.loadedSeconds,
      }));
    }
  };

  const handleDuration = (duration: number) => {
    setState((prevState) => ({ ...prevState, duration }));
  };

  const handlePlay = () => {
    setState((prevState) => ({ ...prevState, playing: true }));
  };

  const handlePause = () => {
    setState((prevState) => ({ ...prevState, playing: false }));
  };

  // Control functions
  const togglePlay = () => {
    setState((prevState) => ({ ...prevState, playing: !prevState.playing }));
  };

  const skipBackward = () => {
    const newTime = Math.max(0, state.playedSeconds - 10);
    setState((prevState) => ({ ...prevState, playedSeconds: newTime }));
    playerRef.current?.seekTo(newTime, "seconds");
  };

  const skipForward = () => {
    const newTime = Math.min(state.duration, state.playedSeconds + 10);
    setState((prevState) => ({ ...prevState, playedSeconds: newTime }));
    playerRef.current?.seekTo(newTime, "seconds");
  };

  const toggleMute = () => {
    setState((prevState) => ({ ...prevState, muted: !prevState.muted }));
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      volume: parseFloat(event.target.value),
      muted: parseFloat(event.target.value) === 0,
    }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * state.duration;
      setState((prevState) => ({ ...prevState, playedSeconds: newTime }));
      playerRef.current?.seekTo(newTime, "seconds");
    }
  };

  const changePlaybackRate = (rate: number) => {
    setState((prevState) => ({ ...prevState, playbackRate: rate }));
    setShowSettings(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target !== document.body) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipBackward();
          break;
        case "ArrowRight":
          e.preventDefault();
          skipForward();
          break;
        case "ArrowUp":
          e.preventDefault();
          setState((prevState) => ({
            ...prevState,
            volume: Math.min(1, prevState.volume + 0.1),
            muted: false,
          }));
          break;
        case "ArrowDown":
          e.preventDefault();
          setState((prevState) => ({
            ...prevState,
            volume: Math.max(0, prevState.volume - 0.1),
            muted: Math.max(0, prevState.volume - 0.1) === 0,
          }));
          break;
        case "KeyM":
          e.preventDefault();
          toggleMute();
          break;
        case "KeyF":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [state.volume, state.playing, state.playedSeconds, state.duration]);

  const {
    checkContinueWatching,
    saveContinueWatching,
    handleContinue,
    handleCloseModal,
    handleStartFromBeginning,
    showModal,
    continueData,
  } = useContinueWatching({
    movieData: data,
    currentEpisode: ep,
    currentVersion: ver,
    onSeekTo: (time) => {
      playerRef.current?.seekTo(time, "seconds");
      setState((prevState) => ({ ...prevState, playing: true }));
    },
  });

  if (!mounted) return null;
  return (
    <div key={reloadKey}>
      {!switchToEmbed ? (
        <div
          ref={containerRef}
          className="relative bg-black rounded-lg overflow-hidden group aspect-video"
          onMouseEnter={() => setShowControls(true)}
        >
          {/* ReactPlayer */}
          <ReactPlayer
            key={reloadKey}
            ref={setPlayerRef}
            url={link}
            playing={state.playing}
            volume={state.muted ? 0 : state.volume}
            muted={state.muted}
            playbackRate={state.playbackRate}
            width="100%"
            height="100%"
            onDuration={handleDuration}
            onPause={handlePause}
            onBuffer={() => setIsLoading(true)}
            onBufferEnd={() => setIsLoading(false)}
            controls={false}
            onProgress={(e) => {
              handleProgress(e);
              if (
                Math.floor(e.playedSeconds) > 5 &&
                Math.floor(e.playedSeconds) % 5 === 0
              ) {
                saveContinueWatching(
                  Math.floor(e.playedSeconds),
                  Number(data.movie.time.split(" ")[0]) * 60
                );
              }
            }}
            onSeek={(e) => {
              saveContinueWatching(
                Math.floor(e),
                Number(data.movie.time.split(" ")[0]) * 60
              );
            }}
            onError={() => handlePlayerError()}
            onReady={() => {
              checkContinueWatching();
              handleReady();
            }}
            onPlay={() => {
              handlePlay();
              document.getElementById("player")?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });
            }}
            config={{
              file: {
                attributes: {
                  poster: data.movie.thumb_url,
                },
              },
            }}
          />

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          )}

          {/* Controls Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="btn btn-circle btn-lg bg-black/50 border-white/20 hover:bg-black/70 text-white"
              >
                {state.playing ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
              {/* Progress Bar */}
              <div
                ref={progressRef}
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer group/progress"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-primary rounded-full relative group-hover/progress:h-3 transition-all duration-200"
                  style={{ width: `${state.played * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200"></div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Skip Backward 10s */}
                  <button
                    onClick={skipBackward}
                    className="btn btn-ghost btn-sm text-white hover:bg-white/20"
                    title="Tua lùi 10s (←)"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span className="text-xs">10s</span>
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="btn btn-ghost btn-sm text-white hover:bg-white/20"
                    title="Play/Pause (Space)"
                  >
                    {state.playing ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  {/* Skip Forward 10s */}
                  <button
                    onClick={skipForward}
                    className="btn btn-ghost btn-sm text-white hover:bg-white/20"
                    title="Tua tới 10s (→)"
                  >
                    <RotateCw className="w-5 h-5" />
                    <span className="text-xs">10s</span>
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="btn btn-ghost btn-sm text-white hover:bg-white/20"
                      title="Mute (M)"
                    >
                      {state.muted || state.volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={state.muted ? 0 : state.volume}
                      onChange={handleVolumeChange}
                      className="range range-primary range-xs w-20"
                    />
                  </div>

                  {/* Time Display */}
                  <span className="text-white text-sm font-mono">
                    {formatTime(state.playedSeconds)} /{" "}
                    {formatTime(state.duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Settings */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="btn btn-ghost btn-sm text-white hover:bg-white/20"
                      title="Cài đặt"
                    >
                      <Settings className="w-5 h-5" />
                    </button>

                    {showSettings && (
                      <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 min-w-[150px]">
                        <div className="text-white text-sm font-semibold mb-2">
                          Tốc độ phát
                        </div>
                        <div className="space-y-1">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => changePlaybackRate(rate)}
                              className={`block w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                                state.playbackRate === rate
                                  ? "bg-primary text-primary-content"
                                  : "text-white hover:bg-white/20"
                              }`}
                            >
                              {rate}x
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="btn btn-ghost btn-sm text-white hover:bg-white/20"
                    title="Toàn màn hình (F)"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ContinuedModalSimple
            onContinue={handleContinue}
            onStartFromBeginning={handleStartFromBeginning}
            visible={showModal}
            data={continueData!}
            onClose={handleCloseModal}
          />

          {/* Error Modal */}
        </div>
      ) : (
        // Embed Player
        <div className="aspect-video">
          <iframe
            src={data.episodes[+ver].server_data[+ep - 1].link_embed}
            title="Player"
            width="100%"
            height="100%"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}

      <div>
        {showErrorModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-error/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-error" />
                </div>
                <h3 className="font-bold text-lg">Lỗi phát video</h3>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <p className="text-base-content/70">
                  {errorType === "timeout"
                    ? "Video không thể tải sau 8 giây. Có thể do kết nối mạng chậm hoặc nguồn video có vấn đề."
                    : "Không thể phát video từ nguồn hiện tại."}{" "}
                  Bạn có thể thử:
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Chuyển sang trình phát nhúng (embed)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Thử lại với trình phát hiện tại</span>
                  </div>
                  {errorType === "timeout" && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span>Kiểm tra kết nối mạng của bạn</span>
                    </div>
                  )}
                </div>

                <div
                  className={`alert ${
                    errorType === "timeout" ? "alert-warning" : "alert-info"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm">
                    {errorType === "timeout"
                      ? "Timeout có thể do kết nối mạng chậm hoặc server video quá tải."
                      : "Trình phát nhúng có thể hoạt động tốt hơn với một số nguồn video."}
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-action">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="btn btn-outline gap-2"
                >
                  <X className="w-4 h-4" />
                  Đóng
                </button>
                <button onClick={handleRetry} className="btn btn-outline gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Thử lại
                </button>
                <button
                  onClick={handleSwitchToEmbed}
                  className="btn btn-primary gap-2"
                >
                  <Monitor className="w-4 h-4" />
                  Chuyển sang Embed
                </button>
              </div>
            </div>
            <div
              className="modal-backdrop"
              onClick={() => setShowErrorModal(false)}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
