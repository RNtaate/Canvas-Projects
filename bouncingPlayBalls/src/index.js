import Ball from './ball';
import './styles/index.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let balls = [];
const numberOfBalls = 100;
const GRAVITY = 0.5;
const ENERGY_LOSS = 0.98;
const radius = 30;

canvas.addEventListener('click', () => {
  balls = [];
  spawnBalls(canvas, radius, numberOfBalls);
});

function spawnBalls(canvas, ballRadius, numberOfBalls) {
  for (let i = 1; i <= numberOfBalls; i++) {
    let minX = ballRadius;
    let maxX = canvas.width - ballRadius;
    let minY = ballRadius;
    let maxY = canvas.height - ballRadius;
    let guessedX = Math.floor(Math.random() * (maxX - minX) + minX);
    let guessedY = Math.floor(Math.random() * (maxY - minY) + minY);
    console.log(guessedX, guessedY);
    const ball = new Ball(guessedX, guessedY, ballRadius, 2);
    balls.push(ball);
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.update(canvas, context, GRAVITY, ENERGY_LOSS);
  });
}

animate();
