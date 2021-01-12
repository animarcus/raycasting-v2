let player;
let rayLength = 500;
let rotStep;
let step;

let walls = [];
let deleted = [];

let undoTime = 0;
let redoTime = 0;
let isDrawing = false;
let p1 = {};



let rotateSlider, stepSlider;

function setup() {
  let canvas = createCanvas(900, 400);
  canvas.parent("canvas1");

  rotateSlider = createSlider(1, 9, 3, 0.5);
  rotateSlider.parent("canvas1");
  rotateSlider.style('width', '80px');

  stepSlider = createSlider(1, 10, 3, 1);
  stepSlider.parent("canvas1");
  stepSlider.style('width', '80px');

  fovSlider = createSlider(2, 365, 1, 5);
  fovSlider.parent("canvas1");
  fovSlider.style('width', '80px');

  // rayLengthSlider = createSlider(1, 500, 190, 10);
  // rayLengthSlider.parent("canvas1");
  // rayLengthSlider.style('width', '80px');

  player = new Player(width/2, height/2, 0);

  // walls.push(new Boundary(width-width/3, height/2-50, width-width/2, height/2+50));

  // walls.push(new Boundary(width/3, height/3, width - width/3, height/3));
  // walls.push(new Boundary(width - width/3, height/3, width - width/3, height - height/3));
  // walls.push(new Boundary(width/3, height - height/3, width - width/3, height - height/3));
  // walls.push(new Boundary(width/3, height - height/3, width/3, height/3));

  // walls.pushs(new Boundary(0, 0, width, 0));
  // walls.push(new Boundary(width, 0, width, height));
  // walls.push(new Boundary(width, height, 0, height));
  // walls.push(new Boundary(0, height, 0, 0));

  background(0);
  player.raycast();
}
let count = 0;
let animTimer = true;
function draw() {
  background(0);
  player.rotate(0.2);
  if (animTimer == true) {
    player.pos.x ++;
  } else {
    player.pos.x --;
  }
  if (player.pos.x > 600) {
    animTimer = false;
  }
  if (player.pos.x < 400) {
    animTimer = true;
  }
  console.log(round(frameRate()));
  player.raycast();

  sliders();
  getKeyInputs();
  drawing.start();

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
  // player.setFOV(fovSlider.value());
  rotStep = rotateSlider.value();
  step = stepSlider.value();
  // rayLength = rayLengthSlider.value();
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
      line(p1.x,p1.y, mouseX, mouseY);

      if (mode == 'rect') {
        rectMode(CORNERS);
        rect(p1.x, p1.y, mouseX, mouseY);
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
  }
};





  // if (walls.length > 0) {
  //   for (let i in walls) {
  //     walls[i].setAngle(walls[i].rotation += radians(1));
  //   }
  // }