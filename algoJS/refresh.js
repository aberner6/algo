var svg, vis, 
inputCirc, inputLine, trackCirc, senseCirc,
outputLine, outputCirc, finalOutputCirc,
yIn, xIn,
path,
circle, line, rollingCirc, cloudCirc, endOutCirc;
var moveAround;
var theIndex = [];

var windowWidth = window.outerWidth,
    windowHeight= window.innerHeight,
    height = windowHeight,
    width = windowWidth;
var lmargin = windowWidth/4;
var yMid = windowHeight/2;
var rotation = 10;
var swingtime = 1600;
var nextAnimation = false;
var yMap = d3.scale.linear()
            .domain([0, 1])
            .range([-height, height*2])
$(window).resize(function() {
// windowWidth = window.outerWidth,
//     windowHeight= window.innerHeight,
//     lmargin = windowWidth/4,
//     yMid = windowHeight/2;
    // transPos();
});
var addIt =0;
var trigger = false;
var tSense;

var threshold = .5;
var input = [];
var trigOther = false;
var endOutX = lmargin*3;
var introDuration = 6000;
var random = false;
var inputDone = false;
// var height = 800;
// var r;
var r = 10;
var a = false;
var t = [];
var o = [];
var  strokeWeight= 2;
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
var introTalk = true;
var colorSpectrum = [];
var myPulse;
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
var sense = false;
var neurons = false;
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
var randLength = 500;








// boolean 
loadData("senses.csv")
    // transPos();

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

// function transparentos(){
yIn = d3.scale.linear()
    .domain([0, thisData.length-1])
    .range([height/3, height-height/5]);
yRand = d3.scale.linear()
    .domain([0, randLength])
    .range([0, height]);
xRand = d3.scale.linear()
    .domain([0, randLength])
    .range([0, width+lmargin])
xIn = d3.scale.linear()
    .domain([0, numInput])
    .range([lmargin, width+lmargin])
// function simpleStuff(thisData){
var myVar=setInterval(function () {myTimer()}, 4000);

function myTimer() {
    d = new Date();
    secs = d.getMilliseconds();
    if(sense==true){
    moveAround(secs/10);
    }
}
$("#intro2").animate({
    // left: endOutX+r+11-30,
    left:endOutX,
});
$("#equation").animate({
    top: yMid-60,
    // left: endOutX+r+11-30,
    left:endOutX,
});
$("#check").animate({
    top: yMid+20,
    left: endOutX+r+11-30,
}); 
$("#x").animate({
    top: yMid-2,
    left: endOutX-r/2-6,
}); 
$("#refresh").animate({
    // top: "51%"
    left:lmargin+100,
});
$("#refreshp").animate({
    // top: "51%"
    left:lmargin+135,
});
$("#connections").animate({
    left: lmargin*2-60,
});
circle = vis.selectAll("neurons")
    .data(thisData)
    .enter()
    .append("circle").attr("class","neurons")
    .attr("cx", lmargin)
    .attr("cy", function(d,i){
        return yIn(i);
    })
    .attr("r", 0)
    .attr("fill", "white")
    // .attr("stroke-dasharray", function(d,i){
    //     if(i%2==1){
    //         return ("4,4");
    //     }
    //     else{
    //         return ("0,0");
    //     }
    // })
    .attr("stroke", function(d,i){
        if(d.sense=="smell"){
            return color1;
        }
        if(d.sense=="touch"){
            return color2;
        }
      // return (color(d.sense));   
    })
    .attr("stroke-width", strokeWeight)
    .attr("opacity",1);
function neuronsIn(){
       $("#title p").replaceWith("<p>A simple model of a neuron's computation:</p>");
var p = $( "#title p" );
var position = p.position();
    var newLine = vis.selectAll("newLine")
    .data(d3.range(1))
    .enter()
    .append("line").attr("class","newLine")
    .attr("x1", position.left)
    .attr("y1",position.top)
    .attr("x2", position.left)
    .attr("y2", position.top)
    .attr("stroke", "gray")
    .attr("fill", "gray");

        $("#neurons").slideDown().animate({
            top: yIn(0),
            left: lmargin+r-150,//107,
        },2000)

    circle
    .transition()
    .duration(3000)
    .attr("r", function(){
        return r;
    })
    .each("end", function(){
        showLines();

        neurons = true;
    })
}



