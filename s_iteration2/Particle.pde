// A simple Particle class

class Particle {
  PVector location;
  PVector l;
  PVector velocity;
  PVector acceleration;
  float lifespan;
  float r = 10;
  float r2 = 15;
  int zk;

  Particle(PVector l) {
    acceleration = new PVector(0.05, 0);
    velocity = new PVector(random(-1, 1), random(-10, 10));
    location = l.get();
    //    l = l.get();
    //    println(l.y);
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
    lifespan -= 4.0;
    r = lerp(7, 10, 0.5);
  }

  // Method to display
  void display() {
    noStroke();
    fill(random(50, 200), random(100, 255), random(100, 255), lifespan);

    //    fill(20, lifespan, 200, lifespan);
    for (int i=0; i<200; i++) {
      //    int ls = parseInt(
      if (i%2==1) {
        ellipse(location.x, location.y+i*r, r, r);//r+random(0,5), r+random(0,5));
      }
      if (i%2==0) {
        ellipse(location.x, location.y-i*r, r, r);//r+random(0,5), r+random(0,5));
      }
    }
  }

  // Is the particle still useful?
  boolean isDead() {
    if (lifespan < 0.0) {
      thisx = location.x;
      //      println(location.x+"is dead");
      return true;
    } 
    else {
      return false;
    }
  }
}

