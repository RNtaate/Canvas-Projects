import Particle from './Particle';
import './styles/main.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

['load', 'resize'].forEach((event) => {
  window.addEventListener(event, () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });
});

const particlesNumber = 200;
const particles = [];
const PARTICLE_RADIUS = 3;
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

  particles.forEach((particle, index) => {
    if (particle.alpha > 0) {
      particle.update(context, GRAVITY, FRICTION);
    } else {
      particles.slice(index, 1);
    }
  });
}

animate();
