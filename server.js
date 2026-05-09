const http = require('http');
const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'Recipe Dashboard.html');
const PORT = 3000;

http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(FILE, 'utf8', (err, html) => {
      if (err) { res.writeHead(500); res.end('Read error'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    });

  } else if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        fs.readFile(FILE, 'utf8', (err, html) => {
          if (err) { res.writeHead(500); res.end('Read error'); return; }
          const updated = html.replace(
            /(<script type="application\/json" id="default-data">\n)[\s\S]*?(\n<\/script>)/,
            `$1${JSON.stringify(data, null, 2)}\n$2`
          );
          fs.writeFile(FILE, updated, 'utf8', err => {
            if (err) { res.writeHead(500); res.end('Write error'); return; }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"ok":true}');
          });
        });
      } catch (e) {
        res.writeHead(400); res.end('Bad JSON');
      }
    });

  } else {
    res.writeHead(404); res.end('Not found');
  }

}).listen(PORT, () => {
  console.log(`Recipe Dashboard → http://localhost:${PORT}`);
});
