"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (sliderRef.current && duration) {
        const progress = (audio.currentTime / duration) * 100;
        sliderRef.current.style.setProperty(
          "--slider-progress",
          `${progress}%`,
        );
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      if (sliderRef.current) {
        sliderRef.current.style.setProperty("--slider-progress", `0%`);
      }
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [duration]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = parseFloat(e.target.value);
    audio.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 1;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <span className="my-6 block rounded-lg border border-border bg-muted/50 p-4 shadow-sm">
      <audio ref={audioRef} src={src} preload="metadata" />

      {title && (
        <span className="mb-3 block text-sm font-medium text-foreground/90">
          {title}
        </span>
      )}

      <span className="space-y-3">
        {/* Progress bar */}
        <span className="flex items-center gap-3">
          <span className="text-xs font-mono text-foreground/70 w-12 text-right">
            {formatTime(currentTime)}
          </span>
          <input
            ref={sliderRef}
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="audio-slider flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
          />
          <span className="text-xs font-mono text-foreground/70 w-12">
            {formatTime(duration)}
          </span>
        </span>

        {/* Controls */}
        <span className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>

          <span className="flex items-center gap-2 flex-1">
            <button
              onClick={toggleMute}
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider w-24 h-1.5 rounded-full appearance-none cursor-pointer"
              style={
                {
                  "--slider-progress": `${(isMuted ? 0 : volume) * 100}%`,
                } as React.CSSProperties
              }
            />
          </span>
        </span>
      </span>
    </span>
  );
}
