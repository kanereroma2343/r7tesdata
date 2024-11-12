const express = require('express');
const app = express();
const apiSaveJson = require('./api/api-savejson');

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api', apiSaveJson); // Use the router for API routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});