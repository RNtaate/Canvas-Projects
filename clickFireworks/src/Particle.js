class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = 'red';
  }

  draw(canvasContext) {
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    canvasContext.fillStyle = this.color;
    canvasContext.fill();
  }

  update(canvasContext) {
    this.draw(canvasContext);
  }
}

export default Particle;
