class Ball {
  constructor(x, y, radius, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = 'red';
    this.dy = dy;
  }

  draw(canvasContext) {
    canvasContext.beginPath();
    canvasContext.shadowColor = '#333';
    canvasContext.shadowBlur = 10;
    canvasContext.shadowOffsetX = 5;
    canvasContext.shadowOffsetY = 0;
    canvasContext.fillStyle = this.color;
    canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    canvasContext.fill();
    canvasContext.closePath();
  }

  update(canvas, canvasContext) {
    let gravity = 1;
    if (this.y + this.radius + this.dy >= canvas.height) {
      this.dy = -this.dy;
    } else {
      this.dy += gravity;
    }
    this.y += this.dy;
    this.draw(canvasContext);
  }
}

export default Ball;
