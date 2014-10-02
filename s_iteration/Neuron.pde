class Neuron {
  float sum = 0;

  PVector location;

  ArrayList<Connection> connections;
  float r = 32;
  
  Neuron(float x, float y) {
    location = new PVector(x, y);
    connections = new ArrayList<Connection>();
  }

  void addConnection(Connection c) {
    connections.add(c);
  }

  void feedforward(float input) {
    sum += input;
    if (sum>1) {
      fire();
      sum = 0;
    }
  }

  void fire() {
    r = 44; //suddenly bigger
    for (Connection c : connections) {
      c.feedforward(sum);
    }
  }

  void display() {
    stroke(0, 200, 180);
    fill(0, 200, 180);
    ellipse(location.x, location.y, r, r);
    r = lerp(r, 10, 0.08);
  }
}

