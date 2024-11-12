import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const data = req.body;
            const jsonFile = data.jsonFile;

            if (!jsonFile) {
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            }

            // Save the file to the "uploads" folder
            const uploadPath = path.join(process.cwd(), 'uploads', jsonFile.name);

            fs.promises.mkdir(path.dirname(uploadPath), { recursive: true });

            const buffer = Buffer.from(jsonFile.data);
            await fs.promises.writeFile(uploadPath, buffer);

            return res.status(200).json({ success: true, message: 'File uploaded successfully' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Error uploading file', error: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
