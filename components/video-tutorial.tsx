'use client';

import React, { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';

interface VideoTutorialProps {
  title: string;
  subtitle?: string;
  duration?: string;
  videoUrl?: string; // YouTube embed URL or direct video MP4
  posterUrl?: string;
}

export function VideoTutorial({
  title,
  subtitle = 'Tonton tutorial video ringkas untuk langkah pantas',
  duration = '1:30 minit',
  videoUrl,
  posterUrl,
}: VideoTutorialProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // If videoUrl is a standard YouTube watch URL, convert to embed
  let formattedVideoUrl = videoUrl;
  if (videoUrl?.includes('youtube.com/watch?v=')) {
    formattedVideoUrl = videoUrl.replace('watch?v=', 'embed/');
  } else if (videoUrl?.includes('youtu.be/')) {
    formattedVideoUrl = videoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-neutral-800 bg-[#0c0f17] shadow-2xl transition-all hover:border-neutral-700">
      {isPlaying && formattedVideoUrl ? (
        <div className="relative aspect-video w-full">
          {formattedVideoUrl.endsWith('.mp4') ? (
            <video
              src={formattedVideoUrl}
              controls
              autoPlay
              className="h-full w-full object-cover"
            />
          ) : (
            <iframe
              src={`${formattedVideoUrl}?autoplay=1&rel=0`}
              title={title}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      ) : (
        <div
          onClick={() => (formattedVideoUrl ? setIsPlaying(true) : null)}
          className={`group relative aspect-[16/9] w-full select-none overflow-hidden bg-gradient-to-br from-neutral-900 via-[#0d1322] to-[#080d1a] ${
            formattedVideoUrl ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          {posterUrl && (
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {/* Glowing background aura */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          {/* Top Header Badge */}
          <div className="absolute left-4 top-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-semibold tracking-wide text-amber-300">RISEV ACADEMY</span>
            </div>
            {duration && (
              <div className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur-md">
                ⏱️ {duration}
              </div>
            )}
          </div>

          {/* Center Play Button & Title */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-black shadow-lg shadow-amber-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-amber-500/40">
              <Play className="h-7 w-7 fill-black ml-1" />
            </div>

            <h3 className="max-w-md text-lg font-bold text-white md:text-xl drop-shadow-md">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 max-w-sm text-xs text-neutral-300 md:text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {/* Bottom Bar Info */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-center justify-between text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Langkah Pantas & Senang Difahami
            </span>
            <span className="font-medium text-neutral-300 group-hover:text-amber-300 transition-colors">
              {formattedVideoUrl ? 'Klik untuk tonton video ▶' : 'Panduan video sedia ada'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
