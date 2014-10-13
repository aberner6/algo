

Network network;
Network network1;
Network network2;

Neuron n;
Neuron z;
Neuron w;
Neuron n1;
Neuron n2;
Neuron n4;
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
boolean i = false;

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

float thisx;
int zk;
int layers2 = 10;
int inputs2 = 10;

float c1;
float c2;
int translateX = width/4;
int translateX2 = 0;

void setup() {
  size(1200, 800);
  smooth();
  //frameRate(10);
  //for(int j = 0; j<100000; j++){
  //  for (int i=0; i<height; i++) {
  //    //    c1 = random(10, 200);
  //    //    c2 = random(100,255);
  //    ps = new ParticleSystem(new PVector(0, i));
  //    zk = i;
  //  }
  //}

  network2 = new Network(translateX2, height/2);
  Neuron output2 = new Neuron(width*2, height/2, 5);

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

  //  Neuron output = new Neuron(250, 0);
  for (int s = 0; s < layers2; s++) {
    for (int j = 0; j < inputs2; j++) {
      float x = map(s, 0, layers2, -width/4, width*1.5);
      float y = map(j, 0, inputs2-1, -height/2+100, height/2-100);
      Neuron n4 = new Neuron(x, y, 5);
      if (s > 0) {
        for (int k = 0; k < inputs2; k++) {
          if (k<inputs2/2) {
            Neuron prev = network2.neurons.get(network2.neurons.size()-inputs2+k-j); 
            network2.connect(prev, n4, 5, 1);
          }
          if (k>inputs2/2) {
            Neuron prev = network2.neurons.get(network2.neurons.size()-inputs2+k-j); 
            network2.connect(prev, n4, 6, 1);
          }
        }
      }
      if (s == layers2-1) {
        network2.connect(n4, output2, 5, 1);
      }
      network2.addNeuron(n4);
    }
  } 
  network2.addNeuron(output2);
}


void draw() {
  background(255);
  //  ps.addParticle();
  //  ps.run();

  if (h) {
    network2.update();
    network2.display();
  }
  if (i) {
    network.update();
    network.display();
    network1.update();
    network1.display();
  }
  //      if (h) {
  //      network2.feedforward(1, 1, which, and, andTw);
  //    }
  // Every 30 frames feed in an input
  if (frameCount % 90 == 0) {
    //       network1.feedforward(1, 1, which, and, andTw);
    if (i) {
      network.feedforward(1, 1, which, and, andTw);
    }
    if (h) {
      network2.feedforward(1, 1, which, and, andTw);
    }
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
  //  if (key=="l") {
  //    h = true;
  //  }
  if (key=='h') {
    h = true;
    i = false;
  }
  if (key == 'i') {
    i = true;
    h = false;
  }
  //  if (keyPressed == 'o') {
  //    i = false;
  //  }
}