line = vis.selectAll("inLine")
    .data(thisData)
    .enter()
    .append("line").attr("class","inLine")
    .attr("x1", lmargin+r/2+strokeWeight*2)
    .attr("y1", function(d,i){
        return yIn(i);
    })
    .attr("x2", function(d,i){
        // if(i==1){
            return endOutX-r*1.5;          
        // }
        // return endOutX-r;
    })
    .attr("y2", function(d,i){
        if(i==0){
            return yMid-r/2;
        }
        if(i==1){
            return yMid;            
        }
        if(i==2){
            return yMid+r/2;
        }
    })
    .attr("fill", "none")
    .attr("stroke-width", function(d,i){
        return Math.random();
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
    .attr("r", r*1.5)
    .attr("fill", "none")
    .attr("stroke", function(d,i){
            return color(d.sense);
    })
    .attr("opacity",0);

cloudCirc = vis.selectAll("cloudCirc")
    .data(d3.range(randLength))
    .enter()
    .append("circle").attr("class", "cloudCirc")
    .attr("r", r*1.5)
    .attr("opacity",.6)
    // .attr("fill", function(d,i){
    //     return color(i);
    // })
    .attr("fill", function(d,i){
        return color(i);
    })
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
    .attr("cx", function(d,i){
            return -350;
    })
    .attr("cy", function(d,i){
            // console.log(i);
            return yRand(i)+Math.random(-1,1)*100;
    });

endOutCirc = vis.selectAll("endCirc")
    .data(d3.range(1))
    .enter()
    .append("circle").attr("class","endCirc")
    .attr("cx", width+endOutX)
    .attr("cy", yMid)
    .attr("r", r)
    .attr("fill", "white")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke", "gray")
    .attr("stroke-width", strokeWeight)
    .attr("opacity",1);
var endText = vis.selectAll("endText")
    .data(d3.range(1))
    .enter()
    .append("text").attr("class", "endText")
    .attr("x", endOutX+r*1.5)
    .attr("y", yMid-r*2)
    .attr("fill", "gray")
    .text("{ output threshold = "+threshold+" }")
    .attr("opacity",0)
function outputIn(){
        $("#output").slideDown().animate({
            top: yMid,
            left: endOutX+r,
        });
    endOutCirc
    .transition()
    // .delay(1000)
    .duration(2000)
    .attr("cx", endOutX)

.each("end", function(){
    introTalk = false;
 $("#neurons p:first").replaceWith("<p></p>");
 $("#title .p1").replaceWith("<p>Let's send in all the senses - represented as that big cloud that surrounds us all of the time.</p>")
$("#title .p3").replaceWith("<p></p>")
 $("#title .p2").hide();
  $("#title .p2").replaceWith("<p>Click one input to direct a sense towards it.</p>")
  $("#title .p2").delay(2000).show();

$("#title p:first").replaceWith("");
$("#title").animate({
    left:-lmargin,
})

// moveAround(secs);
sense = true;

myPulse=setInterval(function () {pulseTimer()}, 1000);

var text = vis.selectAll("textIs")
    .data(tData)
    .enter()
    .append("text").attr("class", "textIs")
    .attr("opacity",0)
    .attr("x", lmargin-r*14)
    .attr("y", function(d,i){
        return yIn(i)+r/2;
    })
    .text(function(d,i){
        return "{ input of: "+d.sense+" }";
    })
    .attr("fill", function(d,i){
        if (d.sense=="smell"){
            return color1;
        }
        if(d.sense=="touch"){
            return color2;
        }
    })
    .transition()
    .duration(3000)
    .attr("opacity",1);
    inputDone = true;
})

}

    function pulseTimer() {
        pulseNeurons();
    }
function pulseNeurons(){
d3.selectAll(".neurons")
.transition()
.duration(500)
.attr("stroke-width", strokeWeight*3)
.each("end", function(d,i){
    d3.selectAll(".neurons")
    .transition()
    .duration(500)
    .attr("stroke-width", strokeWeight);
})

}

function prepEndText(){
if(nextAnimation==true){
d3.selectAll(".endText")
    .transition()
    .delay(10000)
    .duration(100)
    .attr("y",yMid-20)
    .each("end", function(d,i){
        $("#output").slideUp();


        d3.selectAll(".endText")
            .transition()
            .delay(1000)
            .duration(2000)
            .attr("y",yMid+r/2)
            .attr("opacity",1)        
    })
}
}


if(neurons!="undefined"){


            // calculate("touch");
d3.selectAll(".neurons")
.on("click", function(d,i){
    clearInterval(myPulse);

moveAround(secs);
$("#title").fadeOut()

// $("#intro").hide()
$("#output").slideUp();
    d3.select(this);
    console.log(this);
    console.log(this.sense);
    if (d.sense=="smell"){
addIt = 0;
        calculate("smell");
    }
    if(d.sense=="touch"){
addIt = 0;
        console.log(d.sense)
        calculate("touch");
    }
})
.on("mouseover", function(){
$("#title").fadeOut()

    d3.select(this)
    .transition()
    .attr("stroke-width", strokeWeight*3);
// $("#intro").show().animate({
//     left: lmargin,
// })
})
.on("mouseout", function(){
// $("#intro").hide();
     d3.select(this)
    .transition()
    .attr("stroke-width", strokeWeight);   
})
}
function callSenseStart(){
if(inputDone==true){
calculate("smell");

var myVar=setInterval(function () {myTimer()}, 3000);
    function myTimer() {
        calculate("touch");
    }
    inputDone = false;
}
else{
    clearInterval(myVar);
}
}

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
    // .attr("stroke-dasharray", function(d,i){
    //     if(i%2==1){
    //         return ("4,4");
    //     }
    //     if(i%2==0){
    //         return ("0,0");
    //     }
    // })
    .attr("stroke", function(d,i){
        if(i%2==1){
            return (color1);
        }
        if(i%2==0){
            return (color2);
        }
    })
    // "gray");



// }
function moveAround(secsie){
// if(intro==false){
d3.selectAll(".cloudCirc")
    .transition()
    .duration(2000)
    .attr("cx", function(d,i){
            return Math.random(-1,1)*150;
    })
    .attr("cy", function(d,i){
            // console.log(i);
            return yRand(i)+Math.random(-1,1)*100;
    })
    // .attr("fill", "none")
// }
// else{
//     d3.selectAll(".cloudCirc")
//     .attr("cx", function(d,i){

//             return xRand(i)+Math.random(-1,1);//+secs/10;
//             // return 5+Math.random(-1,1);
//     })
//     .attr("cy", function(d,i){
//             // console.log(i);
//             // return 5+Math.random(-1,1);
//             return yMap(Math.random());
//     })

//  d3.selectAll(".cloudCirc")
//     .transition()
//     .duration(3000)
//     .attr("cx", function(d,i){

//             return xRand(i)+Math.random(-1,1);//+secs/10;
//     })
//     .attr("cy", function(d,i){
//         intro = false;
//             return yMap(Math.random());
//     }) 
// }
}

function showLines(){
d3.selectAll(".weightText").remove();
        // $("#connections").slideDown().animate({
        //     top: "33%",
        // });
d3.selectAll(".inLine")
    .transition()
    .duration(2000)
    .attr("opacity",1)
    .attr("stroke-width", function(d,i){
        return tData[i].weight;
    })
    .each("end", function(){
        if(introTalk){
        outputIn();   
        }     
    })
var weightText = vis.selectAll("weightText")
    .data(tData)
    .enter()
    .append("text").attr("class", "weightText")
    .attr("x", lmargin+100)
    .attr("y", function(d,i){
        if(yIn(i)<height/2){
            return yIn(i)+10;            
        }
        else{
            return yIn(i)-10;            
        }
    })
    .attr("fill","gray")
    .text(function(d,i){
        return "{ link weight = "+Math.floor(tData[i].weight * 100) / 100+" }";
    })
}
function calculate(triggerSense){
console.log(triggerSense);
// boolean over = false;

    for (i=0; i<tData.length; i++){
        if(tData[i].sense==triggerSense){
                addIt += tData[i].weight;
        theIndex=i;
                console.log(theIndex);
                console.log(addIt);
        }
    }
    triggerRoll(addIt, triggerSense, theIndex);
        // showLines();

}
function senseIn(addIt, triggerSense, error, theIndexI){
$("#intro2").slideDown("slow");       

    var thisIndex = theIndexI;
    console.log(triggerSense);
    d3.selectAll(".rollingCirc")
    .transition()
    .duration(100)
    .attr("opacity",opacity)
    .attr("stroke", function(d,i){
        if(triggerSense=="smell"){
            return color1;
        }
        if(triggerSense=="touch"){
            return color2;
        }
    })
    .each("end", function(){
        d3.selectAll(".rollingCirc")
            .transition()
            .duration(3000)
            .attr("cx", lmargin)
            .attr("r",r)
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
                        if(triggerSense=="smell"){
                            return color1;
                        }
                        if(triggerSense=="touch"){
                            return color2;
                        }
                })
                .attr("r", r/1.5)
                .each("end", function(){

                    d3.selectAll(".rollingCirc")
                    .transition()   
                    .duration(3000)

                    .attr("cx", function(d,i){
                        if(addIt>=threshold){//THIS SHOULD  BE HAPPENING @END
                            return endOutX;
                        }else{
                                return endOutX-r*1.5;          
                        }
                    })   
                    .attr("cy", function(d,i){
                        if(d.sense==tSense){
                        if(addIt>=threshold){//THIS SHOULD  BE HAPPENING @END
                            return yMid;
                        }else{
                            if(i==0){
                                return yMid-r/2;
                            }
                            if(i==1){
                                return yMid;            
                            }
                            if(i==2){
                                return yMid+r/2;
                            }                            
                        }
                        }
                    })
                    ////then disappear
                    .each("end", function(){
                        d3.selectAll(".endCirc")
                        .transition()
                        .duration(2000)
                        .attr("fill", "gray")
                        .attr("opacity", function(){
                            if (error>0){
                                return .1; 
                            }
                            if(error<0){
                                return error;
                            }
                        })
                        .each("end", function(){
                            d3.selectAll(".endCirc")
                            .transition()
                            .duration(100)
                            .attr("opacity",.1)
                            .attr("fill", "white")
                            .attr("stroke", "gray")
                            .attr("stroke-width", strokeWeight)
                        })
                        // .each("end", function(){
                        // .attr("ry", function(){})
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
                            .attr("r",r*1.5)
                            .each("end", function(){
                            if(addIt>=threshold){//THIS SHOULD  BE HAPPENING @END

    d3.selectAll(".inLine")
    .transition()
    .attr("x2", function(d,i){
        return endOutX-r/2;
    })
        // if(tData[thisIndex].weight>threshold){
       $("#equation p").replaceWith("<p>input of "+1+"* link weight of "+(Math.floor(tData[thisIndex].weight * 100) / 100)+"<b>>=</b> threshold of "+threshold+"</p>");
        // }
//something like input * the weight of that neuron ?> ?< output
    console.log(tData[thisIndex].weight+"index weight");

        $("#equation").show(1000).slideDown();
                                $("#check").show().slideDown();

                                    d3.selectAll(".endCirc")
                                    .transition()
                                    .duration(10)
                                    .attr("opacity", 1)
                                    .duration(4000)
                                    .attr("r", r/2)
                                    .attr("stroke-width", r*2)
                                    .attr("stroke", function(d,i){
                        if(triggerSense=="smell"){
                            return color1;
                        }
                        if(triggerSense=="touch"){
                            return color2;
                        }
                                    })
                                    .each("end", function(){
                                        d3.selectAll(".endCirc")
                                        .transition()
                                        .duration(1000)
                                        .attr("stroke-width", r)
                                        .each("end", function(){
                                            d3.selectAll(".endCirc")
                                            .transition()
                                            .duration(2000)
                                            .attr("r", r/2) 
                                            .each("end", function(){
                                $("#check").slideUp("fast");
                                $("#equation").hide();
                                $("#intro2").hide();
                                if(tData[0].weight==1){
                                    $("#refresh, #refreshp").show().slideDown();
                                }
    d3.selectAll(".inLine")
    .transition()
    .attr("x2", function(d,i){
            return endOutX-r*1.5;          
    })
    .attr("y2", function(d,i){
        if(i==0){
            return yMid-r/2;
        }
        if(i==1){
            return yMid;            
        }
        if(i==2){
            return yMid+r/2;
        }
    })
                                                d3.selectAll(".endCirc")
                                                .transition()
                                                .duration(1000)
                                                .attr("r",r)
                                                .attr("stroke", "gray")
                                                .attr("opacity",.1)
                                                .attr("fill", "white")
                                                .attr("stroke-width", strokeWeight)
                                            })                               
                                        })
                                    })
                                } //THIS SHOULD  BE HAPPENING @END
                                else{
//maybe after randomziation?
//maybe after randomziation?

        // else{
       $("#equation p").replaceWith("<p>input of "+1+"* link weight of "+(Math.floor(tData[thisIndex].weight * 100) / 100)+"<b><</b> threshold of "+threshold+"</p>");
        // }
        //something like input * the weight of that neuron ?> ?< output
    console.log(tData[theIndexI].weight+"index weight");

        $("#equation").show(1000).slideDown();

myPulse=setInterval(function () {pulseTimer()}, 3000);

                                 $("#x").show().slideDown();
                                    d3.selectAll(".rollingCirc")
                                    .transition()
                                    .duration(2000) 
                                    .attr("opacity",1)
                                    .each("end", function(){
                                        $("#x").slideUp("fast");
                                        $("#intro2").hide();
                                        $("#equation").hide();

                                    })                               
                                }
                            })                        
                        })


                        // })

                    })                                      
                })  
            })
    })
}

