let player;
let rotStep;
let step;

let walls = [];
let deleted = [];

let undoTime = 0;
let redoTime = 0;
let isDrawing = false;
let p1 = {};

let show2d = true;
let show3d = true;
let showcase = true;




let rotateSlider, stepSlider;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("canvas1");

  let mainDiv = document.getElementById("canvas1");

  let slidersDiv = document.createElement('div');
  slidersDiv.id = 'sliders';
  mainDiv.appendChild(slidersDiv);

  let rotateDiv = document.createElement('div');
    rotateDiv.id = 'rotate';
    rotateDiv.className = 'sliderClass';
    slidersDiv.appendChild(rotateDiv);
    rotateSlider = createSlider(1, 9, 3, 0.5);
    rotateSlider.parent(rotateDiv);
    rotateSlider.style('width', '80px');

  let bork = document.createElement('p');
    bork.innerText = 'AAAAAHHHHH';
    rotateDiv.appendChild(bork);

  let stepDiv = document.createElement('div');
    stepDiv.id = 'step';
    stepDiv.className = 'sliderClass';
    slidersDiv.appendChild(stepDiv);
    stepSlider = createSlider(1, 10, 3, 1);
    stepSlider.parent(stepDiv);
    stepSlider.style('width', '80px');

  let pork = document.createElement('p');
    pork.innerText = 'BHHHHHHHH';
    stepDiv.appendChild(pork);

  // fovSlider = createSlider(2, 365, 1, 5);
  // fovSlider.parent("canvas1");
  // fovSlider.style('width', '80px');

  // rayLengthSlider = createSlider(1, 500, 190, 10);
  // rayLengthSlider.parent("canvas1");
  // rayLengthSlider.style('width', '80px');

  player = new Player(width/2, height/2, PI);
  // player.setAngle(PI)

  // walls.push(new Boundary(width-width/3, height/2-50, width-width/2, height/2+50));


  walls.push(new Boundary(width/2-50, height/2, width/2+50, height/2));
  // walls.push(new Boundary(width, 0, width, height));
  // walls.push(new Boundary(width, height, 0, height));
  // walls.push(new Boundary(0, height, 0, 0));
  // readyWalls();
  background(0);

  player.setAngle(PI);
  player.raycast();
}
let count = 0;

let animRot = 0;
let animDist = 350;

function draw() {
  background(0);
  if (showcase) {
    if (animRot < 360) {
      animRot ++;
    } else {
      animRot = 0;
    }
    // let x = cos(radians(animTimer))*r + width/2;
    // let y = sin(radians(animTimer))*r + height/2;
    // ellipse(x, y, 20);
    player.pos.x = cos(radians(animRot))*animDist + width/2;
    player.pos.y = sin(radians(animRot))*animDist + height/2;
    // player.rotation = radians(animTimer) + Math.PI;
    player.setAngle(radians(animRot) + Math.PI);
    // console.log(radians(animTimer));
  }
  player.raycast();

  sliders();
  getKeyInputs();
  if (!(!show2d && show3d)) {
    drawing.start();
    // drawing.displayTool();
  }
}

function readyWalls() {
  walls.push(new Boundary(522, 81, 563, 171));
  walls.push(new Boundary(678, 329, 642, 471));
  walls.push(new Boundary(205, 359, 294, 464));
  walls.push(new Boundary(220, 70, 100, 300));



  // walls.push(new Boundary(549, 172, 549, 214));
  // walls.push(new Boundary(435, 237, 435, 269));
  // walls.push(new Boundary(361, 291, 361, 346));
  // walls.push(new Boundary(299, 360, 299, 410));
  // walls.push(new Boundary(190, 405, 190, 438));
  // walls.push(new Boundary(45, 337, 47, 349));
  // walls.push(new Boundary(395, 39, 395, 39));
  // walls.push(new Boundary(626, 130, 626, 86));
  // walls.push(new Boundary(795, 39, 795, 3));
}



function toggleRes(step) {
  if (player.resolution == 1) {
    player.resolution = 0.5;
    document.getElementById('res').innerText = 'Resolution: 0.5';
  } else if (player.resolution == 0.5) {
    player.resolution = 0.2;
    document.getElementById('res').innerText = 'Resolution: 0.2';
  } else if (player.resolution == 0.2) {
    player.resolution = 0.1;
    document.getElementById('res').innerText = 'Resolution: 0.1';
  } else if (player.resolution == 0.1) {
    player.resolution = 10;
    document.getElementById('res').innerText = 'Resolution: 10';
  } else if (player.resolution == 10) {
    player.resolution = 5;
    document.getElementById('res').innerText = 'Resolution: 5';
  } else if (player.resolution == 5) {
    player.resolution = 2;
    document.getElementById('res').innerText = 'Resolution: 2';
  } else if (player.resolution == 2) {
    player.resolution = 1;
    document.getElementById('res').innerText = 'Resolution: 1';
  }
  player.setFOV(player.FOV);
}



