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

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Maximum 5 petals at a time for elegant subtlety
  const MAX_PETALS = 5;
  const petals = [];

  class Petal {
    constructor(initial = false) {
      this.reset(initial);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      // If initial, scatter vertically across screen; otherwise start above viewport
      this.y = initial ? Math.random() * height : -30 - Math.random() * 50;
      this.size = 14 + Math.random() * 10; // 14px to 24px natural petal size
      this.speedY = 0.4 + Math.random() * 0.45; // Very slow natural descent
      this.speedX = 0;
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.015;
      this.oscillationFreq = 0.008 + Math.random() * 0.01;
      this.oscillationAmp = 0.6 + Math.random() * 0.8;
      this.time = Math.random() * 1000;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = 0.01 + Math.random() * 0.015;
      // Soft rose tones
      this.opacity = 0.55 + Math.random() * 0.25;
      this.hue = 354 + (Math.random() * 6 - 3); // Soft Kerala rose pink
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

      const grad = ctx.createRadialGradient(0, -h * 0.1, h * 0.1, 0, 0, h);
      grad.addColorStop(0, `hsla(${this.hue}, 70%, 82%, ${this.opacity})`);
      grad.addColorStop(0.6, `hsla(${this.hue}, 65%, 65%, ${this.opacity * 0.95})`);
      grad.addColorStop(1, `hsla(${this.hue}, 55%, 48%, ${this.opacity * 0.9})`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.5);
      // Soft heart/oval curvature of real rose petal
      ctx.bezierCurveTo(-w * 1.2, h * 0.3, -w * 1.1, -h * 0.4, 0, -h * 0.5);
      ctx.bezierCurveTo(w * 1.1, -h * 0.4, w * 1.2, h * 0.3, 0, h * 0.5);
      ctx.fill();

      // Subtle delicate center highlight
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.28})`;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.3);
      ctx.quadraticCurveTo(w * 0.1, 0, 0, -h * 0.35);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Populate initial petals
  for (let i = 0; i < MAX_PETALS; i++) {
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
