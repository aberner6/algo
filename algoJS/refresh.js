var svg, vis, 
inputCirc, inputLine, trackCirc, senseCirc,
outputLine, outputCirc, finalOutputCirc,
yIn, xIn,
path,
circle, line, rollingCirc;
var windowWidth = window.outerWidth,
    windowHeight= window.innerHeight,
    height = windowHeight,
    width = windowWidth;
// var height = 800;
// var r;
var r = 10;
var a = false;
var t = [];
var o = [];
// var strokeWeight = 1;
// var lineColor = "gray";
// var inColor = "gray";
// var movingColor = "#438CA5";
// var outColor = "gray";
var startUp, shiftAway, endOutput, rollingCircle;
// var distBetween = 40;

var myVar=setInterval(function () {myTimer()}, 1000);
var d;
var secs;
var soundsLoaded;
var intro = true;
function myTimer() {
    d = new Date();
    secs = d.getMilliseconds();
    // moveAround(secs/10);
}

svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
vis = svg //for the visualization
    .append('svg:g')
    .attr("transform",
      "translate("+ 0 + "," + 0 + ")");  
o = [1, 2];
var numInput = 100;
t = [1, 2, 3];
var lmargin = 200;
var yMid = 330;
yIn = d3.scale.linear()
    .domain([0, t.length])
    .range([height/8, height-height/8])
// xIn = d3.scale.linear()
//     .domain([0, t.length])
//     .range([lmargin, width-lmargin])
xIn = d3.scale.linear()
    .domain([0, numInput])
    .range([lmargin, width+lmargin])

circle = vis.selectAll("neurons")
    .data(t)
    .enter()
    .append("circle").attr("class","neurons")
    .attr("cx", lmargin)
    .attr("cy", function(d,i){
        return yIn(i);
    })
    .attr("r", r)
    .attr("fill", "none")
    .attr("stroke-dasharray", function(d,i){
        if(i%2==1){
            return ("4,4");
        }
        else{
            return ("0,0");
        }
    })
    .attr("stroke", "gray")
    .attr("opacity",0)
    .transition()
    .duration(8000)
    .attr("opacity",1);

rollingCirc = vis.selectAll("rollingCirc")
    .data(t)
    .enter()
    .append("circle").attr("class","rollingCirc")
    .attr("cx", 0)
    .attr("cy", function(d,i){
        return yIn(i);
    })
    .attr("r", r)
    .attr("fill", "none")
    .attr("stroke-dasharray", function(d,i){
        if(i%2==1){
            return ("4,4");
        }
        else{
            return ("0,0");
        }
    })
    .attr("stroke", "gray")
    .attr("opacity",0);

inputCirc = vis.selectAll("inCirc")
    .data(d3.range(numInput))
    .enter()
    .append("circle").attr("class", "inCirc")
    .attr("cx", function(d,i){
        if(i%2==1){
            return Math.random(-1,1)*10;
        }
        else{
            return -1*Math.random(-1,1)*10;
        }
    })
    .attr("cy", function(d,i){
        if(i%2==1){
            return yIn(i%3)+Math.random(-1,1)*10;
        }
        else{
            return yIn(i%3)-Math.random(-1,1)*10;
        }
    })
    .attr("r", r/2)
    .attr("opacity",1)
    .attr("fill", "none")
    .attr("stroke-dasharray", function(d,i){
        if(i%2==1){
            return ("4,4");
        }
        if(i%2==0){
            return ("0,0");
        }
    })
    .attr("stroke", "gray");

function passSense(output){
if(output==0){
d3.selectAll(".inCirc")
    .transition()
    .duration(100)
    .attr("opacity",1)
    .each("end", function(){
        d3.selectAll(".inCirc")
            .transition()
            .duration(4000)      
            .attr("cx", function(d,i){
                return xIn(i)+Math.random(-1,1)*10;
            })
            .each("end", function(){
                d3.selectAll(".inCirc")
                    .transition()
                    .duration(2000)
                    .attr("opacity",function(d,i){
                        return 0;
                    })
                    .each("end", function(){
                        d3.selectAll(".inCirc")
                        .transition()               
                        .attr("cx", function(d,i){
                            if(i%2==1){
                                return Math.random(-1,1)*10;
                            }
                            else{
                                return -1*Math.random(-1,1)*10;
                            }
                        })
                        .attr("cy", function(d,i){
                            if(i%2==1){
                                return yIn(i%3)+Math.random(-1,1)*10;
                            }
                            else{
                                return yIn(i%3)-Math.random(-1,1)*10;
                            }
                        })
                    })
            })  
    })
}
else{
    d3.selectAll(".rollingCirc")
    .transition()
    .duration(100)
    .attr("opacity",1)
    .each("end", function(){
        d3.selectAll(".rollingCirc")
            .transition()
            .duration(3000)
            .attr("cx", lmargin)
            .each("end", function(){
                 d3.selectAll(".rollingCirc")
                .transition()
                .duration(3000)
                .attr("cx", lmargin*3)   
                .attr("cy", yMid);    
            })
    })
}
}
//    // .attr("transform", "translate("+lmargin*4+",0)")
function showLines(){
line = vis.selectAll("inLine")
    .data(t)
    .enter()
    .append("line").attr("class","inLine")
    .attr("x1", lmargin)
    .attr("y1", function(d,i){
        return yIn(i);
    })
    .attr("x2", lmargin*3)
    .attr("y2", function(d,i){
        return yMid;
    })
    .attr("fill", "none")
    .attr("stroke-dasharray", function(d,i){
        if(i%2==1){
            return ("4,4");
        }
        else{
            return ("0,0");
        }
    })
    .attr("stroke", "gray")
    .attr("opacity",0)
    .transition()
    .duration(4000)
    .attr("opacity",1);
}

























































