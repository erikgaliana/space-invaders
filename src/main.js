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
  var resultlevel =4;
    
  

  // -- splash screen
  function createSplashScreen() {
    removeGameOverScreen() ;
    splashScreen = buildDom(`
     <main class="opening">
     <div class="openingcontent">
     <img src="./images/logo.png"  alt="SPACE INVADERS" width="400" height="auto">
      <h1>Project</h1>
      <h3>Prepare for Invasion</h3>
      <select id="mySelect">
      <option value="1">1 Aliens Rows</option>
      <option value="2">2 Aliens Rows</option>
      <option value="3">3 Aliens Rows</option>
      <option value="4">4 Aliens Rows</option>
    </select> 
      <button>Start Game</button>
      </div>
     </main>
    `);

    document.body.appendChild(splashScreen);
    
    var level = document.getElementById("mySelect");
    
    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener('click', function() {
      
          resultlevel = Number(level.options[level.selectedIndex].value)+1;
       
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
  `);} 
  else {
    gameOverScreen = buildDom(`
    <main class="opening">
    <div class="openingcontent">
      <h1>YOU WIN</h1>
      <h2>congratulations</h2>
      <p>Your score: <span></span></p>
      <button>Restart</button>
      </div>
      </main>
      `);
      
  } 

    
    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', restartgame);
    

    var span = gameOverScreen.querySelector('span');
    span.innerText = score;

    document.body.appendChild(gameOverScreen);
    
  }

  function removeGameOverScreen() {
    if (gameOverScreen !== undefined) {
        gameOverScreen.remove();
      }
  }

  function restartgame (){
    removeGameOverScreen();
    createSplashScreen();
  }

  // -- Setting the game state 

  function startGame() {
    removeSplashScreen();
    removeGameOverScreen();	

    var game = new Game();
    game.gameScreen = createGameScreen();
    game.GameLEvel= resultlevel;
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