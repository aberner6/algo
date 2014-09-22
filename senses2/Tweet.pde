// A Tweet class

class Tweet {

  float thisTweet;
  float hourly;
  
  PVector pos = new PVector(); //the famous PVector
  PVector tpos = new PVector(); //the amazingness of PVectors: we can define a target
  
  // Create  the Tweet
  Tweet(float s) { //receiving the text from the data
    thisTweet = s; //filling up our empty variable with the received tweet
  }

  void update() {
    pos.x = lerp(pos.x, tpos.x, .1); //magical lerping function - goes from the initial pos (0) to tpos
    pos.y = lerp(pos.y, tpos.y, .1); //magical lerping from 0 to target
    float hourly; //this number gets updated if we pass a new number to it
    float thisTweet; //this tweet gets updated if we pass a new string to it
  }

  void render() {
    pushMatrix();
//    rotate(hourly);
//    noStroke();
    strokeWeight(.1);
    stroke(0);
    ellipse(pos.x, pos.y,thisTweet*40, thisTweet*40);
    
    stroke(0);
    line(0, height/2,pos.x,pos.y);
   
    popMatrix();
  }
}
