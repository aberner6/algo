var svg, vis, 
inputCirc, inputLine, trackCirc, senseCirc,
outputLine, outputCirc, finalOutputCirc,
yIn, xIn,
path,
circle, line, rollingCirc, cloudCirc, endOutCirc;
var moveAround;
var theIndex = [];
var thisCloudCirc;
var wasClicked = false;
var connectionsChanged = false;

var startThings = true;
var windowWidth = window.innerWidth,
    windowHeight= window.innerHeight,
    height = windowHeight,
    width = windowWidth;
var lmargin = windowWidth/4;
var yMid = windowHeight/2;
var rotation = 10;
var swingtime = 1600;
var nextAnimation = false;
var color1 = "#438CA5";
var color2 = "#C4602E";
var yMap = d3.scale.linear()
            .domain([0, 1])
            .range([-height, height*2])
var randMap = d3.scale.linear()
    .domain([0, 1])
    .range([0, .49]);
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
var inputGame = [];

var trigOther = false;
var endOutX = lmargin*3;
var introDuration = 6000;
var random = false;
var inputDone = false;
var r = 10;
var a = false;
var t = [];
var o = [];
var  strokeWeight= 2;
var startUp, shiftAway, endOutput, rollingCircle;
var opacity = .5;
var littleL = 4;
var d;
var secs;
var soundsLoaded;
var intro = true;
var tData = [];
var myTimer;
var introTalk = false;
var colorSpectrum = [];
var myPulse;
var sense = false;
var neurons = false;

o = [1, 2];
var numInput = 100;
var randLength = 400;














var whatClicked;

var hTopMargin = height/4;//10;
var hMargin = 1.4;
var leftMargin = width/6;
var pathLength = 100;
var rRad = 20;
var tRad = 20;
// var xLMap = d3.scale.linear()
//     .domain([0, pathLength])
//     .range([leftMargin+rRad/2+4, width/2]);

// var xRMap = d3.scale.linear()
//     .domain([0, pathLength])
//     .range([width-leftMargin-rRad/2-4, width/2]);

// var hMap = d3.scale.linear()
//     .domain([0, pathLength])
//     .range([height/hMargin, hTopMargin-rRad]);

    // .attr("cy", hTopMargin-rRad)

var opaMap = d3.scale.linear()
    .domain([0, pathLength])
    .range([1, 0]);

// var oMap = d3.scale.linear()
//     .domain([0, 100])
//     .range([0, 1]);

var oMap = d3.scale.linear()
    .domain([0, threshold*50])
    .range([0, 1]);

var weightOpaMap = d3.scale.linear()
    .domain([0, .5])
    .range([0, 1]);

var svg1 = d3.select("#game")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    // .attr("fill",)
document.getElementById('game').onmousedown = function(){
  return false;
};
document.getElementById('container').onmousedown = function(){
  return false;
};
var randData;
loadRand("rand.csv");
function loadRand(csvName){
d3.csv(csvName, function(thisData) {
    randData=thisData;
    })
}

    var neurop1 = $("#neurop1").width();

    var conn1 = $("#connections1").width();
    var conn2 = $("#connections2").width();
loadIt("senses.csv");
function loadIt(csvName){
d3.csv(csvName, function(thisData) {
    tData=thisData;
    if(tData.length>0){
        for (var i = 0; i < tData.length; i++) {
           tData[i].weight = randMap(Math.random());
        } 
        gaming();
    }
    var tWidth = $("#title").width();
    $("#title").animate({
        left: width/2-tWidth/2,  
        top:height/2,
    },100).fadeIn(introDuration/2);
// ($".title1")
})
}
$("#enter").on("click", function(e){


    $("#enter").slideUp();
        $("#title").hide();



    // .attr("cx", function(d,i){
    //     if(i%2==0){
    //         return leftMargin;
    //     }
    //     return width-leftMargin;
    // })
  $("#neurop1").slideDown().animate({
        top: height/hMargin+rRad*4.5,
        left: width-leftMargin,//width/2+neurop1*3.5,  
    },2000) 
    $("#neurop2").slideDown().animate({
        top: height/hMargin+rRad*4.5,
        left: leftMargin,//width/2-neurop1*3.8,
    },2000) 

// })

 $("#connections1").delay(500).slideDown().animate({
        left: width/2-conn1*1.8-leftMargin,  
        top:height/2+50,
    },1000) 
    $("#connections2").delay(500).slideDown().animate({
        left: width/2+leftMargin+conn2/1.4,  
        top:height/2+50,
    },1000) 
})
    $("#neurop1, #neurop2").animate({
        left: width/2-neurop1/2,  
    },2000) 


   $("#connections1, #connections2").delay(1000).animate({
        left: width/2-conn1/2,  
        top:height/2+50,
    },1000) 
