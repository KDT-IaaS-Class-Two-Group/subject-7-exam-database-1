const http = require("http");
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const querystring = require("querystring"); // POST 데이터 파싱을 위한 모듈
const popExt = require("./module/server/module_server_ext");
const {
  handleErrorResponse,
  handleFileReadError,
} = require("./module/server/module_server_error");
const updateOHistory = require("./module//database/module_db_WriteOHistory");
const { pid } = require("process");

const PORT = process.env.PORT || 8080;
const dbPath = path.join(__dirname, "database", "database.db");

// 데이터베이스 연결 함수
const connectDB = () => {
  return new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("데이터베이스 연결 중 오류 발생:", err);
    } else {
      console.log("데이터베이스에 성공적으로 연결되었습니다.");
    }
  });
};

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);
  if (req.method === "GET") {
    // favicon.ico 요청 무시
    if (req.url === "/favicon.ico") {
      res.writeHead(204, { "Content-Type": "image/x-icon" });
      res.end();
      return;
    }

    if (req.url === "/searchItem") {
      // /searchItem 요청 처리
      const db = connectDB();
      const query = "SELECT name, explain, price FROM product";

      db.all(query, [], (err, rows) => {
        if (err) {
          console.error("데이터 조회 중 오류 발생:", err);
          handleErrorResponse(res, 500, "Internal Server Error");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=UTF-8",
          });
          res.end(JSON.stringify(rows));
        }
        db.close((err) => {
          if (err) {
            console.error("데이터베이스 닫기 중 오류 발생:", err);
          }
        });
      });
    } else {
      let filePath;
      let contentType = "text/html; charset=UTF-8"; // 기본 값은 HTML로 설정

      // 기본적으로 index.html을 제공하도록 설정
      if (req.url === "/" || req.url === "/start.html") {
        filePath = path.join(__dirname, "public", "html", "start.html");
      } else {
        // 요청된 URL에 따라 파일 경로 설정
        const ext = path.extname(req.url);
        filePath = popExt(ext, req.url).fp;
        contentType = popExt(ext, req.url).ct;
      }

      // 파일이 존재하는지 확인 후 응답
      fs.readFile(filePath, (err, data) => {
        if (err) {
          handleFileReadError(res, err);
          return;
        } else {
          // 파일이 존재하는 경우 해당 파일을 응답
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
    }
  } else if (req.method === "POST") {
    if (req.url === "/start") {
      // POST 요청에서 form 데이터 수신
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
        console.log(body);
      });

      req.on("end", () => {
        const data = querystring.parse(body);
        console.log(data);
        const id = data.id;
        const name = data.name;

        // 데이터베이스에 연결하고 id와 name이 일치하는지 확인
        const db = connectDB();
        const checkQuery = "SELECT id, name FROM user WHERE id = ?";

        db.get(checkQuery, [id], (err, row) => {
          if (err) {
            console.error("데이터 조회 중 오류 발생:", err);
            handleErrorResponse(res, 500, "Internal Server Error");
          } else {
            if (row) {
              if (row.name === name) {
                // ID와 이름이 일치하는 경우
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true }));
              } else {
                // ID는 같지만 이름이 다른 경우
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: false,
                    message: "아이디는 같지만 이름이 일치하지 않습니다.",
                  })
                );
              }
            } else {
              // 새로운 유저 추가
              const insertQuery =
                "INSERT INTO user (id, name, AccBalance) VALUES (?, ?, 100000)";
              db.run(insertQuery, [id, name], (err) => {
                if (err) {
                  console.error("데이터 삽입 중 오류 발생:", err);
                  handleErrorResponse(res, 500, "Internal Server Error");
                } else {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ success: true }));
                }
              });
            }
          }
          db.close((err) => {
            if (err) {
              console.error("데이터베이스 닫기 중 오류 발생:", err);
            }
          });
        });
      });
    } else if (req.url === "/buy") {
      // 구매 요청 처리
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const orderData = JSON.parse(body);
        const { ccount } = orderData;
        const purchasedate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식
        const buytotal = orderData.total; // 구매한 총 가격을 할당
        let updatetotal = 0; // let으로 선언하여 변경 가능하게 함

        const db = connectDB(); // 데이터베이스 연결
        const insertQuery = `INSERT INTO OrderHistory (id, Pname, Pprice, Quantity, PurchaseDate) VALUES (?, ?, ?, ?, ?)`;
        const updateaccbalance = "UPDATE user SET AccBalance = ? WHERE id = ?";
        const pid = orderData.id; // 실제 사용자 ID를 여기에 할당

        // orderData의 각 항목에 대해 데이터 삽입
        for (const key in ccount) {
          const item = ccount[key];
          db.serialize(() => {
            const stmt = db.prepare(insertQuery, (err) => {
              if (err) {
                return console.error("데이터 삽입 중 오류 발생:", err.message);
              }
              console.log(`데이터가 성공적으로 삽입되었습니다`);
            });
            stmt.run(pid, item.Pname, item.price, item.count, purchasedate);
            stmt.finalize();
          });
        }

        // 사용자의 현재 잔액을 가져와 업데이트
        db.get(
          "SELECT AccBalance FROM user WHERE id = ?",
          [pid],
          (err, row) => {
            if (err) {
              return console.error(err.message);
            }
            updatetotal = row.AccBalance - buytotal;
            db.run(updateaccbalance, [updatetotal, pid], function (err) {
              if (err) {
                return console.error(err.message);
              }
              console.log(`Row(s) updated: ${this.changes}`);

              // 데이터베이스 닫기
              db.close((err) => {
                if (err) {
                  return console.error(
                    "데이터베이스 닫기 중 오류 발생:",
                    err.message
                  );
                }
                console.log("데이터베이스 연결이 성공적으로 종료되었습니다.");

                // 클라이언트에게 응답
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true }));
              });
            });
          }
        );
      });
    } else if (req.url === "/searchuserAcc") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const parsedData = JSON.parse(body);
        const id = parsedData.id;
        const db = connectDB();
        const selectQuery = "SELECT AccBalance FROM user WHERE id = ?";

        db.get(selectQuery, [id], (err, rows) => {
          if (err) {
            console.error("데이터 조회 중 오류 발생:", err);
            handleErrorResponse(res, 500, "Internal Server Error");
          } else {
            res.writeHead(200, {
              "Content-Type": "application/json; charset=UTF-8",
            });
            res.end(JSON.stringify(rows));
          }
          db.close((err) => {
            if (err) {
              console.error("데이터베이스 닫기 중 오류 발생:", err);
            }
          });
        });
      });
    } else if (req.url === "/readHistory") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const parsedData = JSON.parse(body);
        const id = parsedData.id;

        const db = connectDB();
        const selectQuery =
          "SELECT Pname, Pprice, Quantity FROM OrderHistory WHERE id = ?";

        db.all(selectQuery, [id], (err, rows) => {
          if (err) {
            console.error("데이터 조회 중 오류 발생:", err);
            handleErrorResponse(res, 500, "Internal Server Error");
          } else {
            res.writeHead(200, {
              "Content-Type": "application/json; charset=UTF-8",
            });
            res.end(JSON.stringify(rows));
          }
          db.close((err) => {
            if (err) {
              console.error("데이터베이스 닫기 중 오류 발생:", err);
            }
          });
        });
      });
    } else {
      // POST 요청이지만 /start가 아닌 경우 404 Not Found 응답
      handleErrorResponse(res, 404, "404 Not Found");
    }
  } else {
    // GET 요청이 아닌 경우 405 Method Not Allowed 응답
    handleErrorResponse(res, 405, "405 Method Not Allowed");
  }
});

server.listen(PORT, (err) => {
  if (err) {
    console.error("서버 시작 중 오류 발생:", err);
  } else {
    console.log(`서버가 시작되었습니다.`);
    console.log(`http://localhost:${PORT}`);
  }
});
