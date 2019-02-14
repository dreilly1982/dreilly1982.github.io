const TOTAL = 150;
const ELITEISM = .02;
const NODE_R = 5;
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
  bestBird = new Bird();
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
    bestBird = birds[0];
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
var secondInstance = function(p) {
  p.brain = null;
  p.setup = function() {
    p.createCanvas(800,600);
  };

  p.draw = function() {;
    p.background(0);
    if (bestBird != null) {
      p.brain = bestBird.brain;
      p.input_nodes = [];
      p.hidden_nodes = [];
      p.output_nodes = [];
      p.weights_ih = p.brain.weights_ih.toArray2();
      p.weights_ho = p.brain.weights_ho.toArray2();
      p.stroke(0);
      p.fill(255);
      for (i = 0; i < p.brain.input_nodes; i++) {
          p.node = new Node(.5*((p.width-NODE_R)/3), (i+.5)*((p.height-NODE_R)/p.brain.input_nodes))
          p.input_nodes.push(p.node);
      }
      for (i = 0; i < p.brain.hidden_nodes; i++) {
        p.node = new Node(1.5*((p.width-NODE_R)/3), (i+.5)*((p.height-NODE_R)/p.brain.hidden_nodes))
        p.hidden_nodes.push(p.node);
      }
      for (i = 0; i < p.brain.output_nodes; i++) {
        p.node = new Node(2.5*((p.width-NODE_R)/3), (i+.5)*((p.height-NODE_R)/p.brain.output_nodes))
        p.output_nodes.push(p.node);
      }
      for (i=0; i < p.hidden_nodes.length; i++) {
        for (j=0; j < p.input_nodes.length; j++) {
          if (p.weights_ih[i][j] < 0){
            p.stroke(255,0,0,255*abs(p.weights_ih[i][j]));
            p.line(p.input_nodes[j].x, p.input_nodes[j].y, p.hidden_nodes[i].x, p.hidden_nodes[i].y);
          } else if (p.weights_ih[i][j] > 0) {
            p.stroke(0,255,0,255*abs(p.weights_ih[i][j]));
            p.line(p.input_nodes[j].x, p.input_nodes[j].y, p.hidden_nodes[i].x, p.hidden_nodes[i].y);
          }
          p.stroke(0);
        }
      }
      for (i=0; i < p.output_nodes.length; i++) {
        for (j=0; j < p.hidden_nodes.length; j++) {
          if (p.weights_ho[i][j] < 0) {
            p.stroke(255,0,0,255*abs(p.weights_ho[i][j]));
            p.line(p.hidden_nodes[j].x, p.hidden_nodes[j].y, p.output_nodes[i].x, p.output_nodes[i].y);
          } else if (p.weights_ho[i][j] > 0) {
            p.stroke(0,255,0,255*abs(p.weights_ho[i][j]));
            p.line(p.hidden_nodes[j].x, p.hidden_nodes[j].y, p.output_nodes[i].x, p.output_nodes[i].y);
          }
          p.stroke(0);
        }
      }
      // for (let hnode of p.hidden_nodes) {
      //   for (let onode of p.output_nodes) {
      //     p.line(hnode.x, hnode.y, onode.x, onode.y);
      //   }
      // }
      for (let node of p.input_nodes) {
        p.ellipse(node.x, node.y, NODE_R*2, NODE_R*2);
      }
      for (let node of p.hidden_nodes) {
        p.ellipse(node.x, node.y, NODE_R*2, NODE_R*2);
      }
      for (let node of p.output_nodes) {
        p.ellipse(node.x, node.y, NODE_R*2, NODE_R*2);
      }
    }
  };
};

var myp5 = new p5(secondInstance);

// function keyPressed() {
//     if (key == ' ') {
//         bird.up();
//     }
// }