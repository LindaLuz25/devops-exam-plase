const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send("Hello DevOps 🚀");
});


// Añade esto en tu index.js para que sea más claro
app.get('/health', (req, res) => {
  console.log("Health check received");
  res.status(200).send("OK");
});

// Para simular fallo
app.get('/fail', (req, res) => {
  res.status(500).send("FAIL");
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});