class Particle {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw(canvasContext) {
    canvasContext.save();
    canvasContext.globalAlpha = this.alpha;
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    canvasContext.fillStyle = this.color;
    canvasContext.fill();
    canvasContext.closePath();
    canvasContext.restore();
  }

  update(canvasContext, gravity, friction) {
    this.draw(canvasContext); // draw particle first

    // then start updating the particle's data.
    this.velocity.y += gravity;

    this.velocity.x *= friction;
    this.velocity.y *= friction;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005;
  }
}

export default Particle;
