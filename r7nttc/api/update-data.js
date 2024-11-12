// api/update-data.js
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Path to the data.json file
            const filePath = path.join(process.cwd(), 'data.json');
            
            // Write JSON data to the file
            await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));

            res.status(200).json({ message: 'Data updated successfully' });
        } catch (error) {
            console.error('Error updating data.json:', error);
            res.status(500).json({ error: 'Error updating data.json' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
