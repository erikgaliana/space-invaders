'use strict';

function Enemy(canvas,x,y, speed,lives,kindaliens) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 45;
  this.x =  x;//(canvas.width/2) + this.size;
  this.y = 40+y;
  this.speed = speed;
  this.direction = 1;
  this.live=lives;
  this.kindalien=kindaliens;
  this.enemyImg1= new Image();
  this.enemyImg1.src="./images/alien1.png";
  this.enemyImg2= new Image();
  this.enemyImg2.src="./images/alien2.png";
  this.enemyImg3= new Image();
  this.enemyImg3.src="./images/alien4.png";
  this.enemyImg4= new Image();
  this.enemyImg4.src="./images/alien5.png";
}


// draw()

Enemy.prototype.draw = function() {
  var selectedimg;
  switch (this.kindalien) {
    case 1:
      selectedimg=this.enemyImg4;
      break;
    case 2:
      selectedimg=this.enemyImg3;
      break;
    case 3:
      selectedimg=this.enemyImg2;
      break;
    case 4:
      selectedimg=this.enemyImg1;
      break;
   
    default:
      selectedimg=this.enemyImg1;
      break;
  }

  this.ctx.drawImage(selectedimg, this.x, this.y, this.size, this.size);
    /*
    this.ctx.fillStyle = '#FF6F27';
    // fillRect(x, y, width, height)
    this.ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size,
    );*/
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

  
 