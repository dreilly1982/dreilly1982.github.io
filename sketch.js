const TOTAL = 150;
const ELITEISM = .02;
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
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  scoreSpan = select('#score');
  highScoreSpan = select('#highScore');
  generationSpan = select('#generation')
  frameRate(30);
  createCanvas(800,600);
  //slider = createSlider(1, 100, 1);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  score = 0;
  bestscore = 0;
  generation = 1;
}

function draw() {
  let speed = speedSlider.value();
  speedSpan.html(speed);
  for (n = 0; n < speed; n++){
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].update();

      for (let j = birds.length-1; j >=0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }
    
      if (pipes[i].offscreen()) {
          pipes.splice(i,1);
          score++;
      }

      
    }

    for (let i = birds.length-1; i >=0; i--) {
      if (birds[i].offScreen()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length == 0) {
      counter == 0;
      nextGeneration();
      pipes = [];
    }

    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  if (score > bestscore) {
    bestscore = score;
  }

  scoreSpan.html(score);
  highScoreSpan.html(bestscore);
  generationSpan.html(generation);

  background(bg);
  for (let bird of birds) {
    bird.show();
  }

  // birds[0].show();

  for (let pipe of pipes) {
    pipe.show();
  }
}

// function keyPressed() {
//     if (key == ' ') {
//         bird.up();
//     }
// }