function getKeyInputs() {
  if (keyIsDown(LEFT_ARROW)) {
    player.rotate(-rotStep);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.rotate(rotStep);
  }
  if (keyIsDown(87)) { // W
    player.fbMove(step);
  }
  if (keyIsDown(83)) { // S
    player.fbMove(-step);
  }
  if (keyIsDown(65)) { // A
    player.sideMove(-step);
  }
  if (keyIsDown(68)) { // D
    player.sideMove(step);
  }
  if (keyIsDown(17) && keyIsDown(90) && !keyIsDown(16)) { //control-Z
    undoTime ++;
    if (undoTime % 15 == 0 || undoTime == 1 && walls.length > 0) {
      deleted.push(walls.pop());
    }
  } else {
    undoTime = 0;
  }

  if (keyIsDown(17) && keyIsDown(90) && keyIsDown(16)) { //control-shift-Z
    redoTime ++;
    if (redoTime % 15 == 0 || redoTime == 1 && deleted.length > 0) {
      walls.push(deleted.pop());
    }
  } else {
    redoTime = 0;
  }
}
function sliders() {
  rotStep = rotateSlider.value();
  step = stepSlider.value();
  // player.rayLength = rayLengthSlider.value();
}

let mode = 'line';

function mouseReleased() {
  document.activeElement.blur();

  if (!(mouseX < width +100 && mouseX > -100 && mouseY < height +100 && mouseY > -100)) {
    isDrawing = false;
    return;
  }
  if (isDrawing) {
    isDrawing = false;

    if (mode !== 'line' && (abs(mouseX - p1.x) < 10 || abs(mouseY - p1.y) < 10)) {
      return;
    }
    if (mode == 'rect') {
      // console.log(walls);
      // walls.push(new Boundary(width/3, height/3, width - width/3, height/3));
      // walls.push(new Boundary(width - width/3, height/3, width - width/3, height - height/3));
      // walls.push(new Boundary(width/3, height - height/3, width - width/3, height - height/3));
      // walls.push(new Boundary(width/3, height - height/3, width/3, height/3));
      // console.log(walls);
      walls.push(new Boundary(p1.x, p1.y, mouseX, p1.y));
      walls.push(new Boundary(mouseX, p1.y, mouseX, mouseY));
      walls.push(new Boundary(p1.x, mouseY, mouseX, mouseY));
      walls.push(new Boundary(p1.x, mouseY, p1.x, p1.y));
    }
    if (mode == 'line') {
      walls.push(new Boundary(p1.x, p1.y, mouseX, mouseY));
    }

    if (mode == 'tri') {
      walls.push(new Boundary(p1.x, p1.y, mouseX, p1.y));
      walls.push(new Boundary(mouseX, p1.y, (mouseX + p1.x)/2, mouseY));
      walls.push(new Boundary((mouseX + p1.x)/2, mouseY, p1.x, p1.y));
    }


    drawing.removeLast();
  }
}






let drawing = {
  start() {
    if (!isDrawing) {
      if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
        p1.x = mouseX;
        p1.y = mouseY;
      } else {
        return;
      }
    }
    if (mouseIsPressed &&
        (mouseX < width +100 && mouseX > -100 && mouseY < height +100 && mouseY > -100)) {
      isDrawing = true;
      stroke(255);
      if (keyIsDown(16)) {
        this.snapping();
      }
      if (mode == 'line') {
        line(p1.x,p1.y, mouseX, mouseY);
      }
      if (mode == 'rect') {
        push();
          rectMode(CORNERS);
          rect(p1.x, p1.y, mouseX, mouseY);
        pop();
      }
      if (mode == 'tri') {
        triangle(p1.x, p1.y, mouseX, p1.y, (mouseX + p1.x)/2, mouseY);
      }
    }
  },
  removeLast() {
    if (abs(mouseX - p1.x) < 10 && abs(mouseY - p1.y) < 10) {
      walls.pop();
      if (mode == 'rect') {
        walls.pop();
        walls.pop();
        walls.pop();
      } else if (mode == 'tri') {
        walls.pop();
        walls.pop();
      }
    }
  },
  snapping() {
    if (mode == 'line') {
      if (abs(mouseX - p1.x) < 10 && mode == 'line') {
        mouseX = p1.x;
      }
      if (abs(mouseY - p1.y) < 10 && mode == 'line') {
        mouseY = p1.y;
      }
    }
    if (mode == 'rect') {
      if (mouseX - p1.x < 30 && mouseX - p1.x > 0) {
        mouseX = p1.x + 10;
      }
      if (mouseX - p1.x > -30 && mouseX - p1.x < 0) {
        mouseX = p1.x - 10;
      }
      if (mouseY - p1.y < 30 && mouseY - p1.y > 0) {
        mouseY = p1.y + 10;
      }
      if (mouseY - p1.y > -30 && mouseY - p1.y < 0) {
        mouseY = p1.y - 10;
      }
    }
    for (let wall of walls) {
      if (abs(mouseX - wall.pos.x) < 10 && abs(mouseY - wall.pos.y) < 10) {
        mouseX = wall.pos.x;
        mouseY = wall.pos.y;
      }
      if (abs(mouseX - wall.pos2.x) < 10 && abs(mouseY - wall.pos2.y) < 10) {
        mouseX = wall.pos2.x;
        mouseY = wall.pos2.y;
      }
    }
  },
  displayTool() {
    push();
      strokeWeight(2);
      fill(255);
      rect(0, 0, 50, 50);
    pop();
    push();
      fill(color('green'));
      stroke(0);
      strokeWeight(2);
      if (mode == 'line') {
        line(10, 25, 40, 25);
      }
      if (mode == 'rect') {
        rect(10, 10, 30, 30);
      }
      if (mode == 'tri') {
        triangle(10, 40, 25, 10, 40, 40);
      }
    pop();
  }
};





  // if (walls.length > 0) {
  //   for (let i in walls) {
  //     walls[i].setAngle(walls[i].rotation += radians(1));
  //   }
  // }