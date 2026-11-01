/**
 * Realistic Falling Rose Petals
 * Subtly maintains only 3 to 6 soft rose petals gracefully drifting down the screen.
 * Natural organic sway, gentle 3D rotation, and translucent velvety pink hues.
 */

export function initRosePetals() {
  const canvas = document.createElement('canvas');
  canvas.id = 'rose-petals-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Responsive petal count: delicate continuous red petal drift
  const getPetalCount = () => (window.innerWidth <= 768 ? 9 : 14);
  let maxPetals = getPetalCount();
  const petals = [];

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    maxPetals = getPetalCount();
    while (petals.length < maxPetals) {
      petals.push(new Petal(false));
    }
  });

  class Petal {
    constructor(initial = false) {
      this.reset(initial);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      // If initial, scatter vertically across screen; otherwise start above viewport
      this.y = initial ? Math.random() * height : -25 - Math.random() * 40;
      this.size = 9 + Math.random() * 6; // Dainty, elegant 9px to 15px petite petals
      this.speedY = 0.35 + Math.random() * 0.42; // Soft natural descent
      this.speedX = 0;
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.018;
      this.oscillationFreq = 0.009 + Math.random() * 0.012;
      this.oscillationAmp = 0.5 + Math.random() * 0.7;
      this.time = Math.random() * 1000;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = 0.012 + Math.random() * 0.016;
      // Vibrant red rose tones
      this.opacity = 0.72 + Math.random() * 0.22;
      this.hue = 352 + (Math.random() * 6 - 3); // Pure velvety red
    }

    update() {
      this.time += 1;
      this.y += this.speedY;
      this.x += Math.sin(this.time * this.oscillationFreq) * this.oscillationAmp;
      this.angle += this.rotationSpeed;
      this.flip += this.flipSpeed;

      // Reset when falling out of viewport
      if (this.y > height + 40 || this.x < -40 || this.x > width + 40) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      // Simulate 3D leaf tilt/flip
      ctx.scale(1, Math.sin(this.flip));

      // Draw organic curved petal
      const w = this.size * 0.75;
      const h = this.size;

      const grad = ctx.createRadialGradient(0, -h * 0.15, h * 0.08, 0, 0, h);
      grad.addColorStop(0, `hsla(${this.hue}, 92%, 56%, ${this.opacity})`);
      grad.addColorStop(0.55, `hsla(${this.hue}, 88%, 38%, ${this.opacity * 0.98})`);
      grad.addColorStop(1, `hsla(${this.hue}, 85%, 24%, ${this.opacity * 0.95})`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      // Soft heart/oval curvature of real rose petal
      ctx.bezierCurveTo(-w * 1.2, h * 0.3, -w * 1.1, -h * 0.4, 0, -h * 0.5);
      ctx.bezierCurveTo(w * 1.1, -h * 0.4, w * 1.2, h * 0.3, 0, h * 0.5);
      ctx.fill();

      // Delicate center highlight vein
      ctx.strokeStyle = `rgba(255, 180, 190, ${this.opacity * 0.35})`;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.3);
      ctx.quadraticCurveTo(w * 0.1, 0, 0, -h * 0.35);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Populate initial petals
  for (let i = 0; i < maxPetals; i++) {
    petals.push(new Petal(true));
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(render);
  }

  render();
}
