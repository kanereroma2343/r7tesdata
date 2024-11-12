// Import required modules
const fs = require('fs');
const path = require('path');

// Define the API handler function
export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method === 'POST') {
        try {
            // Define the path to the data.json file
            const filePath = path.join(process.cwd(), 'data.json');
            
            // Get JSON data from the request body
            const jsonData = req.body;

            // Write the JSON data to the data.json file
            await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

            // Send a success response
            res.status(200).json({ message: 'Data updated successfully!' });
        } catch (error) {
            console.error('Error updating data.json:', error);
            res.status(500).json({ message: 'Error updating data.' });
        }
    } else {
        // If the request method is not POST, return a 405 Method Not Allowed response
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
