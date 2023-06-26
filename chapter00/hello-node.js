const http = require("http");

let count = 0;

// 노드서버 객체생성
const server = http.createServer((req, res) => {
  console.log((count += 1));

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("hello\n");

  // prettier-ignore
  setTimeout(() => {
    res.end("node.js");
  }, 2000);
});

server.listen(8000, () => console.log("Hello Node.js!"));