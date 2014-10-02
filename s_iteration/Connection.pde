class Connection {
  Neuron a;
  Neuron b;
  float weight;

  boolean sending = false;
  PVector sender;
  float output = 0;

  Connection(Neuron from, Neuron to, float w) {
    weight = w;
    a = from;
    b = to;
  }

  void feedforward(float val) {
    sending = true;
    sender = a.location.get();
    output = val*weight;
  }
  void update() {
    if (sending) {
      sender.x = lerp(sender.x, b.location.x, .1);
      sender.y = lerp(sender.y, b.location.y, .1);

      float d = PVector.dist(sender, b.location);
      if (d<1) {
        b.feedforward(output);
        sending = false;
      }
    }
  }

  // Draw line and traveling circle
  void display() {
    stroke(200);
    strokeWeight(1+weight*4);
    line(a.location.x, a.location.y, b.location.x, b.location.y);

    if (sending) {
      if (h) {
        circleLocation = new PVector(sender.x, sender.y);
        circleRadius = sender.y-25;
        for (int i=0; i<numMovers; i++) {
          m[i].boundaries();
          m[i].run();
        }
      }
      fill(0);
      noStroke();
      //      strokeWeight(1);
      ellipse(sender.x, sender.y, 10, 10);
    }
  }
}

