import Particle from './Particle';
import './styles/main.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let particle = new Particle(canvas.width / 2, canvas.height / 2, 20);

particle.draw(context);
