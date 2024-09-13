import Ball from './ball';
import './styles/index.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const balls = [];
const numberOfBalls = 20;
const GRAVITY = 0.5;
const ENERGY_LOSS = 0.98;
const radius = 30;

for (let i = 1; i <= numberOfBalls; i++) {
  let minX = radius;
  let maxX = canvas.width - radius;
  let minY = radius;
  let maxY = canvas.height - radius;
  let guessedX = Math.floor(Math.random() * (maxX - minX) + minX);
  let guessedY = Math.floor(Math.random() * (maxY - minY) + minY);
  console.log(guessedX, guessedY);
  const ball = new Ball(guessedX, guessedY, radius, 2);
  balls.push(ball);
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.update(canvas, context, GRAVITY, ENERGY_LOSS);
  });
}

animate();
