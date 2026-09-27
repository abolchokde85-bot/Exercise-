import React, { useState, useEffect } from 'react';
import { ExerciseIllustration } from './ExerciseIllustration';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Gauge,
  Sparkles,
  Eye
} from 'lucide-react';

interface Props {
  type: string;
  titleFa?: string;
  subtitleFa?: string;
  className?: string;
  autoPlay?: boolean;
  isCompact?: boolean;
  showOverlayBadge?: boolean;
}

export const ExerciseVideoPlayer: React.FC<Props> = ({
  type,
  titleFa,
  subtitleFa,
  className = 'w-full h-64 sm:h-72',
  autoPlay = true,
  isCompact = false,
  showOverlayBadge = true
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 0.5>(1);
  const [viewAngle, setViewAngle] = useState<'profile' | 'clinical'>('profile');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simulated video playback looping animation progress
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50 / playbackSpeed;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const toggleSpeed = () => {
    setPlaybackSpeed((s) => (s === 1 ? 0.5 : 1));
  };

  const toggleViewAngle = () => {
    setViewAngle((a) => (a === 'profile' ? 'clinical' : 'profile'));
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-950 text-white shadow-xl border border-slate-800 flex flex-col group select-none ${
        isFullscreen ? 'fixed inset-4 z-50 h-[92vh] max-w-5xl mx-auto' : ''
      }`}
    >
      {/* Top Video Header / Overlay bar */}
      <div className="absolute top-0 inset-x-0 z-20 p-3 sm:p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {showOverlayBadge && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-[10px] font-bold backdrop-blur-md">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-teal-400 animate-pulse' : 'bg-slate-400'}`} />
              <span>ویدیو آموزشی HD</span>
            </span>
          )}

          {titleFa && (
            <span className="font-bold text-slate-200 text-xs sm:text-sm drop-shadow-sm truncate max-w-[200px] sm:max-w-xs">
              {titleFa}
            </span>
          )}
        </div>

        {/* Top Controls: Angle toggle & Speed */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleViewAngle}
            title="تغییر زاویه نمایش (پروفایل / تراز بالینی)"
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md transition-colors cursor-pointer"
          >
            <Eye className="w-3 h-3 text-teal-300" />
            <span>{viewAngle === 'profile' ? 'نمای جانبی' : 'تراز بالینی'}</span>
          </button>

          <button
            onClick={toggleSpeed}
            title="سرعت نمایش حرکت"
            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-bold backdrop-blur-md transition-colors cursor-pointer"
          >
            {playbackSpeed}x
          </button>

          <button
            onClick={() => setIsFullscreen((f) => !f)}
            title="بزرگنمایی ویدیو"
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 backdrop-blur-md transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Video Viewport with Animated Biomechanical Diagram */}
      <div className={`relative flex-1 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden ${className}`}>
        {/* Subtle grid pattern background like professional 3D biomechanics software */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Anatomical Motion Guide overlay */}
        {viewAngle === 'clinical' && (
          <div className="absolute top-12 right-3 z-10 p-2 rounded-xl bg-teal-950/70 border border-teal-500/30 text-[10px] text-teal-200 backdrop-blur space-y-0.5 pointer-events-none">
            <div className="flex items-center gap-1 font-bold text-teal-300">
              <Sparkles className="w-3 h-3" />
              <span>پروتکل خنثی ستون فقرات (Neutral Spine)</span>
            </div>
            <div className="text-[9px] text-slate-300">خط سبز: انحنای استاندارد لوردوز کمری</div>
          </div>
        )}

        {/* Animated illustration container */}
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <ExerciseIllustration
            type={type}
            className="w-full h-full bg-transparent border-none"
            variant="detailed"
            showAlignmentGuide={viewAngle === 'clinical'}
          />

          {/* Subtitle / Key mechanical cue pill at center bottom of video frame */}
          {subtitleFa && (
            <div className="absolute bottom-12 inset-x-4 flex justify-center pointer-events-none">
              <div className="bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg max-w-md text-center">
                {subtitleFa}
              </div>
            </div>
          )}
        </div>

        {/* Big play button overlay when paused */}
        {!isPlaying && (
          <div
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-2xs cursor-pointer group-hover:bg-black/30 transition-all"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-500/90 hover:bg-teal-400 text-slate-950 flex items-center justify-center shadow-xl shadow-teal-500/30 transition-transform transform hover:scale-105 active:scale-95">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Video Controls & Scrub Timeline */}
      <div className="relative z-20 bg-slate-950/95 border-t border-slate-800/80 px-4 py-2.5 space-y-2">
        {/* Timeline Bar */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newPct = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
            setProgress(newPct);
          }}
          className="relative w-full h-1.5 bg-slate-800 hover:h-2 transition-all rounded-full cursor-pointer group/timeline"
        >
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md -translate-x-1.5 opacity-0 group-hover/timeline:opacity-100 transition-opacity"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Bottom Playback bar */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="p-1 text-slate-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title={isPlaying ? 'توقف موقت ویدیو' : 'پخش ویدیو'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => {
                setProgress(0);
                setIsPlaying(true);
              }}
              className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="پخش مجدد از ابتدا"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <span className="text-[10px] text-slate-400 font-mono">
              00:{String(Math.floor((progress / 100) * 12)).padStart(2, '0')} / 00:12
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-semibold text-teal-400/90">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span>حلقه تکرار الگوی صحیح حرکتی</span>
          </div>
        </div>
      </div>
    </div>
  );
};
