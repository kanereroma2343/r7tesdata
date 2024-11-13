// server.js (or your server file)
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/saveData', (req, res) => {
    const newData = req.body.data;

    fs.writeFile('data.json', newData, (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.send('Data modified successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});