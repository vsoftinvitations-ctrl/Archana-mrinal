import { startBackgroundMusic } from './BackgroundMusic.js';

/**
 * Preloader Component with Brittany Signature Script Handwriting Animation
 * Background: /assets/preloder.png
 * Center Writings:
 *   Arunima
 *   &
 *   Abhijith
 */

export function renderPreloader() {
  return `
    <div id="wedding-preloader" class="wedding-preloader" role="dialog" aria-modal="true" aria-label="Wedding Invitation Preloader">
      <!-- Fullscreen Background Image with Ken Burns effect and cinematic vignette -->
      <div class="preloader-bg-media">
        <img src="/assets/preloder.png" alt="Arunima &amp; Abhijith" class="preloader-bg-img" />
        <div class="preloader-overlay"></div>
      </div>

      <!-- Floating subtle gold stardust / petals -->
      <div class="preloader-particles" aria-hidden="true">
        <span class="preloader-particle p1"></span>
        <span class="preloader-particle p2"></span>
        <span class="preloader-particle p3"></span>
        <span class="preloader-particle p4"></span>
        <span class="preloader-particle p5"></span>
        <span class="preloader-particle p6"></span>
      </div>

      <!-- Initial Gate: Tap to Open Button directly on Background Image -->
      <div class="preloader-gate-wrapper" id="preloader-gate-wrapper">
        <div class="preloader-gate-content">
          <div class="preloader-gate-badge">
            <span class="preloader-tagline">WEDDING INVITATION</span>
          </div>
          <button class="preloader-open-pill-btn ready-pulse" id="preloader-enter-btn" aria-label="Tap to Open Invitation">
            <span class="btn-sparkle">✦</span>
            <span>Tap to Open</span>
            <span class="btn-sparkle">✦</span>
          </button>
        </div>
      </div>

      <!-- Center Content: Auspicious Monogram + Handwriting Script (Reveals after tap) -->
      <div class="preloader-content" id="preloader-content-box">
        <!-- Top Inscription -->
        <div class="preloader-top-badge">
          <span class="preloader-tagline">WEDDING INVITATION</span>
        </div>

        <!-- Brittany Signature Script Handwriting Animation Container -->
        <div class="preloader-script-container" id="preloader-script-box">
          <!-- Line 1: Arunima -->
          <div class="script-line script-arunima script-rahul">
            <span class="script-text">Arunima</span>
            <span class="calligraphy-pen-spark" id="spark-arunima"></span>
          </div>

          <!-- Line 2: & Ampersand -->
          <div class="script-line script-ampersand">
            <span class="script-text">&amp;</span>
          </div>

          <!-- Line 3: Abhijith -->
          <div class="script-line script-abhijith script-anjana">
            <span class="script-text">Abhijith</span>
            <span class="calligraphy-pen-spark" id="spark-abhijith"></span>
          </div>

          <!-- Calligraphy Flourish Line underneath -->
          <div class="flourish-wrap">
            <svg class="calligraphy-flourish" viewBox="0 0 280 26" fill="none" preserveAspectRatio="none">
              <path class="flourish-path" d="M14,14 C65,4 105,6 140,16 C175,24 215,10 266,8" stroke="url(#goldFlourishGrad)" stroke-width="2.2" stroke-linecap="round" />
              <defs>
                <linearGradient id="goldFlourishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(245, 230, 180, 0.1)" />
                  <stop offset="35%" stop-color="rgba(255, 235, 170, 0.95)" />
                  <stop offset="70%" stop-color="rgba(218, 165, 32, 0.95)" />
                  <stop offset="100%" stop-color="rgba(245, 230, 180, 0.1)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <!-- Subtitle & Date -->
        <div class="preloader-subtext">
          <p class="preloader-date">12 . DECEMBER . 2026</p>
        </div>
      </div>
    </div>
  `;
}

export function initPreloader() {
  const preloader = document.getElementById('wedding-preloader');
  if (!preloader) return;

  // Lock body scroll while preloader is visible
  document.body.classList.add('preloader-active');

  // Pre-load font immediately in background
  if (document.fonts && document.fonts.load) {
    document.fonts.load('48px "Brittany Signature"').catch(() => {});
  }

  let stage = 'waiting'; // 'waiting' | 'revealing' | 'dismissed'
  let autoDismissTimer = null;

  function handleTapToOpen() {
    if (stage !== 'waiting') {
      // If user taps again while names are revealing, immediately reveal the inner side
      if (stage === 'revealing') {
        dismissPreloader();
      }
      return;
    }

    stage = 'revealing';

    // 1. User gesture unlocks audio playback immediately
    startBackgroundMusic();

    // 2. Start handwriting name reveal animation on background image
    preloader.classList.add('preloader-animating');

    // 3. Golden shimmer sweep on signature after writing finishes (5.5s)
    setTimeout(() => {
      const scriptBox = document.getElementById('preloader-script-box');
      if (scriptBox) {
        scriptBox.classList.add('shimmer-active');
        scriptBox.querySelectorAll('.script-text').forEach((el) => {
          el.style.clipPath = 'none';
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        });
      }
    }, 5500);

    // 4. Leisurely pause to enjoy the sweet violin melody and names, then smoothly reveal the inner side (8.0s)
    autoDismissTimer = setTimeout(() => {
      dismissPreloader();
    }, 8000);
  }

  function dismissPreloader() {
    if (stage === 'dismissed') return;
    stage = 'dismissed';
    if (autoDismissTimer) clearTimeout(autoDismissTimer);

    // Ensure music is active
    startBackgroundMusic();

    preloader.classList.add('preloader-fade-out');
    document.body.classList.remove('preloader-active');

    // Matches the 1.8s slow, silky dissolve transition
    setTimeout(() => {
      preloader.style.display = 'none';
      preloader.setAttribute('aria-hidden', 'true');
    }, 1850);
  }

  // Click on "Tap to Open" button or anywhere on screen
  const enterBtn = document.getElementById('preloader-enter-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleTapToOpen();
    });
  }

  preloader.addEventListener('click', () => {
    handleTapToOpen();
  });

  // Also support keyboard Enter/Space/Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      handleTapToOpen();
    }
  });
}
