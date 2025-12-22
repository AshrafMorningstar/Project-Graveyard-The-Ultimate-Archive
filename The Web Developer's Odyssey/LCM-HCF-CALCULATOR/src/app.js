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

const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

const filePath = path.join(__dirname, "../");
app.use(express.static(filePath));

app.listen(port, () => {
    console.log(`Listening on port number ${port}`);
})