document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadForm = document.getElementById('uploadForm');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const status = document.getElementById('status');

    // Drag and drop handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#4CAF50';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#ccc';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFile(files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        if (file) {
            handleFile(file);
        }
    });

    async function handleFile(file) {
        try {
            status.textContent = 'Converting...';
            progressBar.style.display = 'block';
            progress.style.width = '50%';

            // Read the file using FileReader
            const reader = new FileReader();
            
            reader.onload = function(e) {
                try {
                    // Convert the Excel data to JSON using XLSX
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    
                    // Get the first worksheet
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    
                    // Convert to JSON
                    const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                    
                    progress.style.width = '100%';
                    status.textContent = 'Conversion successful!';

                    // Download the JSON file
                    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = file.name.replace(/\.[^/.]+$/, '') + '.json';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                } catch (error) {
                    console.error('Error:', error);
                    status.textContent = 'Error: Conversion failed';
                    progress.style.width = '0%';
                }
            };

            reader.onerror = function() {
                status.textContent = 'Error: Failed to read file';
                progress.style.width = '0%';
            };

            // Read the file as array buffer
            reader.readAsArrayBuffer(file);

        } catch (error) {
            console.error('Error:', error);
            status.textContent = 'Error: ' + error.message;
            progress.style.width = '0%';
        }
    }
}); 