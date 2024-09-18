class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = 'red';
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update(ctx) {
    this.draw(ctx);
  }
}

export default Player;
