import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.pdf':'application/pdf','.ttf':'font/ttf','.woff2':'font/woff2','.json':'application/json'};
createServer(async (req,res) => {
  try {
    const url = new URL(req.url,'http://localhost');
    const name = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
    const path = resolve(root,name);
    if (path !== root && !path.startsWith(root + sep)) {res.writeHead(403).end(); return;}
    const info = await stat(path);
    if (!info.isFile()) {res.writeHead(404).end('Not found'); return;}
    res.writeHead(200, {'Content-Type':types[extname(path)] || 'application/octet-stream','Cache-Control':'no-cache'});
    res.end(await readFile(path));
  } catch {res.writeHead(404).end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Grillardin preview: http://127.0.0.1:${port}`));
