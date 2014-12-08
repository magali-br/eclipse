// Useful colour values
//var aqua = color(35, 148, 129);
//var grey = color(117, 112, 112);

// Dictionary storing incident vectors
var vectors = {};

//Coefficient for ambient lighting
var ambientK = 0.3;

// Coefficient for diffuse lighting
var diffuseK = 0.6;

// Rounding cutoff for the incident vectors
var rounding = 8000;

var canvasElement;

function setupCanvas() {

    if (!$('canvas')[0]) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", "eclipseCanvas");

        canvas.setAttribute("width", 290);
        canvas.setAttribute("height", 290);
        canvas.setAttribute("tabindex", 1);

        $("#canvasdiv").append(canvas);
    }
}

// // Calculate the Euclidean distance between two points of dimension numDimensions
// function euclidDistance(point1, point2, numDimensions) {
//     var sum = 0;
//     for (var i = 0; i < numDimensions; i++) {
//         sum += sq((point1[i] - point2[i]));
//     }
//     return sqrt(sum);
// }

// // Calculate the Euclidean norm of a vector of dimension numDimensions
// function euclidNorm(vector, numDimensions) {
//     var sum = 0;
//     for (var i = 0; i < numDimensions; i++) {
//         sum += sq(vector[i]);
//     }
//     return sqrt(sum);
// }


// // A 3-D sphere to be drawn
// function Sphere(originX, originY, originZ, radius, colour) {
//     this.originX = originX;
//     this.originY = originY;
//     this.originZ = originZ;
//     this.radius = radius;
//     this.colour = colour;
//     this.colours = {};
//     this.vectors = {};
//     this.pointsToVectors = {};
// }
    
//     // Determine which colour a point on the surface of the sphere should have
// Sphere.prototype.phongPixel = function(pointX, pointY, light, withShade) {
//     var pointZ = this.originZ - sqrt(sq(this.radius) - sq(this.originX - pointX) - sq(this.originY - pointY));
//     var normal = [pointX - this.originX,  pointY - this.originY, pointZ - this.originZ];
//     var incident = [light.x - pointX, light.y - pointY, light.z - pointZ];
    
//     var incidentNorm = euclidNorm(incident, 3);
//     var normedIncident = [incident[0] / incidentNorm, incident[1] / incidentNorm, incident[2] / incidentNorm];
//     var roundIncident = [round(normedIncident[0] * rounding) / rounding, round(normedIncident[1] * rounding) / rounding, round(normedIncident[2] * rounding) / rounding];
    
//     // Store all incident vectors for comparison to create shadow
//     this.pointsToVectors[[pointX, pointY]] = roundIncident;
//     if (this.vectors[roundIncident]) {
        
//         this.vectors[roundIncident] += 1;
//     } else {
        
//         this.vectors[roundIncident] = 1;
//     }
    
//     var cos = (incident[0] * normal[0] + incident[1] * normal[1] + incident[2] * normal[2]) / (euclidNorm(incident, 3) * euclidNorm(normal, 3));
//     cos = max(0, cos);
    
//     //Diffusing the light a little
//     //cos = abs(cos);

//     return cos;
// }

// /* Calculate the appropriate colour for each pixel on the sphere 
// based on the origin of the light source */
// Sphere.prototype.prepare = function(light) {
//     this.colours = {};
//     this.vectors= {};
//     var colour = this.colour;
//     var ambientRed = ambientK * red(colour);
//     var ambientGreen = ambientK * green(colour);
//     var ambientBlue = ambientK * blue(colour);
//     var diffuseRed = diffuseK * red(colour);
//     var diffuseGreen = diffuseK * green(colour);
//     var diffuseBlue = diffuseK * blue(colour);
    
//     var originX = this.originX;
//     var originY = this.originY;
//     var originZ = this.originZ;
//     var radius = this.radius;
    
//     for (var i = originX - radius; i <= originX + radius; i++) {
//         for (var j = originY - radius; j <= originY + radius; j++) {
            
//             var distance = euclidDistance([originX, originY], [i, j], 2);
//             if (radius > distance) {
//                 var cos = this.phongPixel(i, j, light, false);
//                 var newColour = color(ambientRed + diffuseRed * cos, ambientGreen + diffuseGreen * cos, ambientBlue + diffuseBlue * cos);
//                 this.colours[[i,j]] = newColour;
//             }
            
//         }
//     }
// }

