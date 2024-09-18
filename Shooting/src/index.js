import Player from './components/Player';
import Bullet from './components/Bullet';
import './styles/index.css';

const canvas = document.querySelector('#gameCanvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bullets = [];

const playerRadius = 20;
const bulletRadius = 4;

const player = new Player(canvas.width / 2, canvas.height / 2, playerRadius);

window.addEventListener('click', (event) => {
  let x2 = event.clientX;
  let y2 = event.clientY;
  let angle = Math.atan2(y2 - canvas.height / 2, x2 - canvas.width / 2);
  let bullet = new Bullet(canvas.width / 2, canvas.height / 2, bulletRadius, {
    x: Math.cos(angle),
    y: Math.sin(angle),
  });
  bullets.push(bullet);
});

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update(c);
  bullets.forEach((bullet) => {
    bullet.update(c);
  });
}

animate();
