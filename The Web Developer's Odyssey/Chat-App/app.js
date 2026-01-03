/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const { log } = require('console');
const express = require('express');
const path=require('path');
const app = express();
const PORT = process.env.port || 3000;
const server=app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}
)
const io=require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

let socketsConnected=new Set();

io.on('connection', onConnected);
 

function onConnected(socket){
    socketsConnected.add(socket.id);
    io.emit("clients-total", socketsConnected.size);
    socket.on('disconnect', () => {
    console.log("Socket disconnected: " + socket.id);
    socketsConnected.delete(socket.id);
    io.emit("clients-total", socketsConnected.size);
    })

    socket.on('message', (data) => {
        // console.log(data);
        socket.broadcast.emit('chat-message', data);
    })

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data);
    })
}

