Network network;
Network network1;
Neuron n;
Neuron z;
Neuron n1;
int layers = 3;
int inputs = 3;
int and = 0;
int multiples = 2;
boolean sending;
int thisNum = 0;
PVector circleLocation;
float circleRadius = 10;
boolean h = false;
boolean s = false;
boolean o = false;
boolean ss = false;
int which = 1;
int andTw = 0;

void setup() {
  size(700, 400);
  smooth();
  int translateX = width/4;

  network = new Network(translateX, height/4);
  network1 = new Network(translateX, height*3/4);
  Neuron output = new Neuron(translateX*2, height/4, 0); //y is usually 0
  Neuron output1 = new Neuron(translateX*2, -height/4, 0); //y is usually 0
  // Create the Network object
  //  network = new Network(width/2, height/2);
  //
  //  int layers = 3;
  //  int inputs = 3;
  //
  //  Neuron output = new Neuron(250, 0, 5);
  //  for (int i = 0; i < layers; i++) {
  //    for (int j = 0; j < inputs; j++) {
  //      float x = map(i, 0, layers, -250, 300);
  //      float y = map(j, 0, inputs-1, -75, 75);
  //      Neuron n = new Neuron(x, y, i);
  //      if (i > 0) {
  //        for (int k = 0; k < inputs; k++) {
  //          Neuron prev = network.neurons.get(network.neurons.size()-inputs+k-j); 
  //          network.connect(prev, n, 1, 1);
  //        }
  //      }
  //      if (i == layers-1) {
  //        network.connect(n, output, 1, 1);
  //      }
  //      network.addNeuron(n);
  //    }
  //  } 
  //  network.addNeuron(output);
  //}
  for (int i = 0; i < layers; i++) {
    if (i==layers-1) {
      float x = map(i, 0, layers, -250, 350);
      float y = 0; //map(j, 0, inputs-1, -75, 75);
      Neuron z = new Neuron(x, y, i);
      if (i > 0) {
        for (int k = 0; k < inputs; k++) {
          Neuron prev = network.neurons.get(k); 
          network.connect(prev, z, 1, 1);//random(1));
          network1.connect(prev, z, 1, 1);//random(1));
        }
      }
      network.connect(z, output, 1, 1);
      network.addNeuron(z);

      network1.connect(z, output1, 1, 1);
      network1.addNeuron(z);
    }
    else {
      for (int j = 0; j < inputs; j++) {
        float x = 0;
        float y = map(j, 0, inputs-1, -75, 75);
        Neuron n = new Neuron(x, y, j);
        network.addNeuron(n);
        network1.addNeuron(n);
      }
    }
  } 
  network.addNeuron(output);
  network1.addNeuron(output1);
}


void draw() {
  background(255);
  network.update();
  network.display();
  network1.update();
  network1.display();
  // Every 30 frames feed in an input
  if (frameCount % 80 == 0) {
    //    println("hey");
    network.feedforward(1, 1, which, and, andTw);
//    network.feedforward(random(1), random(1), which, and, andTw);
//    network.feedforward(random(inputs-1), random(inputs-1), which, and, andTw);
  }

  if (s) {
    //"sound and smell"
    which = 0;
    and = 2;
    andTw = 0;
  }
  if (o) {
    which = 1;
    and = 0;
    andTw = 0;
  }
  if (ss) {
    which = 0;
    and = 1;
    andTw = 2;
  }
}

void keyPressed() {
  if (keyCode == RIGHT) {
    o = true; //only sound
    s = false;
    ss = false;
  }
  if (keyCode==LEFT) {
    s = true; //only smell
    o = false;
    ss = false;
  }
  if (keyCode==UP) {
    s = false; 
    o = false;
    ss = true; //sound and smell
  }
}

