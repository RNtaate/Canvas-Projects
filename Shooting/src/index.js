import Player from './components/Player';
import Bullet from './components/Bullet';
import Particle from './components/Particle';
import './styles/index.css';
import Enemy from './components/Enemy';
import randomNumberGenerator from './HelperMethods/randomNumberGenerator';

const scoreSpan = document.querySelector('#scoreSpan');
const scoreBoard = document.querySelector('#scoreBoard');
const scoreBoardModal = document.querySelector('#scoreBoard-modal-div');
const startGamebtn = document.querySelector('#start-game-btn');

const canvas = document.querySelector('#gameCanvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bullets = [];
let enemies = [];
let particles = [];

const playerRadius = 20;
const bulletRadius = 4;
const bulletPower = 6;
const particlesNumber = 8;
const particlesPower = 3;
let score = 0;
scoreSpan.textContent = '' + score;

let player = new Player(canvas.width / 2, canvas.height / 2, playerRadius);

canvas.addEventListener('click', (event) => {
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

let enemyIntervalId;
function spawnEnemies(canvas, player) {
  let x;
  let y;
  let enemyRadius;
  enemyIntervalId = setInterval(() => {
    // randomly spawning enemies from outside the window area.
    enemyRadius = randomNumberGenerator(4, 30);
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

function createBulletCollisionExplosion(bullet, enemy) {
  for (let i = 1; i <= particlesNumber; i++) {
    let angle = ((Math.PI * 2) / particlesNumber) * i;
    let particle = new Particle(bullet.x, bullet.y, 1, enemy.color, {
      x: Math.cos(angle) * Math.random() * particlesPower,
      y: Math.sin(angle) * Math.random() * particlesPower,
    });
    particles.push(particle);
  }
}

let animationFrameId;
function animate() {
  animationFrameId = window.requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update(c);

  //BULLETS PAINTING ON CANVAS
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
  //--------------------------------------------------------------------------------

  //ENEMIES PAINTING ON CANVAS
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update(c);
    // enemy and player collision detection.
    const enemyPlayerDist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (enemyPlayerDist - player.radius - enemy.radius < 1) {
      //pause the game
      window.cancelAnimationFrame(animationFrameId);
      //stop spawning enemies
      clearInterval(enemyIntervalId);
      //remove enemy from enemies array
      setTimeout(() => {
        enemies.splice(enemyIndex, 1);
      }, 0);

      //update score board and make it appear
      scoreBoard.textContent = '' + score;
      scoreBoardModal.classList.remove('hidden');
      scoreBoardModal.classList.add('flex');
    }

    //bullets colliding with enemies
    // check all bullets distance from the current enemy, and if one collides with the enemy, remove both the bullet and enemy from their respective arrays.
    bullets.forEach((bullet, bulletIndex) => {
      const dist = Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y);
      if (dist - enemy.radius - bullet.radius < 1) {
        // reduce enemy size if enemy is quite big.
        if (enemy.radius - 10 > 5) {
          // apply gsap to facilitate smooth reduction of the enemies' radius
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            bullets.splice(bulletIndex, 1);
          }, 0);

          score += 4;
        } else {
          //inorder to avoid flickering on the screen, place the enemy and bullet removal code in a timeout upon collision.
          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            bullets.splice(bulletIndex, 1);
          }, 0);

          score += 10;
        }
        scoreSpan.textContent = '' + score;
        createBulletCollisionExplosion(bullet, enemy);
        return;
      }
    });
  });
  //-----------------------------------------------------------------------------------

  //PARTICLES PAINTING ON CANVAS.
  particles.forEach((particle, particleIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(particleIndex, 1);
    } else {
      particle.update(c);
    }
  });
}

function init() {
  bullets = [];
  enemies = [];
  particles = [];
  player = new Player(canvas.width / 2, canvas.height / 2, playerRadius);
  score = 0;
  scoreSpan.textContent = '' + 0;
  scoreBoardModal.classList.remove('flex');
  scoreBoardModal.classList.add('hidden');
  spawnEnemies(canvas, player);
  animate();
}

startGamebtn.addEventListener('click', () => {
  init();
});

// Handle stopping of the game if user switched tabs. This inturn stops enemies from spawning whilte tabs are switched.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(enemyIntervalId);
    window.cancelAnimationFrame(animationFrameId);
  } else {
    spawnEnemies(canvas, player);
    animate();
  }
});

spawnEnemies(canvas, player);
animate();
