// controller 역할 담당

const express = require("express");
const handlebars = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");

const port = 3000;

const app = express();

// req.body 와 POST 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 템플릿 엔진으로 핸들바를 등록, 여기서 handlebars 는 파일의 확장자로 사용할 이름(다른걸로 변경해도됨)
// app.engine("handlebars", handlebars.engine()); // handlebars.engine({ layoutDir: "views" }) 와 같이 기본 레이아웃 디렉터리를 변경할 수도 있음
app.engine(
    "handlebars",
    handlebars.create({     // handlebars 객체 생성 위해서 create 사용
      helpers: require("./configs/handlebars-helpers"), // 헬퍼 함수들을 추가
    }).engine,
);

// 웹페이지 로드시 사용할 템플릿 엔진을 핸들바로 설정, 위에서 설정한 이름 그대로 설정해주어야 함
app.set("view engine", "handlebars");

// 뷰 디렉터리를 해당 프로젝트 내 views 로 등록, 기본적으로는 상대 경로로 설정되는데 문제가 생길 수도 있으므로 절대경로로 변경
app.set("views", __dirname+ "/views");

// 메인페이지(홈)
app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";

  try {
    const [posts, paginator] = await postService.list(collection, page, search);
    // 이 때 기본 레이아웃을 사용하고 싶지 않다면 결과 객체에 layout: false 를 추가하면 된다
    res.render("home", { title: "테스트 게시판", search, paginator, posts });

  } catch(err) {
    console.error(err);
    res.render("home", { title: "테스트 게시판" });
  }


});

// 게시글 작성페이지(쓰기 페이지로 이동)
app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

// 글작성
app.post("/write", async (req, res) => {
  const post = req.body;
  // 결과반환
  const result = await postService.writePost(collection, post);

  console.log("글쓰기 성공!!", result);
  // 화면전환
  res.redirect(`/detail/${result.insertedId}`);
});

// 게시글 조회페이지
app.get("/detail/:id", (req, res) => {
  res.render("detail", {
    title: "테스트 게시판",
  });
});

let collection;

app.listen(port, async () => {
  console.log("Server started!! ===>", port);
  const mongoClient = await mongodbConnection();

  // mongoClient.db() 로 디비 선택, collection() 으로 컬렉션 선택하여 할당
  collection = mongoClient.db().collection("post");

  console.log("mongoDB connected");
});

// Node.js 는 파일 변경시 다시 재기동해야하는 번거러움이 있는데, 이를 해결시켜주는 것이
// nodemon 이다.
// $ npm i nodemon@2.0.20