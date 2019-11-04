'use strict';

function Enemy(canvas,x,y, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 45;
  this.x =  x;//(canvas.width/2) + this.size;
  this.y = 40+y;
  this.speed = speed;
  this.direction = 1;
}


// draw()

Enemy.prototype.draw = function() {
    
    this.ctx.fillStyle = '#FF6F27';
    // fillRect(x, y, width, height)
    this.ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size,
    );
  };

// updatePosition()

Enemy.prototype.updatePosition = function() {
    this.y = this.y + this.speed;
  };

// isInsideScreen()

Enemy.prototype.isInsideScreen = function() {
    // if x plus half of its size is smaller then 0 return
    return this.y + this.size / 2 > 0;
  };
/*
Enemy.prototype.handleScreenCollision = function() {
    this.x = this.x + this.direction * this.speed;
    var screenLeft = 0;
    var screenRight = this.canvas.width;
  
    
    if ((this.x+this.size) > screenRight) this.direction = -1;
    else if (this.x < screenLeft) this.direction = 1;
  };*/

 