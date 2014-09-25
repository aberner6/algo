// A Tweet class

class Tweet {

  float thisTweet;
  float hourly;

  PVector pos = new PVector(); //the famous PVector
  PVector tpos = new PVector(); //the amazingness of PVectors: we can define a target


  float distX;
  float distY;
  
  PVector newx = new PVector();
  PVector tnewx = new PVector();
  
  // Create  the Tweet
  Tweet(float s) { //receiving the text from the data
    thisTweet = s; //filling up our empty variable with the received tweet
  }

  void update() {
    pos.x = lerp(pos.x, tpos.x, .05); //magical lerping function - goes from the initial pos (0) to tpos
    pos.y = lerp(pos.y, tpos.y, .05); //magical lerping from 0 to target
    newx.x = lerp(newx.x, tnewx.x, .1);
    newx.y = lerp(newx.y, tnewx.y, .1);
    float hourly; //this number gets updated if we pass a new number to it
    float thisTweet; //this tweet gets updated if we pass a new string to it
    float distX;
    float distY;
  }

  void render() {
    pushMatrix();
    //    rotate(hourly);
//    strokeWeight(.1);
//    stroke(0);
    ellipse(pos.x, pos.y, 10,10);
    noFill();
//    bezier(0, pos.y, 410, 20, 440, 300, pos.x, pos.y);
//    line(0, pos.y, pos.x, pos.y);
  if (next) {
//    strokeWeight(4);
//    stroke(0,10);
//    line(width/1.3, height/4, newx.x, height/2);
//    line(width/1.3, height/1.5, newx.x, height/2);
//    ellipse(newx.x, height/2, 10,10);    
    ellipse(width-10, height/2, 10, 10);
  }
//  else{
//    ellipse(pos.x, pos.y, 10,10);    
//  }

    popMatrix();
  }
}

