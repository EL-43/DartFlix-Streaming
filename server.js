require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./db');
const Film = require('./models/Film');

// app
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.writeHead(2000, {'content-type' : 'text/html'});
    res.end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
