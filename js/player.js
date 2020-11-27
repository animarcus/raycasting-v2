class Player {
  constructor(x, y, rotation=0) {
    this.x = x;
    this.y = y;
    this.dir = rotation;
    this.pos = createVector(x, y);
    this.tip = p5.Vector.fromAngle(-rotation);
    this.tip.setMag(50);

    // this.x = x;
    // this.y = y;
    // this.rays = []
  }

  show() {
    push();
    this.tip.setMag(50);
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(1);
    line(0,0, this.tip.x, this.tip.y);
    pop();
    for (let ray of rays) {
      // console.log(ray.x);
      ray.show();
    }
  }

  setAngle(angle) {
    this.tip = p5.Vector.fromAngle(angle);
  }

  rotate(angle) {
    let rot = radians(angle);
    this.dir = this.dir + rot;
    this.setAngle(this.dir);
    for (let ray of rays) {
      ray.setAngle(ray.dir + rot);
    }
  }

  fbMove(step) {
    let vel = p5.Vector.fromAngle(this.dir);
    vel.setMag(step);
    this.pos.add(vel);
  }

  sideMove(step) {
    let x = round(this.pos.x + cos(this.dir + PI/2)*step);
    let y = round(this.pos.y + sin(this.dir + PI/2)*step);
    this.pos.set(x, y);
  }
}