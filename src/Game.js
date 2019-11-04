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

  // Set the canvas to be same as the viewport size
  this.containerWidth = this.canvasContainer.offsetWidth;
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.canvas.setAttribute('width', this.containerWidth);
  this.canvas.setAttribute('height', this.containerHeight);
   
  
  

  // Create new player
  this.player = new Player(this.canvas,3);
  
  // creates enemies
    for (var i=0; i<5; i++){
      var newEnemy = new Enemy(this.canvas, 75*i, 100, 1);
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
        console.log('createsprojecrtile');
        this.projectile= new Projectile(this.canvas,(this.player.x+(this.player.size/2)),this.player.y); 
        console.log(this.projectile);
      }
      
    }
  };

  // Add event listener for moving the player
  
  
  document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
  
  
  // Start the game loop

  this.startLoop();
};


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
    // 4.1 move existing lasers



    // 5. Check if any projectile is going of the screen
    if ( this.projectile!=null) {   
              if ((this.projectile.y + (this.projectile.size / 2)) < 0 ) { this.projectile=null;}
        }

// 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    console.log(this.projectile);
    if ( this.projectile!=null) {
        console.log(this.projectile);
        console.log("update psoition");
        this.projectile.updatePosition ();
        this.projectile.draw();
         
    };
// 3. UPDATE THE CANVAS
    // Draw the player
    this.player.draw();
    
    
    //this.alien1.draw();
    this.enemies.forEach(function(enemy) {
      enemy.draw();
    });

// 4. TERMINATE LOOP IF GAME IS OVER
    
    
    //if gameover then stop loop
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop)
    }
  
   // window.requestAnimationFrame(loop);
  }.bind(this);

  window.requestAnimationFrame(loop);
};

Game.prototype.checkEnemiesScreenCollision = function(){
  var hasCollided = false;
  this.enemies.forEach(function(enemy) {
      enemy.x = enemy.x + enemy.direction * enemy.speed;
        var screenLeft = 0;
        var screenRight = 600;
    
        if ((enemy.x+enemy.size) > screenRight || enemy.x < screenLeft) {
              hasCollided = true;
      
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

