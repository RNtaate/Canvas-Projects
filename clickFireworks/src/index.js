import Particle from './Particle';
import Projectile from './Projectile';
import './styles/main.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

function writeInstruction(canvas, canvasContext) {
  canvasContext.beginPath();
  canvasContext.font = canvas.width * 0.045 + 'px Arial';
  canvasContext.textAlign = 'center';
  canvasContext.textBaseline = 'middle';
  canvasContext.strokeStyle = '#444';
  canvasContext.strokeText(
    'click on screen for fireworks',
    canvas.width / 2,
    canvas.height / 2
  );
  canvasContext.closePath();
}

['load', 'resize'].forEach((event) => {
  window.addEventListener(event, () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });
});

const particlesNumber = 200;
const particles = [];
const projectiles = [];
const PARTICLE_RADIUS = 2;
const GRAVITY = 0.02;
const FRICTION = 0.99;
const POWER = 8;

canvas.addEventListener('click', (event) => {
  for (let i = 1; i <= particlesNumber; i++) {
    let angle = ((Math.PI * 2) / particlesNumber) * i;
    let xDirection = Math.cos(angle) * Math.random() * POWER;
    let yDirection = Math.sin(angle) * Math.random() * POWER;
    let particle = new Particle(event.clientX, event.clientY, PARTICLE_RADIUS, {
      x: xDirection,
      y: yDirection,
    });
    particles.push(particle);
  }
  console.log(particles.length);
});

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  context.fillRect(0, 0, canvas.width, canvas.height); //clear the canvas on every frame refresh then draw.
  writeInstruction(canvas, context);

  particles.forEach((particle, index) => {
    if (particle.alpha > 0) {
      particle.update(context, GRAVITY, FRICTION);
    } else {
      particles.slice(index, 1);
    }
  });
}

animate();