// // Draw sphere using saved colours for each pixel
// Sphere.prototype.draw = function() {
//     for (var i = this.originX - this.radius; i <= this.originX + this.radius; i++) {
//         for (var j = this.originY - this.radius; j <= this.originY + this.radius; j++) {
            
//             var colour = this.colours[[i,j]];
//             if (colour) {
//                 stroke(colour);
//                 point(i,j);
//             }
            
//         }
//     }
// }

// // Draw sphere using saved colours for each pixel with the shadow of another sphere upon it
// Sphere.prototype.drawWithShadow = function(otherSphere) {
//     for (var i = this.originX - this.radius; i <= this.originX + this.radius; i++) {
//         for (var j = this.originY - this.radius; j <= this.originY + this.radius; j++) {
//             var colour;
//             var vector = this.pointsToVectors[[i,j]];
//             if (otherSphere.vectors[vector]) {
//                 colour = color(0, 0, 0);
//             } else {
//                 colour = this.colours[[i,j]];
//             }
            
//             if (colour) {
//                 stroke(colour);
//                 point(i,j);
//             }
            
//         }
//     }
// }



// var buttonHeight = 27;
// var buttonViewWidth = 130;
// var buttonPauseWidth = 142;

// function drawButton(viewing) {
    
//     fill(255,255,255);
//     stroke(255, 255, 255);
//     if (viewing) {
//         rect(2, 2, buttonViewWidth, buttonHeight, 10);
//     } else {
//         rect(2, 2, buttonPauseWidth, buttonHeight, 10);
//     }
    
//     stroke(0,0,0);
//     if (viewing) {
//         rect(2, 2, buttonPauseWidth, buttonHeight, 10);
//         fill(0, 0, 0);
//         text("Press to PAUSE eclipse", 10, 20);
        
//     } else {
        
//         rect(2, 2, buttonViewWidth, buttonHeight, 10);
//         fill(0, 0, 0);
//         text("Press to VIEW eclipse", 10, 20);
//     }
// }


// // Radius of the moon: 1 737 km
// // Radius of the earth: 6 378 km
// // Average distance from center of moon to center of earth: 384 403 km
// // Approximate distance from earth to sun: 150 000 000 km

// var earthX = 180;
// var earthY = 120;
// var earthZ = 0;
// var earthRadius = 100;

// var moonX = 10;
// var moonY = 250;
// var moonZ = -2000;//-4000;//-1200;
// var moonRadius = 27; // The moon is approximately 27% of the size of the earth

// var distanceMoonEarth = 384403 / 6378 * earthRadius; // 6 027: 60,27 times the radius of the earth
// //var distanceEarthSun = 150000000 / 6378 * earthRadius; // 2 351 834

// var viewing = false;
// var initialized = false;
// var moon;
// var earth;
// var light = {x:200, y:1800, z:-20000};
// //var light = {x:200, y:600, z:-10000}; // works when moon is at y 

// function mouseClicked() {
//     if (2 <= mouseX <= buttonPauseWidth) {
        
//         if (2 <= mouseY <= buttonHeight) {
//             if (!viewing) {
//                 viewing = true;
//                 if (!initialized) {
                    
//                     initialized = true;
                    
//                     //moonZ = earthZ - sqrt(sq(distanceMoonEarth) - sq(earthX - moonX) - sq(earthY - moonY));
                    
//                     moon = new Sphere(moonX, moonY, moonZ, moonRadius, grey);
//                     earth = new Sphere(earthX, earthY, earthZ, earthRadius, aqua);
//                     moon.prepare(light);
//                     earth.prepare(light);
//                 }
//             } else {
//                 viewing = false;
//             }
            
//             drawButton(viewing);
            
//         }
//     }
// }

function drawEclipse() {

    var backgroundColour = '#D9D2C8';
    var canvas = $('canvas')[0];
    var context = canvas.getContext("2d");
    context.fillStyle = backgroundColour;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // drawButton(viewing);
    
    // if ((moon.originX < 390) && viewing) {
        
    //     // Erase the current moon
    //     fill(255, 255, 255);
    //     stroke(255, 255, 255);
    //     ellipse(moon.originX, moon.originY, moon.radius * 2 + 2, moon.radius * 2 + 2);
        
    //     // Update the moon's position
    //     moon.originX += 5;
    //     if (moon.originX < earthX) {
    //         moon.originY += 2;
    //     } else {
    //         moon.originY -= 2;
    //     }
        
    //     vectors = {};
        
    //     moon.prepare(light);
    //     moon.draw();
    //     earth.drawWithShadow(moon);
        
        
    //} 
}
