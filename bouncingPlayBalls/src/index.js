import Ball from './ball';
import randomNumberInRangeGenerator from './HelperMethods/randomNumberInRangeGenerator';
import './styles/index.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

let ballArray = [];
const numberOfBalls = 300;
const GRAVITY = 0.5;
const ENERGY_LOSS = 0.98;

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

canvas.addEventListener('click', () => {
  init();
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
    let vx = 0;
    while (vx == 0) {
      vx = randomNumberInRangeGenerator(-2, 2);
    }
    const ball = new Ball(guessedX, guessedY, ballRadius, {
      x: vx,
      y: randomNumberInRangeGenerator(-2, 2),
    });
    ballArray.push(ball);
  }
}

function init() {
  ballArray = [];
  spawnBalls(canvas, numberOfBalls);
}

function writeInstruction() {
  context.beginPath();
  context.font = `${canvas.width * (3 / 100)}px Arial`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.strokeStyle = '#999';
  context.strokeText(
    'click screen to start animation',
    canvas.width / 2,
    canvas.height / 2
  );
  context.closePath();
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  writeInstruction();
  ballArray.forEach((ball) => {
    ball.update(canvas, context, GRAVITY, ENERGY_LOSS);
  });
}

animate();
