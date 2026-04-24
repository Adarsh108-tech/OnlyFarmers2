const fs = require('fs');
const path = require('path');

const conflictFile = path.join(__dirname, 'app', '(auth)', 'page.js');

try {
  if (fs.existsSync(conflictFile)) {
    fs.unlinkSync(conflictFile);
    console.log('✅ Cleaned up routing conflict file: app/(auth)/page.js');
  }
} catch (err) {
  console.error('Failed to clean conflict file:', err);
}
