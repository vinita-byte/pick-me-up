import { SOUND_EFFECTS } from '../data/sounds';

class SoundController {
  private audioCtx: AudioContext | null = null;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private spinTimer: number | null = null;
  private currentPlayingAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.85;
  private onStateChangeListeners: Set<() => void> = new Set();
  private currentlyPlayingId: string | null = null;

  constructor() {
    // Preload audio objects lazily on client
    if (typeof window !== 'undefined') {
      SOUND_EFFECTS.forEach((item) => {
        const audio = new Audio(item.src);
        audio.preload = 'auto';
        this.audioCache.set(item.id, audio);
      });
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public subscribe(listener: () => void): () => void {
    this.onStateChangeListeners.add(listener);
    return () => this.onStateChangeListeners.delete(listener);
  }

  private notify() {
    this.onStateChangeListeners.forEach((fn) => fn());
  }

  public getCurrentlyPlayingId(): string | null {
    return this.currentlyPlayingId;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setIsMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAll();
    }
    this.notify();
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentPlayingAudio) {
      this.currentPlayingAudio.volume = this.volume;
    }
    this.notify();
  }

  // Synthesizes a high-fidelity mechanical wheel ratchet click sound via Web Audio API
  private playRatchetTick(pitchMultiplier: number = 1.0) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Sharp, wooden/metallic ratchet click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 * pitchMultiplier, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140 * pitchMultiplier, ctx.currentTime + 0.035);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      gain.gain.setValueAtTime(0.35 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // AudioContext fallback ignored
    }
  }

  // Starts the randomizer spinning sound: rapid ticking that naturally decelerates
  public startSpinningSound(durationMs: number = 2200): () => void {
    if (this.spinTimer) {
      window.clearTimeout(this.spinTimer);
      this.spinTimer = null;
    }

    if (this.isMuted) {
      return () => {};
    }

    const startTime = Date.now();
    let currentInterval = 45; // Starts fast (45ms per tick)

    const scheduleNextTick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= durationMs) {
        // Final landing clack
        this.playRatchetTick(1.4);
        return;
      }

      // Progress ratio from 0 to 1
      const progress = elapsed / durationMs;
      // Exponential slowdown: starts at 45ms, ramps to 280ms
      currentInterval = 45 + Math.pow(progress, 2.5) * 260;

      // Play tick
      const pitch = 1.2 - progress * 0.4;
      this.playRatchetTick(pitch);

      this.spinTimer = window.setTimeout(scheduleNextTick, currentInterval);
    };

    scheduleNextTick();

    return () => this.stopSpinningSound();
  }

  public stopSpinningSound() {
    if (this.spinTimer) {
      window.clearTimeout(this.spinTimer);
      this.spinTimer = null;
    }
  }

  // Plays one of the 9 dialogue / comedic sound effects
  public async playSoundEffect(soundId: string): Promise<void> {
    if (this.isMuted || !soundId) return;

    this.stopAll();

    const audio = this.audioCache.get(soundId);
    if (!audio) {
      // Fallback: try finding from list
      const item = SOUND_EFFECTS.find((s) => s.id === soundId);
      if (item) {
        const freshAudio = new Audio(item.src);
        this.audioCache.set(soundId, freshAudio);
        return this.playSoundEffect(soundId);
      }
      return;
    }

    try {
      audio.currentTime = 0;
      audio.volume = this.volume;
      this.currentPlayingAudio = audio;
      this.currentlyPlayingId = soundId;
      this.notify();

      audio.onended = () => {
        if (this.currentlyPlayingId === soundId) {
          this.currentlyPlayingId = null;
          this.currentPlayingAudio = null;
          this.notify();
        }
      };

      await audio.play();
    } catch {
      // Browser autoplay policy might block if un-interacted
      this.currentlyPlayingId = null;
      this.currentPlayingAudio = null;
      this.notify();
    }
  }

  public stopAll() {
    this.stopSpinningSound();
    if (this.currentPlayingAudio) {
      try {
        this.currentPlayingAudio.pause();
        this.currentPlayingAudio.currentTime = 0;
      } catch {
        // Safe ignore
      }
      this.currentPlayingAudio = null;
    }
    this.currentlyPlayingId = null;
    this.notify();
  }
}

export const soundManager = new SoundController();