var changeWeight = [];
var error = 0;
function triggerRoll(addIt, triggerSense, theIndexIs){
     console.log(addIt+"sum "+triggerSense+" sense");
     tSense = triggerSense;
console.log(tData[0].weight+"old weight?");

    error = threshold-addIt;
    console.log(error+"error");

    senseIn(addIt, triggerSense, error, theIndexIs);
    console.log(theIndexIs+"indexis");

// //new weighting
if(error>0 && random == true){
for (i= 0; i<input.length; i++){
    changeWeight[i] = error*input[i];   
    tData[i].weight += .8*error*input[i]; 
}
showLines();
}
else{
}
// if(theIndex>0){
// }

if(error<0){
    trigger = true;
    console.log("trigger"+trigger)
}

console.log(tData[0].weight+"new weight");
}














































$('.neurons').tipsy({
    gravity: 'w', 
    html: true, 
    title: function() {
         return "Trigger a sense input";
    }
});



$('#introNav2').tipsy({
    gravity: 'w', 
    html: true, 
    title: function() {
         return "Trigger next"+ '<br>';
    }
});


$('#moreInfoBtn').tipsy({
    gravity: 'e', 
    html: true, 
    title: function() {
         return "Created by the Spatial Information Design Lab & Stefano Fusi Lab"
         +'<br>'+'Researcher: Lyudmila Kushmir'+'<br>'+"Designer/Developer: Annelie Berner"+ '<br>';
    }
});
var b = 0;


