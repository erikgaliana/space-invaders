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
     <main class="opening">
     <div class="openingcontent">
     <img src="../images/logo.png"  alt="SPACE INVADERS" width="400" height="auto">
      <h1>Project</h1>
      <h2>Invasion incoming</h2>
      <button>Start Game</button>
      </div>
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
        
        <section class="canvas-container">
          <canvas></canvas>
        </section>
      </main>
   `);

    document.body.appendChild(gameScreen);

    return gameScreen;
  }
  
 
  // setiing game over screen

  function createGameOverScreen(score,victory) {
    if (!victory){
    gameOverScreen = buildDom(`
    <main class="opening">
    <div class="openingcontent">
      <h1>Game over</h1>
      <p>Your score: <span></span></p>
      <button>Restart</button>
      </div>
      </main>
  `);} else {
    gameOverScreen = buildDom(`
    <main class="opening">
    <div class="openingcontent">
      <h1>YOU WIN</h1>
      <h2>congratulations</h2>
      <p>Your score: <span></span></p>
      <button>Restart</button>
      </div>
      </main>
      `);} 

  



     // console.log("player victory"+victory);
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
      gameOver(game.score, game.playervictory);					// <-- UPDATE
    });
  }

  // main.js		gameOver()

  function gameOver(score,victory) {
    removeGameScreen();
    createGameOverScreen(score,victory);
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