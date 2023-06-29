const http = require("http");
const url = require("url");

http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  res.setHeader("Content-Type", "text/html");

  // if(path === "/user") {
  //   user(req, res);
  // } else if(path === "/feed") {
  //   feed(req, res);
  // } else {
  //   notFound(req, res);
  // }

  // path 안에 urlMap 이 있는지만 확인한다
  if(path in urlMap) {
      urlMap[path](req, res); // urlMap 에 path 값으로 매핑된 함수를 실행
  } else {
    notFound(req, res);
  }

}).listen('3000', () => console.log('server connected!!'));

// 이제 userInfo 를 받아서 후 처리 하도록 변경
// -> 동적으로 이름과 나이를 받아서 설정할 수 있게 됨
const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  const {name, age} = userInfo
  res.end(`[user] name: ${name}! age: ${age}`);
}

const feed = (req, res)  => {
  res.end(`
    <ul>
      <li>picture1</li>
      <li>picture2</li>
      <li>picture3</li>
    </ul>
  `);
}

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 not found page");
}

// 라우터가 점점 늘어날 수록 if 문에서 계속해서 추가해야되므로, map 을 이용하여 할당하도록 변경
const urlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user": user,
  "/feed": feed,
};