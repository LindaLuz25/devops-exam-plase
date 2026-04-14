const express = require('express');
const app = express();
const client = require('prom-client');

// Metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get('/', (req, res) => res.send('Hello DevOps'));
app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(3000, () => console.log('App running on port 3000'));