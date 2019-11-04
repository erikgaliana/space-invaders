
'use strict';


function Projectile(canvas,x,y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = 10;
    this.x =  x;//(canvas.width/2) + this.size;
    this.y = 10+y;
    this.speed = 5;
    this.direction = 1;
  }

// draw()

Projectile.prototype.draw = function() {
    console.log('draw func');
    this.ctx.fillStyle = 'white';
    // fillRect(x, y, width, height)
    this.ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size,
    );
  };

// updatePosition()

Projectile.prototype.updatePosition = function() {
    this.y = this.y - this.speed;
  };

// isInsideScreen()

Projectile.prototype.isInsideScreen = function() {
    // if x plus half of its size is smaller then 0 return
    return this.y + this.size / 2 > 0;
  };
