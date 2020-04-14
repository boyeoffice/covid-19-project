const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to my app'
  });
});

module.exports = app;
