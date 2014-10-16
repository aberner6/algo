var svg, vis, 
inputCirc, inputLine, trackCirc, 
outputLine, outputCirc, finalOutputCirc,
yIn, xIn;

var width = 1200;
var height = 600;
d3chart = d3chart || {};
// var r;
var r = d3chart.r;
var a = false;
var t = [];
var o = [];
var strokeWeight = 1;
var lineColor = "gray";
var inColor = "gray";
var movingColor = "gray";
var outColor = "gray";
var startUp, shiftAway, endOutput;

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

var startUp = function(){

trackCirc = vis.selectAll("trackC")
    .data(t)
    .enter()
    .append("circle").attr("class","trackC")
    .attr("cx", lmargin)
    .attr("cy", function(i){
        return yIn(i);
    })
    .attr("fill", "white")
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
        trackCirc
        .transition()
        .delay(500)
        .duration(3000)
        .attr("cx", lmargin*2)
        .attr("cy", function(i){
            return height/2;
        });
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
    .attr("r",d3chart.r);

var distBetween = 40;
outputLine = vis.selectAll("outLine")
    .data(o)
    .enter()
    .append("line").attr("class","outLine")
    .attr("x1", lmargin*2)//lmargin*2+d3chart.r/2+strokeWeight)
    .attr("y1", function(d,i){
        if(i<o.length/2){
            return height/2-distBetween+d3chart.r/2;            
        }
        else{
            return height/2+distBetween-d3chart.r/2;            
        }
    })
    .attr("x2", lmargin*2)//lmargin*2+d3chart.r/2+strokeWeight)
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
    trackCirc
    .transition()
    .attr("cx", lmargin)
    .attr("cy", function(d,i){
        if(i<t.length/2){
            return yIn(i)-distBetween;            
        }
        else{
            return yIn(i)+distBetween;            
        }
    })
    trackCirc
    .transition()
    .delay(500)
    .duration(3000)
    .attr("cx", lmargin*2)
    .attr("cy", function(d,i){
        if(i<t.length/2){
            return height/2-distBetween;            
        }
        else{
            return height/2+distBetween;            
        }
    })  
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
    });       
}
}
var b = 0;
d3.select('#introNav2').on("click", function(){
    b++;
    if(b==1){
    $("p:first").replaceWith("<p>Input enters</p>");
        startUp();  
    }
    if(b==2){
    $("p:first").replaceWith("<p>And then</p>");
        shiftAway();
        // balls();
    }
    if(b==3){
    $("p:first").replaceWith("<p>After that</p>");
        endOutput();
    }
});


    
    
    // d3.select("#container")
    //     .transition()
    //     .duration(1000)
    //     .style("opacity", .8)
    //     .each("end",function(){
    //     $(".introZoom, #intro4, #introNav2").fadeIn("fast", function(){

    //     })
        // })