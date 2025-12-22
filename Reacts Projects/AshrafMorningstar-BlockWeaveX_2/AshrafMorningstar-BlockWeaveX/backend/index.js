/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// Backend for AshrafMorningstar's BlockWeaveX (API gateway)
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/status', (_, res) => {
  res.json({
    app: 'BlockWeaveX',
    creator: 'AshrafMorningstar',
    status: 'online'
  });
});

app.listen(5001, () => console.log('BlockWeaveX API running on port 5001'));
