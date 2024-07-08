const sqlite3 = require("sqlite3").verbose();

function connectDatabase(dbPath) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("데이터베이스 연결 오류:", err.message);
        reject(err);
      } else {
        console.log("SQLite 데이터베이스에 연결되었습니다.");
        resolve(db);
      }
    });
  });
}

module.exports = connectDatabase;

// connectDatabase 함수는 데이터베이스에 연결하고 db 객체를 반환합니다.
