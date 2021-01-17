class Ray {
  constructor(pos, angle, rayLength) {
    this.pos = pos;
    this.rotation = angle;
    this.rayLength = rayLength;

    this.unitV = p5.Vector.fromAngle(this.rotation);
    this.unitV.setMag(this.rayLength);

    this.crossings = [];
    this.isCrossing = false;
  }

  show() {
    // drawArrow(this.pos, this.unitV, "white");
    push();
      translate(this.pos.x, this.pos.y);
      stroke(color('white'));
      strokeWeight(0.4);
      // if (this.isCrossing) {
      //   stroke(color('red'));
      // }
      line(0,0, this.unitV.x, this.unitV.y);
    pop();
    this.showCrossings();
  }
  showCrossings() {
    if (this.crossings.length < 1) {
      return;
    }
    // count += 1;
    // for (let cross of this.crossings) { //show all crossing
    push();
      stroke(color("blue"));
      strokeWeight(5);
      // point(cross.x, cross.y);
      strokeWeight(2);
      line(this.crossings[0].x, this.crossings[0].y, this.pos.x, this.pos.y);
    pop();
    // }
  }

  sort() {
    if (this.crossings.length > 1) {
      let i = 1;
      while (i < this.crossings.length) {
          let x = this.crossings[i];
          let j = i - 1;
          while (j >= 0 && this.crossings[j].dist > x.dist) {
              this.crossings[j+1] = this.crossings[j];
              j = j - 1;
          }
          this.crossings[j+1] = x;
          i = i + 1;
      }
    }
  }

  updatePOS() {
    this.pos.set(player.x, player.y);
  }
  setAngle(angle) {
    this.rotation = angle;
    this.unitV = p5.Vector.fromAngle(angle);
    this.unitV.setMag(this.rayLength);
  }

  cast(wall) {
    // if (this.crossings.length > 0) {
    //   this.crossings.pop();
    // }
    this.unitV.setMag(this.rayLength);


    let x1 = this.pos.x;
    let y1 = this.pos.y;

    let x2 = x1 + this.unitV.x;
    let y2 = y1 + this.unitV.y;

    let x3 = wall.pos.x;
    let y3 = wall.pos.y;
    let x4 = x3 + wall.unitV.x;
    let y4 = y3 + wall.unitV.y;

    const den = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    this.isCrossing = false;
    if (den !== 0) {
      const t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4)) / den;
      const u = -((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3)) / den;
      const xint = x1 + t * (x2 - x1);
      const yint = y1 + t * (y2 - y1);
      // both t and u need to fall between 0 and 1 for the intersection to be on the wall
      if ((t >= 0 && t <= 1) && (u >= 0 && u <= 1)) {
            if (xint == x1 + t*(x2 - x1) && yint == y1 + t*(y2 - y1)) {
              this.isCrossing = true;
              this.crossings.push({ 'x': round(xint),
                                    'y': round(yint),
                                    // 'dist': sqrt()
                                    'dist': sqrt((y1 - yint)**2 + (x1 - xint)**2),
                                    'color': {
                                      'hue': wall.hue,
                                      'sat': wall.sat,
                                      'bri': wall.bri
                                    }
                                  });
            }
      }
    }
  }
}

// (((xint >= x3) && (xint <= x4)) || ((xint >= x4) && (xint <= x3))) &&
// (((yint >= y3) && (yint <= y4)) || ((yint >= y4) && (yint <= y3)))) {


// const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
//             ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));



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