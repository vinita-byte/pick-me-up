import { Dialogue, VibeCategory } from '../types/dialogue';
import { SOUND_EFFECTS } from '../data/sounds';

export type SoundMode = 'smart-match' | 'random' | 'specific' | 'silent';

export function filterDialogues(
  dialogues: Dialogue[],
  category: VibeCategory,
  query: string = ''
): Dialogue[] {
  let list = dialogues;

  if (category !== 'all') {
    list = list.filter((d) => d.vibe === category);
  }

  const cleanQuery = query.trim().toLowerCase();
  if (cleanQuery) {
    list = list.filter(
      (d) =>
        d.quote.toLowerCase().includes(cleanQuery) ||
        d.movie.toLowerCase().includes(cleanQuery) ||
        d.scenario.toLowerCase().includes(cleanQuery) ||
        d.tags.some((tag) => tag.toLowerCase().includes(cleanQuery))
    );
  }

  return list;
}

export function pickRandomDialogue(
  pool: Dialogue[],
  currentId?: string
): Dialogue | null {
  if (!pool || pool.length === 0) return null;
  if (pool.length === 1) return pool[0];

  const available = currentId ? pool.filter((d) => d.id !== currentId) : pool;
  const targetList = available.length > 0 ? available : pool;
  const randomIndex = Math.floor(Math.random() * targetList.length);
  return targetList[randomIndex];
}

export function resolveSoundForDialogue(
  dialogue: Dialogue,
  soundMode: SoundMode,
  specificSoundId?: string
): string {
  if (soundMode === 'silent') return '';

  if (soundMode === 'specific' && specificSoundId) {
    const exists = SOUND_EFFECTS.some((s) => s.id === specificSoundId);
    if (exists) return specificSoundId;
  }

  if (soundMode === 'smart-match') {
    if (dialogue.suggestedSoundId) {
      const exists = SOUND_EFFECTS.some((s) => s.id === dialogue.suggestedSoundId);
      if (exists) return dialogue.suggestedSoundId;
    }
  }

  // Random fallback from available sounds
  const randomIndex = Math.floor(Math.random() * SOUND_EFFECTS.length);
  return SOUND_EFFECTS[randomIndex].id;
}

export function formatDialogueForSharing(dialogue: Dialogue): string {
  return `✨ "${dialogue.quote}"\n🎬 ${dialogue.movie} (${dialogue.year || 'Bollywood'})\n💡 Scenario: ${dialogue.scenario}\n\nSpun on Pick Me Up — The Ultimate Bollywood Randomizer!`;
}
