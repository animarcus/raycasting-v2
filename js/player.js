class Player {
  constructor(x, y, rotation=0) {
    this.rotation = rotation; //input is in radians

    this.pos = createVector(x, y);
    this.unitV = p5.Vector.fromAngle(rotation);
    this.unitV.setMag(50);

    this.rays = [];
    this.rayLength = 1000;

    this.FOV = 90;
    this.resolution = 1;
    this.prevFOV = this.FOV;

    for (let angle = -this.FOV/2; angle < this.FOV/2; angle += this.resolution) {
      this.rays.push(new Ray(this.pos, this.rotation + radians(angle), this.rayLength));
    }
    // this.rays.push(new Ray(this.pos, this.rotation));
  }

  show() {
    drawArrow(this.pos, this.unitV, "white");
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    strokeWeight(5);
    point(0,0);
    strokeWeight(1);
    line(0,0, this.unitV.x, this.unitV.y);
    pop();
  }


  raycast() {
    count = 0;
    if (!show2d && show3d) {
      push();
        noStroke();
        fill(150, 150, 150);
        rect(0, height/2, width, height/2);
        fill(100, 167, 255);
        rect(0, 0, width, height/2);
      pop();
    }
    this.rays.forEach((ray, index) => {
      for (let wall of walls) {
        ray.cast(wall);
        if(show2d) {
          wall.show();
        }
      }
      ray.sort();
      if (show2d) {
        ray.show();
      }
      if (show3d) {
        player.display(ray, index);
      }
      ray.crossings = [];
    });
    // console.log(count);
  }

  display(ray, index) { //TODO: Find function for dist en fonction de height
    index = this.FOV/this.resolution - index;
    if (!ray.crossings[0]){
      return;
    }
    let curr = ray.crossings[0];
    let a = -height*1.2/this.rayLength;
    // for (let crossing of ray.crossings) {
    let h = (a*curr.dist + this.rayLength*-a);
    let w = width/(this.FOV/this.resolution);
    if (h > 0) {
      let value;
      let limit = 3;
      if (curr.dist < this.rayLength/limit) {
        value = 1;
      } else {
        a = 1/(this.rayLength/limit - this.rayLength);
        let b = 1 - a*this.rayLength/limit;
        value = a*curr.dist + b;
      }
      //  Color is in Hue Saturation Brightness (HSB)
      // console.log(value);
      push();             //  Brightness is determined by distance
      colorMode(HSB);
      stroke(curr.color.hue, curr.color.sat, curr.color.bri*value);
      fill(curr.color.hue, curr.color.sat, curr.color.bri*value);
      rect(width-index*w, height/2 - h/2, w, h);
      pop();
    }
  }


  setAngle(angle) { // has to be in radians
    this.rotation = angle;
    this.unitV = p5.Vector.fromAngle(angle);
    this.unitV.setMag(50);
    let i = 0;
    for (let angle = -this.FOV/2; angle < this.FOV/2; angle += this.resolution) {
      this.rays[i].setAngle(this.rotation + radians(angle));
      i ++;
    }
    // this.setFOV(this.FOV);
  }

  rotate(angle) { // input is in degrees (easier to calculate step)
    angle = radians(angle);
    this.rotation += angle;
    this.setAngle(this.rotation);
  }

  fbMove(step) { // move forwards or backwards
    let vel = p5.Vector.fromAngle(this.rotation);
    vel.setMag(step);
    this.pos.add(vel);
  }

  sideMove(step) {
    let x = this.pos.x + cos(this.rotation + PI/2)*step;
    let y = this.pos.y + sin(this.rotation + PI/2)*step;
    this.pos.set(x, y);
  }

  setFOV(newFOV) {
    // if (this.FOV!== newFOV) {
    this.rays = [];
    for (let angle = -newFOV/2; angle < newFOV/2; angle += this.resolution) {
      this.rays.push(new Ray(this.pos, this.rotation + radians(angle), this.rayLength));
    }
    this.FOV = newFOV;
    // }
  }
}


function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(1);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
