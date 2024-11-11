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

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            status.textContent = `File selected: ${files[0].name}`;
        }
    });

    // Form submission handler
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const file = fileInput.files[0];
        
        if (!file) {
            status.textContent = 'Please select a file first.';
            return;
        }

        const formData = new FormData();
        formData.append('excelFile', file);

        try {
            progressBar.style.display = 'block';
            status.textContent = 'Converting...';

            const response = await fetch('/convert', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Conversion failed');
            }

            const jsonData = await response.json();
            
            // Create and trigger download of JSON file
            const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name.replace(/\.[^/.]+$/, '') + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            status.textContent = 'Conversion completed! File downloaded.';
            progress.style.width = '100%';
        } catch (error) {
            status.textContent = 'Error: ' + error.message;
        }
    });

    // File input change handler
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            status.textContent = `File selected: ${file.name}`;
        }
    });
});