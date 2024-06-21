const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 연결
const db = new sqlite3.Database('../../database/database.db', (err) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err.message);
    return;
  }
  console.log('SQLite 데이터베이스에 연결되었습니다.');
});

// user 테이블 생성 쿼리
const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    explain TEXT NOT NULL,
    price INTEGER NOT NULL
  )
`;

// 테이블 생성
db.run(createUserTableQuery, (err) => {
  if (err) {
    console.error('user 테이블 생성 오류:', err.message);
  } else {
    console.log('user 테이블이 성공적으로 생성되었습니다.');
  }

  // 데이터베이스 연결 종료
  db.close((err) => {
    if (err) {
      console.error('데이터베이스 연결 종료 오류:', err.message);
    } else {
      console.log('SQLite 데이터베이스 연결이 종료되었습니다.');
    }
  });
});