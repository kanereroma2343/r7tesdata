const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Determine the path to the data.json file in the r7nttc directory
            const filePath = path.join(process.cwd(), 'r7nttc', 'data.json');

            // Get JSON data from the request body
            const jsonData = req.body;

            // Write the JSON data to the data.json file
            await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

            // Respond with a success message
            res.status(200).json({ message: 'Data updated successfully!' });
        } catch (error) {
            console.error('Error updating data.json:', error);
            res.status(500).json({ message: 'Error updating data.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
