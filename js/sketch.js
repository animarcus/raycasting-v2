let player;
let FOV = 360;
let prevFOV = FOV;
let rays = [];

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

  player = new Player(width/2, height/2, 0);
  setFOV(player, 100);


  wall = new Boundary(width-width/3, height-height/3, PI/2, 200);
}

function draw() {
  background(0);
  getKeyInputs();

  player.show();
  wall.show();
}






function setFOV(player, FOV) {
    prevFOV = FOV;
    rays = [];
    for (let angle = -FOV/2; angle < FOV/2; angle += 1) {
      rays.push(new Ray(player.pos, player.rot + radians(angle)));
    }
}

function getKeyInputs() {
  // console.log(fovSlider.value());
  setFOV(player, fovSlider.value());
  // console.log(prevFOV, FOV);
  let rotStep = rotateSlider.value();
  let step = stepSlider.value();

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