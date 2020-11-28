class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.x = this.pos.x;
    this.y = this.pos.y;
    this.rotation = angle;

    this.unitV = p5.Vector.fromAngle(this.rotation);
    this.unitV.setMag(rayLength);
  }

  show() {
    this.unitV.setMag(rayLength);
    // drawArrow(this.pos, this.unitV, "white");
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(0.1);
    line(0,0, this.unitV.x, this.unitV.y);
    pop();
  }

  updatePOS() {
    this.pos.set(player.x, player.y);
  }

  setAngle(angle) {
    this.rotation = angle;
    this.unitV = p5.Vector.fromAngle(angle);
  }

}


// class Ray {
//   constructor(pos, angle) {
//     this.pos = pos;
//     this.dir = angle;
//     this.tip = p5.Vector.fromAngle(this.dir);
//   }

//   show() {
//     this.tip.setMag(100);

//     push();
//     translate(this.pos.x, this.pos.y);
//     stroke(255);
//     strokeWeight(0.1);
//     line(0,0, this.tip.x, this.tip.y);
//     pop();
//   }

//   updatePOS() {
//     this.pos.set(player.x, player.y);
//   }

//   setAngle(angle) {
//     this.dir = angle;
//     this.tip = p5.Vector.fromAngle(this.dir);
//   }
// }