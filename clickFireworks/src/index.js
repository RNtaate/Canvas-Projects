import Particle from './Particle';
import './styles/main.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const particlesNumber = 20;
const particles = [];
const PARTICLE_RADIUS = 10;

canvas.addEventListener('click', (event) => {
  for (let i = 1; i <= particlesNumber; i++) {
    let particle = new Particle(event.clientX, event.clientY, PARTICLE_RADIUS);
    particles.push(particle);
  }
  console.log(particles.length);
});

function animate() {
  window.requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas on every frame refresh then draw.
  for (let particle of particles) {
    particle.draw(context);
  }
}

animate();
