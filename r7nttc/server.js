const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static('public'));

app.post('/convert', upload.single('excelFile'), (req, res) => {
    try {
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        res.json(jsonData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});