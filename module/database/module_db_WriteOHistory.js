const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/database.db");

function updateOHistory(pid, pname, pprice, quantity, purchasedate) {
  // 데이터 삽입
  const insertQuery = `INSERT INTO OrderHistory (id , Pname, Pprice, Quantity, PurchaseDate) VALUES (?,?, ?, ?, ?)`;

  db.run(insertQuery, [pid, pname, pprice, quantity, purchasedate], (err) => {
    if (err) {
      return console.error("데이터 삽입 중 오류 발생:", err.message);
    }
    console.log(`데이터가 성공적으로 삽입되었습니다`);
  });

  // 데이터베이스 닫기
  db.close((err) => {
    if (err) {
      return console.error("데이터베이스 닫기 중 오류 발생:", err.message);
    }
    console.log("데이터베이스 연결이 성공적으로 종료되었습니다.");
  });
}

module.exports = updateOHistory;
