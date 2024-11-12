// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload'); // Save to 'upload' folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original file name
    }
});

const upload = multer({ storage: storage });

// Serve static files (HTML)
app.use(express.static(__dirname));

// Handle file upload
app.post('/upload', upload.single('jsonFile'), (req, res) => {
    res.send('File uploaded successfully!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});