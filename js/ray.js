class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
    this.rot = angle;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(0.1);
    let length = 100;
    let x2 = this.dir.x * length;
    let y2 = this.dir.y * length;
    line(0,0, x2, y2);
    pop();
  }

  update() {
    this.pos.set(player.x, player.y);
  }

  setAngle(angle) {
    this.rot = angle;
    this.dir = p5.Vector.fromAngle(this.rot);
  }
}