// REST API 원칙에 맞춰서 코딩
// REST API 는 자원을 URL 에 표현하고 자원을 가져오는 행위를 HTTP 메서드로 표현하는 규칙을 말한다.

// 1. / -> get 목록가져오기
// 2. /posts -> post 글쓰기(아이디, 제목, 작성자, 내용, 생성일자)
// 3. /posts:id -> delete  글삭

const express = require('express');
const app = express();

let posts = [];   // 서버 작동시에 휘발성 데이터로 가지고 있을 예정이므로 posts 선언

// req.body 를 사용하려면 JSON 미들웨어를 사용해야 한다.
// 사용하지 않으면 undefined 로 반환
app.use(express.json());

// POST 요청 시 컨텐트 타입이 application/x-www.form-urlencoded 인 경우 파싱
app.use(express.urlencoded({ extended: true }));    // JSON 미들웨어와 함께 사용

app.get('/', (req, res) => {  // / 로 요청이 오면 실행
  res.json(posts);            // 게시글 리스트를 JSON 형식으로 보여줌
});

app.post('/posts', (req, res) => {        // posts 로 요청오면 실행
  const { title, name, text } = req.body; // HTTP 요청의 body 데이터를 변수에 할당

  // 게시글 리스트에 새로운 게시글 정보 추가
  posts.push({id: posts.length + 1, title, name, text, createDt: Date()});
  res.json({title, name, text});
});

app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;                                     // app.delete 에 설정한 path 정보에서 id 값을 가져옴
  const filterPosts = posts.filter((post) => post.id !== +id);  // 글삭제 로직
  const isLengthChanged = posts.length !== filterPosts.length;  // 삭제 제대로 되었는지 확인

  posts = filterPosts;
  if(!isLengthChanged) {
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED");
});

