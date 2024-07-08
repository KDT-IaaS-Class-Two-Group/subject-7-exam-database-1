function closeDatabase(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error("데이터베이스 연결 종료 오류:", err.message);
        reject(err);
      } else {
        console.log("SQLite 데이터베이스 연결이 종료되었습니다.");
        resolve();
      }
    });
  });
}

module.exports = closeDatabase;

// closeDatabase 함수는 db 객체를 받아 데이터베이스 연결을 종료합니다.
