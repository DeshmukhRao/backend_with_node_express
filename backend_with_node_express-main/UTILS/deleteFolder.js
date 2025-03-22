const fs = require('fs');

function deleteFile(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
        } else {
            console.log(`File "${fileName}" deleted successfully.`);
        }
    });
}

// Example usage
deleteFile('example.txt');
