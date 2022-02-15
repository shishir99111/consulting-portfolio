const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const path = require('path');
const axios = require('axios');

require('dotenv').config({ path: path.join(__dirname, '/.env') });

const PORT = process.env.PORT;
const INDEX_PATH = './index.html';

app.use(cors());

app.use((req, res, next) => {
  console.log(`--> ${req.method} ${req.path}`);
  next();
});

app.use(express.static(path.join(__dirname, '/../_site')));

app.get('/api/apod', (req, res)=>{
  console.log('Fetching NASA API');
  axios.get('https://api.nasa.gov/planetary/apod?api_key=Se2v4vDZIfaUh1R8CeO4940NxTKNbjQxzPVhst96')
  .then(response => {
    console.log('response.data', response.data);
    res.json(JSON.stringify(response.data))
  })
  .catch((error) => console.log(error));
});

app.get(['/*'], (req, res) => {
  console.log('Index file loading');
  res.sendFile(path.join(__dirname));
});

http.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}, ${process.env.NODE_ENV} ENVIRONMENT.`);
});