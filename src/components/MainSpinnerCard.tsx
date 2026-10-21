import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCw,
  Copy,
  Check,
  Heart,
  Volume2,
  Share2,
  Sparkles,
  Quote,
  Film,
  Lightbulb
} from 'lucide-react';
import { Dialogue } from '../types/dialogue';
import { soundManager } from '../utils/audio';
import { SOUND_EFFECTS } from '../data/sounds';
import { formatDialogueForSharing } from '../utils/randomizer';

interface MainSpinnerCardProps {
  currentDialogue: Dialogue | null;
  isSpinning: boolean;
  onSpin: () => void;
  isFavorite: boolean;
  onToggleFavorite: (dialogue: Dialogue) => void;
  activeSoundId: string;
  categoryLabel: string;
}

export const MainSpinnerCard: React.FC<MainSpinnerCardProps> = ({
  currentDialogue,
  isSpinning,
  onSpin,
  isFavorite,
  onToggleFavorite,
  activeSoundId,
  categoryLabel,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
  const [tickerQuote, setTickerQuote] = useState('Click Randomize to Spin the Platter!');
  const tickerRef = useRef<number | null>(null);

  // Cycling ticker effect during spin
  useEffect(() => {
    if (isSpinning) {
      const teasers = [
        'Bade bade deshon mein...',
        'Palat... Palat... Palat!',
        '50 rupya kaat overacting ka!',
        'Agar woh mujhse pyaar karti hai...',
        'Khopdi tod saale ka!',
        'Rahul, naam toh suna hoga?',
        'Main apni favorite hoon...',
        'Yeh Baburao ka style hai!',
        'Kuch kuch hota hai...',
        'Abhi maza aayega na bhidu!',
        'Tum oxygen aur main double hydrogen...',
        'Crime Master Gogo naam hai mera!',
        'Aap convice ho gaye ya main aur try karun?'
      ];
      let i = 0;
      tickerRef.current = window.setInterval(() => {
        i = (i + 1) % teasers.length;
        setTickerQuote(teasers[i]);
      }, 70);
    } else {
      if (tickerRef.current) {
        clearInterval(tickerRef.current);
        tickerRef.current = null;
      }
    }
    return () => {
      if (tickerRef.current) clearInterval(tickerRef.current);
    };
  }, [isSpinning]);

  const handleCopy = () => {
    if (!currentDialogue) return;
    navigator.clipboard.writeText(`"${currentDialogue.quote}" — ${currentDialogue.movie}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!currentDialogue) return;
    const shareText = formatDialogueForSharing(currentDialogue);
    if (navigator.share) {
      navigator.share({
        title: 'Pick Me Up - Bollywood Dialogue',
        text: shareText,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(shareText);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2200);
      });
    } else {
      navigator.clipboard.writeText(shareText);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2200);
    }
  };

  const handleReplaySound = () => {
    if (activeSoundId) {
      soundManager.playSoundEffect(activeSoundId);
    } else if (currentDialogue?.suggestedSoundId) {
      soundManager.playSoundEffect(currentDialogue.suggestedSoundId);
    }
  };

  const activeSoundObj = SOUND_EFFECTS.find((s) => s.id === activeSoundId);

  return (
    <div className={`bento-card p-5 sm:p-7 relative border-2 ${isSpinning ? 'bento-card-highlight spin-active-glow' : 'border-[#27272A]'}`}>
      {/* Decorative top red accent ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#B91C1C]" />

      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#18181B] border border-[#DC2626]/40 text-[#EF4444] text-xs font-bold rounded-lg tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {categoryLabel}
          </span>
          {activeSoundObj && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#18181B] border border-[#27272A] text-[#A1A1AA] text-xs font-medium rounded-lg">
              <Volume2 className="w-3.5 h-3.5 text-[#DC2626]" />
              {activeSoundObj.title}
            </span>
          )}
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSpinning ? 'bg-[#DC2626] opacity-75' : 'bg-emerald-400 opacity-50'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSpinning ? 'bg-[#DC2626]' : 'bg-emerald-500'}`}></span>
          </span>
          <span className="text-xs text-[#A1A1AA] font-semibold uppercase tracking-wider">
            {isSpinning ? 'Randomizer Spinning...' : 'Ready To Spin'}
          </span>
        </div>
      </div>

      {/* Main Spinning Wheel / Roulette Viewport */}
      <div className="relative min-h-[220px] sm:min-h-[240px] flex flex-col justify-center items-center text-center p-6 sm:p-8 bg-gradient-to-b from-[#18181B]/80 to-[#0F0F10] border border-[#27272A] rounded-2xl overflow-hidden mb-6">
        {/* Subtle Watermark Quotes Icon */}
        <Quote className="absolute -top-4 -left-4 w-28 h-28 text-[#DC2626]/5 pointer-events-none" />
        <Quote className="absolute -bottom-4 -right-4 w-28 h-28 text-[#DC2626]/5 pointer-events-none rotate-180" />

        {isSpinning ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            {/* Spinning Indicator Wheel */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#27272A] border-t-[#DC2626] animate-spin" />
              <RotateCw className="w-7 h-7 text-[#DC2626] animate-pulse" />
            </div>
            {/* Fast cycling teaser quote */}
            <div className="space-y-1">
              <p className="text-lg sm:text-xl font-bold text-[#FFFFFF] tracking-tight blur-[0.5px] transition-all">
                "{tickerQuote}"
              </p>
              <p className="text-xs font-semibold text-[#EF4444] uppercase tracking-widest animate-pulse">
                🎲 Spinning Bollywood Vault...
              </p>
            </div>
          </div>
        ) : currentDialogue ? (
          <div className="relative z-10 max-w-3xl mx-auto space-y-4 animate-in fade-in duration-300">
            {/* Vibe Badge */}
            <div className="inline-block">
              <span className="px-3 py-1 bg-[#DC2626]/15 border border-[#DC2626]/30 text-[#EF4444] text-xs font-bold rounded-full uppercase tracking-wider">
                {currentDialogue.vibeLabel}
              </span>
            </div>

            {/* The Dialogue Quote */}
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug sm:leading-tight">
              “{currentDialogue.quote}”
            </blockquote>

            {/* Movie Attribution */}
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-[#DC2626]">
              <Film className="w-4 h-4 text-[#EF4444]" />
              <span>{currentDialogue.movie}</span>
              {currentDialogue.year && (
                <span className="text-[#71717A] text-xs font-normal">({currentDialogue.year})</span>
              )}
            </div>

            {/* How to Deliver / Tactical Scenario Box */}
            <div className="mt-4 p-4 bg-[#121212] border border-[#27272A] rounded-xl text-left max-w-2xl mx-auto shadow-inner">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#DC2626] uppercase tracking-wider mb-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>When &amp; How To Deliver This Line:</span>
              </div>
              <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
                {currentDialogue.scenario}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-3xl">
              🎬
            </div>
            <h3 className="text-xl font-bold text-white">Ready for Bollywood Romance?</h3>
            <p className="text-sm text-[#A1A1AA] max-w-md mx-auto">
              Click the big red button below to spin Pick Me Up and unlock an iconic pickup line with real audio punchlines!
            </p>
          </div>
        )}
      </div>

      {/* Primary Action Button (The Randomizer Spinner Trigger) */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onSpin}
          disabled={isSpinning}
          className={`w-full sm:flex-1 py-4 px-6 rounded-xl font-black text-base sm:text-lg uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-3 shadow-xl cursor-pointer ${
            isSpinning
              ? 'bg-[#18181B] text-[#71717A] border border-[#27272A] cursor-not-allowed'
              : 'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-red-700/30 hover:shadow-red-700/50 hover:scale-[1.01] active:scale-[0.99]'
          }`}
          aria-label="Randomize Bollywood Dialogue"
        >
          <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Spinning Randomizer...' : 'Randomize Dialogue'}</span>
          <span className="hidden md:inline-block text-[11px] font-bold px-2 py-0.5 bg-black/30 rounded-md border border-white/20 ml-2">
            SPACE
          </span>
        </button>

        {/* Secondary Utility Actions (Only active when dialogue exists) */}
        {currentDialogue && !isSpinning && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Replay Sound Effect */}
            <button
              onClick={handleReplaySound}
              className="flex-1 sm:flex-none p-3.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] hover:border-[#DC2626]/50 text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Replay Sound Effect"
              aria-label="Replay Sound Effect"
            >
              <Volume2 className="w-4 h-4 text-[#EF4444]" />
              <span className="sm:hidden lg:inline">Replay SFX</span>
            </button>

            {/* Copy Quote */}
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none p-3.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Copy Dialogue"
              aria-label="Copy Dialogue"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#A1A1AA]" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {/* Favorite Bookmark */}
            <button
              onClick={() => onToggleFavorite(currentDialogue)}
              className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center cursor-pointer ${
                isFavorite
                  ? 'bg-[#DC2626]/20 border-[#DC2626] text-[#EF4444]'
                  : 'bg-[#18181B] hover:bg-[#27272A] border-[#27272A] text-[#A1A1AA] hover:text-white'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#EF4444]' : ''}`} />
            </button>

            {/* Share Dialogue */}
            <button
              onClick={handleShare}
              className="p-3.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-white rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              title="Share Dialogue Text"
              aria-label="Share Dialogue"
            >
              {shareFeedback ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-[#A1A1AA]" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
