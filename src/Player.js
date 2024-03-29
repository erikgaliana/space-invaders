function Player(canvas,lives) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.size = 70;
  this.x = (canvas.width / 2)-(this.size/2);
  this.y = 720;
  this.lives = lives;  

  this.direction = 0;
  this.speed = 3; // before was 5

  this.playerImg = new Image();
  this.playerImg.src="./images/spaceship.png";
}

// setDirection()

Player.prototype.setDirection = function(direction) {
  // +1 right  -1 left
  //console.log("direction"+direction)
  if (direction === 'Left') this.direction = -1;
  else if (direction === 'Right') this.direction = 1;
};

Player.prototype.didCollide = function(enemy) {};

Player.prototype.handleScreenCollision = function() {
  this.x = this.x + this.direction * this.speed;
  var screenLeft = 0;
  var screenRight = this.canvas.width;


  if ((this.x+this.size) > screenRight) this.direction = -1;
  else if (this.x < screenLeft) this.direction = 1;
};

Player.prototype.removeLife = function() {
  this.lives -= 1;
};

Player.prototype.draw = function() {

  this.ctx.drawImage(this.playerImg, this.x, this.y, this.size, this.size);

  /*
  this.ctx.fillStyle = '#66D3FA';
  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);*/
};

Player.prototype.didCollide = function(enemy) {
  var projectileLeft = this.x;
  var projectileRight = this.x + this.size;
  var projectileTop = this.y;
  var projectileBottom = this.y + this.size;


  var enemyLeft = enemy.x;
  var enemyRight = enemy.x + enemy.size;
  var enemyTop = enemy.y;
  var enemyBottom = enemy.y + enemy.size;
  
  if( !enemy) console.log(enemy);
    //  if( this.y<enemy.y){ console.log("enemigo rebasado");};

  // Check if the enemy intersects any of the player's sides
  var crossLeft = enemyLeft <= projectileRight && enemyLeft >= projectileLeft;
  //if(crossLeft) console.log ("crossleft");
    
  var crossRight = enemyRight >= projectileLeft && enemyRight <= projectileRight;
  //if(crossRight) console.log ("crossRight");

  var crossBottom = enemyBottom >= projectileTop && enemyBottom <= projectileBottom;
  //if(crossBottom) console.log ("crossBottom");

  var crossTop = enemyTop <= projectileBottom && enemyTop >= projectileTop;
  //if(crossTop) console.log ("ccrossTop");

  var inside=( (projectileBottom<= enemyBottom) && (projectileTop>=enemyTop )) && (( projectileLeft>=enemyLeft)&&(projectileRight<= enemyRight));

  if (
      inside || 
      ( ( crossLeft || crossRight) && (crossTop || crossBottom) )
    ) {
    return true;
  }


  return false;
};