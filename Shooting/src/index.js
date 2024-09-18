import Player from './components/Player';
import './styles/index.css';

const canvas = document.querySelector('#gameCanvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width / 2, canvas.height / 2, 20);
player.update(c);
