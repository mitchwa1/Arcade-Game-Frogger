
// Enemies class, (enemies player must avoid)
var Enemy = function() {
    // assign enemy start position
    this.x = -125;
    yCalc(); // call to random road position
    this.y = y; //return & assign road position
    speedCalc();  //call to random speed dependent on score
    this.speed = speed; // return & assign speed
    //console.log(this.speed);
    // The image/sprite for our enemies, this loads enemy image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    // multiply movement by dt parameter ensuring
    // game runs at the same speed for all computers.
    this.x = this.x + (this.speed * dt);
    //console.log(this.x);
    //console.log(this.y);
  // If our enemies move off the screen, restart to left of screen
    if (this.x > 500) {
        this.x = -100;
        yCalc(); // call to random y road position
        this.y = y; //return & assign road position
        speedCalc();  //call to random speed dependent on score
        this.speed = speed; // return & assign speed
    }; 

    // Check for collision with enemies or barrier-walls
    /* if (this.x > -125 && this.x < 50) {
    this.tileX = 0;
  } else if (this.x > 50 && this.x < 150) {
    this.tileX = 100;
  } else if (this.x > 150 && this.x < 250) {
    this.tileX = 200;
  } else if (this.x > 250 && this.x < 350) {
    this.tileX = 300;
  } else if (this.x > 350 && this.x < 450) {
    this.tileX = 400;
  } else if (this.x > 450 && this.x < 550) {
    this.tileX = 500;
  }
  */

    if (player.y === this.y && player.x + 25 <= this.x && player.x + 150 >= this.x) {
        console.log('collided');
        player.reset();
        //score=score-1; 
        }

    if (player.y<0) { //if player makes the water, score +1 &  reset
        player.reset();
        //score+=1;
    }
    if (player.x>401 || player.y>401) { //if player moves out of bounds reset to start position
        player.reset();

    }

    /****** if (player.x === Math.round(this.x - 20) && player.y === this.y) {
        console.log("dying");
        player.reset();
    //gameLife.decrease();
  }
    else if (player.x === Math.round(this.x - 150) && player.y === this.y) {
    console.log("dying");
    player.reset();
    //gameLife.decrease();
  }

  ****/

  console.log('this.x'+this.x, 'player.x'+player.x, 'this.y'+this.y, 'player.y'+player.y);
};

//console.log(this.x, this.tileX, player.x, player.y);

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

    //****try**this.checkCollisions();
      //collision detection
    //checkCollision(this);
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

var checkCollision = function(player) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {
        console.log('collided');
        player.x = 202.5;
        player.y = 383;
    }
};
// Instantiate objects.
// Place the player object in a variable called player
var player = new player();
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// enemy function creating enemies
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
