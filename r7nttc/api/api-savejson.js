// api/api-savejson.js
const express = require('express');
const router = express.Router();

router.post('/save-json', (req, res) => {
    const data = req.body.data; // Access the data sent in the request body

    // Process the data as needed
    console.log('Received data:', data);

    // Send a response back to the client
    res.status(200).json({ message: 'Data saved successfully!' });
});

module.exports = router;