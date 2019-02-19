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

  image(extraCanvas, C_WIDTH * (2/3), C_HEIGHT * (2/3));
  drawViz();
}

function drawViz() {
  brain = null;

  if (bestBird != null) {
    brain = bestBird.brain;
    input_nodes = [];
    hidden_nodes = [];
    output_nodes = [];
    weights_ih = brain.weights_ih.toArray2();
    weights_ho = brain.weights_ho.toArray2();
    extraCanvas.stroke(0);
    extraCanvas.fill(255);
    for (i = 0; i < brain.input_nodes; i++) {
        node = new Node(.5*((extraCanvas.width-NODE_R)/3), (i+.5)*((extraCanvas.height-NODE_R)/brain.input_nodes))
        input_nodes.push(node);
    }
    for (i = 0; i < brain.hidden_nodes; i++) {
      node = new Node(1.5*((extraCanvas.width-NODE_R)/3), (i+.5)*((extraCanvas.height-NODE_R)/brain.hidden_nodes))
      hidden_nodes.push(node);
    }
    for (i = 0; i < brain.output_nodes; i++) {
      node = new Node(2.5*((extraCanvas.width-NODE_R)/3), (i+.5)*((extraCanvas.height-NODE_R)/brain.output_nodes))
      output_nodes.push(node);
    }
    for (i=0; i < hidden_nodes.length; i++) {
      for (j=0; j < input_nodes.length; j++) {
        if (weights_ih[i][j] < 0){
          extraCanvas.stroke(255,0,0,255*abs(weights_ih[i][j]));
          extraCanvas.line(input_nodes[j].x, input_nodes[j].y, hidden_nodes[i].x, hidden_nodes[i].y);
        } else if (weights_ih[i][j] > 0) {
          extraCanvas.stroke(0,255,0,255*abs(weights_ih[i][j]));
          extraCanvas.line(input_nodes[j].x, input_nodes[j].y, hidden_nodes[i].x, hidden_nodes[i].y);
        }
        extraCanvas.stroke(0);
      }
    }
    for (i=0; i < output_nodes.length; i++) {
      for (j=0; j < hidden_nodes.length; j++) {
        if (weights_ho[i][j] < 0) {
          extraCanvas.stroke(255,0,0,255*abs(weights_ho[i][j]));
          extraCanvas.line(hidden_nodes[j].x, hidden_nodes[j].y, output_nodes[i].x, output_nodes[i].y);
        } else if (weights_ho[i][j] > 0) {
          extraCanvas.stroke(0,255,0,255*abs(weights_ho[i][j]));
          extraCanvas.line(hidden_nodes[j].x, hidden_nodes[j].y, output_nodes[i].x, output_nodes[i].y);
        }
        extraCanvas.stroke(0);
      }
    }
    for (let node of input_nodes) {
      extraCanvas.ellipse(node.x, node.y, NODE_R*2, NODE_R*2);
    }
    for (let node of hidden_nodes) {
      extraCanvas.ellipse(node.x, node.y, NODE_R*2, NODE_R*2);
    }
    for (let node of output_nodes) {
      extraCanvas.ellipse(node.x, node.y, NODE_R*2, NODE_R*2);
    }
  }
}

// function keyPressed() {
//     if (key == ' ') {
//         bird.up();
//     }
// }