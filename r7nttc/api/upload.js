import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false, // Disable body parsing for file uploads
    },
};

export default function handler(req, res) {
    const form = formidable({ uploadDir: './uploads', keepExtensions: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: 'File upload error' });
        }

        const uploadedFile = files.file;

        // Move the file to the uploads folder
        const newFilePath = path.join('./uploads', uploadedFile.originalFilename);
        fs.rename(uploadedFile.filepath, newFilePath, (renameError) => {
            if (renameError) {
                return res.status(500).json({ message: 'Error moving the file' });
            }
            // Redirect to upload.html with a success query parameter
            res.writeHead(302, { Location: '/upload.html?success=true' });
            res.end();
        });
    });
}