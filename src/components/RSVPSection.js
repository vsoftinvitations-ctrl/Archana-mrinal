import { weddingData } from '../data/wedding-data.js';

/**
 * Minimal RSVP Component with Direct WhatsApp Link
 */
export function renderRSVPSection() {
  const { rsvp } = weddingData;
  const acceptUrl = `https://api.whatsapp.com/send?phone=${rsvp.whatsappNumber}&text=${encodeURIComponent(rsvp.acceptMessage || rsvp.whatsappMessage)}`;
  const declineUrl = `https://api.whatsapp.com/send?phone=${rsvp.whatsappNumber}&text=${encodeURIComponent(rsvp.declineMessage)}`;

  const whatsappIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.48c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.18-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
    </svg>
  `;

  return `
    <section id="rsvp-section" class="rsvp-section">
      <div class="kasavu-card rsvp-card reveal-on-scroll">
        <span class="rsvp-tagline">R. S. V. P</span>
        <h2 class="rsvp-title">Celebrate With Us</h2>
        <p class="rsvp-subtitle">Please let us know if you will be joining our wedding celebration</p>

        <div class="rsvp-buttons-group">
          <!-- Scenario 1: Accept / Attending -->
          <a
            href="${acceptUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-rsvp btn-rsvp-accept"
            id="btn-rsvp-accept"
            aria-label="RSVP: Delighted to Attend on WhatsApp"
          >
            ${whatsappIcon}
            <span>Will Attend</span>
          </a>

          <!-- Scenario 2: Decline / Unable to Attend -->
          <a
            href="${declineUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-rsvp btn-rsvp-decline"
            id="btn-rsvp-decline"
            aria-label="RSVP: Unable to Attend on WhatsApp"
          >
            ${whatsappIcon}
            <span>Unable to Attend</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
