const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// Serve the HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Handle saving JSON to a file
app.post('/save-json', (req, res) => {
    const jsonData = req.body;

    // Path to save the data.json file
    const filePath = path.join(__dirname, 'data.json');

    // Write the JSON data to the file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ message: 'Error saving the data' });
        }
        res.status(200).json({ message: 'Data saved successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
