class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.x = this.pos.x;
    this.y = this.pos.y;
    this.rotation = angle;

    this.unitV = p5.Vector.fromAngle(this.rotation);
    this.unitV.setMag(rayLength);

    this.intersections = [];
  }

  show() {
    this.unitV.setMag(rayLength);
    // drawArrow(this.pos, this.unitV, "white");
    push();
    translate(this.pos.x, this.pos.y);
    stroke(color('white'));

    strokeWeight(0.4);
    if (this.intersecting) {
      stroke(color('red'));
    }
    line(0,0, this.unitV.x, this.unitV.y);
    pop();
  }

  updatePOS() {
    this.pos.set(player.x, player.y);
  }

  setAngle(angle) {
    this.rotation = angle;
    this.unitV = p5.Vector.fromAngle(angle);
    this.unitV.setMag(rayLength);
  }

  cast(wall) {
    let x1 = this.pos.x;
    let y1 = this.pos.y;

    let x2 = x1 + this.unitV.x;
    let y2 = y1 + this.unitV.y;

    let x3 = wall.pos.x;
    let y3 = wall.pos.y;
    let x4 = x3 + wall.unitV.x;
    let y4 = y3 + wall.unitV.y;

    let den = (x1 - x2)*(y3-y4)-(y1-y3)*(x3-x4);
    let t = (x1 - x3)*(y3 - y4)*(y1 - y3)*(x3 - x4);
    let u = (x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3);

    u = -u/den;
    t = t/den;
    this.intersecting = false;
    if (den !== 0) {
      // console.log(this.rotation);
      // if (u >= 0 && u <= 1) {
        let xint = x3 + u*(x4 - x3);
        let yint = y3 + u*(y4 - y3);

        // let xint = x1 + t*(x2 - x1);
        // let yint = y1 + t*(y2 - y1);

        if ((xint > x1 && xint < x2) || (xint < x1 && xint > x2) &&
            (yint > y1 && yint < y2) || (yint < y1 && yint > y2)) {
          // this.intersecting = true;
          push();
          stroke(color("green"));
          strokeWeight(5);
          point(xint, yint);
          pop();
        }
      // }
    }
    return null;
  }
}



// const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
//             ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

// const x = x1 + ua * (x2 - x1);
// const y = y1 + ua * (y2 - y1);

// return [x, y]


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