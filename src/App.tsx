/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { MainSpinnerCard } from './components/MainSpinnerCard';
import { CategoryFilterCard } from './components/CategoryFilterCard';
import { SoundboardCard } from './components/SoundboardCard';
import { DeliveryCoachCard } from './components/DeliveryCoachCard';
import { DialogueLibraryCard } from './components/DialogueLibraryCard';
import { HistoryAndFavoritesCard } from './components/HistoryAndFavoritesCard';
import { SharePreviewCard } from './components/SharePreviewCard';
import { SitemapModal } from './components/SitemapModal';
import { Footer } from './components/Footer';
import { Dialogue, VibeCategory } from './types/dialogue';
import { BOLLYWOOD_DIALOGUES, VIBE_CATEGORIES } from './data/dialogues';
import {
  filterDialogues,
  pickRandomDialogue,
  resolveSoundForDialogue,
  SoundMode,
} from './utils/randomizer';
import { soundManager } from './utils/audio';

const STORAGE_KEY_FAVORITES = 'pick_me_up_favorites';
const STORAGE_KEY_HISTORY = 'pick_me_up_history';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<VibeCategory>('all');
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(() => {
    // Start with the classic DDLJ opener by default
    return BOLLYWOOD_DIALOGUES[0] || null;
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [soundMode, setSoundMode] = useState<SoundMode>('smart-match');
  const [lockedSoundId, setLockedSoundId] = useState<string>('romance');
  const [activeSoundId, setActiveSoundId] = useState<string>('romance');
  const [favorites, setFavorites] = useState<Dialogue[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVORITES) || localStorage.getItem('cheese_platter_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [history, setHistory] = useState<Dialogue[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HISTORY) || localStorage.getItem('cheese_platter_history');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
    } catch {
      // Storage full / disabled
    }
  }, [favorites]);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    } catch {
      // Storage full / disabled
    }
  }, [history]);

  // The Core Randomizer Spin Mechanism
  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);

    // 1. Start the authentic decelerating spinning sound effect!
    const spinDuration = 2200; // 2.2 seconds spin
    soundManager.startSpinningSound(spinDuration);

    // 2. Select the next dialogue from the active category pool
    const pool = filterDialogues(BOLLYWOOD_DIALOGUES, selectedCategory);
    const chosen = pickRandomDialogue(pool, currentDialogue?.id) || pool[0];

    // 3. Resolve which of the 9 sound effects will play upon landing
    const landingSound = resolveSoundForDialogue(chosen, soundMode, lockedSoundId);
    setActiveSoundId(landingSound);

    // 4. Timer to land the spin
    window.setTimeout(() => {
      setCurrentDialogue(chosen);
      setIsSpinning(false);

      // Add to history (avoid duplicates at the top)
      setHistory((prev) => {
        const filtered = prev.filter((d) => d.id !== chosen.id);
        return [chosen, ...filtered].slice(0, 30);
      });

      // 5. Play landing sound effect from user audio assets!
      if (landingSound) {
        soundManager.playSoundEffect(landingSound);
      }

      // 6. Confetti celebration
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#DC2626', '#EF4444', '#FFFFFF', '#0A0A0A'],
        });
      } catch {
        // Confetti optional
      }
    }, spinDuration);
  }, [isSpinning, selectedCategory, currentDialogue, soundMode, lockedSoundId]);

  // Spacebar keyboard shortcut to spin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in a search input
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleSpin();
      } else if (e.key === 'm' || e.key === 'M') {
        soundManager.setIsMuted(!soundManager.getIsMuted());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSpin]);

  // Favorite toggle
  const toggleFavorite = (dialogue: Dialogue) => {
    setFavorites((prev) => {
      const exists = prev.some((d) => d.id === dialogue.id);
      if (exists) {
        return prev.filter((d) => d.id !== dialogue.id);
      } else {
        return [dialogue, ...prev];
      }
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((d) => d.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const currentIsFav = currentDialogue
    ? favorites.some((d) => d.id === currentDialogue.id)
    : false;

  const currentCategoryObj = VIBE_CATEGORIES.find((c) => c.id === selectedCategory);
  const categoryLabel = currentCategoryObj ? currentCategoryObj.label : 'All Dialogues';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#DC2626] selection:text-white">
      {/* Navigation & Controls */}
      <Navbar
        onOpenSitemap={() => setIsSitemapOpen(true)}
        totalDialogues={BOLLYWOOD_DIALOGUES.length}
      />

      {/* Main Bento Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* TOP ROW BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Cell 1: Main Hero Randomizer Stage (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <MainSpinnerCard
              currentDialogue={currentDialogue}
              isSpinning={isSpinning}
              onSpin={handleSpin}
              isFavorite={currentIsFav}
              onToggleFavorite={toggleFavorite}
              activeSoundId={activeSoundId}
              categoryLabel={categoryLabel}
            />
          </div>

          {/* Bento Cell 2: Category & Vibe Selector (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <CategoryFilterCard
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* MIDDLE ROW BENTO GRID: Soundboard & Delivery Coach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Cell 3: Soundboard / SFX Jukebox (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <SoundboardCard
              soundMode={soundMode}
              onSelectSoundMode={setSoundMode}
              lockedSoundId={lockedSoundId}
              onSelectLockedSound={setLockedSoundId}
            />
          </div>

          {/* Bento Cell 4: Cheese Masterclass / Delivery Coach (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <DeliveryCoachCard />
          </div>
        </div>

        {/* BOTTOM ROW BENTO GRID: Library, Favorites & Share Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Cell 5: Dialogue Vault Library (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <DialogueLibraryCard
              onSelectDialogue={(d) => {
                setCurrentDialogue(d);
                if (d.suggestedSoundId) {
                  setActiveSoundId(d.suggestedSoundId);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Bento Cell 6: Favorites & Spin History (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <HistoryAndFavoritesCard
              history={history}
              favorites={favorites}
              onSelectDialogue={(d) => {
                setCurrentDialogue(d);
                if (d.suggestedSoundId) {
                  setActiveSoundId(d.suggestedSoundId);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onRemoveFavorite={removeFavorite}
              onClearHistory={clearHistory}
            />
          </div>

          {/* Bento Cell 7: Share Preview & Core Files (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <SharePreviewCard onOpenSitemap={() => setIsSitemapOpen(true)} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenSitemap={() => setIsSitemapOpen(true)} />

      {/* Interactive Site Map Modal */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        onSelectCategory={setSelectedCategory}
      />
    </div>
  );
}
