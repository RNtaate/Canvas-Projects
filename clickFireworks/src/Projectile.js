class Projectile {
  constructor(x, y, radius, velocity, targetPoint) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.color = 'white';
    this.targetPoint = targetPoint;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update(ctx) {
    this.draw(ctx);
    this.y += this.velocity.y;
  }
}

export default Projectile;