// myPulse=setInterval(function () {pulseTimer()}, 1000);
// function pulseTimer() {
//     pulseInputs();
// }

// $('.runner').tipsy({
//     gravity: 'w', 
//     html: true, 
//     title: function() {
//          return "Trigger a sense input";
//     }
// });


$('#moreInfoBtn').tipsy({
    gravity: 'e', 
    html: true, 
    title: function() {
         return "Created by the Spatial Information Design Lab & Stefano Fusi Lab"
         +'<br>'+'Researcher: Lyudmila Kushmir'+'<br>'+"Designer/Developer: Annelie Berner"+ '<br>';
    }
});



// function pulseInputs(){
//     d3.selectAll(".runner")
//     .transition()
//     .duration(500)
//     .attr("stroke-width", strokeWeight*3)
//     .each("end", function(d,i){
//         d3.selectAll(".runner")
//         .transition()
//         .duration(500)
//         .attr("stroke-width", strokeWeight);
//     })
// }
function gaming(){
function calcGame(triggerSense, xPos, clicks,type){
console.log(triggerSense+"inside calculate");
console.log(clicks+"clicks")
    for (i=0; i<tData.length; i++){
        if(tData[i].sense==triggerSense){
            addIt += tData[i].weight;
            theIndex=i;
                console.log(theIndex);
                console.log(addIt);
        }
    }
    triggerRollGame(addIt, triggerSense, theIndex, xPos, clicks,type);
}

// if(addIt>=threshold){//THIS SHOULD  BE HAPPENING @END
//     return //BLAH
// }else{
//  return //BLAH      
// }
// console.log(tData[theIndexI].weight+"index weight");


function showCaptions(addIs, senseIs, errorIs,thisIndex){
// console.log(addIs+"addis"+ senseIs+"senseis"+ errorIs+"erroris"+thisIndex+"thisindex")
// myPulse=setInterval(function () {pulseTimer()}, 3000);  
}

var error = 0;
// makeText();
makeText(tData,tData,0,0,"u"); 

// makeText(tData,0); 
var oldData = [];
var learning = d3.scale.linear()
    .domain([0,10])
    .range([0,1])
function triggerRollGame(addIt, triggerSense, theIndexIs, xPos,clicks,type){

     // console.log(addIt+"sum "+triggerSense+" sense");
     tSense = triggerSense;
    console.log(tData[theIndexIs].weight+"old weight?");

    error = threshold-addIt;
    console.log(error+"error");

    // showCaptions(addIt, triggerSense, error,theIndexIs);
    // console.log(theIndexIs+"indexis");
learningConstant = learning(clicks);
console.log(learningConstant+"learning")

    // //new weighting
    if(error>0){ //&& random == true){
        for (i= 0; i<inputGame.length; i++){
            oldData[i] = tData[i].weight;
            console.log(oldData[i]+"old data?")
            tData[i].weight += learningConstant*error*inputGame[i];
            console.log(tData[i].weight+"new data?")

makeText(oldData,tData,theIndexIs,learningConstant,type); 
changeCircs(tData,theIndexIs, xPos);
bumpUp(tData[theIndexIs].weight, triggerSense);

        }
    // showLines();
    }

    else{
bumpUp(tData[theIndexIs].weight);
makeText(oldData,tData,theIndexIs,learningConstant,type); 
changeCircs(tData,theIndexIs, xPos);
    }    
console.log(tData[theIndexIs].weight+"new weight?");
}































var winCircle  = svg1.selectAll("win")
    .data(d3.range(1))
    .enter().append("circle")
    .attr("class","win")
    .attr("cx", width/2)
    .attr("cy", hTopMargin-rRad*5)
    .attr("r", rRad)
    .attr("fill", "none")
    .attr("stroke-dasharray", "4,4")
    .attr("stroke", "white")
    .attr("stroke-width", strokeWeight)
    .attr("opacity",1)
    // .on("mouseover", function(d,i){
    //     d3.select(this)
    //     .transition()
    //     .attr("opacity",.5)                                        
    // })
    // .on("mouseout", function(d,i){
    //     d3.select(this)
    //     .transition()
    //     .attr("opacity",1)                                        
    // })  


var pathRight = svg1.selectAll("pathRight")
    .data(d3.range(2))
    .enter().append("line")
    .attr("class", function(d,i){
        return "pathRight";
    })
    .attr("x1", function(d,i){
        if(i%2==0){
            return width-leftMargin-rRad;      
        }
            return width-leftMargin+rRad; 
    })
    .attr("x2", function(d,i){
        // if(i%2==0){
        //     return width/2;//-rRad/4;
        // }
        // return width/2+rRad/2;
        return width/2;
    })
    .attr("y1", height/hMargin+rRad)    
    .attr("y2", function(d,i){
        if(i%2==1){
            return hTopMargin-rRad*2;
        }
        return hTopMargin;
    })
    .attr("fill", "gray")
    .attr("opacity",1)
    .attr("stroke","white")
var pathLeft = svg1.selectAll("pathLeft")
    .data(d3.range(2))
    .enter().append("line")
    .attr("class", function(d,i){
        return "pathLeft";
    })
    .attr("x1", function(d,i){
        if(i%2==0){
            return leftMargin-rRad; 
         }     
            return leftMargin+rRad; 
    })
    .attr("x2", function(d,i){
        // if(i%2==0){
        //     return width/2-rRad/2;
        // }
        // return width/2+rRad/4;
         return width/2;
    })
    .attr("y1", height/hMargin+rRad) 
    .attr("y2", function(d,i){
        if(i%2==0){
            return hTopMargin-rRad*2;
        }
        return hTopMargin;
    })   
    // .attr("y2", hTopMargin)
    .attr("fill", "gray")
    .attr("opacity",1)
    .attr("stroke","white")


// var trailLeft = svg1.selectAll("trailLeft")
//     .data(d3.range([pathLength]))
//     // .data(randData)
//     .enter().append("circle")
//     .attr("class", function(d,i){
//         return "trailLeft";
//     })
//     .attr("cx", function(d,i){
//         return xLMap(i);
//     })
//     .attr("cy", function(d,i){
//         return hMap(i);
//     })
//     .attr("r", tRad)
//     .attr("fill", "none")
//     .attr("opacity",function(d,i){
//         var howFar = tData[0].weight*pathLength;
//         if(i<=howFar+threshold*pathLength){
//             return oMap(howFar);
//         }
//         else{
//             return 0;
//         }        
//     })
//     .attr("stroke","white")

// var trailRight = svg1.selectAll("trailRight")
//     .data(d3.range([pathLength]))
//     .enter().append("circle")
//     .attr("class", function(d,i){
//         return "trailRight";
//     })
//     .attr("cx", function(d,i){
//          return xRMap(i);      
//     })
//     .attr("cy", function(d,i){
//         return hMap(i);
//     })
//     .attr("r", tRad)
//     .attr("fill", "none")
//     .attr("opacity",function(d,i){
//         var howFar = tData[1].weight*pathLength;
//         if(i<=howFar+threshold*pathLength){
//             return oMap(howFar);
//         }
//         else{
//             return 0;
//         }        
//     })
//     .attr("stroke","white")

var thisCircle;
thisCircle  = svg1.selectAll("runner")
    .data(tData)
    // .data(d3.range(2))
    .enter().append("circle")
    .attr("class", function(d,i){
        return "runner";
    })
    .attr("r", rRad)
    .attr("fill", "white")
    .attr("opacity",1)
    .attr("stroke","white")
    .attr("cx", function(d,i){
        if(i%2==0){
            return leftMargin;
        }
        return width-leftMargin;
    })
    .attr("cy", height/hMargin+rRad)

// makeNewCirc();
function makeNewCirc(){
    console.log("making new")
    // return
thisCircle  = svg1.selectAll("runner")
    .data(tData)
    // .data(d3.range(2))
    .enter().append("circle")
    .attr("class", function(d,i){
        return "runner";
    })
    .attr("cx", function(d,i){
        if(i%2==0){
            return leftMargin;
        }
        return width-leftMargin;
    })
    .attr("cy", height/hMargin+rRad)
    .attr("r", rRad)
    .attr("fill", "white")
    .attr("opacity",1)
    .attr("stroke","white");
// $('.runner').tipsy({
//     gravity: 'nw', 
//     html: true,
//     trigger: 'manual', 
//     title: function() {
//          return "Return to Part I: Game";
//     }
// });
// $('.runner').tipsy("show");


clickFunction();
// makeText();
}
  // $('.runner').tipsy({trigger: 'manual'});

function makeText(oldData, newData, indexText, learningConstant,type){
var weightRect = svg1.selectAll("rectC")
    .data(d3.range(1))
    .enter()
    .append("rect").attr("class", "rectC")
    .attr("x", 100)
    .attr("y", 80)
    .attr("width",330)
    // .attr("width",180)
    .attr("height",50)
    .attr("fill","white")
    .attr("stroke", "white"); 

var midLine = svg1.selectAll("midlineC")
    .data(d3.range(1))
    .enter()
    .append("line").attr("class", "midlineC")
    .attr("x1", 100)
    .attr("y1", 105)
    .attr("x2", 430)
    .attr("y2", 105)
    .attr("fill","gray")
    .attr("stroke","gray")
    .attr("stroke-weight",.1)


var weightLine = svg1.selectAll("lineC")
    .data(d3.range(3))
    .enter()
    .append("line").attr("class", "lineC")
    .attr("x1", function(d,i){
        if(i==1){
            return 190 + 115;
        }
        if(i==2){
            return 190 + 135;
        }
        if(i==3){
            // return 190 + 175;
        }
        return 190 + i+ 70;
    })
    .attr("y1", 80)
    .attr("x2", function(d,i){
        if(i==1){
            return 190 + 115;
        }
        if(i==2){
            return 190 + 135;
        }
        if(i==3){
            // return 190 + 175;
        }
        return 190 + i+ 70;
    })
    .attr("y2", 130)
    // .attr("fill","gray")
    // .attr("stroke","gray")
    // .attr("stroke-weight",.1)
d3.selectAll(".learnText").remove();

d3.selectAll(".captions").remove();
console.log(newData+"newdata");
console.log(newData[indexText].weight+" newData[indextext].weight inside make text")

var weightText = svg1.selectAll("captions")
    .data(newData)
    .enter()
    .append("text").attr("class", "captions")
    .attr("x", 110)
    .attr("y", function(d,i){
        return 100+i*20;
    })
    .attr("fill","gray")
    .text(function(d,i){
        if(Math.floor(newData[i].weight * 100) / 100 >= threshold){
            if(wasClicked && newData[indexText].weight>=threshold){
                $("#refresh1p").delay(500).slideDown();
            }
            else{
                $("#refresh1p, #success").hide();
            }
            if(oldData[i]!=newData[i].weight){
            if((Math.floor(newData[i].weight * 100) / 100).toString().length<4){
                if(i==0){
                    return "Left Link"+": "+Math.floor(oldData[i] * 100) / 100+0+" x "+learningConstant+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" >=  "+" \xa0"+threshold; 
                }
                if(i==1){
                    return "Right Link"+": "+Math.floor(oldData[i] * 100) / 100+0+" x "+learningConstant+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" >=  "+" \xa0"+threshold; 
                }
                // return "Link "+i+": "+Math.floor(newData[i].weight * 100) / 100+0+" >= "+threshold;
            }
            }
            else{
            if((Math.floor(newData[i].weight * 100) / 100).toString().length<4){
                if(i==0){
                    return "Left Link"+": "+Math.floor(oldData[i] * 100) / 100+0+" x "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" >=  "+" \xa0"+threshold; 
                }
                if(i==1){
                    return "Right Link"+": "+Math.floor(oldData[i] * 100) / 100+0+" x "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" >=  "+" \xa0"+threshold; 
                }
            }
            else{
                if(i==0){
                    return "Left Link"+": "+Math.floor(oldData[i] * 100) / 100+" x "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" >=  "+" \xa0"+threshold; 
                }
                if(i==1){
                    return "Right Link"+": "+Math.floor(oldData[i] * 100) / 100+" x "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" >=  "+" \xa0"+threshold; 
                }
                // return "Link "+i+": "+Math.floor(newData[i].weight * 100) / 100+" >= "+threshold;            
            }    
            }        
        }





        else{
            if(oldData[i]!=newData[i].weight){
            if((Math.floor(oldData[i] * 100) / 100).toString().length<4){
                if(i==0){
                    return "Left Link"+": "+Math.floor(oldData[i] * 100) / 100+0+" x "+Math.floor(learningConstant * 100) / 100+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold; 
                }
                if(i==1){
                    return "Right Link"+": "+Math.floor(oldData[i] * 100) / 100+0+" x "+Math.floor(learningConstant * 100) / 100+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold; 
                }
            }
            else{
                if(i==0){
                    return "Left Link"+": "+Math.floor(oldData[i] * 100) / 100+" x "+Math.floor(learningConstant * 100) / 100+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold; 
                }
                if(i==1){
                    return "Right Link"+": "+Math.floor(oldData[i] * 100) / 100+" x "+Math.floor(learningConstant * 100) / 100+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold; 
                }
                // return "Link "+i+": "+Math.floor(oldData[i] * 100) / 100+"*"+Math.floor(learningConstant * 100) / 100+" = "+ Math.floor(newData[i].weight * 100) / 100+" <  "+" \xa0"+threshold; 
            } 
            }
            else{
            if((Math.floor(oldData[i] * 100) / 100).toString().length<4){
                if(i==0){
                    return "Left Link"+": "+Math.floor(oldData[i] * 100) / 100+0+" x "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold; 
                }
                if(i==1){
                    return "Right Link"+": "+Math.floor(oldData[i] * 100) / 100+0+" x "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold; 
                }
                // return "Link "+i+": "+Math.floor(oldData[i] * 100) / 100+0+" * "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold; 
            }
            else{
                if(i==0){
                    return "Left Link"+": "+Math.floor(oldData[i] * 100) / 100+" x "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold; 
                }
                if(i==1){
                    return "Right Link"+": "+Math.floor(oldData[i] * 100) / 100+" x "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold; 
                }

                // return "Link "+i+": "+Math.floor(oldData[i] * 100) / 100+" * "+0+" = "+ Math.floor(newData[i].weight * 100) / 100+" <  "+" \xa0"+threshold; 
            } 
            }
            // if((Math.floor(newData[i].weight * 100) / 100).toString().length<4){
            //     return "Link "+i+": "+Math.floor(newData[i].weight * 100) / 100+0+" <  "+" \xa0"+threshold;
            // }
            // else{
            //     return "Link "+i+": "+Math.floor(newData[i].weight * 100) / 100+" <  "+" \xa0"+threshold;            
            // } 
        }
    })     





////////////////MAKE THIS POPPIER
var learnText = svg1.selectAll("learnText")
    .data(d3.range(2))
    .enter()
    .append("text").attr("class", "learnText")
    .attr("x", function(d,i){
        if(type=="s"){
            return leftMargin*2;
        }
        if(type=="u"){
            return width-leftMargin*2;
        }
    })
    .attr("y", function(d,i){
        return height/hMargin-height/2+rRad*4;
    })
    .attr("fill","gray")
    .text(function(d,i){
        return learningConstant+" learning as you click";
    })




}
$("#refresh1p").animate({
    left: width/2-78,
    // top: hTopMargin-rRad*5.5-20,
})

$("#success").animate({
    left: width/2-2,
})
$("#refresh1p, #success, .win").on("click", function(){  
   

startThings = true;
    d3.selectAll(".bump")
    .transition()
    .duration(2000)
    .attr("fill","white")
    .attr("cy", hTopMargin-rRad)
s = 0;
u = 0;
d3.selectAll(".win")
    .transition()
    .attr("fill", "none");
    for (var i = 0; i < tData.length; i++) {
        tData[i].weight = randMap(Math.random());
    } 
makeText(tData,tData,0,0,"u"); 

    // makeText(tData,0);
    d3.selectAll(".trailLeft, .trailRight").remove();

$("#refresh1p, #success").hide();
clickFunction();
})

clickFunction();

var s = 0;
var u = 0;

var whatIs;
function clickFunction(){
// if(wasClicked==false
if(startThings){
    inputGame[0] = 1;
    inputGame[1] = 1;
    calcGame("smell", width/4,0,"s");

    calcGame("touch", width/2+20,0,"u");
    startThings = false;
}

d3.selectAll(".runner").on("click", function(){
    $("#neurop1, #neurop2").hide();



if(connectionsChanged == false){
        $("#connections2 p").replaceWith("<p>the connections will strengthen</p>");
        $("#connections1 p").replaceWith("<p>if you keep clicking</p>");

    conn1 = $("#connections1").width();
    conn2 = $("#connections2").width();

        // $("#connections1").animate({
        //     left: width/2-conn1*1.8-leftMargin,  
        // })
        // $("#connections2").animate({
        // left: width/2+leftMargin+conn2/1.3,  
        // })
        $("#connections1").animate({
            left: width/2-conn1*1.5-leftMargin,  
        })
        $("#connections2").animate({
            left: width/2+leftMargin+conn2/2,  
        })

   $("#connections1, #connections2").delay(1000).animate({
        left: width/2-conn2/2,  
        top: hTopMargin-rRad-8,
    },3000);
   // $("#connections1").delay(7000).remove();
$('#connections1').delay(0).fadeOut(0, function(){
    $("#connections1 p").replaceWith("<p> </p>");
});
$('#connections2').delay(2000).fadeOut(300, function(){
   // $(this).remove(); 
       $("#connections1 p").replaceWith("<p>the connections will strengthen</p>"); 
       connectionsChanged = true;
});
} 
// else{
//         $("#connections1").show().animate({
//             left: width/2-conn2*1.5-leftMargin,  
//             top: hTopMargin-rRad*4,
//         })
//         $("#connections2").show().animate({
//         left: width/2+leftMargin+conn2/2,  
//         top:hTopMargin-rRad*4,
//         })  
// }






wasClicked = true;
    // clearInterval(myPulse);
whatClicked = d3.select(this);
whatIs = d3.select(this).attr("cx");

console.log(whatClicked.data()[0].sense)
    if (whatClicked.data()[0].sense=="smell"){
    s+=1;
console.log(whatClicked.data()[0].sense)
        addIt = 0;
        inputGame[0] = 1;
        inputGame[1] = 0;
        calcGame("smell", whatIs,s,"s");
    }
    if(whatClicked.data()[0].sense=="touch"){
        u+=1;
console.log(whatClicked.data()[0].sense)
        addIt = 0;
            inputGame[0] = 0;
        inputGame[1] = 1;
        calcGame("touch", whatIs,u,"u");
    }

    d3.select(this)
    .transition()
    .duration(500)
    .attr("cx", width/2)
    .attr("cy", hTopMargin-rRad)
    // .attr("r", function(d,i){
    //     if(whatIs<width/2){
    //         return oMap(l)*50;
    //     } else{
    //         return oMap(r)*50;
    //     }
    // })
    // .call(twizzle, 2000)
    // .call(plonk, 2000)
    .each("end", function(d,i){
        d3.select(this)
        .transition()
        .attr("stroke","white")
        // .attr("fill","turquoise")
        .each("end", function(){
            d3.select(this).remove();
            wasClicked = false;
        })
    })
    makeNewCirc();
})
}
var what = 0;

var l = 0;
var right = 0;
function changeCircs(newData,indexCircs, xPos){
var multiplier = 1;
var oMap = d3.scale.linear()
    .domain([0, threshold*multiplier])
    .range([0, 1]);

if(xPos<width/2){


l+=1;
var what = newData[0].weight*100;
var hMap = d3.scale.linear()
    .domain([0, what])
    .range([height/hMargin, hTopMargin-rRad]);
var xLMap = d3.scale.linear()
    .domain([0, what])
    .range([leftMargin+rRad/2+4, width/2]);



var trailLeft = svg1.selectAll("trailLeft")
    .data(d3.range([what]))
    .enter().append("circle")
    .attr("class", function(d,i){
        return "trailLeft";
    })
    .attr("cx", function(d,i){
        return xLMap(i);//newData[1].weight);
    })
    .attr("cy", function(d,i){
        return hMap(i)//newData[1].weight);
    })
    .attr("r", tRad)
    .attr("fill", "none")
    .attr("stroke","white")
     .attr("opacity",function(d,i){
         // var howFar = newData[1].weight*multiplier;
         if(i<=what){
            return oMap(newData[0].weight);
         }
        else{
            return 0;
        }        
 })
}


else{

    console.log(newData[1].weight+"newDataweight")
right +=1;
// if((newData[1].weight)>=threshold){
var what = newData[1].weight*100;
var h2Map = d3.scale.linear()
    .domain([0, what])
    .range([height/hMargin, hTopMargin-rRad]);
var xRMap = d3.scale.linear()
    .domain([0, what])
    // .range([width/2, width]);
    .range([width-leftMargin-rRad/2-4, width/2]);
// var xLMap = d3.scale.linear()
//     .domain([0, what])
//     .range([leftMargin+rRad/2+4, width/2]);

 

var trailRight = svg1.selectAll("trailRight")
    .data(d3.range([what]))
    .enter().append("circle")
    .attr("class", function(d,i){
        return "trailRight";
    })
    .attr("cx", function(d,i){
        return xRMap(i);//newData[1].weight);
    })
    .attr("cy", function(d,i){
        return h2Map(i)//newData[1].weight);
    })
    .attr("r", tRad)
    .attr("fill", "none")
    .attr("stroke","white")
     .attr("opacity",function(d,i){
         // bumpUp(newData[indexCircs].weight);
         // var howFar = newData[1].weight*multiplier;
         if(i<=what){
            return oMap(newData[1].weight);
         }
        else{
            return 0;
        }        
 })
}

}

var bumpCircle  = svg1.selectAll("bump")
    .data(d3.range(1))
    .enter().append("circle")
    .attr("class","bump")
    .attr("cx", width/2)
    .attr("cy", hTopMargin-rRad)
    .attr("r", rRad/4)
    .attr("fill", "white")
    .attr("opacity",1)
    .attr("stroke","none")   
function bumpUp(high, triggerSense){
var mapBump = d3.scale.linear()
    .domain([0,.5])
    .range([hTopMargin-rRad*2, hTopMargin-rRad*4])

$("#connections").hide();
// .attr("cy", hTopMargin-rRad*5)
//     .attr("r", rRad)
winCircle
   .on("mouseover", function(){
       d3.select(this)
        .transition()
        .attr("stroke","yellow")
        .attr("stroke-width",strokeWeight*3)
    })
   .on("mouseout", function(){
        d3.select(this)
        .transition()
        .attr("stroke","white")
        .attr("stroke-width",strokeWeight)
    }) 
$("#success").on("mouseover", function(){
    winCircle
        .transition()
        .attr("stroke","yellow")
        .attr("stroke-width",strokeWeight*3);
})
$("#success").on("mouseout", function(){
    winCircle
        .transition()
        .attr("stroke","white")
        .attr("stroke-width",strokeWeight);
})



    d3.selectAll(".bump")
    .transition()
    // .delay(000)
    .duration(500)
    .attr("cy", hTopMargin-rRad)
    .each("end", function(){
        d3.selectAll(".bump")
        .transition()
        .attr("cy", function(){
            return mapBump(high)
        })
        .each("end", function(){
            if(high>=.5){
$("#success").animate({
    top: mapBump(high)+17,
})
$("#refresh1p").animate({
    top: mapBump(high)-29,
})
$("#success").show();
    d3.selectAll(".bump")
    .transition()
    .attr("fill","yellow")

                d3.selectAll(".win")
                .transition()
                .attr("r", rRad/2)
                .attr("stroke-width", rRad*2)
                .attr("stroke", "yellow")
                .attr("cy", hTopMargin-rRad*4.6)
                .each("end", function(){
                    d3.selectAll(".win")
                    .transition()
                    // .duration(1000)
                    .attr("stroke-width", rRad)
                    .each("end", function(){
                        d3.selectAll(".win")
                            .transition()
                            // .duration(2000)
                            .attr("r", rRad/2) 
                            .each("end", function(){
                                    d3.selectAll(".win")
                                    .transition()
                                    .duration(2000)
                                    .attr("r", rRad) 
                                    .attr("stroke","white")
                                    .attr("stroke-width", strokeWeight) 
                                    .attr("cy", hTopMargin-rRad*5) 
                            })
                        })
                })

                //should be something like the other thing in science with dashed
                // .each("end", )
                //also change learning constant
            }
            else{
                d3.selectAll(".bump")
                .transition()
                .attr("cy", hTopMargin-rRad)
                .attr("fill","white");
            }
        })        
    })
}
}








































































