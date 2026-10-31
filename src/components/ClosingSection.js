import { weddingData } from '../data/wedding-data.js';

export function renderClosingSection() {
  const { texts, bride, groom } = weddingData;

  return `
    <footer id="closing-blessings" class="closing-section">
      <!-- Inscription in English -->
      <div class="closing-blessing-en reveal-on-scroll">
        ${texts.finalBlessingEnglish}
      </div>

      <div class="section-divider reveal-on-scroll">
        <img src="/assets/kerala-divider.svg" alt="Kerala Divider" width="280" height="28" />
      </div>

      <!-- With Love Signature -->
      <div class="closing-with-love reveal-on-scroll">
        ${texts.withLove}
      </div>

      <div class="closing-couple-names reveal-on-scroll">
        <span class="closing-name">Arunima</span>
        <span class="closing-script-amp">&amp;</span>
        <span class="closing-name">Abhijith</span>
      </div>
    </footer>
  `;
}
