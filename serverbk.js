// ─────────────────────────────────────────────
//  CoworkClub — Local Dev Server
//  Usage:  node server.js
//  Opens:  http://localhost:3000
// ─────────────────────────────────────────────

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname; // serve files from same folder as server.js

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css',
  '.js'  : 'application/javascript',
  '.json': 'application/json',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg' : 'image/svg+xml',
  '.ico' : 'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

const server = http.createServer((req, res) => {
  // Default to the main HTML file
  let urlPath = req.url === '/' ? '/aryaprabha-region-aware.html' : req.url;

  // Strip query strings
  urlPath = urlPath.split('?')[0];

  const filePath = path.join(ROOT, urlPath);
  const ext      = path.extname(filePath).toLowerCase();
  const mimeType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`404 Not Found: ${urlPath}`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    res.writeHead(200, {
      'Content-Type' : mimeType,
      'Cache-Control': 'no-cache',
      // Allow Supabase and Google Fonts
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ✅  CoworkClub dev server running');
  console.log(`  🌐  http://localhost:${PORT}`);
  console.log('');
  console.log('  Serving: aryaprabha-region-aware.html');
  console.log('  Stop:    Ctrl + C');
  console.log('');
});
