const gameContainer = document.querySelector('.game-container');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');

const gridSize = 20;
var snakeSpeed = 150;
let snakeX = 10;
let snakeY = 10;
let foodX = 15;
let foodY = 15;
let snakeXSpeed = 1;
let snakeYSpeed = 0;
const snakeTrail = [];
let tailLength = 5;
let score = 0;
let gameTimeout;

function resetGame() 
{
  score = 0;
  snakeX = 10;
  snakeY = 10;
  snakeXSpeed = 1;
  snakeYSpeed = 0;
  tailLength = 5;
  snakeTrail.length = 0;
  snakeSpeed = 150 ; 
  

  const oldSegments = document.querySelectorAll('.snake-segment');
  oldSegments.forEach((segment) => {
    gameContainer.removeChild(segment);
  });

  if (gameTimeout) {
    clearTimeout(gameTimeout); 
  }

  updateGame();
  document.getElementById("score").innerHTML ="Score : "+ score  ; 
}

function updateGame() {
  snakeX += snakeXSpeed;
  snakeY += snakeYSpeed;

  if (snakeX < 0 || snakeX >= gridSize || snakeY < 0 || snakeY >= gridSize) {
    alert('Game over!');
    resetGame();
  }

  if (snakeX === foodX && snakeY === foodY) {
    tailLength++;
    foodX = Math.floor(Math.random() * gridSize);
    foodY = Math.floor(Math.random() * gridSize);
    snakeSpeed+= Math.floor(score/10); 
    score++; 
    document.getElementById("score").innerHTML ="Score : "+ score  ; 
    console.log(snakeSpeed) ;
  }

  snakeTrail.push({ x: snakeX, y: snakeY });

  while (snakeTrail.length > tailLength) {
    snakeTrail.shift();
  }

  for (let i = 0; i < snakeTrail.length - 1; i++) {
    if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
      alert('Game over!');
      resetGame();
      return;
    }
  }

  for (let i = 0; i < snakeTrail.length; i++) {
    const segment = document.getElementById(`segment-${i}`);
    if (!segment) 
    {
      const newSegment = document.createElement('div');
      newSegment.className = 'snake-segment';
      newSegment.id = `segment-${i}`;
      gameContainer.appendChild(newSegment);
    }
    const segmentX = snakeTrail[i].x * gridSize;
    const segmentY = snakeTrail[i].y * gridSize;
    document.getElementById(`segment-${i}`).style.left = segmentX + 'px';
    document.getElementById(`segment-${i}`).style.top = segmentY + 'px';
  }

  snakeElement.style.left = snakeX * gridSize + 'px';
  snakeElement.style.top = snakeY * gridSize + 'px';
  foodElement.style.left = foodX * gridSize + 'px';
  foodElement.style.top = foodY * gridSize + 'px';

  gameTimeout = setTimeout(updateGame, snakeSpeed); 
}

updateGame();

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (snakeYSpeed !== 1) {
        snakeXSpeed = 0;
        snakeYSpeed = -1;
      }
      break;
    case 'ArrowDown':
      if (snakeYSpeed !== -1) {
        snakeXSpeed = 0;
        snakeYSpeed = 1;
      }
      break;
    case 'ArrowLeft':
      if (snakeXSpeed !== 1) {
        snakeXSpeed = -1;
        snakeYSpeed = 0;
      }
      break;
    case 'ArrowRight':
      if (snakeXSpeed !== -1) {
        snakeXSpeed = 1;
        snakeYSpeed = 0;
      }
      break;
  }
});
