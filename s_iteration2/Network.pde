class Network {
  ArrayList<Neuron> neurons;

  // The Network now keeps a duplicate list of all Connection objects.
  // This makes it easier to draw everything in this class
  ArrayList<Connection> connections;

  PVector location;
  PVector tlocation;

  int index;

  Network(float x, float y) {
    location = new PVector(x, y);
    neurons = new ArrayList<Neuron>();
    connections = new ArrayList<Connection>();
  }
  void addNeuron(Neuron n) {
    neurons.add(n);
  }
  void connect(Neuron a, Neuron b, float weight, int i) {
    Connection c = new Connection(a, b, weight, i);
    a.addConnection(c);
    // Also add the Connection here
    connections.add(c);
  }

  // Sending an input to the first Neuron
  // We should do something better to track multiple inputs
  void feedforward(float input1, float input2, int which, int and, int andTw) {

    Neuron n1 = neurons.get(which);
    n1.feedforward(input1, which);
    Neuron n2 = neurons.get(which+and);// or just (which);
    n2.feedforward(input2, which+and);

    if (andTw>0) {
      Neuron n3 = neurons.get(which+andTw);// or just (which);
      n3.feedforward(input1, which+andTw);
    }
  }

  // Update the animation
  void update() {
    
    for (Connection c : connections) {
      c.update();
      //      c.run();
    }
  }
  void display() {

    pushMatrix();
    translate(location.x, location.y);
    for (Connection c : connections) {
      circleLocation = new PVector(location.x, location.y);
      c.boundaries();
      //      c.run();
      c.display();
    }
    for (Neuron n: neurons) {
      n.display();
    }

    popMatrix();
  }
}

