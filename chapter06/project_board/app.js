// controller 역할 담당

const express = require("express");
const handlebars = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");

const {ObjectId} = require("mongodb");

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

/************************* handlebars 세팅 부분! **********************************/

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
  // 쓰기 페이지 이동시에 create 의 값을 가진 mode 변수를 추가함
  res.render("write", { title: "테스트 게시판", mode: "create" });
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

// 수정 데이터를 받음
app.get("/modify/:id", async (req, res) => {
  const { id } = req.params;   // url 에서 가져옴

  const post = await postService.getPostById(collection, id);

  // console.log('update 할 게시물 ===>', post);

  // app.post("modify") 로 이동
  res.render("write", { title: "테스트 게시판", mode: "modify", post });

});

// 수정 데이터를 처리
app.post("/modify", async (req, res) => {
  const { id, title, writer, password, content } = req.body;

  const post = {
    title,
    writer,
    password,
    content,
    createdDt: new Date().toISOString(),
  }
  // 업데이트 결과
  try {
    const result = postService.updatePost(collection, id, post);

    if(result) console.log("update success!!");

  } catch(err) {
    console.error("update failed....", err)
  }

  res.redirect(`/detail/${id}`);

});

app.delete("/delete", async (req, res) => {
  const {id, password} = req.body;
  try {
    // collection 의 deleteOne 을 사용하여 게시글 하나를 삭제
    const result = await collection.deleteOne({_id: ObjectId(id), password: password});

    // 삭제 성공시에만 1
    if(result.deletedCount !== 1) {
      console.log('삭제 실패');
      return res.json({isSuccess: false});
    }

    return res.json({isSuccess: true});

    // 네트워크 연결이 불안정하거나 등의 예외상황
  } catch(err) {
    console.error('delete failed....', err);
    return res.json({isSuccess: false});
  }
});

app.post("/write-comment", async (req, res) => {
  const {id, name, password, comment} = req.body;
  const post = await postService.getPostById(collection, id);

  console.log(post);

  if(post.comments) {
    post.comments.push({
      idx: post.comments.length + 1,
      name,
      password,
      comment,
      createdDt: new Date().toISOString(),
    });
  } else {
    post.comments = [
      {
        idx: 1,
        name,
        password,
        comment,
        createdDt: new Date().toISOString(),
      },
    ];
  }

  const result = await postService.updatePost(collection, id, post);

  return res.redirect(`/detail/${id}`);

});

// 게시글 조회페이지
app.get("/detail/:id", async (req, res) => {

  const result = await postService.getDetailPost(collection, req.params.id);

  res.render("detail", {
    title: "테스트 게시판",
    post: result.value,
  });

});

app.post("/check-password", async (req, res) => {
  const { id, password } = req.body;

  // postService 의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인
  const post = await postService.getPostByIdAndPassword(collection, { id, password });

  // 데이터가 있으면 isExist true, 없으면 false
  if(!post) {
    return res.status(404).json({ isExist: false });
  } else {
    return res.json({ isExist: true });
  }

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