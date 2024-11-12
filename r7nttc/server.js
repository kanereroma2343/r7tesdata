// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the upload.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'));
});

// Endpoint to handle JSON file upload
app.post('/update-data', (req, res) => {
    const jsonData = req.body;

    // Write the JSON data to data.json
    fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Error updating data.');
        }
        res.send('Data updated successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});