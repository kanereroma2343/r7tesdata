// ... existing code ...
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle success response
        document.getElementById('message').innerText = 'File uploaded successfully!';
    })
    .catch(error => {
        // Handle error response
        document.getElementById('message').innerText = 'Error uploading file.';
    });
});
// ... existing code ...