$('#enterGame').tipsy({
    gravity: 'nw', 
    html: true, 
    title: function() {
         return "Return to Part I: Game";
    }
});

$('#enterContainer').tipsy({
    gravity: 'sw', 
    html: true, 
    title: function() {
         return "Part II: Scientific Explanation";
    }
});

$("#enterGame").on("click", function(){
    $("#container").slideUp("fast");
    $("#game").slideDown("slow");
    // $("#enterGame").show();
})
$("#enterContainer").on("click", function(){
    $("#game").slideUp("fast");
    
    $("#enterGame").show();

    $("#container").slideDown("slow", function(){
        loadData("senses.csv");
    });
})





//to load the scientific description
// loadData("senses.csv")

function loadData(csvName){
svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
vis = svg //for the visualization
    .append('svg:g')
    .attr("transform",
      "translate("+ 0 + "," + 0 + ")");  
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
    top: yMid+80,
    // left: endOutX+r+11-30,
    left: endOutX+r+11,
});
$("#check").animate({
    top: yMid,
    left: endOutX+r+11,
}); 
$("#x").animate({
    top: yMid,
    left: endOutX-r/2-6,
}); 


$("#refreshp").animate({
    top: yMid+24,
    left:lmargin+135,
});
// $("#connections").animate({
//     left: lmargin*2-60,
// });
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
    .each("end", function(d,i){
        showLines(tData);

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
    .data(randData) //    .data(d3.range(randLength))
    .enter()
    .append("circle").attr("class", "cloudCirc")
    .attr("r", r*1.5)
    .attr("opacity",.6)
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
        if(d.sense=="smell"){
            return color1;
        }
        if(d.sense=="touch"){
            return color2;
        }
        else{
        return color(i);
        }
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
    .attr("x", endOutX+r*4)
    .attr("y", yMid-r*2)
    .attr("fill", "gray")
    .text("{ output threshold = "+threshold+" }")
    .attr("opacity",0)

function outputIn(){
if(introTalk){
    // thisCloudCirc
    // .transition()
    // .duration(1000)
    // .attr("cx", endOutX)
}
    endOutCirc
    .transition()
    // .delay(1000)
    .duration(1000)
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
    // $("#title").animate({
    //     left:-lmargin,//*3,
    // })

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
                // .attr("opacity",1)        
        })
    }
}


