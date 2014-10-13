class Connection {
  Neuron a;
  Neuron b;
  float weight;

  boolean sending = false;
  PVector sender;
  PVector pointCloud;
  float output = 0;

  int rd = 6;
  PVector loc;
  PVector velocity;
  PVector acceleration;
  float r;
  float maxspeed;
  float maxforce;

  float index;

  //  float lerp1 = .25;
  float lerp2 = .2;
  float lerp1 = .2;

  Connection(Neuron from, Neuron to, float w, float i) {
    weight = w;
    a = from;
    b = to;

    index = i;

    acceleration = new PVector(0, 0);
    velocity = new PVector(1, 0);
    velocity.mult(5);
    loc = new PVector(-width/2, 0);
    r = 3;
    maxspeed = 1;
    maxforce = 0.015;
  }

  void feedforward(float val, float index) {
    sending = true;
    pointCloud = a.location.get();
    sender = a.location.get();
    output = val*weight;
//    println(index+"feed connection");
  }

  //  void run() {
  //    update();
  //    display();
  //  }

  void update() {
    if (sending) {

      sender.x = lerp(sender.x, b.location.x, lerp1);
      sender.y = lerp(sender.y, b.location.y, lerp1);

      pointCloud.x = lerp(pointCloud.x, sender.x, lerp2);
      pointCloud.y = lerp(pointCloud.y, sender.y, lerp2);

      float d = PVector.dist(sender, b.location);
      float z = PVector.dist(pointCloud, sender);
      //      if (z<.5) {
      //        b.feedforward(output, index);
      //
      //        println(output+"output");
      //        sending = false;
      //      }
      //
      if (z<1.5) {

        b.feedforward(output, index);

//        println(output+"output");
        sending = false;
      }
      // Update velocity
      velocity.add(acceleration);
      // Limit speed
      velocity.limit(maxspeed);
      loc.add(velocity);
      // Reset accelertion to 0 each cycle
      acceleration.mult(0);
    }
  }

  void boundaries() {

    PVector desired = null;

    // Predict location 25 (arbitrary choice) frames ahead
    PVector predict = velocity.get();
    predict.mult(25);
    PVector futureLocation = PVector.add(loc, predict);
    float distance = PVector.dist(futureLocation, circleLocation);

    if (distance > circleRadius) {
      PVector toCenter = PVector.sub(circleLocation, loc);
      toCenter.normalize();
      toCenter.mult(velocity.mag());
      desired = PVector.add(velocity, toCenter);
      desired.normalize();
      desired.mult(maxspeed);
    }

    if (desired != null) {
      PVector steer = PVector.sub(desired, velocity);
      steer.limit(maxforce);
      applyForce(steer);
    }
    //    noStroke();
    //    fill(255, 0, 0);
    //    ellipse(futureLocation.x, futureLocation.y, 10, 10);
  }  

  void applyForce(PVector force) {
    // We could add mass here if we want A = F / M
    acceleration.add(force);
  }
  // Draw line and traveling circle
  void display() {

    if (weight==5) {
      strokeWeight(.5);
      stroke(200);
      noFill();
      bezier(a.location.x, a.location.y, a.location.x, a.location.y-weight*4, b.location.x, b.location.y-weight*4, b.location.x, b.location.y);
    }    
    else {
      stroke(200);
      strokeWeight(1);
      //    weight = -1;
      //    strokeWeight(1+weight*4);
      noFill();
      bezier(a.location.x, a.location.y, a.location.x, a.location.y-weight*4, b.location.x, b.location.y-weight*4, b.location.x, b.location.y);
    }

    //    line(a.location.x, a.location.y, b.location.x, b.location.y);
    // Draw line and traveling circle

    if (sending) {
//      fill(0);
//      strokeWeight(1);
      ellipse(sender.x, sender.y, 4, 4);
    }
    //    if (sending) {
    //      if (weight==5 || weight==6) {
    //        float theta = velocity.heading2D()+radians(90);
    //        noFill();
    //        stroke(200);
    //        strokeWeight(.5);
    //        //        noStroke();
    //        //        fill(fill, random(200, 250), random(200, 250), 70);
    //        pushMatrix();
    //        translate(pointCloud.x, pointCloud.y);
    //        rotate(theta);
    //        beginShape(TRIANGLES);
    //        vertex(0, -rd/2);
    //        vertex(-rd/2, rd/2);
    //        vertex(rd/2, rd/2);
    //        popMatrix();
    //      }
    //      else {
    //        println("what");
    //        float theta = velocity.heading2D()+radians(90);
    //        noFill();
    //        stroke(200);
    //        strokeWeight(1);
    //        pushMatrix();
    //        translate(pointCloud.x, pointCloud.y);
    //        //      translate(sender.x, sender.y);
    //        rotate(theta);
    //        beginShape(TRIANGLES);
    //        vertex(0, -rd*2);
    //        vertex(-rd, rd*2);
    //        vertex(rd, rd*2);
    //        popMatrix();
    //      }
//  }
}
}
