// controller 역할 담당

const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

// 템플릿 엔진으로 핸들바를 등록, 여기서 handlebars 는 파일의 확장자로 사용할 이름(다른걸로 변경해도됨)
app.engine("handlebars", handlebars.engine());

// 웹페이지 로드시 사용할 템플릿 엔진을 핸들바로 설정, 위에서 설정한 이름 그대로 설정해주어야 함
app.set("view engine", "handlebars");

// 뷰 디렉터리를 해당 프로젝트 내 views 로 등록, 기본적으로는 상대 경로로 설정되는데 문제가 생길 수도 있으므로 절대경로로 변경
app.set("views", __dirname+ "/views");

app.get("/", (req, res) => {
  res.render("home", { title: "안녕하세요", message: "만나서 반갑습니다."});
});

app.listen(3000);