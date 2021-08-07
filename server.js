// Import Dependencies
const fs = require('fs');
const express = require('express');

// Set dependency variables
const app = express();
const PORT = process.env.PORT || 8080;

// Return static HTML assets
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
  console.log(`Note-taking app listening at http://localhost:${PORT}`)
})