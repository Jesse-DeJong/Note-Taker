// Import dependencies
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');



// Function to read the data in the JSON DB
function readFromFile() {
    // Return a promise containing the data if successful
    return new Promise((resolve, reject) => {
        // Read the db.json file at the relative directory
        fs.readFile(path.join(__dirname, '/db/db.json'), (error, data) => 
        error ? reject(console.error(error)) : resolve(JSON.parse(data)));
        // Ternery operator to resolve the promise with parsed data
    });
}

// Function to write the data to the JSON DB
function writeToFile(req, res, stringifiedData) {
    // Return a promise containing the data if successful
    fs.writeFile(path.join(__dirname, '/db/db.json'), stringifiedData, (error) =>
    error ? console.error(error) : console.log(`Successfully updated DB with --- ${req.body.id}`));
    // Ternery operator to announce the failure/success of the write
}



// Function to handle GET request
const handleGET = async (req, res) => {
    try { // Await the promise resolution
        const data = await readFromFile()
        // Return the data from the server as JSON
        res.json(data);
    // Catch and log any errors
    } catch (error) {
        console.error(error);
    // Log to the console that the operation was completed and its origin
    } finally {
        console.log(`\nRead file initiated by /api/notes`);
    }
}



// Helper function to process the update
function updateFilePOST (req, res, currentData) {
    // Generate and append a unique ID
    req.body.id = uuidv4();
    // Push the new data with the new ID to the end of the DB array
    currentData.push(req.body);
    // Stringify the updated object to be written back to the file
    const stringifiedData = JSON.stringify(currentData);
    // Call the write function
    writeToFile(req, res, stringifiedData);
}

// Function to handle POST requests
const handlePOST = async (req, res) => {
    try { // Await the promise resolution with the current DB files
        const currentData = await readFromFile()
        // Call function to handle the update
        updateFilePOST(req, res, currentData)
        // Respond to the client with a changes made code
        res.status(201).send(`Successfully updated DB with --- ${req.body.id}`)
    } catch (error) {
        console.error(error);
    }
}


// Helper function to process the deletion
function updateFileDELETE (req, res, currentData) {
    // Establish the ID of the note to be deleted
    const deletionID = req.params.id;
    // Splice the remaining array back together
    const removeIndex = currentData.map(item => item.id).indexOf(deletionID);
    ~removeIndex && currentData.splice(removeIndex, 1);
    // Stringify the updated object to be written back to the file
    const stringifiedData = JSON.stringify(currentData);
    // Call the write function
    writeToFile(req, res, stringifiedData);
}

// Function to handle DELETE requests
const handleDELETE = async (req, res) => {
    try { // Await the promise resolution with the current DB files
        const currentData = await readFromFile()
        // Call function to handle the update
        updateFileDELETE(req, res, currentData)
        // Respond to the client with a changes made code
        res.status(204).send(`Successfully deleted ${req.body.id} from DB`)
    } catch (error) {
        console.error(error);
    }
}

// Export functions to server.js
module.exports = { handleGET, handlePOST, handleDELETE };