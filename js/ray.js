class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = angle;
    this.tip = p5.Vector.fromAngle(this.dir);
  }

  show() {
    this.tip.setMag(100);

    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(0.1);
    line(0,0, this.tip.x, this.tip.y);
    pop();
  }

  updatePOS() {
    this.pos.set(player.x, player.y);
  }

  setAngle(angle) {
    this.dir = angle;
    this.tip = p5.Vector.fromAngle(this.dir);
  }
}