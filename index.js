const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// io = require('socket.io')(httpServer, {
//     cors: {
//         origin: '*',
//     }
// });


const { Server } = require("socket.io");
const io = new Server(server, {
    allowEIO3: true,
    cors: {
        origin: 'http://localhost:3000',
        allowedHeaders: ["cors-custom-header"],
        credentials: true
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
app.get('/new-message', (req, res) => {
    const message = req.query.message?req.query.message:'empty';
    console.log('/new-message : '+message);
    
    io.emit('newMessage',{
        text: message
    })
    res.send(`<h1>New message :${message} - sended</h1>`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('hi');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // setInterval(() => {
    //     io.emit('newMessage',{
    //         text: 'test'
    //     })
    // },3000);
});



server.listen(5000, () => {
    console.log('listening on *:5000');
});
