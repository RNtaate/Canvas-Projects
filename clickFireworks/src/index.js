import './styles/main.css';

const canvas = document.getElementById('drawCanvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const drawThunderAndLightning = (canvas, canvasContext) => {
  const grad = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, 'lightblue');
  grad.addColorStop(1, 'darkblue');

  canvasContext.beginPath();
  canvasContext.shadowColor = '#000';
  canvasContext.shadowBlur = 10;
  canvasContext.shadowOffsetX = 5;
  canvasContext.shadowOffsetY = 5;
  canvasContext.strokeStyle = grad;
  canvasContext.font = '100px Arial';
  canvasContext.textAlign = 'center';
  canvasContext.textBaseline = 'middle';
  canvasContext.lineWidth = 8;
  canvasContext.strokeText(
    'Thunder and Lightning',
    canvas.width / 2,
    canvas.height / 2
  );
};

['load', 'resize'].forEach((event) => {
  window.addEventListener(event, () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawThunderAndLightning(canvas, context);
  });
});
