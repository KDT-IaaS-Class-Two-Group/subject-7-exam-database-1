const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      // index.html 파일의 경로
      const filePath = path.join(__dirname, 'public', 'html', 'index.html');
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('서버 오류: 파일을 읽을 수 없습니다.');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(data);
        }
      });
    } else {
      // 다른 GET 요청 처리
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 - 페이지를 찾을 수 없습니다.');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('405 - 메서드가 허용되지 않습니다.');
  }
});

server.listen(PORT, () => {
  console.log('서버가 연결되었습니다.');
});