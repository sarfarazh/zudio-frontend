"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

export default function PreviewPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    setMuted(value === 0);
  };

  const toggleMute = () => {
    setMuted(!muted);
    if (muted) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        <p className="text-muted-foreground">
          Preview your video with all generated elements
        </p>
      </div>

      {/* Video Player */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src="https://example.com/preview.mp4" // Placeholder video URL
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          muted={muted}
        />

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="space-y-2">
            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-white">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3
                         [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-white"
              />
              <span className="text-xs text-white">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = Math.max(0, currentTime - 10);
                    }
                  }}
                  className="text-white hover:text-white/80"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-white/80"
                >
                  {playing ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = Math.min(duration, currentTime + 10);
                    }
                  }}
                  className="text-white hover:text-white/80"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-white/80"
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3
                         [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Timeline</h3>
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-card border">
            <div className="flex items-center justify-between">
              <span className="font-medium">Video</span>
              <span className="text-sm text-muted-foreground">0:00 - {formatTime(duration)}</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-card border">
            <div className="flex items-center justify-between">
              <span className="font-medium">Dialogue</span>
              <span className="text-sm text-muted-foreground">Multiple segments</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-card border">
            <div className="flex items-center justify-between">
              <span className="font-medium">Background Music</span>
              <span className="text-sm text-muted-foreground">Full duration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 