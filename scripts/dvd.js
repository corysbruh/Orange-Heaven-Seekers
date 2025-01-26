const overlay = document.getElementById('dvd-overlay');
const image = document.getElementById('bouncing-image');

// Set initial position, direction, and rotation
let x = 0;
let y = 0;
let dx = 4; // speed in the X direction
let dy = 4; // speed in the Y direction
let rotation = 0; // initial rotation angle

function moveImage() {
    const overlayWidth = overlay.offsetWidth;
    const overlayHeight = overlay.offsetHeight;

    // Check boundaries and reverse direction when hitting them
    if (x + image.offsetWidth > overlayWidth || x < 0) {
        dx = -dx;
    }
    if (y + image.offsetHeight > overlayHeight || y < 0) {
        dy = -dy;
    }

    // Move the image
    x += dx;
    y += dy;

    // Rotate the image (increase the angle)
    rotation += 2; // Increase by 2 degrees per frame

    // Apply position and rotation using CSS transform
    image.style.left = x + 'px';
    image.style.top = y + 'px';
    image.style.transform = `rotate(${rotation}deg)`; // Apply the rotation

    requestAnimationFrame(moveImage); // Keep animating
}

const button = document.getElementById('create-table-btn');

// Event listener for button click
button.addEventListener('click', function() {
    // Remove the "remove-class" class from the overlay
    overlay.classList.remove('hidden');
    moveImage();
    // // Optionally show the overlay
    // overlay.style.display = 'block'; // Show the overlay
});