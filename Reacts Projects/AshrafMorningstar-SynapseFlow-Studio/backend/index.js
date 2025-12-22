/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const express = require('express');
const app = express();
app.use(express.json());

let workflows = [];

app.post('/api/workflows', (req, res) => {
  workflows.push(req.body);
  res.json({ status: 'saved', data: req.body });
});

app.get('/api/workflows', (_, res) => {
  res.json(workflows);
});

app.listen(5002, () => console.log('SynapseFlow API running on port 5002'));
