import fetch from 'node-fetch';  // Ensure to install 'node-fetch' in Node.js environment

// Replace this with your actual GitHub token
const token = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN'; 

// GitHub API endpoint for accessing file metadata and updating content
const owner = 'kanereroma2343';  // Your GitHub username
const repo = 'r7tesdata';        // Your repository name
const filePath = 'r7nttc/data.json';  // Path to the file in your repo

// Fetch the data from the raw GitHub file URL
const fileUrl = `https://raw.githubusercontent.com/kanereroma2343/r7tesdata/refs/heads/main/r7nttc/data.json`;

async function updateDataOnGitHub(jsonData) {
    try {
        // Step 1: Get the current file's metadata (including SHA)
        const metadataUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
        const fileResponse = await fetch(metadataUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
            }
        });
        
        const fileData = await fileResponse.json();
        if (!fileResponse.ok) {
            throw new Error('Failed to fetch file metadata');
        }

        const sha = fileData.sha; // File SHA for updating the file

        // Step 2: Prepare the updated JSON content
        const updatePayload = {
            message: 'Update data.json via API', // Commit message
            committer: {
                name: 'Your Name',
                email: 'your-email@example.com',
            },
            content: Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64'),  // Convert JSON to base64
            sha: sha,  // The current SHA of the file
        };

        // Step 3: Send PUT request to update the file
        const updateResponse = await fetch(metadataUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePayload),
        });

        if (updateResponse.ok) {
            const updateResult = await updateResponse.json();
            console.log('File updated successfully:', updateResult);
            return { success: true, message: 'Data updated successfully!' };
        } else {
            throw new Error('Error updating data on GitHub');
        }
    } catch (error) {
        console.error('Error updating file:', error);
        return { success: false, message: error.message };
    }
}

// Example usage: Replace this with the actual JSON data you want to update
const jsonData = {
    "D": "Some value",
    "E": "Another value",
    "F": "More value",
    "G": "Additional value",
    "S": "Extra value",
    "V": "Last value",
    "AD": "Another final value",
    "AE": "End value",
    "AG": "Final entry"
};

updateDataOnGitHub(jsonData).then(response => {
    if (response.success) {
        console.log(response.message);
    } else {
        console.error(response.message);
    }
});
