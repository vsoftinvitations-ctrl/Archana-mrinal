import { weddingData } from '../data/wedding-data.js';

export function renderOpeningSection() {
  const { bride, groom, event } = weddingData;

  return `
    <section class="opening-section" id="opening">
      <div class="opening-card-container">
        <div class="opening-border-motif"></div>

        <div class="opening-layout-split">
          <!-- TOP BLOCK: Wedding Invitation & Couple Names -->
          <div class="opening-top-block reveal-on-scroll revealed">
            <div class="opening-pretitle">
              Wedding Invitation
            </div>

            <p class="opening-blessing-en">
              Together with our families, we joyfully invite you to celebrate the wedding of
            </p>

            <h1 class="opening-couple-names">
              <span class="couple-name bride-name">${bride.shortName || bride.name}</span>
              <span class="opening-couple-ampersand">&amp;</span>
              <span class="couple-name groom-name">${groom.shortName || groom.name}</span>
            </h1>
          </div>

          <!-- CENTER CLEAR ZONE: Keeps Archana & Mrinal's photo completely visible -->
          <div class="opening-center-clear" aria-hidden="true"></div>

          <!-- BOTTOM BLOCK: Date, Venue, Diamond & Explore -->
          <div class="opening-bottom-block reveal-on-scroll revealed">
            <div class="opening-date-location">
              <div class="opening-date-text">${event.dateDisplay}</div>
              <div class="opening-venue-text">${event.venueName} &bull; ${event.venueAddress || event.city}</div>
            </div>

            <!-- Subtle Minimal Gold Divider -->
            <div class="opening-divider-accent">
              <span class="divider-line"></span>
              <span class="divider-diamond">&#9670;</span>
              <span class="divider-line"></span>
            </div>

            <!-- Gentle Downward Scroll Trigger -->
            <button class="scroll-invitation-btn" id="scroll-to-invitation" aria-label="Scroll Down">
              <span>Scroll Down</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initOpeningInteractions() {
  const scrollBtn = document.getElementById('scroll-to-invitation');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      scrollBtn.classList.add('scroll-btn-hidden');
      const target = document.getElementById('getting-married') || document.getElementById('couple-introduction');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // When scrolling happens anywhere, permanently hide the button
    let hasScrolled = false;
    const handleScroll = () => {
      if (window.scrollY > 30 && !hasScrolled) {
        hasScrolled = true;
        scrollBtn.classList.add('scroll-btn-hidden');
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}
