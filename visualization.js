function drawViz() {
    image(extraCanvas, C_WIDTH * (2/3), C_HEIGHT * (2/3));
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