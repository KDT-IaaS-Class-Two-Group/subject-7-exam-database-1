function handleErrorResponse(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=UTF-8' });
  res.end(message);
}

function handleFileReadError(res, err) {
  if (err.code === 'ENOENT') {
    // 파일이 없는 경우 404 에러
    handleErrorResponse(res, 404, '404 Not Found');
  } else {
    // 기타 에러 처리
    console.error('파일 읽기 에러:', err);
    handleErrorResponse(res, 500, 'Internal Server Error');
  }
}

module.exports = { handleErrorResponse, handleFileReadError };