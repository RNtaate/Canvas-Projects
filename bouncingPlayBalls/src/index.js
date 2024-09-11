import './styles/index.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const grad = context.createLinearGradient(0, 0, canvas.width, 0);
grad.addColorStop(0, 'lightblue');
grad.addColorStop(1, 'darkblue');

context.fillStyle = grad;
context.fillRect(0, 0, canvas.width, canvas.height);
