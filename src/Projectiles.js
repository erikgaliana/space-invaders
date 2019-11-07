
'use strict';


function Projectile(canvas,x,y,speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = 10;
    this.x =  x;//(canvas.width/2) + this.size;
    this.y = y;
    this.speed = speed;
    this.direction = 1;
  }

// draw()

Projectile.prototype.draw = function() {
/*
    var blast= new Image();
    blast.src="../images/alienblast.png";

    this.ctx.drawImage(blast, this.x, this.y, this.size, this.size);

      */

    //console.log('draw func');
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


Projectile.prototype.didCollide = function(enemy) {
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