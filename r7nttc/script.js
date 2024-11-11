function processExcelFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Define the columns we want to extract
        const columnsToExtract = {
            'D': true, 'E': true, 'F': true, 'G': true, 
            'S': true, 'V': true, 'AD': true, 'AE': true, 'AG': true
        };
        
        const jsonData = [];
        const range = XLSX.utils.decode_range(firstSheet['!ref']);
        
        // Start from row 7
        for (let row = 7; row <= range.e.r; row++) {
            const rowData = {};
            
            // Process only specified columns
            for (let col in columnsToExtract) {
                const cellAddress = col + row;
                const cell = firstSheet[cellAddress];
                if (cell) {
                    rowData[col] = cell.v; // .v contains the value
                }
            }
            
            // Only add row if it contains data
            if (Object.keys(rowData).length > 0) {
                jsonData.push(rowData);
            }
        }

        // Convert to JSON string
        const jsonString = JSON.stringify(jsonData, null, 2);
        
        // Create and trigger download
        downloadJSON(jsonString, 'converted_data.json');
    };

    reader.readAsArrayBuffer(file);
}

function downloadJSON(jsonString, filename) {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        processExcelFile(file);
    }
}); 