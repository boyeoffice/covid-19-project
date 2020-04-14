const express = require('express');

const EstimateController = require('./estimateController');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to my app'
  });
});

app.post('/api/v1/on-covid-19', EstimateController.estimator);

app.post('/api/v1/on-covid-19/json', EstimateController.estimator);

module.exports = app;
