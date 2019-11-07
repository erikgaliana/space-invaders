function Game() {
  this.canvas = null;
  this.ctx = null;
  this.playervictory = false;
  this.enemies = [];
  this.projectilesarr =[];
  this.player = null;
  this.projectile = null;
  this.Alienprojectile = null;
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

  //set if plyer wins
  //this.playervictory = false;

  // Set the canvas to be same as the viewport size
  this.containerWidth = this.canvasContainer.offsetWidth;
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute('width', this.containerWidth);
  this.canvas.setAttribute('height', this.containerHeight);
   

  // Create new player
  this.player = new Player(this.canvas,3);
  
  // creates enemies
   /* for (var i=0; i<5; i++){
      var newEnemy = new Enemy(this.canvas, 75*i, 100, 1,1);
      this.enemies.push(newEnemy);
      
    }*/
    
    for (var i=1; i<4; i++){
      for ( var j=0; j<6; j++ ){
      var newEnemy = new Enemy(this.canvas, 75*j, 75*i, 1,1);
      this.enemies.push(newEnemy);
      }
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
      //console.log("fire!!!");
      if( this.projectile===null) {
       // console.log('createsprojecrtile');
        this.projectile= new Projectile(this.canvas,(this.player.x+(this.player.size/2)),this.player.y,3); 
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
        

          this.checkEnemiesScreenCollision();
    
    
    // alien shoots back

          this.Alienshootsback();


    // 5 check if collions between  alienproyectiles and player
    


    // 6. Check if any projectile is going of the screen
    if ( this.projectile!=null) {   
              if ((this.projectile.y + (this.projectile.size / 2)) < 0 ) { this.projectile=null;}
        }

        
    if ( this.Alienprojectile!=null) {   
          if ((this.Alienprojectile.y + (this.Alienprojectile.size / 2)) > 800 ) { this.Alienprojectile=null;}
      }


    // 7. check if Aliens landed
    
    this.Alienlanded();

// 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw the prjectiles
    if ( this.projectile!=null) {
       
        this.projectile.updatePosition ();
        this.projectile.draw();
         
      };

    if ( this.Alienprojectile!=null) {
     
       this.Alienprojectile.updatePosition ();
       this.Alienprojectile.draw();
        
      };

// 3. UPDATE THE CANVAS
    // Draw the player
      
    
    this.player.draw();
    

    if ( this.projectile!=null) { 
        
      this.checkProjectileCollisions();
    }

    if ( this.Alienprojectile!=null) { 
        
      this.checkAlienProjectileCollisions();
    }

  
   // check if pleyer wins

   this.Playerwins();

  // draw the enemies
    
    this.enemies.forEach(function(enemy) {
      
      if(enemy.live===1) {enemy.draw();}
    });
    
    // draw scores &lifes
    this.ctx.fillStyle = "orange";
    this.ctx.font = "20px 'Press Start 2P'";
   
    this.ctx.fillText("Lives : "+this.player.lives, 40, 50);
    this.ctx.fillText("Score : "+this.score, 350, 50);

// 4. TERMINATE LOOP IF GAME IS OVER
    
    
    //if gameover then stop loop
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop)
    }
    
    
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

          var img= new Image();
          img.src="../images/explosion.png";

          this.ctx.drawImage(img, enemy.x, enemy.y, enemy.size, enemy.size);
          /*
          mySound = new sound("../sounds/invaderkilled.wav");

          mySound.play();*/
          
          this.projectile.y =  -100;//0 - this.projectile.size;
          
          setTimeout((enemy.live = 0),2000);
          
          this.score = this.score + (25*this.player.lives)+ (800-enemy.y);

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


Game.prototype.checkAlienProjectileCollisions = function() {
  
      // We will implement didCollide() in the next step

      if ( this.Alienprojectile.didCollide(this.player) ) {

          this.player.removeLife();
          console.log('lives', this.player.lives);
      
          //Move the enemy off screen to the left
          this.Alienprojectile.y = 1000;  //780 + this.Alienprojectile.size;

      if (this.player.lives === 0) {
          this.gameOver();
          
          console.log("player hit");
          
        }
      
    
      }
}




// aliens landing

Game.prototype.Alienlanded = function () {
  var playerY = this.player.y ;
  var finish= false;
  this.enemies.forEach(function(enemy) {
      /*if ( enemy.live===1){
          finish= playerY.didCollide(enemy);
      }*/
    
    if (( enemy.y >= playerY ) && (enemy.live === 1)) {
      finish=true;
    }
  });
 if(finish) this.gameOver();
}

// player kills all aliens

Game.prototype.Playerwins = function () {
  var victory = 0;

  this.enemies.forEach(function(enemy) {
      
    victory=victory+enemy.live;
  
    });

    if (victory===0) { 
        this.playervictory= true;
        this.gameOver();
    
      }
}


// alien shoots back
  
  Game.prototype.Alienshootsback = function () {

    if ( this.Alienprojectile===null) {  
      
      var randomalienindex = Math.floor(Math.random()*this.enemies.length);

      if (this.enemies[randomalienindex].live===1 ) {
        this.Alienprojectile= new Projectile(this.canvas,this.enemies[randomalienindex].x+22,this.enemies[randomalienindex].y+45,-3);
      }
    }
  }

// gameOver()



Game.prototype.passGameOverCallback = function(gameOver) {
  this.onGameOverCallback = gameOver;
};



Game.prototype.gameOver = function() {
  // flag `gameIsOver = true` stops the loop
  this.gameIsOver = true;
  //console.log('GAME OVER');
  
  // Call the gameOver function from `main` to show the Game Over Screen
  this.onGameOverCallback();
};

//	game.js	 removeGameScreen()

Game.prototype.removeGameScreen = function() {
  this.gameScreen.remove(); // remove() is the DOM method which removes the DOM Node  
};