//sensecloud
    // $("#buttons").show(3000);
$("#title").fadeIn(introDuration/2);

d3.select("#enter").on("click", function(){
nextAnimation = true;
prepEndText();
    $("#enter").slideUp();
        $("#title").animate({
            top: "8%",
        });
        // svg.call(transition, p0, p1);

neuronsIn();
    $("#title .p1").delay(1000).fadeIn(500);     
    $("#title .p2").delay(3000).fadeIn(500);     
    $("#title .p3").delay(5000).fadeIn(500);     

// d3.select("#title p").transition().delay(introDuration/2).duration(100)
//     .attr("opacity", function(){
//         $("#title p").append(" linked through weighted lines to an output node</p>");        
//     } )

// if(neurons==true){

// }
        // outputIn();

    // $('#intro').fadeIn("slow");
    // $('#title').fadeOut("fast");
})

d3.select("#ok").on("click", function(){
    $('#intro2').fadeIn(1000);
    $('#intro').fadeOut("fast");
        // $('#intro2').fadeOut("slow");
$( "#intro2" ).delay( 8000 ).slideUp( 2000);

})
d3.select('#introNav2').on("click", function(){
    if(trigger==false){
        calculate("smell");
    }
    else{
        calculate("touch");
    }
if(trigOther == true){
    calculate("smell");    
}
})
if(sense==true){
        $("#senseCloud").slideDown().animate({
            top: "51%",
            left: width/2,
        }).on("click", function(){
            intro = false;
        $("#senseCloud").animate({
            // top: "51%",
            left: "1%",
        })
        })
}



