class Neuron {
  float sum = 0;

  PVector location;

  ArrayList<Connection> connections;
  float r = 10;
  float r2 = 10;
  int index;

  int  fill = 0;
  int  fill2 = 0;
  int  fill3 = 255;
  int opacity1;
  int opacity2;

  Neuron(float x, float y, int i) {
    location = new PVector(x, y);
    connections = new ArrayList<Connection>();
    index = i;
  }

  void addConnection(Connection c) {
    connections.add(c);
  }

  void feedforward(float input) {
    opacity1 = 0;
    opacity2 = 0;
    println(input+"feed neuron");
    sum += input;
    println(sum+"sum neuron");

//    println(input);
    if (sum>1) {
      fire();
      sum = 0;
    }
  }

  void fire() {
    r = 24; //suddenly bigger
    //    fill = 0;
    //    fill2 = 0;
    //    fill3 = 255;
    //    fill4 = 200;
    //    fill5 = 0;
    opacity1 = 40;
    opacity2 = 40;
    for (Connection c : connections) {
      c.feedforward(sum);
    }
  }

  void display() {
    //    noStroke();
    strokeWeight(.2);
    if (index%2==0) {
      stroke(fill, fill2, fill3);
      fill(fill, fill2, fill3, opacity1);
      ellipse(location.x, location.y, r, r);
      r = lerp(r, r2, 0.08);
    }
    if (index%2==1) {
      stroke(fill, fill3, fill2);
      fill(fill, fill3, fill2, opacity2);
      r = lerp(r, r2, 0.08);
      ellipse(location.x, location.y, r, r);
    }
  }
}

