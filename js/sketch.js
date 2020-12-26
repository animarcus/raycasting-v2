let player;
let FOV = 0;
let prevFOV = FOV;
let rayLength = 1000;

let walls = [];


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

  rayLengthSlider = createSlider(1, 500, 190, 10);
  rayLengthSlider.parent("canvas1");
  rayLengthSlider.style('width', '80px');

  player = new Player(width/2, height/2, 0);


  walls.push(new Boundary(width-width/3, height/3, 200, -PI/3));
  // walls.push(new Boundary(width-width/4, height/3, 200, -PI/3));
  // walls.push(new Boundary(width-width/5, height/3, 200, -PI/4));
}

function draw() {
  background(0);
  getKeyInputs();
  // player.castRays();
  player.show();

  for (let wall of walls) {
    wall.show();

    // stroke(255);
    // strokeWeight(5);
    // line(player.pos.x, player.pos.y, wall.pos.x, wall.pos.y);
    // line(player.pos.x, player.pos.y, wall.pos2.x, wall.pos2.y);
  }

  // walls[0].setAngle(walls[0].rotation += radians(1));
}

function getKeyInputs() {
  // console.log(fovSlider.value());
  // player.setFOV(fovSlider.value());
  // console.log(prevFOV, FOV);
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
}