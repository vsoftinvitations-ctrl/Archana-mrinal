/**
 * Background Music Controller
 * Plays "Eeran Megham" violin instrumental automatically upon opening the invitation.
 * No visible music player icon/button as requested.
 */

let bgAudio = null;
let hasStarted = false;

export function startBackgroundMusic() {
  if (!bgAudio) {
    bgAudio = document.getElementById('bg-music') || new Audio('/wedding.mp3');
    if (!bgAudio.id) bgAudio.id = 'bg-music';
    bgAudio.loop = true;
    bgAudio.preload = 'auto';
  }

  if (hasStarted && !bgAudio.paused) return;

  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      hasStarted = true;
      
      // Gentle smooth fade-in to pleasant volume
      let vol = 0;
      bgAudio.volume = 0;
      const fadeTimer = setInterval(() => {
        vol = Math.min(0.8, vol + 0.08);
        bgAudio.volume = vol;
        if (vol >= 0.8) {
          clearInterval(fadeTimer);
        }
      }, 60);
    }).catch(() => {
      // Browser autoplay policy blocked unmuted audio until user interaction
    });
  }
}

export function initBackgroundMusic() {
  // Pre-load audio object without autoplaying
  if (!bgAudio) {
    bgAudio = document.getElementById('bg-music') || new Audio('/wedding.mp3');
    if (!bgAudio.id) bgAudio.id = 'bg-music';
    bgAudio.loop = true;
    bgAudio.preload = 'auto';
  }
}
