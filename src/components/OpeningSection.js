import { weddingData } from '../data/wedding-data.js';

export function renderOpeningSection() {
  const { bride, groom, event } = weddingData;

  return `
    <section class="opening-section" id="opening">
      <div class="opening-card-container">
        <div class="opening-border-motif"></div>

        <div class="opening-content">

          <!-- Minimal Standard Pre-title -->
          <div class="opening-pretitle reveal-on-scroll revealed reveal-delay-1">
            Wedding Invitation
          </div>

          <!-- Elegant Standard Invitation Line -->
          <p class="opening-blessing-en reveal-on-scroll revealed reveal-delay-1">
            Together with our families, we joyfully invite you to celebrate the wedding of
          </p>

          <!-- Couple Names (Central Visual Focus) -->
          <h1 class="opening-couple-names reveal-on-scroll revealed reveal-delay-2">
            <span class="couple-name bride-name">${bride.shortName || 'Dr. Arunima'}</span>
            <span class="opening-couple-ampersand">&amp;</span>
            <span class="couple-name groom-name">${groom.shortName || 'Abhijith'}</span>
          </h1>

          <!-- Date & Location Minimal Standard Block -->
          <div class="opening-date-location reveal-on-scroll revealed reveal-delay-3">
            <div class="opening-date-text">${event.dateDisplay}</div>
            <div class="opening-venue-text">${event.venueName} &bull; ${event.city}</div>
          </div>

          <!-- Subtle Minimal Gold Divider -->
          <div class="opening-divider-accent reveal-on-scroll revealed reveal-delay-3">
            <span class="divider-line"></span>
            <span class="divider-diamond">&#9670;</span>
            <span class="divider-line"></span>
          </div>

          <!-- Gentle Downward Scroll Trigger -->
          <button class="scroll-invitation-btn" id="scroll-to-invitation" aria-label="Scroll to Invitation">
            <span>Explore Invitation</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  `;
}

export function initOpeningInteractions() {
  const scrollBtn = document.getElementById('scroll-to-invitation');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const target = document.getElementById('getting-married') || document.getElementById('couple-introduction');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
