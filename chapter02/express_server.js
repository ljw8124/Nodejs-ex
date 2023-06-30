const express = require("express"); // express 모듈 불러오기
const app = express();              // express 초기화 후 app 에 할당
const port = 3000;

app.get('/', (req, res) => {        // / 으로 요청이 오는 경우 실행
  res.set({"Content-Type": "text/html; charset=utf-8"});  // 헤더값 설정, 한글 사용을 위한 인코딩 설정
  res.end('헬로 Express~');
});

app.listen(port, () => {
  console.log(`express server connected...! use port: ${port}`);
})