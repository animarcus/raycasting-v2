class Boundary {
  constructor(x, y, x2, y2) {
    console.log(round(x), round(y), round(x2), round(y2));
    this.length = sqrt(sq(x2 - x) + sq(y2 - y));
    if (x2 < x) {
      this.length = -this.length;
    }
    this.rotation = atan((y2 - y)/(x2 - x));

    this.pos = createVector(x, y);
    this.pos2 = this.setAngle(-this.rotation);

    this.hue = 100;
    this.sat = 100;
    this.bri = 100;
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