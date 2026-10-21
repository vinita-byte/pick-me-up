import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Play,
  Square,
  Sparkles,
  Shuffle,
  Lock,
  VolumeX,
  Flame,
  Zap,
  Laugh,
  Search,
  PartyPopper,
  Music,
  Bell,
  Heart
} from 'lucide-react';
import { SOUND_EFFECTS } from '../data/sounds';
import { soundManager } from '../utils/audio';
import { SoundMode } from '../utils/randomizer';

interface SoundboardCardProps {
  soundMode: SoundMode;
  onSelectSoundMode: (mode: SoundMode) => void;
  lockedSoundId: string;
  onSelectLockedSound: (id: string) => void;
}

const getSoundIcon = (iconName: string) => {
  switch (iconName) {
    case 'Heart':
      return <Heart className="w-4 h-4" />;
    case 'Sparkles':
      return <Sparkles className="w-4 h-4" />;
    case 'PartyPopper':
      return <PartyPopper className="w-4 h-4" />;
    case 'Flame':
      return <Flame className="w-4 h-4" />;
    case 'Zap':
      return <Zap className="w-4 h-4" />;
    case 'Search':
      return <Search className="w-4 h-4" />;
    case 'Laugh':
      return <Laugh className="w-4 h-4" />;
    case 'Bell':
      return <Bell className="w-4 h-4" />;
    case 'Music':
    default:
      return <Music className="w-4 h-4" />;
  }
};

export const SoundboardCard: React.FC<SoundboardCardProps> = ({
  soundMode,
  onSelectSoundMode,
  lockedSoundId,
  onSelectLockedSound,
}) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(
    soundManager.getCurrentlyPlayingId()
  );

  useEffect(() => {
    const unsub = soundManager.subscribe(() => {
      setCurrentlyPlaying(soundManager.getCurrentlyPlayingId());
    });
    return unsub;
  }, []);

  const handlePlayPad = (id: string) => {
    if (currentlyPlaying === id) {
      soundManager.stopAll();
    } else {
      soundManager.playSoundEffect(id);
    }
  };

  return (
    <div className="bento-card p-5 sm:p-6 border border-[#27272A] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#DC2626]/20 text-[#EF4444] rounded-lg">
              <Volume2 className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Sound Effects Jukebox
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#DC2626] font-bold bg-[#DC2626]/10 px-2 py-0.5 rounded-full border border-[#DC2626]/20">
            9 Filmy SFX
          </span>
        </div>

        {/* Randomizer Sound Trigger Strategy */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-2">
            Randomizer Landing Sound Mode:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              onClick={() => onSelectSoundMode('smart-match')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                soundMode === 'smart-match'
                  ? 'bg-[#DC2626] border-[#DC2626] text-white'
                  : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:text-white'
              }`}
              title="Matches dialogue vibe with appropriate audio clip"
            >
              <Sparkles className="w-3 h-3" />
              <span>Smart Match</span>
            </button>

            <button
              onClick={() => onSelectSoundMode('random')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                soundMode === 'random'
                  ? 'bg-[#DC2626] border-[#DC2626] text-white'
                  : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:text-white'
              }`}
              title="Picks randomly from all 9 sounds on each spin"
            >
              <Shuffle className="w-3 h-3" />
              <span>Pure Random</span>
            </button>

            <button
              onClick={() => onSelectSoundMode('specific')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                soundMode === 'specific'
                  ? 'bg-[#DC2626] border-[#DC2626] text-white'
                  : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:text-white'
              }`}
              title="Lock landing sound to a selected sound effect"
            >
              <Lock className="w-3 h-3" />
              <span>Lock Sound</span>
            </button>

            <button
              onClick={() => onSelectSoundMode('silent')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                soundMode === 'silent'
                  ? 'bg-[#DC2626] border-[#DC2626] text-white'
                  : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:text-white'
              }`}
              title="Play spin ratchet sound only, no landing SFX"
            >
              <VolumeX className="w-3 h-3" />
              <span>No SFX</span>
            </button>
          </div>
        </div>

        {/* 9 Sound Effect Pads */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SOUND_EFFECTS.map((item) => {
            const isPlaying = currentlyPlaying === item.id;
            const isLocked = soundMode === 'specific' && lockedSoundId === item.id;

            return (
              <div
                key={item.id}
                className={`relative p-3 rounded-xl border transition-all text-left flex flex-col justify-between group ${
                  isPlaying
                    ? 'bg-[#DC2626]/20 border-[#DC2626] shadow-lg shadow-red-700/20'
                    : isLocked
                    ? 'bg-[#18181B] border-[#DC2626]'
                    : 'bg-[#18181B] border-[#27272A] hover:border-[#3F3F46]'
                }`}
              >
                {/* Top row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${isPlaying ? 'bg-[#DC2626] text-white' : 'bg-[#27272A] text-[#EF4444]'}`}>
                    {getSoundIcon(item.iconName)}
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Play/Stop button */}
                    <button
                      onClick={() => handlePlayPad(item.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isPlaying
                          ? 'bg-[#DC2626] text-white'
                          : 'bg-[#27272A] text-white hover:bg-[#DC2626]'
                      }`}
                      title={isPlaying ? 'Stop playback' : 'Play audio clip'}
                      aria-label={`Play ${item.title}`}
                    >
                      {isPlaying ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                    </button>

                    {/* Lock button */}
                    {soundMode === 'specific' && (
                      <button
                        onClick={() => onSelectLockedSound(item.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isLocked
                            ? 'bg-[#DC2626] text-white'
                            : 'bg-[#27272A] text-[#A1A1AA] hover:text-white'
                        }`}
                        title="Lock this sound to spin landing"
                        aria-label={`Lock ${item.title}`}
                      >
                        <Lock className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-[#EF4444] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#A1A1AA] line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                {/* Playing Equalizer Animation */}
                {isPlaying && (
                  <div className="flex items-center gap-0.5 mt-2 h-1.5">
                    <span className="w-1 bg-[#EF4444] h-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 bg-[#EF4444] h-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 bg-[#EF4444] h-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="w-1 bg-[#EF4444] h-full animate-bounce" style={{ animationDelay: '75ms' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
