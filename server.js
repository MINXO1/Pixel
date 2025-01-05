const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Initialize pixel canvas (1000x1000 pixels)
const canvasSize = 1000; 
let pixelData = Array(canvasSize).fill().map(() => Array(canvasSize).fill('white'));
const cooldown = 10000; // 10 seconds
const lastPlaced = {};

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('init', pixelData);

    socket.on('placePixel', ({ x, y, color }) => {
        const currentTime = Date.now();
        const userId = socket.id;

        if (!lastPlaced[userId] || currentTime - lastPlaced[userId] > cooldown) {
            lastPlaced[userId] = currentTime;

            if (x >= 0 && x < canvasSize && y >= 0 && y < canvasSize) {
                pixelData[y][x] = color;
                io.emit('pixelPlaced', { x, y, color });
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});