function Game() {
  this.canvas = null;
  this.ctx = null;
  this.alien1 = null;
  this.enemies = [];
  this.projectilesarr =[];
  this.player = null;
  this.projectile = null;
  this.gameIsOver = false;
  this.gameScreen = null;
  this.score = 0;
 
}

Game.prototype.start = function() {
  // Get the canvas element, create ctx, save canvas and ctx in the game object
  this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = document.querySelector('canvas');
  this.ctx = this.canvas.getContext('2d');

  // Save reference to the score and lives elements
  this.livesElement = this.gameScreen.querySelector('.lives .value');
  this.scoreElement = this.gameScreen.querySelector('.score .value');

  // Set the canvas to be same as the viewport size
  this.containerWidth = this.canvasContainer.offsetWidth;
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute('width', this.containerWidth);
  this.canvas.setAttribute('height', this.containerHeight);
   
  
  

  // Create new player
  this.player = new Player(this.canvas,3);
  
  // creates enemies
    for (var i=0; i<5; i++){
      var newEnemy = new Enemy(this.canvas, 75*i, 600, 1,1);
      this.enemies.push(newEnemy);
      
    }

  // Add event listener for keydown movements
  this.handleKeyDown = function(event) {
      
    if (event.key === 'ArrowLeft') {
      //console.log('LEFT');
      this.player.setDirection('Left');  
    } 
    else if (event.key === 'ArrowRight') {
      //console.log('RIGHT');
      this.player.setDirection('Right');
    }
    if (event.which === 32) {
      console.log("fire!!!");
      if( this.projectile===null) {
       // console.log('createsprojecrtile');
        this.projectile= new Projectile(this.canvas,(this.player.x+(this.player.size/2)),this.player.y); 
       // console.log(this.projectile);
      }
      
    }
  };

  // Add event listener for moving the player
  
  
  document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
  
  
  // Start the game loop

  this.startLoop();
};

///////////// LOOOOP STARTS HERE //////////////////

Game.prototype.startLoop = function() {
  var loop = function() {
    console.log('in loop');
    
    // 1. UPDATE THE STATE OF PLAYER AND ENEMIES
  
    // 0. Our player was already created - via `game.start()`

    // 1. Create new enemies randomly

    // 2. Check if player had hit any enemy (check all enemies)

    // 3. Check if player is going off the screen

         this.player.handleScreenCollision();
    // 4. Move existing enemies
        

          this.checkEnemiesScreenCollision()
    // 5 check if collions between proyectiles and enemies.canvas-container
    // if ( this.projectile!=null) { 
        
    //       this.checkProjectileCollisions();
    //     }


    // 6. Check if any projectile is going of the screen
    if ( this.projectile!=null) {   
              if ((this.projectile.y + (this.projectile.size / 2)) < 0 ) { this.projectile=null;}
        }


    // 7. check if Aliens landed
    this.Alienlanded();

// 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw the prjectiles
    if ( this.projectile!=null) {
       // console.log(this.projectile);
       // console.log("update psoition");
        this.projectile.updatePosition ();
        this.projectile.draw();
         
    };
// 3. UPDATE THE CANVAS
    // Draw the player
    this.player.draw();
    

   if ( this.projectile!=null) { 
        
    this.checkProjectileCollisions();
  }
    
    
    this.enemies.forEach(function(enemy) {
      
      if(enemy.live===1) {enemy.draw();}
    });
    

// 4. TERMINATE LOOP IF GAME IS OVER
    
    
    //if gameover then stop loop
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop)
    }
    
    //update game stats
    this.updateGameStats();	
   // window.requestAnimationFrame(loop);
  }.bind(this);

  window.requestAnimationFrame(loop);
};



// CHECK ENEMIES COLIDING THE SCREEN THEN MOVE DOWN


Game.prototype.checkEnemiesScreenCollision = function(){
  var hasCollided = false;
  this.enemies.forEach(function(enemy) {
    // only check if it's alive
      if ( enemy.live===1){
        enemy.x = enemy.x + enemy.direction * enemy.speed;
        var screenLeft = 0;
        var screenRight = 600;
    
        if ((enemy.x+enemy.size) > screenRight || enemy.x < screenLeft) {
              hasCollided = true;
      
        }
      }
    });

    // now if coliddes we change directrion and move down
  if (hasCollided){

    this.enemies.forEach(function(enemy){
      enemy.direction*=-1;
      enemy.y = enemy.y+30;
      
      
      });
  }
}

// CHECK COLLISIONS BETWEEN PROJECTILES AND ENEMIES

Game.prototype.checkProjectileCollisions = function() {
  
  this.enemies.forEach( function(enemy) {
    if(enemy.live===1){
      // We will implement didCollide() in the next step
      if ( this.projectile.didCollide(enemy) ) {

          //this.player.removeLife();
          //console.log('lives', this.player.lives);
      
          //Move the enemy off screen to the left
          this.projectile.y = 0 - this.projectile.size;

          enemy.live = 0;
          

          /*
          if (this.player.lives === 0) {
          this.gameOver();
          }*/
          console.log("enemy hit");

          
      }
    }
  }, this);
  // We have to pass `this` value as the second argument
  // as array method callbacks have a default `this` of undefined.
};

// aliens landing

Game.prototype.Alienlanded = function () {
  
    if ( this.enemies[0].y >= this.player.y ){
      this.gameOver();
    }

}




// gameOver()

Game.prototype.updateGameStats = function() {
  this.score += 1;
  this.livesElement.innerHTML = this.player.lives;
  this.scoreElement.innerHTML = this.score;
};

Game.prototype.passGameOverCallback = function(gameOver) {
  this.onGameOverCallback = gameOver;
};



Game.prototype.gameOver = function() {
  // flag `gameIsOver = true` stops the loop
  this.gameIsOver = true;
  console.log('GAME OVER');
  
  // Call the gameOver function from `main` to show the Game Over Screen
  this.onGameOverCallback();
};

//	game.js	 removeGameScreen()

Game.prototype.removeGameScreen = function() {
  this.gameScreen.remove(); // remove() is the DOM method which removes the DOM Node  
};


