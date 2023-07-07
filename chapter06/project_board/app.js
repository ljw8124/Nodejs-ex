// controller 역할 담당

const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

// 템플릿 엔진으로 핸들바를 등록, 여기서 handlebars 는 파일의 확장자로 사용할 이름(다른걸로 변경해도됨)
app.engine("handlebars", handlebars.engine()); // handlebars.engine({ layoutDir: "views" }) 와 같이 기본 레이아웃 디렉터리를 변경할 수도 있음

// 웹페이지 로드시 사용할 템플릿 엔진을 핸들바로 설정, 위에서 설정한 이름 그대로 설정해주어야 함
app.set("view engine", "handlebars");

// 뷰 디렉터리를 해당 프로젝트 내 views 로 등록, 기본적으로는 상대 경로로 설정되는데 문제가 생길 수도 있으므로 절대경로로 변경
app.set("views", __dirname+ "/views");

// 메인페이지(홈)
app.get("/", (req, res) => {
  res.render("home", { title: "테스트 게시판", message: "만나서 반갑습니다." }); // 이 때 기본 레이아웃을 사용하고 싶지 않다면 결과 객체에 layout: false 를 추가하면 된다
});

// 게시글 작성페이지
app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

// 게시글 조회페이지
app.get("/detail/:id", (req, res) => {
  res.render("detail", {
    title: "테스트 게시판",
  })  ;
});

app.listen(3000);