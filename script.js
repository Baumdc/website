const block = document.getElementById('block');
const gameContainer = document.getElementById('game-container');
let counter = 0;

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

    checkCollision(); // Check for collision with shapes
});

function checkCollision() {
    const blockRect = block.getBoundingClientRect();

    // Check collision with each shape
    document.querySelectorAll('.shape').forEach((shape) => {
        const shapeRect = shape.getBoundingClientRect();

        if (
            blockRect.left < shapeRect.right &&
            blockRect.right > shapeRect.left &&
            blockRect.top < shapeRect.bottom &&
            blockRect.bottom > shapeRect.top
        ) {
            // Collision detected
            shape.remove();
            counter++;
            updateCounter();
            spawnRandomShape();
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
    document.getElementById('counter').innerText = `Counter: ${counter}`;
}

// Initial setup
spawnRandomShape();
updateCounter();
