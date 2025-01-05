// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 4000;

app.use(express.static('public'));

// Track pixel placements
let pixelData = Array(120).fill().map(() => Array(120).fill('white'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Send current pixel data to the newly connected client
    socket.emit('init', pixelData);

    // Listen for pixel placement events
    socket.on('placePixel', ({ x, y, color }) => {
        // Update pixel data
        pixelData[y][x] = color;
        // Broadcast the updated pixel data to all clients
        io.emit('pixelPlaced', { x, y, color });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});