import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml' };
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '0.0.0.0';
const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const relative = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    const target = path.resolve(root, relative);
    if (!target.startsWith(root + path.sep) && target !== path.join(root, 'index.html')) { res.writeHead(403).end('Forbidden'); return; }
    const body = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404).end('Not found'); }
});
server.on('error', error => {
  if (error.code === 'EADDRINUSE') console.error(`Port ${port} is already in use. Stop the other server or set PORT to an available port.`);
  else console.error('Unable to start the Vertex server:', error);
  process.exitCode = 1;
});
server.listen(port, host, () => console.log(`Vertex is listening on ${host}:${port} (preview: http://localhost:${port})`));
