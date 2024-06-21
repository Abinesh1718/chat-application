const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

//To allow the orgin requst

const io = socketIo(server, {
    cors: {
        origin: "*",
    }
});


app.get('/', (req, res) => {
    res.send('Server is running');
});


// To make the socket connection
io.on('connection', (socket) => {
    console.log('connected');

    // To join the room connection
    socket.on('join room', (room) => {
        socket.join(room);
        console.log(`Client joined room: ${room}`);
    });

    // To emit the chat with room 

    socket.on('chat message', ({ room, message }) => {
        io.to(room).emit('message', message);
    });


    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


// To listen the sever 
server.listen(4000, () => {
    console.log("Server is listening on port 4000");
});

