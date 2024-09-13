class Ball {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    this.velocity = velocity;
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
    if (this.y + this.radius + this.velocity.y >= canvas.height) {
      this.velocity.y = -this.velocity.y;
      this.velocity.y *= energyLoss;
    } else {
      this.velocity.y += gravity;
    }
    this.y += this.velocity.y;
    this.draw(canvasContext);
  }
}

export default Ball;
