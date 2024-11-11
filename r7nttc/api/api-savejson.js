// /api/save-json.js
import { promises as fs } from 'fs';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { data } = req.body;

            // Save the data to a JSON file
            await fs.writeFile('/tmp/data.json', JSON.stringify(data, null, 2));

            return res.status(200).json({ message: 'Data saved successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error saving data' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
};
