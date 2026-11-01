import { weddingData } from '../data/wedding-data.js';

/**
 * Scroll-Driven Frameless Story Gallery
 * Pins in viewport while scrolling through story images, then continues to next section.
 */
export function renderGallery() {
  const { galleryImages } = weddingData;
  const storyImages = galleryImages.slice(0, 3);

  const slidesHtml = storyImages
    .map(
      (img, idx) => `
      <div class="story-frameless-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
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

        <!-- Frameless Slide Stage (Images Move as you scroll) -->
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

  const slides = section.querySelectorAll('.story-frameless-slide');
  const dots = section.querySelectorAll('.story-pill-dot');
  const counter = document.getElementById('story-step-counter');
  const totalSlides = slides.length;
  if (totalSlides < 2) return;

  let currentActiveIndex = 0;

  function setActiveSlide(index) {
    if (index === currentActiveIndex) return;
    currentActiveIndex = index;

    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev', 'next');
      if (idx === index) {
        slide.classList.add('active');
      } else if (idx < index) {
        slide.classList.add('prev');
      } else {
        slide.classList.add('next');
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    if (counter) {
      counter.textContent = `0${index + 1} / 0${totalSlides}`;
    }
  }

  // Scroll-driven calculation: moves images as user scrolls through the section
  function handleScroll() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    if (totalScrollable <= 0) return;

    // How far through the section the user has scrolled (0 to 1)
    const scrollProgress = -rect.top / totalScrollable;
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Determine target slide index
    const targetIndex = Math.min(
      Math.floor(clampedProgress * totalSlides),
      totalSlides - 1
    );

    setActiveSlide(targetIndex);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Touch swipe support on the frameless stage
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
        let newIndex = currentActiveIndex;
        if (diffX < 0 && currentActiveIndex < totalSlides - 1) {
          newIndex = currentActiveIndex + 1;
        } else if (diffX > 0 && currentActiveIndex > 0) {
          newIndex = currentActiveIndex - 1;
        }
        if (newIndex !== currentActiveIndex) {
          const rect = section.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          const targetScrollY = window.scrollY + rect.top + (newIndex / (totalSlides - 1)) * totalScrollable;
          window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
        }
      }
    }, { passive: true });
  }

  // Also support tapping the indicator pills to smoothly transition to that moment
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(targetIndex)) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = rect.height - windowHeight;
        const targetScrollY = window.scrollY + rect.top + (targetIndex / (totalSlides - 1)) * totalScrollable;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    });
  });
}
