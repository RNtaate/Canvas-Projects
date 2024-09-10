class Particle {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    this.velocity = velocity;
  }

  draw(canvasContext) {
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    canvasContext.fillStyle = this.color;
    canvasContext.fill();
  }

  update(canvasContext, gravity, friction) {
    this.velocity.y += gravity;

    this.velocity.x *= friction;
    this.velocity.y *= friction;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw(canvasContext);
  }
}

export default Particle;
