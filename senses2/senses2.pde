

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

Vehicle v;


void setup() {
  colorMode(RGB);
  size(600, 600);
  loadData();
  smooth();
  noStroke();
  v = new Vehicle(width/2, height/2);
}

void draw() {
  background(10,200,200,10);

  for (int i = 1; i< min(tweets.length,listCounter); i++) {     
    tweets[i].update();
        PVector mouse = new PVector(tweets[i].pos.x, tweets[i].pos.y);
    // Draw an ellipse at the mouse location

//    ellipse(mouse.x, mouse.y, 1, 1);

    // Call the appropriate steering behaviors for our agents
    v.arrive(mouse);
    v.update();
    v.display();
    tweets[i].render();


  }
}

void loadData() {
  // Load CSV file into a Table object
  // "header" option indicates the file has a header row
  table = loadTable("allresponses.csv", "header");

  // The size of the array of Tweet objects is determined by the total number of rows in the CSV
  tweets = new Tweet[table.getRowCount()]; 

  // You can access the CSV and iterate over all the rows in a table
  int rowCount = 0;
  for (TableRow row : table.rows()) {
    // You can access the fields via their column name (or index)
    //In this case I only have 1 column - "BrainTweets"
    float thisTweet = row.getFloat("Neurons");
    // Make a Tweet object out of the data read
    tweets[rowCount] = new Tweet(thisTweet); //make a new tweet object, send it the string of text loaded in n
    rowCount++;
  }
  println (table.getRowCount()+"this is the number of rows in the table");
}

void show() {
  for (int i = 0; i< tweets.length; i++) {
    //      float turnBy = map (i, 0, width/2, 0, TWO_PI)-HALF_PI; //mapping the index count - which row are we in - to an angle for rotation
    //      tweets[i].hourly = turnBy; //send this number to our tweet object
    println (tweets[i].thisTweet);
    tweets[i].tpos.x = width/2; //send tweet object a target x position
    tweets[i].tpos.y = map (i, 0, tweets.length, 20, height-20);  //send tweet object a target y position
  println (tweets.length);
  }
}

void keyPressed() {
  if (key=='s') show(); //if you press h, it will run the function of show()
  if (keyCode == RIGHT) {
    // for safety, do not select anything above the list length
    listCounter = min(listCounter+1, tweets.length);
    println (listCounter);
//    if (listCounter-1>-1) {
//      thisisx = width/2;
//      thisisy = map (listCounter-1, 0, tweets.length, 20, height-20);
//    }
  }
}

