var svg, vis, 
inputCirc, inputLine, trackCirc, senseCirc,
outputLine, outputCirc, finalOutputCirc,
yIn, xIn;
var windowWidth = window.outerWidth,
    windowHeight = window.innerHeight;
var width = 1200;
var height = 600;
var d3chart = d3chart || {};
// var r;
var r = 5;
var a = false;
var t = [];
var o = [];
var strokeWeight = 1;
var lineColor = "gray";
var inColor = "gray";
var movingColor = "aqua";
var outColor = "white";
var startUp, shiftAway, endOutput, rollingCircle;
var distBetween = 40;

svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
vis = svg //for the visualization
    .append('svg:g')
    .attr("transform",
      "translate("+ 0 + "," + 0 + ")");  
o = [1, 2];
t = [1, 2, 3, 4, 5, 6];
var lmargin = width/4;
yIn = d3.scale.linear()
    .domain([0, t.length])
    .range([height/8, height-height/8])
xIn = d3.scale.linear()
    .domain([0, t.length])
    .range([lmargin, height-height/8])


rollingCircle = function(x, y, d, w){
    // console.log(d)
var duration = 3000;
if(w==0){
console.log(w)
  senseCirc
    .transition()
    // .delay(0)
    .duration(duration)
    .attr("opacity",  1)
    .attr("cx", lmargin)

  trackCirc
    .transition()
    .delay(duration)
    .duration(duration)
    .attr("cx", x)
    .attr("cy", y)
    .each("end", function(){
        senseCirc
        .transition()
        .attr("opacity",0)
        // .attr("cx",0);
    })
}
if(w==1){
console.log(w);
senseCirc
    .transition()
    .duration(10)
    .attr("opacity",0)
    .transition()
    .delay(2000)
    .attr("cx", 0)
    .attr("cy", function(d,i){
        if(i<t.length/2){
            return yIn(i)-y;            
        }
        else{
            return yIn(i)+y;            
        }
    });   
trackCirc
    .transition()
    .duration(10)
    .attr("opacity",0)
    .transition()
    .delay(100)
    .attr("cx", x)
    .attr("cy", function(d,i){
        if(i<t.length/2){
            return yIn(i)-y;            
        }
        else{
            return yIn(i)+y;            
        }
    })
}
if(w==2){
console.log(w);
trackCirc
    .transition()
    .delay(duration*2)
    .duration(duration/2)
    .attr("opacity",1)    
    .attr("cx", x)
    .attr("cy", function(d,i){
        if(i<t.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    })
senseCirc
    .transition()
    .delay(duration)
    .duration(duration)
    .attr("opacity",1)
    .attr("cx",lmargin)  
}
if(w==3){
console.log(w);
trackCirc
    .transition()
    .delay(d)
    .duration(3000)
    .attr("cx", x)
    .attr("cy", y);
}
if(w==4){
console.log(w);
trackCirc
    .transition()
    .attr("opacity",0)
    .each("end", function(){
        trackCirc
        .transition()
        .attr("cx", 0)
        .attr("cy", function(d,i){
            if(i<t.length/2){
                return yIn(i)-y;            
            }
            else{
                return yIn(i)+y;            
            }
        })        
        .each("end", function(){
            trackCirc
            .transition()
            .duration(duration) 
            .attr("opacity",1)  
            .attr("cx", lmargin)
            .each("end", function(){
                trackCirc
                .transition()
                .duration(duration)
                .attr("cx", lmargin*2)
                .attr("cy", function(d,i){
                    if(i<t.length/2){
                        return height/2-distBetween;            
                    }
                    else{
                        return height/2+distBetween;            
                    }
                })
                .attr("r", r*2)
                .each("end", function(){
                    trackCirc
                    .transition()
                    .duration(duration/2)
                    .attr("r",r) 
                    .each("end", function(){
                        trackCirc
                        .transition()
                        .duration(duration)
                        .attr("cx", x)
                        .attr("cy", height/2)
                        .attr("r", r*2)
                        .each("end", function(){
                            trackCirc
                            .transition()
                            .duration(duration/2)
                            .attr("r",0)
                        })
                    })

                })           
            })
        })
    })
}
}

startUp = function(){
trackCirc = vis.selectAll("trackC")
    .data(t)
    .enter()
    .append("circle").attr("class","trackC")
    .attr("cx", lmargin)
    .attr("cy", function(i){
        return yIn(i);
    })
    .attr("fill",  movingColor)
    .attr("stroke", movingColor)
    .attr("opacity",1)
    .attr("r",r);  
senseCirc = vis.selectAll("senseC")
    .data(t)
    .enter()
    .append("circle").attr("class","senseC")
    .attr("cx", 0)
    .attr("cy", function(i){
        return yIn(i);
    })
    .attr("opacity",0)
    .attr("fill",  movingColor)
    .attr("stroke", movingColor)
    .attr("r",r); 

inputLine = vis.selectAll("inLine")
    .data(t)
    .enter()
    .append("line").attr("class","inLine")
    .attr("x1", lmargin)
    .attr("y1", function(i){
        return yIn(i);
    })
    .attr("x2", lmargin)
    .attr("y2", function(i){
        return yIn(i);
    })
    .attr("stroke", lineColor);

    inputLine
    .transition()
    .delay(500)
    .duration(3000)
    .attr("x2", lmargin*2)
    .attr("y2", function(i){
        return height/2;
    })
    .each("end", function(){
        rollingCircle(lmargin*2, height/2, 10, 0);
        // trackCirc
        // .transition()
        // .delay(500)
        // .duration(3000)
        // .attr("cx", lmargin*2)
        // .attr("cy", function(i){
        //     return height/2;
        // });
    });
inputCirc = vis.selectAll("inCirc")
    .data(t)
    .enter()
    .append("circle").attr("class","inCirc")
    .attr("cx", lmargin)
    .attr("cy", function(i){
        return yIn(i);
    })
    .attr("fill", "white")
    .attr("stroke", inColor)
    .attr("r",5);

outputLine = vis.selectAll("outLine")
    .data(o)
    .enter()
    .append("line").attr("class","outLine")
    .attr("x1", lmargin*2)//lmargin*2+5/2+strokeWeight)
    .attr("y1", function(d,i){
        if(i<o.length/2){
            return height/2-distBetween+5/2;            
        }
        else{
            return height/2+distBetween-5/2;            
        }
    })
    .attr("x2", lmargin*2)//lmargin*2+5/2+strokeWeight)
    .attr("y2", function(d,i){
        if(i<o.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    })
    .attr("stroke", "none");

outputCirc = vis.selectAll("outCirc")
    .data(o)
    .enter()
    .append("circle").attr("class","outCirc")
    .attr("cx", lmargin*2)
    .attr("cy", function(d,i){
        if(i<o.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    })
    .attr("r",r)
    .attr("fill","none")
    .attr("stroke", "none");

finalOutputCirc = vis.selectAll("finCirc")
    .data(o)
    .enter()
    .append("circle").attr("class","finCirc")
    .attr("cx", lmargin*2)
    .attr("cy", function(d,i){
        if(i<o.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    })
    .attr("r",r)
    .attr("fill","none")
    .attr("stroke", "none");

shiftAway = function(){
    inputCirc
    .transition()
    .attr("cy", function(d,i){
        if(i<t.length/2){
            return yIn(i)-distBetween;
        }
        else{
            return yIn(i)+distBetween;
        }
    });
    d3.selectAll(".inLine")
    .transition()
    .attr("y1", function(d,i){
        if(i<t.length/2){
            return yIn(i)-distBetween;            
        }
        else{
            return yIn(i)+distBetween;            
        }
    })
    .attr("y2", function(d,i){
        if(i<t.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    });
    rollingCircle(lmargin, distBetween, 20, 1)
    rollingCircle(lmargin*2, height/2-distBetween,4000, 2)

    // trackCirc
    // .transition()
    // .attr("cx", lmargin)
    // .attr("cy", function(d,i){
    //     if(i<t.length/2){
    //         return yIn(i)-distBetween;            
    //     }
    //     else{
    //         return yIn(i)+distBetween;            
    //     }
    // })

    // trackCirc
    // .transition()
    // .delay(500)
    // .duration(3000)
    // .attr("cx", lmargin*2)
    // .attr("cy", function(d,i){
    //     if(i<t.length/2){
    //         return height/2-distBetween;            
    //     }
    //     else{
    //         return height/2+distBetween;            
    //     }
    // })  
}
endOutput = function(){
    outputCirc
    .transition()
    .delay(500)
    .attr("stroke",outColor)
    .each("end", function(){
        outputLine
        .transition()
        .attr("x2", lmargin*2+100)//-r/2-strokeWeight)
        .attr("y2", height/2)
        .attr("stroke", outColor);

        finalOutputCirc
        .transition()
        .attr("cx", lmargin*2+100)
        .attr("cy", height/2)
        .attr("stroke",outColor)
        .attr("fill", outColor);

    rollingCircle(lmargin*2+100, height/2,10, 3)

    });       
}
}
var b = 0;
d3.select('#introNav2').on("click", function(){
    b++;
    if(b==1){
    $("p:first").replaceWith("<p>Input enters</p>");
        svg.call(transition, p0, p1);
        $("#intro").animate({
            top: "160px",
            left: "392px",
        });
        startUp();  
    }
    if(b==2){
    $("p:first").replaceWith("<p>And then</p>");
        svg.call(transition, p1, p2);
        $("#intro").animate({
            top: "10px",
            left: "30px",
        });
        shiftAway();
        // balls();
    }
    if(b==3){
    $("p:first").replaceWith("<p>After that</p>");
        endOutput();
    }
    if(b==4){
    $("p:first").replaceWith("<p>Lastly</p>");        
    rollingCircle(lmargin*2+100, distBetween,10, 4)        
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
    // d3.select("#container")
    //     .transition()
    //     .duration(1000)
    //     .style("opacity", .8)
    //     .each("end",function(){
    //     $(".introZoom, #intro4, #introNav2").fadeIn("fast", function(){

    //     })
        // })