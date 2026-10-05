const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'profile.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function readProfile() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeProfile(profile) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(profile, null, 2), 'utf8');
}

function sendJson(res, data, statusCode = 200) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function serveStaticFile(res, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/api/profile') {
    const profile = readProfile();
    sendJson(res, profile);
    return;
  }

  if (req.method === 'POST' && url.pathname.startsWith('/api/links/')) {
    const linkId = decodeURIComponent(url.pathname.replace('/api/links/', ''));
    const profile = readProfile();
    const target = profile.links.find((link) => link.id === linkId);

    if (!target) {
      sendJson(res, { error: 'Link not found' }, 404);
      return;
    }

    target.clicks += 1;
    writeProfile(profile);
    sendJson(res, { ok: true, clicks: target.clicks, id: target.id });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/') {
    serveStaticFile(res, path.join(PUBLIC_DIR, 'index.html'));
    return;
  }

  const normalizedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const requestedFile = path.join(PUBLIC_DIR, normalizedPath.replace(/^\/+/, ''));

  if (requestedFile.startsWith(PUBLIC_DIR)) {
    serveStaticFile(res, requestedFile);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`링크나무 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
