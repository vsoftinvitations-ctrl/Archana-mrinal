import { weddingData } from '../data/wedding-data.js';

export function renderCountdown() {
  const { texts } = weddingData;

  return `
    <section id="countdown-section" class="countdown-section">
      <div class="kasavu-card countdown-card" style="padding: clamp(2rem, 5vw, 3.5rem) 1.5rem; max-width: 720px; margin: 0 auto;">
        <h2 class="countdown-heading reveal-on-scroll">${texts.countdownHeading}</h2>

        <div class="countdown-grid reveal-on-scroll">
          <div class="countdown-box">
            <span class="countdown-number" id="cd-days">00</span>
            <span class="countdown-label">Days</span>
          </div>

          <span class="countdown-separator">:</span>

          <div class="countdown-box">
            <span class="countdown-number" id="cd-hours">00</span>
            <span class="countdown-label">Hours</span>
          </div>

          <span class="countdown-separator">:</span>

          <div class="countdown-box">
            <span class="countdown-number" id="cd-minutes">00</span>
            <span class="countdown-label">Minutes</span>
          </div>

          <span class="countdown-separator">:</span>

          <div class="countdown-box">
            <span class="countdown-number" id="cd-seconds">00</span>
            <span class="countdown-label">Seconds</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initCountdownTimer() {
  const targetDate = new Date(weddingData.event.targetCountdownDate).getTime();
  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');
  const elSeconds = document.getElementById('cd-seconds');

  if (!elDays || !elHours || !elMinutes || !elSeconds) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}
