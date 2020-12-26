class Boundary {
  constructor(x, y, len = 50, rotation = 0) {
    this.x = x;
    this.y = y;

    this.rotation = -rotation;
    this.length = len;

    this.pos = createVector(this.x, this.y);
    this.pos2 = this.setAngle(-this.rotation);
  }
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(1);
    line(0,0, this.unitV.x, this.unitV.y);
    circle(0,0, 2);
    circle(this.unitV.x, this.unitV.y, 2);
    pop();
  }

  setAngle(angle) { // in radians
    angle = -angle;
    this.unitV = p5.Vector.fromAngle(angle);
    this.unitV.setMag(this.length);
    return p5.Vector.add(this.pos, this.unitV);
  }
}