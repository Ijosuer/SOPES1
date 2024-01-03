// app.js

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola, NO soy Dockerfile Multistage');
});

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
