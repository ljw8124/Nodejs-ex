const http = require("http");
const url = require("url");

http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  res.setHeader("Content-Type", "text/html");

  if(path === "/user") {
    user(req, res);
  } else if(path === "/feed") {
    feed(req, res);
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
