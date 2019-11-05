function Player(canvas,lives) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.size = 70;
  this.x = (canvas.width / 2)-(this.size/2);
  this.y = 720;
  this.lives = lives;  

  this.direction = 0;
  this.speed = 3; // before was 5
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
  this.ctx.fillStyle = '#66D3FA';
  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};
