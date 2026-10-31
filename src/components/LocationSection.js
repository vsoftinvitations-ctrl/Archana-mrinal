import { weddingData } from '../data/wedding-data.js';

export function renderLocationSection() {
  const { texts, event } = weddingData;

  return `
    <section id="location-section" class="location-section">
      <div class="kasavu-card location-card reveal-on-scroll">
        <div class="location-card-grid">
          <!-- Left: Venue Stage Image -->
          <div class="location-media-col">
            <img
              src="/assets/venue.png"
              alt="Wedding Venue Stage - ${event.venueName}"
              class="location-venue-img"
              loading="lazy"
            />
          </div>

          <!-- Right: Location & Directions Details -->
          <div class="location-details-col">
            <div class="location-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>

            <h2 class="location-title-en">${texts.locationHeading || 'Join Us to Celebrate Our Wedding'}</h2>
            <div class="section-divider" style="margin-top: 0.75rem; margin-bottom: 1.5rem;">
              <img src="/assets/kerala-divider.svg" alt="Kerala Divider" width="220" height="22" />
            </div>

            <div class="location-venue-name">${event.venueName}</div>
            <div class="location-venue-detail">
              ${event.venueAddress},
              <br />
              ${event.city}
            </div>

            <!-- Directions Action Button -->
            <a href="${event.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-gold" id="btn-get-directions">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
