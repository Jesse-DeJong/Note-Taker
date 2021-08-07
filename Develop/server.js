// Import Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');

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
  fs.readFile(path.join(__dirname, '/db/db.json'), (error, data) =>
  error ? console.error(error) : res.json(JSON.parse(data))
  );
});

// POST Route for /api/notes
app.post('/api/notes', (req, res) => {

  // Read the current DB file and save it (parsed) to a variable
  fs.readFile(path.join(__dirname, '/db/db.json'), (error, data) => {
    if (error) {
      throw error;
    }  
    const currentFile = JSON.parse(data); 
    // Call a function to append the new data
    updateJSONdb(currentFile);
  });
  
  // Push the new data into the array from the db JSON file
  function updateJSONdb (currentFile) {
    currentFile.push(req.body);
    // Stringify the object to be written back to the file
    const stringCurrentFile = JSON.stringify(currentFile);

    // Write the updated and stringified file back to db.json
    fs.writeFile(path.join(__dirname, '/db/db.json'), stringCurrentFile, (err) =>
    err ? console.error(err) : console.log(`Successfully updated file with Title ${req.body.title} and Text ${req.body.text}`)
    );
  };

});

// Open port
app.listen(PORT, () => {
  console.log(`Note-taking app listening at http://localhost:${PORT}`)
});