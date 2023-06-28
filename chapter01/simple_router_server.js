const http = require("http");
const url = require("url");   // url 모듈을 로딩
http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname; // 패스명 할당
  res.setHeader("Content-Type", "text/html; charset=utf-8");  // utf-8 로 인코딩하여서 한글이 깨지지 않도록 설정

  if(path === "/user") {
    res.end("[user] name: joungwoo, age: 28");  // user url 에 결괏값 설정
  } else if(path === "/feed") {
    res.end(`
      <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
      </ul>
    `);
  } else {
    res.statusCode = 404; // 올바른 url 경로가 아닌 경 -> 페이지를 찾을 수 없음
    res.end("404 page not found");
  }
}).listen("3000", () => console.log("simple route server start!!"));