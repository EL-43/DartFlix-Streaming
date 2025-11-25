require('dotenv').config();
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const { title } = require('process');
//const sequelize = require('./db');

//const Film = require('./models/Film');

// app
const app = express();
const port = 3000;

app.use(express.json());

const posts = [
  {
    username: 'kyle',
    title: 'post 1'
  },
  {
    username: 'jim',
    title: 'post2'
  }
]


app.get('/posts', authenticateToken, (req, res)=>{

  res.json(posts.filter(post => post.username === req.user.name));
})

function authenticateToken (req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/', (req, res) => {
    res.writeHead(200, {'content-type' : 'text/html'});
    res.end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
