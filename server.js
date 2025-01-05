const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;
const canvasSize = 50; // Define a canvas size of 50x50 pixels
let pixelData = Array(canvasSize).fill().map(() => Array(canvasSize).fill('white'));

// Middleware for serving static files
app.use(express.static('public'));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('init', pixelData);

    socket.on('placePixel', ({ x, y, color }) => {
        pixelData[y][x] = color;
        io.emit('pixelPlaced', { x, y, color });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Clear canvas route
app.post('/admin/clear', (req, res) => {
    // Admin clearing logic can remain
    pixelData = Array(canvasSize).fill().map(() => Array(canvasSize).fill('white'));
    io.emit('canvasCleared');
    res.send('Canvas cleared successfully.');
});

// Read connected users (optional, if you'd like to implement it)
app.get('/admin/users', (req, res) => {
    const connectedUsers = Array.from(io.sockets.sockets.keys());
    res.json({ users: connectedUsers });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});