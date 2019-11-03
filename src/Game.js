function Game() {
  this.canvas = null;
  this.ctx = null;
  this.alien1 = null;
  //this.enemies = [];
  this.player = null;
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
  // create new enemy
  this.alien1 = new Enemy(this.canvas, 100, 1);
  

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
          this.alien1.updatePosition();

    // 5. Check if any enemy is going of the screen


// 2. CLEAR THE CANVAS
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

// 3. UPDATE THE CANVAS
    // Draw the player
    this.player.draw();
    // Draw the enemies
    this.alien1.draw();

// 4. TERMINATE LOOP IF GAME IS OVER
    
    
    //if gameover then stop loop
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop)
    }
  
   // window.requestAnimationFrame(loop);
  }.bind(this);

  window.requestAnimationFrame(loop);
};
