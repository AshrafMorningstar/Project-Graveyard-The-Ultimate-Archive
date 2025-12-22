/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// API server for AshrafMorningstar's NeuroForge OS
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/system/info', (req, res) => {
  res.json({
    user: 'AshrafMorningstar',
    system: 'NeuroForge OS',
    uptime: process.uptime(),
    status: 'running'
  });
});

app.listen(5000, () => console.log('NeuroForge OS API running on port 5000'));
