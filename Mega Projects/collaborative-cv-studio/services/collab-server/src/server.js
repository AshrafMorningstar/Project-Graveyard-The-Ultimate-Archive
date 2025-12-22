/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

﻿/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */
const { setupWSConnection } = require('y-websocket/bin/utils');
const WebSocket = require('ws');
const http = require('http');

const port = process.env.PORT || 1234;
const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Collab Server Running');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req, { docName: req.url.slice(1).split('?')[0] });
});

server.listen(port, () => {
  console.log(`Collaborative CV Server running on port ${port}`);
});
