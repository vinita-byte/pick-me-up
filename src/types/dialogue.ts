export type VibeCategory =
  | 'all'
  | 'iconic-romance'
  | 'cheeky-flirt'
  | 'comedic-banter'
  | 'food-and-dates'
  | 'parting-lines'
  | 'tashan-attitude';

export interface Dialogue {
  id: string;
  quote: string;
  movie: string;
  year?: string;
  vibe: VibeCategory;
  vibeLabel: string;
  scenario: string;
  suggestedSoundId?: string;
  tags: string[];
  isCustom?: boolean;
}

export interface SoundEffectItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  iconName: string;
  duration?: number;
  category: 'dialogue' | 'music' | 'sfx';
}
