// Get the block element
const block = document.getElementById('block');

// Variables to store initial touch position and block position
let initialX, initialY, blockX, blockY;

// Event listener for touchstart
block.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    initialX = touch.clientX;
    initialY = touch.clientY;
    blockX = parseFloat(getComputedStyle(block).left);
    blockY = parseFloat(getComputedStyle(block).top);
});

// Event listener for touchmove
block.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent default touch behavior (scrolling, zooming, etc.)
    const touch = e.touches[0];

    // Calculate new block position based on initial touch position
    const newX = blockX + touch.clientX - initialX;
    const newY = blockY + touch.clientY - initialY;

    // Update block position
    block.style.left = `${newX}px`;
    block.style.top = `${newY}px`;
});

