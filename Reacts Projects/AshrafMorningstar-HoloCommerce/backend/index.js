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

const products = [
  { id: 1, name: 'Neon Watch', price: 120, model: 'watch.glb' },
  { id: 2, name: 'Holographic Shoes', price: 250, model: 'shoes.glb' }
];

app.get('/api/products', (_, res) => {
  res.json(products);
});

app.listen(5003, () => console.log('HoloCommerce API running on port 5003'));
