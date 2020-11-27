class Boundary {
  constructor(x, y, dir, len) {
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);
    this.tip = p5.Vector.fromAngle(-dir);
    this.tip.setMag(len);
    // this.dir = p5.Vector.fromAngle(-dir);

  }
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(1);
    line(0,0, this.tip.x, this.tip.y);
    circle(0,0, 2);
    circle(this.tip.x, this.tip.y, 2);
    pop();
  }
}