const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("익스프레스 라우터 리팩터링!");
});

// GET 메서드의 라우팅 설정
app.get("/", (_, res) => res.end('HOME'));  // _ 는 필수로 넣어야하지만 따로 값을 받지 않는다거나 할때 쓰는 관례상의 변수명이다.
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
  const {name, age} = url.parse(req.url, true).query;

  // 결과값으로 유저명과 나이 제공
  res.json(`[user] name: ${name}, age: ${age}`);
}

function feed(_, res) {
  res.json(`
    <ul>
      <li>express</li>
      <li>server</li>
      <li>is activated!</li>
    </ul>
  `);
}