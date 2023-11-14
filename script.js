const block = document.getElementById('block');
const gameContainer = document.getElementById('game-container');
const counterElement = document.getElementById('counter');
const timerElement = document.getElementById('timer');

let counter = 0;
let timer;
let startTime;
let elapsedTime = 0;
const targetShapes = 5; // Change this value to set the number of shapes to interact with
const gameDuration = 30; // Change this value to set the game duration in seconds

block.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    initialX = touch.clientX;
    initialY = touch.clientY;
    blockX = parseFloat(getComputedStyle(block).left);
    blockY = parseFloat(getComputedStyle(block).top);
});

block.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const newX = blockX + touch.clientX - initialX;
    const newY = blockY + touch.clientY - initialY;
    block.style.left = `${newX}px`;
    block.style.top = `${newY}px`;

    checkCollision();

    if (counter >= targetShapes) {
        stopGame();
    }
});

function checkCollision() {
    const blockRect = block.getBoundingClientRect();

    document.querySelectorAll('.shape').forEach((shape) => {
        const shapeRect = shape.getBoundingClientRect();

        if (
            blockRect.left < shapeRect.right &&
            blockRect.right > shapeRect.left &&
            blockRect.top < shapeRect.bottom &&
            blockRect.bottom > shapeRect.top
        ) {
            shape.remove();
            counter++;
            updateCounter();

            if (counter < targetShapes) {
                spawnRandomShape();
            }
        }
    });
}

function spawnRandomShape() {
    const shape = document.createElement('div');
    shape.classList.add('shape');
    shape.style.backgroundColor = getRandomColor();
    shape.style.top = `${Math.random() * (gameContainer.clientHeight - 50)}px`;
    shape.style.left = `${Math.random() * (gameContainer.clientWidth - 50)}px`;

    gameContainer.appendChild(shape);
}

function updateCounter() {
    counterElement.innerText = `Counter: ${counter}`;
}

function startTimer() {
    startTime = Date.now();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerElement.innerText = `Time: ${elapsedTime}s`;

    if (elapsedTime >= gameDuration) {
        stopGame();
    }
}

function stopGame() {
    clearInterval(timer);
    block.removeEventListener('touchstart');
    block.removeEventListener('touchmove');
}

// Initial setup
startTimer();
spawnRandomShape();
updateCounter();
