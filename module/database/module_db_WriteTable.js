const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../../database/database.db');

const fs = require('node:fs');

// JSON 파일 경로
const jsonFilePath = '../../public/script/item.json';

// 데이터베이스 파일 경로
const dbFilePath = '../../database/database.db';

// JSON 파일 읽기
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// 데이터 삽입
const insertQuery = `INSERT INTO product (name, explain, price) VALUES (?, ?, ?)`;

jsonData.forEach((item) => {
db.run(insertQuery, [item.name, item.description, item.price], (err) => {
if (err) {
return console.error('데이터 삽입 중 오류 발생:', err.message);
}
console.log(`데이터가 성공적으로 삽입되었습니다: ${item.name}`);
});
});

// 데이터베이스 닫기
db.close((err) => {
if (err) {
return console.error('데이터베이스 닫기 중 오류 발생:', err.message);
}
console.log('데이터베이스 연결이 성공적으로 종료되었습니다.');
});
