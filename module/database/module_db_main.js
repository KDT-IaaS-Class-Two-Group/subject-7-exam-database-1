const connectDatabase = require("./module_db_Connect");
const createProductTable = require("./module_db_createTable");
const closeDatabase = require("./module_db_Close");

async function main() {
  let db;
  try {
    db = await connectDatabase("../../database/database.db");
    await createProductTable(db);
  } catch (err) {
    console.error("오류 발생:", err.message);
  } finally {
    if (db) {
      await closeDatabase(db);
    }
  }
}

main();

// 각 모듈을 가져와 main 함수에서 데이터베이스 연결, 테이블 생성, 데이터베이스 종료 작업을 순차적으로 수행합니다.
