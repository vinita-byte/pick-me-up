import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Map, Music } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onOpenSitemap: () => void;
  totalDialogues: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSitemap, totalDialogues }) => {
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [volume, setVolume] = useState(soundManager.getVolume());
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(soundManager.getCurrentlyPlayingId());

  useEffect(() => {
    const unsubscribe = soundManager.subscribe(() => {
      setIsMuted(soundManager.getIsMuted());
      setVolume(soundManager.getVolume());
      setCurrentlyPlaying(soundManager.getCurrentlyPlayingId());
    });
    return unsubscribe;
  }, []);

  const toggleMute = () => {
    soundManager.setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    soundManager.setVolume(newVol);
    if (isMuted && newVol > 0) {
      soundManager.setIsMuted(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#27272A] px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DC2626] flex items-center justify-center shadow-lg shadow-red-600/30 text-xl font-bold">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white uppercase">
                Pick Me Up
              </span>
              <span className="bg-[#DC2626]/20 border border-[#DC2626]/40 text-[#EF4444] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Bollywood Edition
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] font-normal">
              Iconic Pickup Lines, Tashan &amp; Authentic SFX
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Audio Activity Indicator */}
          {currentlyPlaying && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[#18181B] border border-[#DC2626]/50 rounded-full text-xs text-[#EF4444] animate-pulse">
              <Music className="w-3.5 h-3.5" />
              <span className="font-semibold">Playing Sound FX</span>
            </div>
          )}

          {/* Volume & Audio Controls */}
          <div className="flex items-center gap-2 bg-[#18181B] border border-[#27272A] px-3 py-1.5 rounded-xl">
            <button
              onClick={toggleMute}
              className={`p-1 rounded-lg transition-colors ${
                isMuted
                  ? 'text-[#71717A] hover:text-white'
                  : 'text-[#EF4444] hover:text-[#DC2626]'
              }`}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 sm:w-20 accent-[#DC2626] h-1.5 bg-[#27272A] rounded-lg cursor-pointer"
              title={`Volume: ${Math.round(volume * 100)}%`}
              aria-label="Sound Volume Slider"
            />
          </div>

          {/* Sitemap Modal Trigger */}
          <button
            onClick={onOpenSitemap}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
            title="View Site Map and Resources"
            aria-label="Open Site Map"
          >
            <Map className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="hidden sm:inline">Site Map</span>
          </button>

          {/* Total Dialogues Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#DC2626] text-white text-xs font-bold rounded-xl shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{totalDialogues} Lines</span>
          </div>
        </div>
      </div>
    </header>
  );
};
