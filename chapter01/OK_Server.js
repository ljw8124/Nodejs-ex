const http = require('http');

const server = http.createServer((req, res) => {  // 서버 인스턴스를 생성
  res.setHeader("Content-Type", "text/html"); // 응답 헤더에서 텍스트를 html 로 해석하기위해 설정
  res.end("OK");  // Ok 를 응답하고 연결종료
});

server.listen("3000", () => console.log("server start!!")); // 접속대기