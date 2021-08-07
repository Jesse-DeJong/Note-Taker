// Import Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');

// Set dependency variables
const app = express();
const PORT = process.env.PORT || 8080;

// Return static HTML assets
app.use(express.static('public'));

/* HTML GET Routes */
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

/* API GET Routes */
// GET Route for /api/notes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '/db/db.json'), (error, data) =>
  error ? console.error(error) : res.json(JSON.parse(data))
  );
});

// Open port
app.listen(PORT, () => {
  console.log(`Note-taking app listening at http://localhost:${PORT}`)
});