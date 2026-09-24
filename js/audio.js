/**
 * SpeedBanker Audio Engine (Disabled / Silent Mode)
 * Sound has been completely removed as requested.
 */

class SoundEngine {
  constructor() {
    this.muted = true;
  }

  ensureContext() {}
  toggleMute() { return true; }
  playCorrect() {}
  playWrong() {}
  playStreak() {}
  playTick() {}
  playFanfare() {}
}

window.soundEngine = new SoundEngine();
