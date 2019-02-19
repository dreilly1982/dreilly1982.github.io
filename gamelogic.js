function gameLogic() {
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