$("#refresh").on("click", function(){
myPulse=setInterval(function () {pulseTimer()}, 3000);
$("#refreshp").hide();
    random = true;
for (var i = 0; i < tData.length; i++) {
   tData[i].weight = Math.random();
         showLines();
} 
      // tData[i].weight = Math.random(-1,1);
      // console.log("generating weights")
    // }
    $( "#intro2" ).delay(7000).slideUp();
})
    $("#smell").on("click", function(){
        $("#senseCloud, #neurons, #output").fadeOut("fast");
        $("#connections").slideDown().animate({
            top: "25%",
        });
        $("#connections").delay(3000).slideUp();
        calculate("to");
      // loop.stop("sound" + 1);
    })
    $("#sound").on("click", function(){
        $("#senseCloud, #neurons, #output").fadeOut("fast");
        $("#connections").slideDown().animate({
            top: "25%",
        });
        $("#connections").delay(3000).slideUp();

        calculate("smell");
        // soundsLoaded();
    })

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



















// function passSense(output){
// if(output==0){
// d3.selectAll(".inCirc")
//     .transition()
//     .duration(10)
//     .attr("opacity",opacity)
//     .each("end", function(){
//         d3.selectAll(".inCirc")
//             .transition()
//             .duration(4000)      
//             .attr("cx", function(d,i){
//                 return 3+xIn(i)+Math.random(-1,1)*10;
//             })
//             .each("end", function(){
//                 d3.selectAll(".inCirc")
//                     .transition()
//                     .duration(2000)
//                     .attr("opacity",function(d,i){
//                         return 0;
//                     })
//                     .each("end", function(){
//                         d3.selectAll(".inCirc")
//                         .transition()     
//                         .duration(10)          
//                         .attr("cx", function(d,i){
//                             if(i%2==1){
//                                 return 4+Math.random(-1,1)*10;
//                             }
//                             else{
//                                 return 4-1*Math.random(-1,1)*10;
//                             }
//                         })
//                         .attr("cy", function(d,i){
//                             if(i%2==1){
//                                 return yIn(i%3)+Math.random(-1,1)*10;
//                             }
//                             else{
//                                 return yIn(i%3)-Math.random(-1,1)*10;
//                             }
//                         })
//                     })
//             })  
//     })
// }
// else{
//     d3.selectAll(".rollingCirc")
//     .transition()
//     .duration(100)
//     .attr("opacity",opacity)
//     .each("end", function(){
//         d3.selectAll(".rollingCirc")
//             .transition()
//             .duration(3000)
//             .attr("cx", lmargin)
//             .each("end", function(){
//                 d3.selectAll(".rollingCirc")
//                 .transition()
//                 .attr("fill", function(d,i){
//                     if(i%2==1){
//                         return (colorSpectrum[4]);
//                     }
//                     if(i%2==0){
//                         return (colorSpectrum[5]);
//                     }
//                 })
//                 .each("end", function(){
//                     d3.selectAll(".rollingCirc")
//                     .transition()   
//                     .duration(3000)
//                     .attr("cx", lmargin*3)   
//                     .attr("cy", yMid)
//                     .each("end", function(){
//                         d3.selectAll(".rollingCirc")
//                         .transition()
//                         .duration(10)
//                         .attr("opacity",0)
//                         .each("end", function(){
//                             d3.selectAll(".rollingCirc")
//                             .transition()
//                             .duration(10)
//                             .attr("fill","none")
//                             .attr("cx", function(d,i){
//                                 return littleL;
//                             })                             
//                             .attr("cy", function(d,i){
//                                 return yIn(i);
//                             })                        
//                         })
//                     })                                       
//                 })  
//             })
//     })
// }
// }
































////MUSIC STUFF

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