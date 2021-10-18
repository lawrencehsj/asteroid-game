var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score=0;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();
  drawText();
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  //draw earth
  fill(0,0,139);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    var spaceshipLoc = spaceship.location;
    var spaceshipSize = spaceship.size;
    
    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0;i<asteroids.locations.length;i++){ 
        //locations is vector declared in asteroidSystem.js (use this.)
        var asteroidLoc = this.asteroids.locations[i]; 
        var asteroidSize = this.asteroids.diams[i]; 
        
        ifCollided(isInside(spaceshipLoc, spaceshipSize, asteroidLoc, asteroidSize));
        
        //asteroid-2-earth collisions
        //YOUR CODE HERE (2-3 lines approx)
        ifCollided(isInside(asteroidLoc, asteroidSize, earthLoc, earthSize.y));
        
        //bullet collisions (nested loop)
        var bullets = spaceship.bulletSys.bullets;
        var bulletSize = spaceship.bulletSys.diam;
        for(var k=0; k<bullets.length; k++){
            if(isInside(asteroidLoc, asteroidSize, bullets[k], bulletSize)){
                asteroids.destroy(i);
                score++; //keep track of score
            }
        }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    ifCollided(isInside(spaceshipLoc, spaceshipSize, earthLoc, earthSize.y));

    //spaceship-2-atmosphere (call setNearEarth)
    //YOUR CODE HERE (1-2 lines approx)
    gravityNearEarth(isInside(spaceshipLoc, spaceshipSize, atmosphereLoc, atmosphereSize.y)); //atmosphereSize is a vector, so therefore need to get the width of it, which is x or y
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var maxDist = sizeA/2 + sizeB/2;
    var d = dist(locA.x, locA.y, locB.x, locB.y); //dist() calculates the distance between two points
    if(maxDist>d)  
        return true;
    else
        return false;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

function ifCollided(collide){
    if(collide===true)
        gameOver();
}

function gravityNearEarth(collide){
    if(collide===true)
        spaceship.setNearEarth();
}

function drawText(){
    fill(255);
    textSize(32);
    text('score: '+score,50,50);
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
