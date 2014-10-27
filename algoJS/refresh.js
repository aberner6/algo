var svg, vis, 
inputCirc, inputLine, trackCirc, senseCirc,
outputLine, outputCirc, finalOutputCirc,
yIn, xIn,
path,
circle, line, rollingCirc, cloudCirc;
var moveAround;
var windowWidth = window.outerWidth,
    windowHeight= window.innerHeight,
    height = windowHeight,
    width = windowWidth;
var addIt =0;
var trigger = false;
var tSense;
var threshold = 1.1;
var input = [];

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
var opacity = .5;
var littleL = 4;
var d;
var secs;
var soundsLoaded;
var intro = true;
var tData = [];
var myTimer;

var colorSpectrum = [];
// loadData("senses.csv")
// function loadData(csvName){
// d3.csv(csvName, function(thisData) {
    // for (i=0; i<data.length; i++){
        // sense[i] = data[i].sense;
        // weight[i] = data[i].weight;
        // thisData.push({"sense":data[i].sense, "weight": data[i].weight})
        // links.push({"source":neuronA[i],"target":neuronB[i]}) 
    // }
// }

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
var randLength = 1000;










loadData("senses.csv")
function loadData(csvName){

d3.csv(csvName, function(thisData) {
tData=(thisData);
// if(tData.length>1){
// calculate("sm");
// calculate("to");

    // console.log(tData);
// }
colorSpectrum = ["#438CA5",
"#C4602E",
"#BD57D3",
"#678F39",
"#7372BE",
"#C84961",
"#BC5296"];
var color1 = "#438CA5";
var color2 = "#C4602E";
var color = d3.scale.ordinal()
    .domain([0, randLength])
    .range(colorSpectrum);
t = [1, 2, 3];
var lmargin = 200;
var yMid = height/2;
yIn = d3.scale.linear()
    .domain([0, thisData.length-1])
    .range([height/4, height-height/4]);
yRand = d3.scale.linear()
    .domain([0, randLength])
    .range([0, height]);
xIn = d3.scale.linear()
    .domain([0, numInput])
    .range([lmargin, width+lmargin])
// function simpleStuff(thisData){
var myVar=setInterval(function () {myTimer()}, 1000);

function myTimer() {
    d = new Date();
    secs = d.getMilliseconds();
    moveAround(secs/10);
}

circle = vis.selectAll("neurons")
    .data(thisData)
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

line = vis.selectAll("inLine")
    .data(thisData)
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
    .attr("stroke-weight", function(d,i){
        return tData[i].weight;
    })
    // .attr("stroke-dasharray", function(d,i){
    //     if(i%2==1){
    //         return ("4,4");
    //     }
    //     else{
    //         return ("0,0");
    //     }
    // })
    .attr("stroke", "gray")
    .attr("opacity",0);

rollingCirc = vis.selectAll("rollingCirc")
    .data(thisData)
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
    .attr("stroke", function(d,i){
        if(i%2==1){
            return "#7372BE";//(colorSpectrum[4]);
        }
        if(i%2==0){
            return "#C84961";//(colorSpectrum[5]);
        }
    })
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
    .attr("r", r)
    .attr("opacity",0)
    .attr("fill", "none")
    .attr("stroke-dasharray", function(d,i){
        if(i%2==1){
            return ("4,4");
        }
        if(i%2==0){
            return ("0,0");
        }
    })
    .attr("stroke", function(d,i){
        if(i%2==1){
            return (color1);
        }
        if(i%2==0){
            return (color2);
        }
    })
    // "gray");



cloudCirc = vis.selectAll("cloudCirc")
    .data(d3.range(randLength))
    .enter()
    .append("circle").attr("class", "cloudCirc")
    .attr("cx", function(d,i){
            return 5+Math.random(-1,1);
    })
    .attr("cy", function(d,i){
            // console.log(i);
            return yRand(i)+Math.random(-1,1);
    })
    .attr("r", r)
    .attr("opacity",opacity)
    // .attr("fill", function(d,i){
    //     return color(i);
    // })
    .attr("fill", "none")
    .attr("stroke-dasharray", function(d,i){
        if(i%2==1){
            return ("4,4");
        }
        if(i%2==0){
            return ("0,0");
        }
    })
    .attr("stroke", function(d,i){
        return color(i);
    })

function moveAround(secsie){
d3.selectAll(".cloudCirc")
    .transition()
    .duration(3000)
    .attr("cx", function(d,i){
            return Math.random(-1,1)*secsie;
    })
    .attr("cy", function(d,i){
            // console.log(i);
            return yRand(i)+Math.random(-1,1)*secsie/2;
    })
}

function passSense(output){
if(output==0){
d3.selectAll(".inCirc")
    .transition()
    .duration(10)
    .attr("opacity",opacity)
    .each("end", function(){
        d3.selectAll(".inCirc")
            .transition()
            .duration(4000)      
            .attr("cx", function(d,i){
                return 3+xIn(i)+Math.random(-1,1)*10;
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
                        .duration(10)          
                        .attr("cx", function(d,i){
                            if(i%2==1){
                                return 4+Math.random(-1,1)*10;
                            }
                            else{
                                return 4-1*Math.random(-1,1)*10;
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
    .attr("opacity",opacity)
    .each("end", function(){
        d3.selectAll(".rollingCirc")
            .transition()
            .duration(3000)
            .attr("cx", lmargin)
            .each("end", function(){
                d3.selectAll(".rollingCirc")
                .transition()
                .attr("fill", function(d,i){
                    if(i%2==1){
                        return (colorSpectrum[4]);
                    }
                    if(i%2==0){
                        return (colorSpectrum[5]);
                    }
                })
                .each("end", function(){
                    d3.selectAll(".rollingCirc")
                    .transition()   
                    .duration(3000)
                    .attr("cx", lmargin*3)   
                    .attr("cy", yMid)
                    .each("end", function(){
                        d3.selectAll(".rollingCirc")
                        .transition()
                        .duration(10)
                        .attr("opacity",0)
                        .each("end", function(){
                            d3.selectAll(".rollingCirc")
                            .transition()
                            .duration(10)
                            .attr("fill","none")
                            .attr("cx", function(d,i){
                                return littleL;
                            })                             
                            .attr("cy", function(d,i){
                                return yIn(i);
                            })                        
                        })
                    })                                       
                })  
            })
    })
}
}
//    // .attr("transform", "translate("+lmargin*4+",0)")
function showLines(){
d3.selectAll(".inLine")
    .transition()
    .duration(4000)
    .attr("opacity",1);
}
function calculate(triggerSense){
console.log(triggerSense);
// boolean over = false;
addIt = 0;

    for (i=0; i<tData.length; i++){
        if(tData[i].sense==triggerSense){
            // if(i>0){
                addIt += parseInt(tData[i].weight);
                // console.log(tData[i].weight);
            // }
            console.log(addIt);
        }
        // if(addIt>threshold){
            // over = true;
            // console.log(addIt);
        // }else{
            // triggerRoll(addIt, triggerSense);
        // }
    }
    triggerRoll(addIt, triggerSense);
}
function senseIn(addIt, triggerSense){
    console.log(triggerSense);
    //if d.sense of rolling ball is the same as trigger sense
    //calculate(triggerSense)
    //roll ball down to output
    //which will trigger roll or not
    // showLines();
    // passSense(1)
    d3.selectAll(".rollingCirc")
    // rollingCirc
    .transition()
    .duration(100)
    .attr("opacity",opacity)
    .each("end", function(){
        d3.selectAll(".rollingCirc")
            .transition()
            .duration(3000)
            .attr("cx", lmargin)
            .each("end", function(){
                d3.selectAll(".rollingCirc")
                .transition()
                .attr("fill", function(d,i){
                        if(d.sense==tSense){
                            input[i] = 1;
                        }
                        else{
                            input[i] = 0;
                        }
                        console.log(input+"input");

                    return (color(triggerSense));
                })
                .each("end", function(){
                    if(addIt>threshold){
                    d3.selectAll(".rollingCirc")
                    .transition()   
                    .duration(3000)
                    .attr("cx", function(d,i){
                            return lmargin*3;
                    })   
                    .attr("cy", function(d,i){
                        if(d.sense==tSense){
                            return yMid;
                        }
                    })
                    ////then disappear
                    .each("end", function(){
                        d3.selectAll(".rollingCirc")
                        .transition()
                        .duration(10)
                        .attr("opacity",0)
                        .each("end", function(){
                            d3.selectAll(".rollingCirc")
                            .transition()
                            .duration(10)
                            .attr("fill","none")
                            .attr("cx", function(d,i){
                                return littleL;
                            })                             
                            .attr("cy", function(d,i){
                                return yIn(i);
                            })                        
                        })
                    })
                    }
                    else{
                        d3.selectAll(".rollingCirc")
                        .transition()
                        .duration(10)
                        .attr("opacity",0)
                        .each("end", function(){
                            d3.selectAll(".rollingCirc")
                            .transition()
                            .duration(10)
                            .attr("fill","none")
                            .attr("cx", function(d,i){
                                return littleL;
                            })                             
                            .attr("cy", function(d,i){
                                return yIn(i);
                            })                        
                        })                        
                    }                                       
                })  
            })
    })
}

var changeWeight = [];
var error = 0;
function triggerRoll(addIt, triggerSense){
     console.log(addIt+"sum "+triggerSense+" sense");
     trigger = true;
     tSense = triggerSense;
console.log(tData[0].weight+"old weight?");
//     //  if(b==1){
    // if(addIt>threshold){
        senseIn(addIt, triggerSense);
    // }
    error = threshold-addIt;
    console.log(error+"error");
// //new weighting
if(error>0){
for (i= 0; i<input.length; i++){
    changeWeight[i] = error*input[i];   
    tData[i].weight += .01*error*input[i]; 
}
}
console.log(tData[0].weight+"new weight");
// console.log(tData[0].weight+"new weights?");
// for (i=0; i<tData.length; i++){ 
//     tData[i].weight = Math.random();
// }
    // }
    // }
    //if d.sense is the triggersense, 
    //send that ball through to the output
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
        // if(trigger == true){
        calculate("sm");
        // }
        showLines();
        // passSense(0);
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
        calculate("to");
        // passSense(0);
        $("p:first").replaceWith("<p>And throw in a sound input from our sense cloud</p>");
        // soundsLoaded();
    }
    if(b==3){
        calculate("to");
        // showLines();
        // passSense(1)
        $("p:first").replaceWith("<p>Next let's try smell</p>");
        // loop.stop("sound" + 1);
    }
    if(b==4){
        calculate("sm");
        // passSense(1)
        // $("#buttons").show()

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

// function moveAround(secs){
// // could use transparent gradient overlay to vary raindrop color
// var yMap = d3.scale.linear()
//             .domain([0, 1000])
//             .range([-100, height])
// var yMap2 = d3.scale.linear()
//             .domain([0, 1])
//             .range([0, height])
// var xMap = d3.scale.linear()
//             .domain([0, 1])
//             .range([0, 100])
// var xMap2 = d3.scale.linear()
//             .domain([0, 1000])
//             .range([0, width])
//     circ
//     .transition()
//     .duration(1000)
//     .attr("cy", function(d,i){
//         if (intro){
//             return yMap2(Math.random());
//         }  
//         else{
//             return yMap(secs)+i*2.5;//2.9;            
//         }
//     })
//     .attr("cx", function(d,i){
//         if(intro){
//             return xMap2(secs)+i*5;
//         }
//         else{
//             return xMap(Math.random());
//         }
//     })
//     .attr("fill", function(d,i){
//         return color(i)
//     })

//     // .attr("transform", function(d,i) {
//     //   return "rotate(" + d + ")"
//     //        + 
//     //       "translate(" + (secs) + ","+(0)+")";
//     //       + "rotate(90)";
//     // });
// }
















// loop = new SeamlessLoop();

// //check if the browser can play MP3's. If not, use ogg.
// var audio  = document.createElement("audio"),
// canPlayMP3 = (typeof audio.canPlayType === "function" &&
//               audio.canPlayType("audio/mpeg") !== "");

// if (canPlayMP3===true) {
//    // loop.addUri("http://localhost:8000/music/BD.mp3", 500, "sound1");
// // loop.addUri("https://www.youtube.com/watch?v=g0ziLeohVLc"
//   // loop.addUri("http://www.freesoundfiles.com/Sounds/Tom%206.wav", 500, "sound1");
// } else {
//   // loop.addUri("http://stash.rachelnabors.com/music/byakkoya_single.ogg", 1000, "sound1");
// }

// function soundsLoaded() {
//   var n = 1;
//   loop.start("sound" + n);
// };
})
}