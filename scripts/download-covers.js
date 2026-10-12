const fs = require('fs');
const path = require('path');
const https = require('https');

const fileContent = fs.readFileSync(path.join(__dirname, 'sync-openlibrary.js'), 'utf-8');
const booksMatch = fileContent.match(/const BOOKS = (\[[\s\S]*?\]);/);
const BOOKS = eval(booksMatch[1]);

const coversDir = path.join(__dirname, '../public/covers');
if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        const stat = fs.statSync(dest);
        if (stat.size < 1000) {
          fs.unlinkSync(dest);
          return reject(new Error(`File too small: ${stat.size} bytes`));
        }
        resolve(stat.size);
      });
      fileStream.on('error', (err) => {
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
    }).on('error', (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${BOOKS.length} covers to public/covers/ ...`);
  const failed = [];
  const success = [];

  for (let i = 0; i < BOOKS.length; i++) {
    const book = BOOKS[i];
    const dest = path.join(coversDir, `${book.id}.jpg`);
    
    // Skip if already downloaded and valid
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`[${i+1}/${BOOKS.length}] Already downloaded: ${book.title}`);
      success.push({ id: book.id, title: book.title });
      continue;
    }

    try {
      console.log(`[${i+1}/${BOOKS.length}] Downloading ${book.title} from ${book.cover_url} ...`);
      const size = await download(book.cover_url, dest);
      console.log(`  -> OK (${size} bytes)`);
      success.push({ id: book.id, title: book.title, size });
    } catch (e) {
      console.error(`  -> FAILED: ${e.message}`);
      failed.push({ id: book.id, title: book.title, url: book.cover_url, reason: e.message });
    }
  }

  console.log(`\nFinished: ${success.length} succeeded, ${failed.length} failed.`);
  if (failed.length > 0) {
    console.log('Failed:', failed);
  }
}

run();
