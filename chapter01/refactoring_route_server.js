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
      urlMap[path](req, res); // urlMap 에 path 값으로 매핑된 함수를 실행 -> js 에서는 함수도 일급객체이므로 이렇게 할당 및 사용이 가능해짐
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
// 제일 아래에 작성한 이유는 user() 와 feed() 가 const 로 선언했기 때문에 초기화 이전에 선언하면 에러가 나오기 때문이다.
// 호이스팅을 위해서는 var 로 변수를 선언해야 한다.
const urlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user": user,
  "/feed": feed,
};

// 만약 라우팅에 사용하는 함수가 많아지고, 각 함수에 공통 기능을 적용하고 싶을 때는 어떻게 하는것이 좋을까?
// 익스프레스에는 미들웨어라는 개념이 있어서 요청에 대한 전후 처리를 할 수 있다.

// 그리고 또한 notFound 에러 이외에 에러가 발생 했을 때는 try~ catch 를 이용하여 방어코딩하는 것이 좋다.

