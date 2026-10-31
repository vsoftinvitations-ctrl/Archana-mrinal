import { weddingData } from '../data/wedding-data.js';

export function renderFamilySection() {
  const { texts, bride, groom } = weddingData;

  return `
    <section id="family-blessings" class="family-section">
      <h2 class="family-section-title reveal-on-scroll">
        ${texts.familyHeading}
      </h2>
      <div class="section-divider reveal-on-scroll">
        <img src="/assets/kerala-divider.svg" alt="Kerala Divider" width="280" height="28" />
      </div>

      <div class="family-grid">
        <!-- Bride's Family -->
        <div class="kasavu-card family-card reveal-on-scroll reveal-delay-1">
          <div class="family-role-badge">Bride's Family</div>
          <div class="family-parent-names">
            Sri. ${bride.parents.father}
            <br />
            &amp; Smt. ${bride.parents.mother}
          </div>
          ${bride.siblingsDisplay ? `
            <div class="family-card-divider"></div>
            <div class="family-siblings-block">
              <span class="family-sibling-label">${bride.siblingLabel || 'Sister'}</span>
              <span class="family-sibling-names">${bride.siblingsDisplay}</span>
            </div>
          ` : ''}
        </div>

        <!-- Groom's Family -->
        <div class="kasavu-card family-card reveal-on-scroll reveal-delay-2">
          <div class="family-role-badge">Groom's Family</div>
          <div class="family-parent-names">
            Sri. ${groom.parents.father}
            <br />
            &amp; Smt. ${groom.parents.mother}
          </div>
          ${groom.siblingsDisplay ? `
            <div class="family-card-divider"></div>
            <div class="family-siblings-block">
              <span class="family-sibling-label">${groom.siblingLabel || 'Siblings'}</span>
              <span class="family-sibling-names">${groom.siblingsDisplay}</span>
            </div>
          ` : ''}
        </div>
      </div>
    </section>
  `;
}
