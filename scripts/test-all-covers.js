const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, 'sync-openlibrary.js'), 'utf-8');
const booksMatch = fileContent.match(/const BOOKS = (\[[\s\S]*?\]);/);
const BOOKS = eval(booksMatch[1]);

async function checkAll() {
  console.log(`Checking ${BOOKS.length} books...`);
  const failed = [];
  const success = [];

  for (let i = 0; i < BOOKS.length; i++) {
    const b = BOOKS[i];
    try {
      const res = await fetch(b.cover_url);
      const buf = await res.arrayBuffer();
      if (res.status !== 200) {
        failed.push({ index: i, title: b.title, url: b.cover_url, reason: `Status ${res.status}` });
      } else if (buf.byteLength < 1000) {
        // Open library returns a 1x1 43-byte or 807-byte placeholder if ID doesn't exist!
        failed.push({ index: i, title: b.title, url: b.cover_url, reason: `1x1 blank image (${buf.byteLength} bytes)` });
      } else {
        success.push({ index: i, title: b.title, size: buf.byteLength });
      }
    } catch (e) {
      failed.push({ index: i, title: b.title, url: b.cover_url, reason: e.message });
    }
  }

  console.log(`\nResults: ${success.length} valid, ${failed.length} failed / blank.`);
  if (failed.length > 0) {
    console.log('\nList of failed / blank covers:');
    failed.forEach(f => console.log(`[${f.index + 1}] ${f.title}: ${f.reason} (${f.url})`));
  }
}

checkAll();
