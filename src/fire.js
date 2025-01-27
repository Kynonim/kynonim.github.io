const canvas = document.getElementById("kembang-api");
const ctx = canvas.getContext("2d");
const title = document.getElementById("title");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class for individual sparks
class Particle {
  constructor(x, y, color, speed, angle) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.radius = Math.random() * 2 + 1;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.alpha = 1; // Opacity
    this.gravity = 0.05; // Simulate downward pull
    this.friction = 0.98; // Simulate air resistance
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.01; // Fade out
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Firework class
class Firework {
  constructor(x, y, color, particleCount) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.particles.push(new Particle(this.x, this.y, this.color, speed, angle));
    }
  }

  update() {
    this.particles.forEach((particle, index) => {
      particle.update();
      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      }
    });
  }

  draw() {
    this.particles.forEach((particle) => particle.draw());
  }
}

const fireworks = [];

// Generate a random color
function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Animation loop
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Slight trail effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create random fireworks
  if (Math.random() < 0.05) {
    fireworks.push(
      new Firework(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        randomColor(),
        Math.random() * 100 + 50 // Random number of particles
      )
    );
  }

  // Update and draw fireworks
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.particles.length === 0) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const tahun = new Date().getFullYear() + 1;
title.innerHTML = `🎉 Tahun Baru ${tahun} 🎆`
