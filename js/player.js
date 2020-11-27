class Player {
  constructor(x, y, rotation=0) {
    this.pos = createVector(x, y);

    this.rot = -rotation;
    this.setAngle(this.rot);


    // this.x = x;
    // this.y = y;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(1);
    let length = 30;
    let x2 = this.dir.x * length;
    let y2 = this.dir.y * length;
    line(0,0, x2, y2);
    ellipse(0, 0, 8);
    pop();
    for (let ray of rays) {
      ray.show();
    }
  }

  setAngle(angle) {
    this.dir = p5.Vector.fromAngle(angle);
  }

  rotate(angle) {
    angle = radians(angle);
    this.rot = this.rot + angle;
    this.setAngle(this.rot);
    for (let ray of rays) {
      ray.setAngle(ray.rot + angle);
    }
  }

  fbMove(step) {
    let vel = p5.Vector.fromAngle(this.rot);
    vel.setMag(step);
    this.pos.add(vel);
  }

  sideMove(step) {
    let x = round(this.pos.x + cos(this.rot + PI/2)*step);
    let y = round(this.pos.y + sin(this.rot + PI/2)*step);
    this.pos.set(x, y);
  }
}