document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const message = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            message.textContent = 'Please select a file.';
            message.className = 'mt-4 text-center text-red-500';
            return;
        }

        if (file.name !== 'data.json') {
            message.textContent = 'Please select a file named data.json.';
            message.className = 'mt-4 text-center text-red-500';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                message.textContent = 'File uploaded successfully!';
                message.className = 'mt-4 text-center text-green-500';
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            message.textContent = 'Error uploading file. Please try again.';
            message.className = 'mt-4 text-center text-red-500';
        }
    });
});