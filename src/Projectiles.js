// draw()
'use strict';


Projectile.prototype.draw = function() {
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

Projectile.prototype.updatePosition = function() {
    this.y = this.y - this.speed;
  };

// isInsideScreen()

Projectile.prototype.isInsideScreen = function() {
    // if x plus half of its size is smaller then 0 return
    return this.y + this.size / 2 > 0;
  };
