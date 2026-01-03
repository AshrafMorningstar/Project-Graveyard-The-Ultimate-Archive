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
 * Project: Real-Time Competitive Coding Arena
 */

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { VM } = require('vm2'); // Secure sandbox

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Mock Problem Database
const PROBLEM = {
    id: 1,
    functionName: "twoSum",
    testCases: [
        { args: [[2,7,11,15], 9], expected: [0,1] },
        { args: [[3,2,4], 6], expected: [1,2] },
        { args: [[3,3], 6], expected: [0,1] }
    ]
};

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log(`Contestant joined: ${socket.id}`);

    // Opponent Progress Mock
    socket.on('typing', () => {
        socket.broadcast.emit('opponent_update', { status: 'Typing...' });
    });

    socket.on('submit_code', (code) => {
        console.log(`Code received from ${socket.id}`);
        // socket.broadcast.emit('opponent_update', { status: 'Submitted!' }); // Notify opponent

        try {
            const vm = new VM({
                timeout: 1000,
                sandbox: {}
            });

            // 1. Inject User Code
            vm.run(code);

            // 2. Run Test Cases
            let passed = 0;
            const results = [];

            PROBLEM.testCases.forEach((test, i) => {
                // Construct function call: twoSum([2,7...], 9)
                const argsStr = test.args.map(a => JSON.stringify(a)).join(',');
                const runScript = `${PROBLEM.functionName}(${argsStr})`;
                
                try {
                    const output = vm.run(runScript);
                    const isCorrect = JSON.stringify(output) === JSON.stringify(test.expected);
                    
                    if(isCorrect) passed++;
                    results.push({
                        case: i+1,
                        passed: isCorrect,
                        input: argsStr,
                        expected: JSON.stringify(test.expected),
                        actual: JSON.stringify(output)
                    });
                } catch(err) {
                    results.push({ case: i+1, passed: false, error: err.message });
                }
            });

            const success = passed === PROBLEM.testCases.length;
            socket.emit('result', { success, passed, total: PROBLEM.testCases.length, details: results });
            
            if(success) {
                io.emit('game_over', { winner: socket.id });
            }

        } catch (e) {
            socket.emit('result', { success: false, error: "Syntax/Runtime Error: " + e.message });
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Coding Arena Server running on http://localhost:${PORT}`);
    console.log(`NOTE: Requires 'vm2' package: npm install vm2 express socket.io`);
});
