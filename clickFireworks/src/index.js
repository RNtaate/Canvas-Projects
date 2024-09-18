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
let particles = [];
const projectiles = [];
const PARTICLE_RADIUS = 2;
const GRAVITY = 0.02;
const FRICTION = 0.99;
const POWER = 8;

function createExplosion(
  xOrigin,
  yOrigin,
  radiusPerParticle,
  particlesNumber,
  power
) {
  let particlesArray = [];
  for (let i = 1; i <= particlesNumber; i++) {
    let angle = ((Math.PI * 2) / particlesNumber) * i;
    let xDirection = Math.cos(angle) * Math.random() * power;
    let yDirection = Math.sin(angle) * Math.random() * power;
    let particle = new Particle(xOrigin, yOrigin, radiusPerParticle, {
      x: xDirection,
      y: yDirection,
    });
    particlesArray.push(particle);
  }
  return particlesArray;
}

canvas.addEventListener('click', (event) => {
  let projectile = new Projectile(
    event.clientX,
    canvas.height,
    3,
    {
      x: 0,
      y: -POWER,
    },
    { x: event.clientX, y: event.clientY }
  );
  projectiles.push(projectile);
});

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  context.fillRect(0, 0, canvas.width, canvas.height); //clear the canvas on every frame refresh then draw.
  writeInstruction(canvas, context);

  projectiles.forEach((projectile, index) => {
    if (projectile.y <= projectile.targetPoint.y) {
      projectiles.splice(index, 1);
      let returnedArray = createExplosion(
        projectile.x,
        projectile.y,
        PARTICLE_RADIUS,
        particlesNumber,
        POWER
      );
      particles = particles.concat(returnedArray);
    } else {
      projectile.update(context);
    }
  });

  particles.forEach((particle, index) => {
    if (particle.alpha > 0) {
      particle.update(context, GRAVITY, FRICTION);
    } else {
      particles.slice(index, 1);
    }
  });
}

animate();
