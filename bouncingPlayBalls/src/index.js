import Ball from './ball';
import './styles/index.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const ball = new Ball(canvas.width / 2, canvas.height / 2, 30, 2);

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  ball.update(canvas, context);
}

animate();
