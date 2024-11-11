// Install the xlsx library in your Node.js environment by running:
// npm install xlsx

const fs = require('fs');
const XLSX = require('xlsx');

function convertExcelToJson(filePath) {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Start from row 7 (index 6) and get specified columns
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: 6, header: 1 });
    const filteredData = jsonData.map(row => ({
        "D": row[3],   // Column D
        "E": row[4],   // Column E
        "F": row[5],   // Column F
        "G": row[6],   // Column G
        "S": row[18],  // Column S
        "V": row[21],  // Column V
        "AD": row[29], // Column AD
        "AE": row[30], // Column AE
        "AG": row[32]  // Column AG
    })).filter(row => Object.values(row).some(cell => cell !== undefined)); // Remove empty rows

    const jsonString = JSON.stringify(filteredData, null, 2);

    // Write the JSON string to data.json, overwriting if it exists
    fs.writeFileSync('data.json', jsonString, 'utf8');
    console.log("JSON data has been saved to data.json");
}

// Call the function with the path to your Excel file
convertExcelToJson('your-file.xlsx');
