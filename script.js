const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const adminMenu = document.getElementById('adminMenu');

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'm') {
        const password = prompt("Enter Admin Password:");
        if (password === "minxex") {
            adminMenu.classList.remove('hidden');
        } else {
            alert("Incorrect password!");
        }
    }
});

// Example drawing function for canvas
function drawPixel(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x, y, 1, 1);
}

// You can add more functionalities like real-time drawing here