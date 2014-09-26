// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Path Following

class Path {

  // A Path is line between two points (PVector objects)
  PVector start;
  PVector end;

  PVector newstart;
  PVector newend;
  // A path has a radius, i.e how far is it ok for the boid to wander off
  float radius;

  Path() {
    // Arbitrary radius of 20
    radius = 2;
    start = new PVector(0, height/2);
    end = new PVector(width/2, height/2);
    newstart = new PVector(0, height/2);
    newend = new PVector(width/2, height/2);
  }

  // Draw the path
  void display() {

//    strokeWeight(radius*2);
    stroke(0, 40);
    line(start.x, start.y, end.x, end.y);
    //    strokeWeight(1);
    //    stroke(0);
    //    line(start.x, start.y, end.x, end.y);
    for (int j=1; j<radius; j++) {
      line(start.x, start.y+j, end.x, end.y+j);
    }
    if (next) {
      //      println("in here");
      strokeWeight(1);
      stroke(0, 10);
      line(newstart.x, newstart.y, newend.x, newend.y);
      line(newstart.x, newstart.y, newend.x, newend.y);
      //      println(newstart.x+"newstart.x");
    }
  }
}

