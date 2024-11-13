import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disables default body parsing
  },
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const uploadsDir = path.join(process.cwd(), 'uploads');

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = uploadsDir;
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'File upload error' });
    }

    const uploadedFile = files.file;

    // Check if the file is a JSON file
    if (uploadedFile.mimetype !== 'application/json') {
      return res.status(400).json({ message: 'Only JSON files are allowed' });
    }

    // Move the file to the uploads folder with its original name
    const newFilePath = path.join(uploadsDir, uploadedFile.originalFilename);
    fs.renameSync(uploadedFile.filepath, newFilePath);

    res.status(200).json({ message: 'File uploaded successfully' });
  });
};
