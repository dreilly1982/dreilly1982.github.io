const TOTAL = 150;
const ELITEISM = .02;
const NODE_R = 5;
const C_WIDTH = 800;
const C_HEIGHT = 600;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;
let birdUp;
let birdMid;
let birdDown;
let pipeTop;
let pipeBottom;
let bg;
let score;
let bestscore;
let generation;
let speed;
let bestBird;
let extraCanvas;

function preload() {
  birdRed = loadImage('assets/sprites/redbird-midflap.png');
  birdBlue = loadImage('assets/sprites/bluebird-midflap.png');
  birdYellow = loadImage('assets/sprites/yellowbird-midflap.png');
  pipeBottom = loadImage('assets/sprites/pipe-green.png');
  pipeTop = loadImage('assets/sprites/pipe-green-down.png');
  bg = loadImage('assets/sprites/background-day.png')
}

function setup() {
  //pixelDensity(1);
  let canvas = createCanvas(C_WIDTH,C_HEIGHT);
  canvas.parent('canvascontainer')
  bestBird = new Bird();
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  scoreSpan = select('#score');
  highScoreSpan = select('#highScore');
  generationSpan = select('#generation')
  frameRate(30);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  score = 0;
  bestscore = 0;
  generation = 1;
  extraCanvas = createGraphics(C_WIDTH/3,C_HEIGHT/3);
  extraCanvas.background(0,0,0,125);
}

function draw() {
  let speed = speedSlider.value();
  speedSpan.html(speed);
  for (n = 0; n < speed; n++){
    gameLogic();
  }

  if (score > bestscore) {
    bestscore = score;
    bestBird = birds[0];
  }

  scoreSpan.html(score);
  highScoreSpan.html(bestscore);
  generationSpan.html(generation);

  background(bg);
  
  for (let bird of birds) {
    bird.show();
  }
  for (let pipe of pipes) {
    pipe.show();
  }
  drawViz();
}





// function keyPressed() {
//     if (key == ' ') {
//         bird.up();
//     }
// }