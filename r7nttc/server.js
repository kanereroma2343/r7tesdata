// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('jsonFile'), (req, res) => {
    // Check if a file was uploaded
    if (req.file) {
        const filePath = req.file.path;
        const fileType = req.file.mimetype;

        // Check if the file is a JSON file
        if (fileType === 'application/json') {
            // Read the content of the uploaded JSON file
            fs.readFile(filePath, 'utf8', (err, jsonData) => {
                if (err) {
                    return res.status(500).send("There was an error reading the file.");
                }

                // Validate JSON
                try {
                    JSON.parse(jsonData);
                    // Write to data.json
                    fs.writeFile('data.json', jsonData, (err) => {
                        if (err) {
                            return res.status(500).send("There was an error updating the data.json file.");
                        }
                        res.send("File uploaded successfully, and data.json has been updated.");
                    });
                } catch (e) {
                    res.status(400).send("The uploaded file is not a valid JSON file.");
                }
            });
        } else {
            res.status(400).send("Please upload a valid JSON file.");
        }
    } else {
        res.status(400).send("No file was uploaded or there was an error uploading the file.");
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});