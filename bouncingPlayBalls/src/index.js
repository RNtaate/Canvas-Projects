import Ball from './ball';
import randomNumberInRangeGenerator from './HelperMethods/randomNumberInRangeGenerator';
import './styles/index.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

['load', 'resize'].forEach((eventName) => {
  window.addEventListener(eventName, () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });
});

let ballArray = [];
const numberOfBalls = 300;
const GRAVITY = 0.5;
const ENERGY_LOSS = 0.98;

canvas.addEventListener('click', () => {
  ballArray = [];
  spawnBalls(canvas, numberOfBalls);
});

function spawnBalls(canvas, numberOfBalls) {
  for (let i = 1; i <= numberOfBalls; i++) {
    let ballRadius = randomNumberInRangeGenerator(10, 30);
    //-----------------------------------------------------------------------------------------
    // Calculating to ensure no ball is spawned beyond the screen
    let minX = ballRadius;
    let maxX = canvas.width - ballRadius;
    let minY = ballRadius;
    let maxY = canvas.height - ballRadius;
    let guessedX = randomNumberInRangeGenerator(minX, maxX);
    let guessedY = randomNumberInRangeGenerator(minY, maxY);
    //------------------------------------------------------------------------------------------
    const ball = new Ball(guessedX, guessedY, ballRadius, {
      x: randomNumberInRangeGenerator(-2, 2),
      y: randomNumberInRangeGenerator(-2, 2),
    });
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
