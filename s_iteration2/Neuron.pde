class Neuron {
  float sum = 0;

  PVector location;
  PVector olocation = new PVector(-width/2, 0);

  ArrayList<Connection> connections;
  float r = 10;
  float r2 = 10;
  int index;

  int indexis;
  int indexing;

  Neuron(float x, float y, int i) {
    location = new PVector(x, y);
    connections = new ArrayList<Connection>();
    indexis = i;
  }

  void addConnection(Connection c) {
    connections.add(c);
  }

  void feedforward(float input, int which) {

    //    println(input+"feed neuron");
    println(which+"which to feed");
    sum += input;
    //    println(sum+"sum neuron");
    indexing = which;

    //    println(input);
    if (sum>1) {
      fire();
      sum = 0;
    }
  }

  void fire() {
    r = 24; //suddenly bigger
//    olocation.x = -1;
//    location.x = lerp(location.x, olocation.x, 1);

    for (Connection c : connections) {
      c.feedforward(sum, indexing);
    }
  }

  void display() {
    //    noStroke();
    strokeWeight(.1);
    //    if (indexing%2==0) {
    if (indexis==4) {
      noStroke();
      //      println("yeah");
      //      stroke(fill, 100, 100);
      if (fill2>0 || fill3>0) {
        fill(fill, fill2, fill3, opacity1);
      }
      if (fill4>0 || fill5>0) {
        fill(fill, fill4, fill5, opacity2);
      }
      r = lerp(r, r2, 0.08);
      ellipse(location.x, location.y, r, r);
    }
    else {
      if (indexing%2==0) {
        if (indexis%2==0) {
          stroke(fill, 0, 255);
          fill(fill, fill2, fill3, opacity1);
          r = lerp(r, r2, 0.08);
          ellipse(location.x, location.y, r, r);
        }
      }
      if (indexing%2==1) {
        if (indexis%2==1) {
          stroke(fill, 255, 0);
          fill(fill, fill4, fill5, opacity2);
          r = lerp(r, r2, 0.08);
          ellipse(location.x, location.y, r, r);
        }
      }
    }
    //    else{

    //    }
    //    else {
    //      if (indexis%2==0) {
    //        stroke(fill, fill2, fill3);
    //        fill(fill, fill2, fill3, opacity1);
    //        ellipse(location.x, location.y, r, r);
    //        r = lerp(r, r2, 0.08);
    //      }
    //      if (indexis%2==1) {
    //        stroke(fill, fill3, fill2);
    //        fill(fill, fill3, fill2, opacity2);
    //        r = lerp(r, r2, 0.08);
    //        ellipse(location.x, location.y, r, r);
    //      }
    //    }
  }
}

