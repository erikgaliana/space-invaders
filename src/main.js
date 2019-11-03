function buildDom(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;

  return div.children[0];
}

function main() {
  var splashScreen;

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
    var gameScreen = buildDom(`
      <main class="game">
        
        <section class="canvas-container">
          <canvas></canvas>
        </section>
      </main>
   `);

    document.body.appendChild(gameScreen);

    return gameScreen;
  }
  
  // -- Setting the game state 

  function startGame() {
    removeSplashScreen();

    var game = new Game();
    game.gameScreen = createGameScreen();

    game.start();
  }

  // -- initialize Splash screen on initial start
  createSplashScreen();
}

window.onload = main;
