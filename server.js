const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.writeHead(2000, {'content-type' : 'text/html'});
    res.end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
