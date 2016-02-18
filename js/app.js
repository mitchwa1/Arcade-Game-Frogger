
// Enemies class, (enemies player must avoid)
var Enemy = function() {
    // assign enemy start position
    this.x = -125;
    yCalc(); // call to random road position
    this.y = y; //return & assign road position
    speedCalc();  //call to random speed dependent on score
    this.speed = speed; // return & assign speed
    console.log(this.speed);
    // The image/sprite for our enemies, this loads enemy image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    // multiply movement by dt parameter ensuring
    // game runs at the same speed for all computers.
    this.x += this.speed * dt;
  // If our enemies move off the screen, restart to left of screen
    if (this.x > 500) {
        this.x = -100;
        yCalc(); // call to random y road position
        this.y = y; //return & assign road position
        speedCalc();  //call to random speed dependent on score
        this.speed = speed; // return & assign speed
    }; 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x-100, this.y);
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
        this.y = 225;  
    }
    return this.y; //return this.y to calling function
};

//calculate enemy speed with game score
function speedCalc(){ 
    var speed = Math.floor(Math.round(Math.random()*10)*15)+50;
    //speed += score;
    console.log(speed);
    this.speed = speed;
    return this.speed;
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
};

// Update player's position.
// @param {number} dt A time delta between ticks 
player.prototype.update = function(dt) {
    this.x*dt;
    this.y*dt;
};

// Reset player's position.
player.prototype.reset = function() {
    //player();
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
    // player move up
    case 'down':
    if (this.y > 0) {
        this.y+= 90;
    }
    break;
    // player move right
    case 'right':
    if (this.x < 505) {
        this.x+= 100;
    }
    break;
    // player move down
    case 'up':
    if (this.y < 606) {
        this.y-= 90;
    }
    break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new player();
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// enemy function
var enemy = function () {
    for (var i = 0; i < 3; i++) {
    enemy = new Enemy();
    allEnemies.push(enemy);
    }
};
enemy();

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