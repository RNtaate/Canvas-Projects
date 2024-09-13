import Ball from './ball';
import './styles/index.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let ballArray = [];
const numberOfBalls = 200;
const GRAVITY = 0.5;
const ENERGY_LOSS = 0.98;
const radius = 30;

canvas.addEventListener('click', () => {
  ballArray = [];
  spawnBalls(canvas, radius, numberOfBalls);
});

function spawnBalls(canvas, ballRadius, numberOfBalls) {
  for (let i = 1; i <= numberOfBalls; i++) {
    //-----------------------------------------------------------------------------------------
    // Calculating to ensure no ball is spawned beyond the screen
    let minX = ballRadius;
    let maxX = canvas.width - ballRadius;
    let minY = ballRadius;
    let maxY = canvas.height - ballRadius;
    let guessedX = Math.floor(Math.random() * (maxX - minX) + minX);
    let guessedY = Math.floor(Math.random() * (maxY - minY) + minY);
    //------------------------------------------------------------------------------------------
    const ball = new Ball(guessedX, guessedY, ballRadius, { x: 1, y: 2 });
    ballArray.push(ball);
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  ballArray.forEach((ball) => {
    ball.update(canvas, context, GRAVITY, ENERGY_LOSS);
  });
}

animate();
