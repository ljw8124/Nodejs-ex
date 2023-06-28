// http 객체 생성, http 모듈을 불러와서 변수에 할당. http 네이밍은 관행처럼 사용
const http = require("http");
let count = 0;

// createServer() 를 사용하여 서버 인스턴스 생성, 콜백함수를 인수로 받아서 http 서버 요청이 들어오면 해당 요청을 처리 req: 요청, res: 응답
const server = http.createServer((req, res) => {
  log(count);

  // 요청에 대한 상태코드를 200(요청처리성공) 으로 설정, 이외 403: 접근금지, 404: 페이지를 찾을수없음, 503: 서버가 사용 불가 상태임
  res.statusCode = 200;

  // 부가 정보를 설정. 부가정보는 header 에 설정하게 되는데, 콘텐츠 타입을 "text/plain" 으로 설정 -> 텍스트를 평문으로 해석하겠다는 의미
  res.setHeader("Content-Type", "text/plain");

  // 응답으로 "hello\n" 를 보내줌
  res.write("hello~\n");

  // 2초 후 Node.js 라는 응답을 주고, http 커넥션을 끝냄
  setTimeout(() => {
    res.end("Node.js");
  }, 2000)
});

function log(count) {
  console.log(count += 1);
}

// 사용할 IP 가 생략되어 localhost(127.0.0.1) 로 실행되고, 8000번 포트로 실행
server.listen(8000);

// 개발 서버와 프로덕션 서버의 가장 큰 차이는 트래픽이다.
// 따라서 새로 만든 API 중 성능에 문제가 있을 것 가은 API 들을 개별로 또는 섞어가면서
// 실제 유저의 트래픽이 들어오는 것처럼 테스트해야 한다.
// K6 를 이용하여 테스트 가능