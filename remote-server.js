// Stands in for another dev server: it serves one script at every path.
const http = require('node:http');

http
  .createServer((request, response) => {
    console.log(request.method, request.url);
    response.writeHead(200, { 'Content-Type': 'application/javascript' });
    response.end('globalThis.__REMOTE_BUNDLE__ = "evaluated";');
  })
  .listen(8082, () => console.log('remote bundle on http://localhost:8082/remote.bundle'));
