// Enemies class, (enemies player must avoid)
var Enemy = function() {
    // assign enemy start position
    this.x = -125;
    yCalc(); // call to random road position
    this.y = y; //return & assign road position
    speedCalc();  //call to random speed dependent on score
    this.speed = speed; // return & assign speed
    // The image/sprite for our enemies, this loads enemy image
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    // multiply movement by dt parameter ensuring
    // game runs at the same speed for all computers.
    this.x = this.x + (this.speed * dt);
  // If our enemies move off the screen, restart to left of screen
    if (this.x > 500) {
        this.x = -100;
        yCalc(); // call to random y road position
        this.y = y; //return & assign road position
        speedCalc();  //call to random speed dependent on score
        this.speed = speed; // return & assign speed
    }; 
    //check for collisions with bugs
    if (player.y === this.y && player.x + 25 <= this.x && player.x + 150 >= this.x) {
        lives --;
        if (lives < 1){
            lives=3;
            score=0;
            document.getElementById('playerScore').innerHTML = score;
            this.enemySpawn=3;
        }
        document.getElementById('playerLives').innerHTML = lives;
        player.reset();
    }
    if (player.y<0) { //if player makes the water, score +1 &  reset
        //score ++;
        scoring();
        //document.getElementById('playerScore').innerHTML = score;
        player.reset();
    }
    if (player.x>401 || player.y>401) { //if player moves out of bounds reset to start position
        player.reset();
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x-100, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
    // Set initial x and y position on the canvas
    this.x = 200;
    this.y = 400;
    // Set initial score value to 0
    this.score = 0;
};
// Update player's position.
// @param {number} dt A time delta between ticks 
player.prototype.update = function(dt) {
    this.x*dt;
    this.y*dt;
    //console.log(this.x);
    //console.log(this.y);
};
// Reset player's position.
player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};
// Renders and draws a player in the game.
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Handles keyboard pressed events.
// defines how player moves around the grid
player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
    // player move left
    case 'left':
    if (this.x > 0) {
        this.x-= 100;
    }
    break;
    // player move down
    case 'down':
    if (this.y > 0) {
        this.y+= 85;
    }
    break;
    // player move right
    case 'right':
    if (this.x < 505) {
        this.x+= 100;
    }
    break;
    // player move up
    case 'up':
    if (this.y < 606) {
        this.y-= 85;
    }
    break;
    }
};
// Instantiate objects.
// Place the player object in a variable called player
var player = new player();
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Array of Gem Images for collection (no heart yet)
//for random X position an Y position within screen
var gemImages = ['images/Gem_Orange.png', 'images/Gem_Blue.png', 'images/Gem_Green.png'];
var gemPosX = [0, 100, 200, 300, 400];
// var gemPosY = [60, 145, 230];  **** DO NOT NEED CALL YCALC
/**
 * A player should try to collect gems.
 * Gems appean on the map randomly,
 * and whenever player collect one, the enemy increments by 1.
 */
var Gem = function() {
  this.gemImg = gemImages[Math.floor(Math.random() * 3)];
  this.x = gemPosX[Math.floor(Math.random() * 5)];
  console.log('gemxpos'+this.x);
  yCalc();
  this.y = y;
  console.log("placing gem pos here", this.x, this.y);
}

//Gem prototype update position & score
Gem.prototype.update = function() {
  // If our enemies move off the screen, restart to left of screen
    if (player.x === this.x && player.y === this.y) {
    this.gemImg = gemImages[Math.floor(Math.random() * 3)];
    this.x = gemPosX[Math.floor(Math.random() * 5)];
    yCalc();
    this.y = y;
    console.log("placing gem pos here", this.x, this.y);
    scoring();
    }
}
// Renders and draws a player in the game.
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
}
// enemy function creating enemies
var enemy = function () {
    //for (var i = 0; i < enemySpawn; i++) { //inserted enemySpawn instead of 3
    enemy = new Enemy();
    allEnemies.push(enemy);
    console.log('enemyspwn in enemy',enemySpawn);
    //}
};
enemy();
for (var i = 0; i < enemySpawn; i++){
    allEnemies.push(new Enemy);
    //console.log('global enemy spawn', enemySpawn);
};
//function to calculate y position for Enemy (1 of 3 roadways)
function yCalc(){
    var y = Math.random(); //random number 0 to 1
    if (y < 0.34){
        this.y = 60;
    }
    else if (y >= 0.34 && y <= 0.66){
        this.y = 145;  
    }
    else if (y > 0.66) {
        this.y = 230;  
    }
    return this.y; //return this.y to calling function
};
//calculate enemy speed with game score
function speedCalc(){ 
    var speed = Math.floor(Math.round(Math.random()*10)*15)+50;
    //speed += score;
    //console.log(speed);
    this.speed = speed;
    return this.speed;
};
function scoring(){
    score++;
    document.getElementById('playerScore').innerHTML = score;
    if(score>1 && score%5===0){
        enemySpawn +=1;
        allEnemies.push(new Enemy);
        console.log('scoring enemy spawn #',enemySpawn);
    }
    return score;
};
//initiate enemies
var enemySpawn = 3;
// initiate the new gem randomly
var gem = new Gem();
//initiate score
var score = 0;
document.getElementById('playerScore').innerHTML = score;
//initiate lives
var lives = 3;
document.getElementById('playerLives').innerHTML = lives;
// listens for key presses and sends keys to player.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
