const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // favicon.ico 요청 무시
    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' });
      res.end();
      return;
    }

    let filePath;
    let contentType = 'text/html; charset=UTF-8'; // 기본 값은 HTML로 설정

    // 기본적으로 index.html을 제공하도록 설정
    if (req.url === '/' || req.url === '/start.html') {
      filePath = path.join(__dirname, 'public', 'html', 'start.html');
    } else {
      // 요청된 URL에 따라 파일 경로 설정
      const ext = path.extname(req.url);

      // 파일 경로 설정
      if (ext === '.html') {
        filePath = path.join(__dirname, 'public', 'html', path.basename(req.url));
      } else if (ext === '.css') {
        filePath = path.join(__dirname, 'public', 'css', path.basename(req.url));
        contentType = 'text/css; charset=UTF-8';
      } else if (ext === '.js') {
        filePath = path.join(__dirname, 'public', 'script', path.basename(req.url));
        contentType = 'application/javascript; charset=UTF-8';
      } else if (ext === '.json') {
        filePath = path.join(__dirname, 'public', 'script', path.basename(req.url));
        contentType = 'application/javascript; charset=UTF-8';
      }
    }

    // 파일이 존재하는지 확인 후 응답
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // 파일이 없는 경우 404 에러
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('404 Not Found');
        } else {
          // 기타 에러 처리
          console.error('파일 읽기 에러:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('Internal Server Error');
        }
      } else {
        // 파일이 존재하는 경우 해당 파일을 응답
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } else {
    // GET 요청이 아닌 경우 405 Method Not Allowed 응답
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('405 Method Not Allowed');
  }
});

server.listen(PORT, (err) => {
  if (err) {
    console.error('서버 시작 중 오류 발생:', err);
  } else {
    console.log(`서버가 시작되었습니다.`);
    console.log(`http://localhost:${PORT}`);
  }
});
