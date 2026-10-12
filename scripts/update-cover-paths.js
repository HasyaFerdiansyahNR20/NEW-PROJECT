const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'sync-openlibrary.js');
let code = fs.readFileSync(target, 'utf-8');

code = code.replace(/id:\s*'(book-[a-z]{2}-\d{2})'([\s\S]*?)cover_url:\s*'https:\/\/[^']+'/g, (match, id, middle) => {
  return `id: '${id}'${middle}cover_url: '/covers/${id}.jpg'`;
});

fs.writeFileSync(target, code, 'utf-8');
console.log('Successfully updated sync-openlibrary.js with local /covers/ paths.');
