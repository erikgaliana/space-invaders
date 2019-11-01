# space-invaders Project


## Description

Space invaders project consists in a javascript version of 80's famous ZX Spectrum's game. 

Game screen displays a laser cannon which the player controls by moving it horizontally across the bottom of the screen and firing at descending aliens. The aim is to defeat a row of aliens while they advance toward the bottom of the screen. 

The player defeats an alien and earns points by shooting it with the laser cannon. Defeating all the aliens on-screen brings  to win the game.

If Aliens reach the bottom, the alien invasion is declared successful and the game ends. 

## MVP (DOM - CANVAS)
MVP definition, deliverables.

Splash Screen

Game screen consisting of : 
  -	1 Row of 4 descending Aliens
  -	1 Laser canon moving left and right.
  -	Laser cannon fires “laser projectiles” to Aliens.
  -	Laser projectiles destroy aliens if they collide.
  -	Game is won if player destroys all aliens.
  -	Game is lost if Aliens reach bottom.

Game Over / Win screen.


## Backlog

  - More rows of aliens.
  - Aliens can shot back.
  - Ad barriers.


## Data structure
Classes and methods definition.


### game.js
```
Game(){
        this.canvas;
}

Game.prototype.startLoop(){
}

Game.prototype.checkCollisions{
}

Game.prototype.CheckIfFullLine{
}

Game.prototype.updateLevel{
}

Game.prototype.checkOverFlow = function(){
}


Game.prototype.clearCanvas = function(){
}

Game.prototype.updateCanvas = function(){
}

Game.prototype.drawCanvas = function(){ 
}

Game.prototype.setGameOver = function(){
}
```

### player.js
```
constructplayer(){
  this.x;
  this.y;
  this.size;
  this.direction;
  this.speed; 
  this.color;
}

player.prototype.draw{
}

player.prototype.setDirection(){
}

player.prototype.move(){
}

player.prototype.fire(){
}

```


### enemies.js
```
constructenemies(){
  this.x;
  this.y;
  this.size;
  this.direction;
  this.speed; 
  this.color;
}

player.prototype.draw{
}

player.prototype.setDirection(){
}

player.prototype.goDown(){
}

player.prototype.fire(){
}

```
### projectiles.js
```
constructplayer(){
  this.x;
  this.y;
  this.size;
  this.direction;
  this.speed; 
  this.color;
}

player.prototype.draw{
}

player.prototype.setDirection(){
}

player.prototype.move(){
}

player.prototype.fire(){
}

```

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- ¿gameScreen?
- gameoverScreen
- winScreen

## States y States Transitions
```
- splashScreen()
  - buildSplash()
  - addEventListener(startGame)
  
  
- starGame()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - buildGameOver()
  - addEventListener(startGame) 


- gameWin()
  - buildGameWin()
  - addEventListener(startGame) 
  
```


## Task
Task definition in order of priority
- Main - buildDom
- Main - buildSplashScreen
- Main - addEventListener
- Main - buildGameScreen
- Main - buildGameOverScreen
- Game - buildCanvas
- Game - clearCanvas
- Game - updateCanvas
- Game - drawCanvas
- Game - setGameOver
- Game - collision
- Game - addEventListener
- enemies - create 
- enemies - goDown

- Game - checkGameover
- movingSquare - setDirection
- movingSquare - Rush
- movingSquare - SelectRandomSize

## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