$('.about').tipsy({
    gravity: 'nw', 
    html: true, 
    title: function() {
         return "Created by the Spatial Information Design Lab & Stefano Fusi Lab"
         +'<br>'+'Researcher: Lyudmila Kushmir'+'<br>'+"Designer/Developer: Annelie Berner"+ '<br>';
    }
});
var b = 0;
d3.select("#enter").on("click", function(){
    $('#intro').slideDown("slow");
    $('#title').fadeOut("slow");
})
d3.select('#introNav2').on("click", function(){
    b++;
    if(b==1){
        showLines();
        passSense(1)
        // passSense(0);
        intro = false;
        $("p:first").replaceWith("<p>Let's consider a network of 6 neurons</p>");
        // svg.call(transition, p0, p1);
        $("#intro").animate({
            top: "100px",
            left: "200px",
        });
    }
    if(b==2){
        passSense(0);
        $("p:first").replaceWith("<p>And throw in a sound input from our sense cloud</p>");
        // soundsLoaded();
    }
    if(b==3){
        showLines();
        passSense(1)
        $("p:first").replaceWith("<p>Next let's try smell</p>");
        // loop.stop("sound" + 1);
    }
    if(b==4){
        $("#buttons").show()

    }

    $("#smell").on("click", function(){
      loop.stop("sound" + 1);
    })
    $("#sound").on("click", function(){
        soundsLoaded();
    })

    if(b==5){
    $("p:first").replaceWith("<p>And then</p>");
        // svg.call(transition, p1, p2);
        $("#buttons").hide();
        loop.stop("sound" + 1);

        $("#intro").animate({
            top: "100px",
            left: "400px",
        });
    }
    if(b==6){
        $("#intro").animate({
            top: "100px",
            left: "600px",
        });
    $("p:first").replaceWith("<p>After that</p>");
    }
    if(b==7){
        $("#intro").animate({
            top: "100px",
            left: "100px",
        });
    $("p:first").replaceWith("<p>Lastly</p>");        
    }
});

var p0 = [width/2,height/2, windowHeight],
    p1 = [width/2, height/2, windowHeight],
    p2 = [width/2, height/2, windowHeight];  
function transition(svg, start, end) {
var  i = d3.interpolateZoom(start, end);
  vis
    .attr("transform", transform(start))
    .transition()
    .delay(1000)
    .duration(i.duration * 2)
    .attrTween("transform", function() { return function(t) { return transform(i(t)); }; })

}
var center = [width / 2, height / 2];
function transform(p) {
var k = height / p[2]; //*2;
    return "translate(" + (center[0] - p[0] * k) + "," + (center[1] - p[1] * k) + ")scale(" + k + ")";
}


// var circ = vis.selectAll("circle")
//     .data(d3.range(1000))
//     .enter().append("circle")
//     .attr("r", function() { return rain(1 + Math.random() * 50); })
//     .attr("cx", 0)
//     .attr("cy", 0)
//     .attr("fill","white")
//     .attr("opacity",.8)
// size is linearly proportional to square pixels (not exact, yet)
function rain(size) {
  var r = Math.sqrt(size / Math.PI);
  return 8;
}
var colorSpectrum = ["#438CA5",
"#C4602E",
"#BD57D3",
"#678F39",
"#7372BE",
"#C84961",
"#BC5296"];

var color = d3.scale.ordinal()
    .domain([0, 1000])
    .range(colorSpectrum);

function moveAround(secs){
// could use transparent gradient overlay to vary raindrop color
var yMap = d3.scale.linear()
            .domain([0, 1000])
            .range([-100, height])
var yMap2 = d3.scale.linear()
            .domain([0, 1])
            .range([0, height])
var xMap = d3.scale.linear()
            .domain([0, 1])
            .range([0, 100])
var xMap2 = d3.scale.linear()
            .domain([0, 1000])
            .range([0, width])
    circ
    .transition()
    .duration(1000)
    .attr("cy", function(d,i){
        if (intro){
            return yMap2(Math.random());
        }  
        else{
            return yMap(secs)+i*2.5;//2.9;            
        }
    })
    .attr("cx", function(d,i){
        if(intro){
            return xMap2(secs)+i*5;
        }
        else{
            return xMap(Math.random());
        }
    })
    .attr("fill", function(d,i){
        return color(i)
    })

    // .attr("transform", function(d,i) {
    //   return "rotate(" + d + ")"
    //        + 
    //       "translate(" + (secs) + ","+(0)+")";
    //       + "rotate(90)";
    // });
}
















loop = new SeamlessLoop();

//check if the browser can play MP3's. If not, use ogg.
var audio  = document.createElement("audio"),
canPlayMP3 = (typeof audio.canPlayType === "function" &&
              audio.canPlayType("audio/mpeg") !== "");

if (canPlayMP3===true) {
   // loop.addUri("http://localhost:8000/music/BD.mp3", 500, "sound1");
// loop.addUri("https://www.youtube.com/watch?v=g0ziLeohVLc"
  loop.addUri("http://www.freesoundfiles.com/Sounds/Tom%206.wav", 500, "sound1");
} else {
  // loop.addUri("http://stash.rachelnabors.com/music/byakkoya_single.ogg", 1000, "sound1");
}

function soundsLoaded() {
  var n = 1;
  loop.start("sound" + n);
};
