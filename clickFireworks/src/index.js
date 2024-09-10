import Particle from './Particle';
import './styles/main.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const particlesNumber = 200;
const particles = [];
const PARTICLE_RADIUS = 10;
const GRAVITY = 0.1;
const FRICTION = 0.99;
const POWER = 2;
const RATE_MULTIPLIER = 5;

canvas.addEventListener('click', (event) => {
  for (let i = 1; i <= particlesNumber; i++) {
    let angle = ((Math.PI * 2) / particlesNumber) * i;
    let xDirection =
      Math.cos(angle) * Math.floor(Math.random() * RATE_MULTIPLIER + 1) * POWER;
    let yDirection =
      Math.sin(angle) * Math.floor(Math.random() * RATE_MULTIPLIER + 1) * POWER;
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
  for (let particle of particles) {
    particle.update(context, GRAVITY, FRICTION);
  }
}

animate();
