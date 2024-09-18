import Player from './components/Player';
import Bullet from './components/Bullet';
import Enemy from './components/Enemy';
import './styles/index.css';

const canvas = document.querySelector('#gameCanvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bullets = [];
const enemies = [];

const playerRadius = 20;
const bulletRadius = 4;
const bulletPower = 6;

const player = new Player(canvas.width / 2, canvas.height / 2, playerRadius);

window.addEventListener('click', (event) => {
  // create bullet
  let x2 = event.clientX;
  let y2 = event.clientY;
  let angle = Math.atan2(y2 - canvas.height / 2, x2 - canvas.width / 2);
  let bullet = new Bullet(canvas.width / 2, canvas.height / 2, bulletRadius, {
    x: Math.cos(angle) * bulletPower,
    y: Math.sin(angle) * bulletPower,
  });
  bullets.push(bullet);
});

function spawnEnemies(canvas, player) {
  let x;
  let y;
  let enemyRadius = 30;
  setInterval(() => {
    // randomly spawning enemies from outside the window area.
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - enemyRadius : canvas.width + enemyRadius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - enemyRadius : canvas.height + enemyRadius;
    }
    //-------------------------------------------------------------
    let x2 = player.x;
    let y2 = player.y;
    let angle = Math.atan2(y2 - y, x2 - x);

    let enemy = new Enemy(x, y, enemyRadius, {
      x: Math.cos(angle),
      y: Math.sin(angle),
    });
    enemies.push(enemy);
  }, 1000);
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update(c);
  bullets.forEach((bullet, index) => {
    if (
      bullet.x + bullet.radius <= 0 ||
      bullet.x - bullet.radius >= canvas.width ||
      bullet.y + bullet.radius <= 0 ||
      bullet.y - bullet.radius >= canvas.height
    ) {
      bullets.splice(index, 1);
    } else {
      bullet.update(c);
    }
  });

  enemies.forEach((enemy, enemyIndex) => {
    enemy.update(c);

    //bullets colliding with enemies
    // check all bullets distance from the current enemy, and if one collides with the enemy, remove both the bullet and enemy from their respective arrays.
    bullets.forEach((bullet, bulletIndex) => {
      const dist = Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y);
      if (dist - enemy.radius - bullet.radius < 1) {
        //inorder to avoid flickering on the screen, place the enemy and bullet removal code in a timeout upon collision.
        setTimeout(() => {
          enemies.splice(enemyIndex, 1);
          bullets.splice(bulletIndex, 1);
        }, 0);
      }
    });
  });
}

spawnEnemies(canvas, player);
animate();
