Network network;
Network network1;
Neuron n;
Neuron z;
Neuron w;
Neuron n1;
int layers = 3;
int inputs = 3;
int and = 0;
int multiples = 2;
boolean sending;
int thisNum = 0;
PVector circleLocation;
PVector pointCloud;
float circleRadius = 10;
boolean h = false;
boolean s = false;
boolean o = false;
boolean ss = false;
int which = 1;
int andTw = 0;
float opacity1;
float opacity2;
int  fill = 0;
int  fill2;
int  fill3;
int  fill4;
int  fill5;

void setup() {
  size(700, 400);
  smooth();
  int translateX = width/4;

  network = new Network(translateX, height/4);
  network1 = new Network(translateX, height*3/4);
  Neuron output = new Neuron(translateX*2, height/4, 4); //y is usually 0
  Neuron output1 = new Neuron(translateX*2, -height/4, 4); //y is usually 0

  for (int i = 0; i < layers; i++) {
    if (i==layers-1) {
      float x = map(i, 0, layers, -250, 350);
      float y = 0; //map(j, 0, inputs-1, -75, 75);
      Neuron z = new Neuron(x, y, 4);

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
        float l = 0;
        float m = map(j, 0, inputs-1, -75, 75);
        Neuron n = new Neuron(l, m, j);
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
    //    network1.feedforward(1, 1, which, and, andTw);
    network.feedforward(1, 1, which, and, andTw);
    //    network.feedforward(random(1), random(1), which, and, andTw);
    //    network.feedforward(random(inputs-1), random(inputs-1), which, and, andTw);
  }

  if (s) {
    opacity2 = 0;
    opacity1 = 40;

    fill2 = 0;
    fill3 = 255;
    fill4 = 0;
    fill5 = 0;

    which = 0;
    and = 2;
    andTw = 0;
  }
  if (o) {
    opacity1 = 0;
    opacity2 = 40;

    fill2 = 0;
    fill3 = 0;
    fill5 = 0;
    fill4 = 255;

    which = 1;
    and = 0;
    andTw = 0;
  }
  if (ss) {
    opacity1 = 40;
    opacity2 = 40;

    fill3 = 100;
    fill2 = 100;
    fill4 = 100;
    fill5 = 100;

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

