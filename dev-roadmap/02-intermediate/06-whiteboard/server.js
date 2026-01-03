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
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Real-Time Collaborative Whiteboard
 */

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static assets from current directory
app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Receive drawing data
    socket.on('draw', (data) => {
        // Broadcast to everyone ELSE
        socket.broadcast.emit('draw', data);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Whiteboard Server running on http://localhost:${PORT}`);
    console.log(`Open this URL in multiple tabs to test collaboration!`);
});
