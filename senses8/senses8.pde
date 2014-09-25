

//ParticleSystem ps;
//int psIndex;
//import java.util.Iterator;


// An Array of Bubble objects
Tweet[] tweets;
// A Table object
Table table;
PFont font;
int fontSize = 14;

float thisisx;
float thisisy;

boolean runParticle=true;
int listCounter = 1;

boolean triggerLines = false;
Vehicle[] v;
float thisSpotX = width/2;
float thisSpotY = height/2;
Mover[] m;
boolean debug = true;
PVector circleLocation;
float circleRadius;

Path[] path;

Follower[] car1;
//Follower[] car2;

ParticleSystem ps;
boolean stop = false;
boolean next = false;

PVector mouse;
float lifespan = 255;

boolean s = false;

void setup() {
  colorMode(RGB);
  size(1200, 600);
  loadData();
  smooth();
  noStroke();
  ps = new ParticleSystem(new PVector(0, height/2));
}

void draw() {
  //  background(10, 200, 200, 10);
  background(255);
  //  background(20, lifespan, 200, lifespan);
  //  background(0);
  //  lifespan -= .01;

  //  if(stop==false){
  ps.addParticle();
  ps.run();
  //  background(20, ps.lifespan, 200, ps.lifespan);
  //  }
  //  else{
  //  ps.run();    
  //  }

  for (int i = 0; i< min(tweets.length,listCounter); i++) {     
    tweets[i].update();
    if (next) {
      mouse = new PVector(tweets[i].tnewx.x, height/2);
      circleLocation = new PVector(tweets[i].tnewx.x, height/2);
    }
    else {
      mouse = new PVector(tweets[i].pos.x, tweets[i].pos.y);
      circleLocation = new PVector(tweets[i].pos.x, tweets[i].pos.y);
    }
    // Draw an ellipse at the mouse location
    tweets[i].render();

if(s){
    //    circleLocation = new PVector(tweets[i].pos.x, tweets[i].pos.y);
    circleRadius = 10;//tweets[i].pos.y-25;
    m[i].boundaries();
    m[i].run();
}

    // Call the appropriate steering behaviors for our agents
    v[i].arrive(mouse);
    v[i].update();
    v[i].display();
    
    path[i].display();

    car1[i].follow(path[i]);
    // Call the generic run method (update, borders, display, etc.)
    car1[i].run();
    // Check if it gets to the end of the path since it's not a loop
    car1[i].borders(path[i]);
  }
}

void loadData() {
  // Load CSV file into a Table object
  // "header" option indicates the file has a header row
  table = loadTable("allresponses.csv", "header");

  // The size of the array of Tweet objects is determined by the total number of rows in the CSV
  tweets = new Tweet[table.getRowCount()]; 
  v = new Vehicle[table.getRowCount()];

  m = new Mover[table.getRowCount()];

  car1 = new Follower[table.getRowCount()];
  //  car2 = new Follower[table.getRowCount()];
  path = new Path[table.getRowCount()];

  // You can access the CSV and iterate over all the rows in a table
  int rowCount = 0;
  for (TableRow row : table.rows()) {
    // You can access the fields via their column name (or index)
    //In this case I only have 1 column - "BrainTweets"
    float thisTweet = row.getFloat("Neurons");
    // Make a Tweet object out of the data read
//    m[rowCount] = new Mover(0, 0);
    v[rowCount] = new Vehicle(thisSpotX, thisSpotY);
    tweets[rowCount] = new Tweet(thisTweet); //make a new tweet object, send it the string of text loaded in n
    path[rowCount] = new Path();
    car1[rowCount] = new Follower(new PVector(0, height/2), 2, 0.02);
    //    car2[rowCount] = new Follower(new PVector(0, height/2), 2, 0.02);

    rowCount++;
  }
  println (table.getRowCount()+"this is the number of rows in the table");
}

void show() {
  for (int i = 0; i< tweets.length; i++) {
    //      float turnBy = map (i, 0, width/2, 0, TWO_PI)-HALF_PI; //mapping the index count - which row are we in - to an angle for rotation
    //      tweets[i].hourly = turnBy; //send this number to our tweet object
    println (tweets[i].thisTweet);
    tweets[i].pos.y = map (i, 0, tweets.length, 20, height-20);  //send tweet object a target y position
    tweets[i].pos.x = 200;
    tweets[i].tpos.x = width/1.3; //send tweet object a target x position
    //    tweets[i].tpos.y = map (i, 0, tweets.length, 20, height-20);  //send tweet object a target y position

    path[i].radius = tweets[i].thisTweet;

    if (i<tweets.length/2) {
      m[i] = new Mover(width/1.3, height/4);
      tweets[i].tpos.y = height/4;
    } 
    else {
      m[i] = new Mover(width/1.3, height/1.5);
      tweets[i].tpos.y = height/1.5;
    }
    //OPTION 1 - MAKES CRISSCROSSES
    //    if (i%2==1) {
    //      tweets[i].tpos.y = height/4;
    //    } 
    //    else {
    //      tweets[i].tpos.y = height/1.5;
    //    }
    //    println (tweets.length);
    if (next) {
      tweets[i].tnewx.x = width-10;
      //      tweets[i].tnewx.y = height/2;
      path[i].newstart = new PVector(tweets[i].tpos.x, tweets[i].tpos.y);  
      path[i].newend = new PVector(tweets[i].tnewx.x, height/2);
    }
    else {
      path[i].start = new PVector(tweets[i].pos.x, tweets[i].pos.y);    
      path[i].end = new PVector(tweets[i].tpos.x, tweets[i].tpos.y);
    }
    circleRadius = tweets[i].pos.y-25;
  }
}


void keyPressed() {
  if (key=='n') {
    next=true;
  }; 
  if (key=='s'){
    s = true;
    show(); 
  }
  if (keyCode == RIGHT) {
    // for safety, do not select anything above the list length
    listCounter = min(listCounter+1, tweets.length);
    if (listCounter==tweets.length) {
      triggerLines = true;
    }
  }
}

void mousePressed() {
  debug = !debug;
}