if(neurons!="undefined" && cloudCirc != "undefined"){
// d3.selectAll(".cloudCirc")
//     .on("click", function(d,i){
//     introTalk = true;
//         thisCloudCirc = d3.select(this);
//         clearInterval(myPulse);
//         // moveAround(secs);
//         $("#title").fadeOut()
//         $("#output").slideUp();
//         d3.select(this);
//         if (d.sense=="smell"){
//             addIt = 0;
//             calculate("smell");
//         }
//         if(d.sense=="touch"){
//             addIt = 0;
//             console.log(d.sense)
//             calculate("touch");
//         }
//     })
//     .on("mouseover", function(){
//         $("#title").fadeOut()
//         d3.select(this)
//         .transition()
//         .attr("stroke-width", strokeWeight*3);
//     })
//     .on("mouseout", function(){
//          d3.select(this)
//         .transition()
//         .attr("stroke-width", strokeWeight);   
//     })



d3.selectAll(".neurons")
    .on("click", function(d,i){
    introTalk = true;
        clearInterval(myPulse);
        moveAround(secs);
        $("#title").fadeOut()
        $("#output").slideUp();
        d3.select(this);
        // console.log(this);
        // console.log(this.sense);
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
    })
    .on("mouseout", function(){
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
if(intro==false){
d3.selectAll(".cloudCirc")
    .transition()
    .duration(1000)
    .attr("cx", function(d,i){
            return Math.random(-1,1)*150;
    })
    .attr("cy", function(d,i){
            // console.log(i);
            return yRand(i)+Math.random(-1,1)*100;
    })
}
else{
    d3.selectAll(".cloudCirc")
    .attr("cx", function(d,i){

            return xRand(i)+Math.random(-1,1);//+secs/10;
            // return 5+Math.random(-1,1);
    })
    .attr("cy", function(d,i){
            // console.log(i);
            // return 5+Math.random(-1,1);
            return yMap(Math.random());
    })

 d3.selectAll(".cloudCirc")
    .transition()
    .duration(1000)
    .attr("cx", function(d,i){

            return xRand(i)+Math.random(-1,1);//+secs/10;
    })
    .attr("cy", function(d,i){
        intro = false;
            return yMap(Math.random());
    }) 
}
}

function showLines(tDataIs){
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
        $("#output").slideDown().animate({
            top: yMid,
            left: endOutX+r*2,
        });
        outputIn();   
        // }     
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
            if(tData[i].weight<threshold){
                addIt += tData[i].weight;
            }
            else{
                addIt = tData[i].weight;
            }
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
       $("#equation p").replaceWith("<p>"+1+"*"+(Math.floor(tData[thisIndex].weight * 100) / 100)+"="+(Math.floor(tData[thisIndex].weight * 100) / 100)+" <b>>=</b> "+threshold+"</p>");

        // if(tData[thisIndex].weight>threshold){
       // $("#equation p").replaceWith("<p>input of"+1+"</br>multiplied by link weight "+(Math.floor(tData[thisIndex].weight * 100) / 100)+"</br><b>>=</b></br>threshold of "+threshold+"</p>");
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
       $("#equation p").replaceWith("<p>input "+1+"* link weight "+(Math.floor(tData[thisIndex].weight * 100) / 100)+"<b><</b> threshold "+threshold+"</p>");
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
showLines(tData);
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
// $("#title").fadeIn(introDuration/2);
    // $("#title").animate({
    //     left: width/2-204,  
    //     top:height/2,
    // },100).fadeIn(introDuration/2); 
// d3.select("#enter").on("click", function(){
// nextAnimation = true;
// prepEndText();
//     $("#enter").slideUp();
//         $("#title").animate({
//             top: "8%",
//         });
//         // svg.call(transition, p0, p1);

// neuronsIn();
//     $("#title .p1").delay(1000).fadeIn(500);     
//     $("#title .p2").delay(3000).fadeIn(500);     
//     $("#title .p3").delay(5000).fadeIn(500);     

// // d3.select("#title p").transition().delay(introDuration/2).duration(100)
// //     .attr("opacity", function(){
// //         $("#title p").append(" linked through weighted lines to an output node</p>");        
// //     } )

// // if(neurons==true){

// // }
//         // outputIn();

//     // $('#intro').fadeIn("slow");
//     // $('#title').fadeOut("fast");
// })

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



$("#refresh, #refreshp").on("click", function(){
myPulse=setInterval(function () {pulseTimer()}, 3000);
$("#refreshp").hide();
    random = true;
for (var i = 0; i < tData.length; i++) {
   tData[i].weight = randMap(Math.random());
         showLines(tData);
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