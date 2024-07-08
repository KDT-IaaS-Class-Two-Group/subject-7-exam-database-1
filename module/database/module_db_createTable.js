function createProductTable(db) {
  return new Promise((resolve, reject) => {
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        explain TEXT NOT NULL,
        price INTEGER NOT NULL
      )
    `;

    db.run(createUserTableQuery, (err) => {
      if (err) {
        console.error("product 테이블 생성 오류:", err.message);
        reject(err);
      } else {
        console.log("product 테이블이 성공적으로 생성되었습니다.");
        resolve();
      }
    });
  });
}

module.exports = createProductTable;

// createProductTable 함수는 db 객체를 받아 product 테이블을 생성합니다.
