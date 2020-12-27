let player;
let FOV = 0;
let prevFOV = FOV;
let rayLength = 1000;

let walls = [];

let isDrawing = false;
let p1;



let rotateSlider, stepSlider;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvas1");

  rotateSlider = createSlider(1, 9, 3, 0.5);
  rotateSlider.parent("canvas1");
  rotateSlider.style('width', '80px');

  stepSlider = createSlider(1, 10, 3, 1);
  stepSlider.parent("canvas1");
  stepSlider.style('width', '80px');

  fovSlider = createSlider(2, 365, 120, 5);
  fovSlider.parent("canvas1");
  fovSlider.style('width', '80px');

  // rayLengthSlider = createSlider(1, 500, 190, 10);
  // rayLengthSlider.parent("canvas1");
  // rayLengthSlider.style('width', '80px');

  player = new Player(width/2, height/2, 0);


  // walls.push(new Boundary(width-width/3, height/3, width-width/3, height/2));
  // walls.push(new Boundary(width-width/4, height/3, ));
  // walls.push(new Boundary(width-width/5, height/3, ));
}

function draw() {
  background(0);
  getKeyInputs();
  player.show();

  for (let wall of walls) {
    wall.show();
  }

  if (!isDrawing) {
    p1 = [mouseX, mouseY];
  }
  if (mouseIsPressed) {
    isDrawing = true;
    stroke(255);
    line(p1[0],p1[1], mouseX, mouseY);
  }

  // walls[0].setAngle(walls[0].rotsation += radians(1));
}

function getKeyInputs() {
  player.setFOV(fovSlider.value());
  let rotStep = rotateSlider.value();
  let step = stepSlider.value();
  // rayLength = rayLengthSlider.value();

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
}

function mouseReleased() {
  document.activeElement.blur();
  // console.log(isDrawing);
  if (isDrawing) {
    isDrawing = false;
    walls.push(new Boundary(p1[0], p1[1], mouseX, mouseY));
    if (abs(walls[walls.length - 1].length) < 5) {
      walls.pop();
    }
  }
}


