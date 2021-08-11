// Import Dependencies
const express = require('express');
const path = require('path');
const { handleGET, handlePOST, handleDELETE } = require('./fileSystem');

// Set dependency variables
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

/* API Routes */
// GET Route for /api/notes
app.get('/api/notes', (req, res) => {
  handleGET(req, res);
});

// POST Route for /api/notes
app.post('/api/notes', (req, res) => {
  handlePOST(req, res);
});

// DELETE Route for /api/notes
app.delete('/api/notes/:id', (req, res) => {
  handleDELETE(req, res);
});

// Open port
app.listen(PORT, () => {
  console.log(`Note-taking app listening at http://localhost:${PORT}`)
});