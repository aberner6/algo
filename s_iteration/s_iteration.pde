Network network;
Network network1;
Neuron n;
Neuron n1;

Mover[] m;
int numMovers;
PVector circleLocation;
float circleRadius = 10;
boolean h = false;
void setup() {
  size(700, 400);
  int translateX = width/3;

  network = new Network(translateX, height/4);
  network1 = new Network(translateX, height*3/4);

  int layers = 3;
  int inputs = 3;

  int multiples = 2;

  numMovers = inputs*multiples;

  Neuron output = new Neuron(translateX, height/4); //y is usually 0
  Neuron output1 = new Neuron(translateX, -height/4); //y is usually 0
  m = new Mover[numMovers];
  for (int i = 0; i<numMovers; i++) {
    m[i] = new Mover(translateX, height/4);
  }
  for (int i = 0; i < layers; i++) {
    if (i==layers-1) {
      float x = map(i, 0, layers, -250, 300);
      float y = 0;//map(j, 0, inputs-1, -75, 75);
      Neuron n = new Neuron(x, y);
      if (i > 0) {
        for (int k = 0; k < inputs; k++) {
          Neuron prev = network.neurons.get(k); 
          network.connect(prev, n, .1);//random(1));
          network1.connect(prev, n, .1);//random(1));
        }
      }
      network.connect(n, output, random(1));
      network.addNeuron(n);

      network1.connect(n, output1, random(1));
      network1.addNeuron(n);
    }
    else {
      for (int j = 0; j < inputs; j++) {
        float x = 0;
        float y = map(j, 0, inputs-1, -75, 75);
        Neuron n = new Neuron(x, y);
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

}

void keyPressed() {
  if (keyCode == RIGHT) {
    network.feedforward(random(1), random(1), parseInt(random(2)));
  }
  if (key=='h') { 
    h = true;
  }
}

