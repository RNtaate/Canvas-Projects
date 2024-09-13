class Ball {
  constructor(x, y, radius, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    this.dy = dy;
  }

  draw(canvasContext) {
    canvasContext.beginPath();

    //--------------------------------------------------------------------------------------------
    /**Un comment this section if you would like shadows on the balls. Warning: it takes up more computer resources. */
    // canvasContext.shadowColor = '#333';
    // canvasContext.shadowBlur = 10;
    // canvasContext.shadowOffsetX = 5;
    // canvasContext.shadowOffsetY = 0;
    /**----------------------------------------------------------------------------------------- */

    canvasContext.fillStyle = this.color;
    canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    canvasContext.fill();
    canvasContext.stroke();
    canvasContext.closePath();
  }

  update(canvas, canvasContext, gravity, energyLoss) {
    if (this.y + this.radius + this.dy >= canvas.height) {
      this.dy = -this.dy;
      this.dy *= energyLoss;
    } else {
      this.dy += gravity;
    }
    this.y += this.dy;
    this.draw(canvasContext);
  }
}

export default Ball;
