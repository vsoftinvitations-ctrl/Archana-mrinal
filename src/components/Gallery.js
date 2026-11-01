import { weddingData } from '../data/wedding-data.js';

/**
 * Scroll-Driven Frameless Story Gallery
 * Pins in viewport while scrolling smoothly through story images with resting zones,
 * then seamlessly continues to the next sections.
 */
export function renderGallery() {
  const { galleryImages } = weddingData;
  const storyImages = galleryImages.slice(0, 3);

  const slidesHtml = storyImages
    .map(
      (img, idx) => `
      <div class="story-frameless-slide" data-index="${idx}">
        <div class="story-img-container">
          <img
            src="${img.src}"
            alt="${img.alt}"
            loading="${idx === 0 ? 'eager' : 'lazy'}"
            class="story-frameless-img"
          />
          <div class="story-img-overlay">
            <span class="story-badge">Chapter 0${idx + 1}</span>
            <p class="story-caption">${img.caption || ''}</p>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  const dotsHtml = storyImages
    .map(
      (_, idx) => `
      <button class="story-pill-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Story Slide ${idx + 1}"></button>
    `
    )
    .join('');

  return `
    <section id="photo-gallery" class="story-scroll-section">
      <!-- Sticky stage pinned during scroll -->
      <div class="story-sticky-stage" id="story-sticky-stage">
        
        <!-- Header -->
        <div class="story-stage-header">
          <h2 class="gallery-section-title">OUR STORY</h2>
          <p class="gallery-subtitle">Moments captured along our path to forever</p>
          <div class="section-divider" style="margin-top: 0.4rem; margin-bottom: 1.25rem;">
            <img src="/assets/kerala-divider.svg" alt="Kerala Divider" width="220" height="22" />
          </div>
        </div>

        <!-- Frameless Slide Stage (Images Move smoothly as you scroll) -->
        <div class="story-frameless-stage" id="story-frameless-stage">
          ${slidesHtml}
        </div>

        <!-- Bottom Progress Controls & Counter -->
        <div class="story-stage-footer">
          <div class="story-step-pills">
            ${dotsHtml}
          </div>
          <span class="story-step-counter" id="story-step-counter">01 / 0${storyImages.length}</span>
        </div>

      </div>
    </section>
  `;
}

export function initGalleryCarousel() {
  const section = document.getElementById('photo-gallery');
  if (!section) return;

  const slides = Array.from(section.querySelectorAll('.story-frameless-slide'));
  const dots = Array.from(section.querySelectorAll('.story-pill-dot'));
  const counter = document.getElementById('story-step-counter');
  const totalSlides = slides.length;
  if (totalSlides < 2) return;

  // Calculates smooth virtual progress (0 to totalSlides - 1) with generous resting zones
  function calculateVirtualProgress(P) {
    if (P <= 0.22) {
      return 0; // Slide 1 resting zone
    }
    if (P < 0.44) {
      // Gentle, smooth cubic transition from Slide 1 to 2
      const t = (P - 0.22) / 0.22;
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      return eased;
    }
    if (P <= 0.66) {
      return 1; // Slide 2 resting zone
    }
    if (P < 0.88) {
      // Gentle, smooth cubic transition from Slide 2 to 3
      const t = (P - 0.66) / 0.22;
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      return 1 + eased;
    }
    return 2; // Slide 3 resting zone
  }

  let currentV = 0;
  let targetV = 0;
  let isAnimating = false;
  let lastActiveIndex = 0;

  function renderFrame() {
    // Smooth damped interpolation (lerp) for silky cinematic motion
    currentV += (targetV - currentV) * 0.12;
    if (Math.abs(targetV - currentV) < 0.001) {
      currentV = targetV;
    }

    slides.forEach((slide, idx) => {
      const diff = idx - currentV;
      const translateX = diff * 65; // percentage offset
      const scale = Math.max(0.88, 1 - Math.abs(diff) * 0.08);
      const opacity = Math.max(0, Math.min(1, 1 - Math.abs(diff) * 1.35));

      slide.style.transform = `translate3d(${translateX}%, 0, 0) scale(${scale})`;
      slide.style.opacity = opacity.toFixed(3);
      slide.style.pointerEvents = Math.abs(diff) < 0.3 ? 'auto' : 'none';
      slide.style.zIndex = Math.abs(diff) < 0.5 ? '3' : '1';
    });

    const activeIdx = Math.max(0, Math.min(totalSlides - 1, Math.round(currentV)));
    if (activeIdx !== lastActiveIndex) {
      lastActiveIndex = activeIdx;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
      if (counter) {
        counter.textContent = `0${activeIdx + 1} / 0${totalSlides}`;
      }
    }

    if (currentV !== targetV) {
      requestAnimationFrame(renderFrame);
    } else {
      isAnimating = false;
    }
  }

  function startAnimation() {
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(renderFrame);
    }
  }

  function handleScroll() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    if (totalScrollable <= 0) return;

    const scrollProgress = -rect.top / totalScrollable;
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    targetV = calculateVirtualProgress(clampedProgress);
    startAnimation();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial frame
  handleScroll();

  // Helper to scroll smoothly to a specific slide resting zone
  function scrollToSlide(targetIndex) {
    const rect = section.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const targetP = targetIndex === 0 ? 0.11 : targetIndex === 1 ? 0.55 : 0.89;
    const targetScrollY = window.scrollY + rect.top + targetP * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }

  // Touch swipe support on frameless stage
  const stage = section.querySelector('#story-frameless-stage');
  if (stage) {
    let startX = 0;
    let startY = 0;
    stage.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - startX;
      const diffY = e.changedTouches[0].clientY - startY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0 && lastActiveIndex < totalSlides - 1) {
          scrollToSlide(lastActiveIndex + 1);
        } else if (diffX > 0 && lastActiveIndex > 0) {
          scrollToSlide(lastActiveIndex - 1);
        }
      }
    }, { passive: true });
  }

  // Tap dots to transition smoothly
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(targetIndex)) {
        scrollToSlide(targetIndex);
      }
    });
  });
}
