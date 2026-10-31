import { weddingData } from '../data/wedding-data.js';

export function renderKeralaVisual() {
  const quote = weddingData.texts.weddingTogethernessQuote || "A wedding is the sacred union of two souls and the joyful coming together of two families—bound by love, cherished traditions, and the blessing of a lifetime of togetherness.";

  return `
    <section class="kerala-visual-section">
      <div class="kasavu-card kerala-visual-container reveal-on-scroll">
        <!-- Jasmine Garland Ornament -->
        <div class="kerala-motif-garland">
          <img src="/assets/jasmine-garland.svg" alt="Auspicious Jasmine Garland" width="240" height="40" />
        </div>

        <!-- Wedding & Family Togetherness Line -->
        <p class="kerala-tradition-quote">
          "${quote}"
        </p>

        <!-- Divider with subtle gold accent -->
        <div class="section-divider" style="margin-top: 1.5rem; margin-bottom: 0;">
          <img src="/assets/kerala-divider.svg" alt="Kerala Divider" width="220" height="24" />
        </div>
      </div>
    </section>
  `;
}
