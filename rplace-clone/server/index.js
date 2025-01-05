const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // You can specify your allowed origins here
        methods: ['GET', 'POST']
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('place_pixel', (data) => {
        socket.broadcast.emit('pixel_placed', data);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});