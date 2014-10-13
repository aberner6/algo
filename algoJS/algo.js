var svg;
var width = 1200;
var height = 600;

svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
var vis = svg //for the visualization
    .append('svg:g')
    .attr("transform",
      "translate("+ 0 + "," + 0 + ")");  

var t = [1, 2, 3, 4];
var lmargin = 100;
var yIn = d3.scale.linear()
    .domain([0, t.length])
    .range([height/8, height-height/8])

var inputCirc = vis.selectAll("inCirc")
    .data(t)
    .enter()
    .append("circle").attr("class","inCirc")
    .attr("cx", width/4)
    .attr("cy", function(i){
        return yIn(i);
    })
    .attr("fill", "white")
    .attr("stroke", "gray")
    .attr("r",8)