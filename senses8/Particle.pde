// A simple Particle class

class Particle {
  PVector location;
  PVector velocity;
  PVector acceleration;
  float lifespan;

  Particle(PVector l) {
    acceleration = new PVector(0.05, 0);
    //    acceleration = new PVector(0,0.05);
    velocity = new PVector(random(-1, 1), random(-10, 10));
    location = l.get();
    lifespan = 255.0;
  }

  void run() {
    update();
    display();
  }

  // Method to update location
  void update() {
    velocity.add(acceleration);
    location.add(velocity);
    lifespan -= 3.0;
  }

  // Method to display
  void display() {
    //    stroke(255,lifespan);
    noStroke();
    fill(20, lifespan, 200, lifespan);
    ellipse(location.x, location.y, lifespan, lifespan);
//    ellipse(width-location.x/2, location.y, lifespan/10, lifespan/10);
    
//    ellipse(map(location.x, 0, 200, 0, width), 4, lifespan/10, lifespan/10);
  }

  // Is the particle still useful?
  boolean isDead() {
    if (lifespan < 0.0) {
      return true;
    } 
    else {
      return false;
    }
  }
}

