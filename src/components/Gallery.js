import { weddingData } from '../data/wedding-data.js';

export function renderGallery() {
  const { galleryImages } = weddingData;
  const storyImages = galleryImages.slice(0, 3);

  const cardsHtml = storyImages
    .map(
      (img, idx) => `
      <div class="story-photo-card reveal-on-scroll" data-index="${idx}">
        <div class="photo-card-inner">
          <div class="photo-mat-frame">
            <!-- 4 Delicate Gold Corner Photo Brackets -->
            <span class="photo-corner corner-tl"></span>
            <span class="photo-corner corner-tr"></span>
            <span class="photo-corner corner-bl"></span>
            <span class="photo-corner corner-br"></span>

            <img src="${img.src}" alt="${img.alt}" loading="lazy" />

            <div class="photo-hover-veil">
              <button class="photo-zoom-btn" data-index="${idx}" aria-label="Enlarge photo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  return `
    <section id="photo-gallery" class="gallery-section">
      <h2 class="gallery-section-title reveal-on-scroll">OUR STORY</h2>
      <p class="gallery-subtitle reveal-on-scroll">Moments captured along our path to forever</p>
      <div class="gallery-accent-line reveal-on-scroll"></div>

      <!-- 3-Card Cluster matching reference image in both desktop and mobile -->
      <div class="gallery-showcase-container reveal-on-scroll" id="wedding-gallery-showcase">
        <div class="story-cards-cluster" id="gallery-row-track">
          ${cardsHtml}
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div class="lightbox-modal" id="gallery-lightbox" aria-hidden="true" role="dialog">
        <button class="lightbox-close-btn" id="lightbox-close" aria-label="Close Lightbox">&times;</button>
        <button class="lightbox-nav-btn lightbox-prev-btn" id="lightbox-prev" aria-label="Previous Photo">&#10094;</button>
        <button class="lightbox-nav-btn lightbox-next-btn" id="lightbox-next" aria-label="Next Photo">&#10095;</button>
        <div class="lightbox-content">
          <span class="lightbox-badge" id="lightbox-badge"></span>
          <img id="lightbox-img" src="" alt="Enlarged photo" />
          <div class="lightbox-caption" id="lightbox-caption"></div>
        </div>
      </div>
    </section>
  `;
}

export function initGalleryCarousel() {
  const container = document.getElementById('wedding-gallery-showcase');
  if (!container) return;

  const track = document.getElementById('gallery-row-track');
  const cards = track ? track.querySelectorAll('.story-photo-card') : [];
  const dots = container.querySelectorAll('.gallery-dot');
  const revealBtn = document.getElementById('open-interactive-gallery');

  // Lightbox elements
  const modal = document.getElementById('gallery-lightbox');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const modalBadge = document.getElementById('lightbox-badge');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let activeLightboxIndex = 0;
  const totalImages = weddingData.galleryImages.length;

  function updateLightbox(idx) {
    if (idx < 0) idx = totalImages - 1;
    if (idx >= totalImages) idx = 0;
    activeLightboxIndex = idx;

    const item = weddingData.galleryImages[activeLightboxIndex];
    if (!item) return;

    modalImg.src = item.src;
    modalImg.alt = item.alt;
    if (modalCaption) modalCaption.textContent = item.caption || '';
    if (modalBadge) modalBadge.textContent = '';
  }

  function openLightbox(idx) {
    updateLightbox(idx);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind clicks to open lightbox
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      openLightbox(0);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(activeLightboxIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(activeLightboxIndex + 1);
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(activeLightboxIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(activeLightboxIndex + 1);
  });

  // Mobile horizontal scroll tracking for dots
  if (track && dots.length > 0) {
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const targetCard = cards[idx];
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    });

    let scrollTimeout = null;
    track.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;
        let closestIdx = 0;
        let closestDistance = Infinity;

        cards.forEach((card, idx) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(cardCenter - trackCenter);
          if (dist < closestDistance) {
            closestDistance = dist;
            closestIdx = idx;
          }
        });

        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === closestIdx);
        });
      }, 50);
    }, { passive: true });
  }
}
