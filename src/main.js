'use strict';

// Creates DOM elements from a string representation

function buildDom(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;

  return div.children[0];
}

function main() {
  
  var game; // instance of the Game
  var splashScreen; // Start Screen
  var gameScreen;
  var gameOverScreen;

    
  

  // -- splash screen
  function createSplashScreen() {
    splashScreen = buildDom(`
     <main>
      <h1>Space Invaders project</h1>
      <button>Start Game</button>
     </main>
    `);

    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', function() {
          startGame();
      });
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }
  
  // -- game screen

  function createGameScreen() {
    gameScreen = buildDom(`
      <main class="game">
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
        
        <section class="canvas-container">
          <canvas></canvas>
        </section>
      </main>
   `);

    document.body.appendChild(gameScreen);

    return gameScreen;
  }
  
 
  // setiing game over screen

  function createGameOverScreen(score) {
    gameOverScreen = buildDom(`
    <main>
      <h1>Game over</h1>
      <p>Your score: <span></span></p>
      <button>Restart</button>
    </main>
  `);

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);

    var span = gameOverScreen.querySelector('span');
    span.innerText = score;

    document.body.appendChild(gameOverScreen);
  }

  function removeGameOverScreen() {
    if (gameOverScreen !== undefined) {
        gameOverScreen.remove();
      }
  }



  // -- Setting the game state 

  function startGame() {
    removeSplashScreen();
    removeGameOverScreen();	

    var game = new Game();
    game.gameScreen = createGameScreen();

    game.start();
    // End the game
    game.passGameOverCallback( function() {		// <-- UPDATE
      gameOver(game.score);					// <-- UPDATE
    });
  }

  // main.js		gameOver()

  function gameOver(score) {
    removeGameScreen();
    createGameOverScreen(score);
  }
  
  // removeGameScreen() - inside main()
  
  function removeGameScreen() {
    gameScreen.remove()
  }


  // -- initialize Splash screen on initial start
  createSplashScreen();
}

//window.onload = main;
// Runs the function `main` once all resources are loaded
window.addEventListener('load', main);