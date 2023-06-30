// REST API 원칙에 맞춰서 코딩
// REST API 는 자원을 URL 에 표현하고 자원을 가져오는 행위를 HTTP 메서드로 표현하는 규칙을 말한다.

// 1. / -> get 목록가져오기
// 2. /posts -> post 글쓰기(아이디, 제목, 작성자, 내용, 생성일자)
// 3. /posts:id -> delete  글삭제

const express = require('express');
const app = express();
const port  = 3000;

let posts = [];   // 서버 작동시에 휘발성 데이터로 가지고 있을 예정이므로 posts 선언

// req.body 를 사용하려면 JSON 미들웨어를 사용해야 한다.
// 사용하지 않으면 undefined 로 반환
// HTTP 요청 시마다 로그를 남기는 작업을 하고 싶을 때 API 코드에 로그를 남기는 작업을 넣기보다는 아래와 같이 미들웨어 추가.
app.use(express.json());

// POST 요청 시 컨텐트 타입이 application/x-www.form-urlencoded 인 경우 파싱 -> 이 경우는 키=값 형식을 말한다.
app.use(express.urlencoded({ extended: true }));    // JSON 미들웨어와 함께 사용

app.get('/', (req, res) => {  // / 로 요청이 오면 실행
  res.json(posts);            // 게시글 리스트를 JSON 형식으로 보여줌 -> res.end() 형식은 문자열과 바이트 버퍼 형식만 넣을 수 있기 때문에 res.json() 을 사용
});

app.post('/posts', (req, res) => {        // posts 로 요청오면 실행
  const { title, name, text } = req.body; // HTTP 요청의 body 데이터를 변수에 할당

  // 게시글 리스트에 새로운 게시글 정보 추가
  posts.push({id: posts.length + 1, title, name, text, createDt: Date()});
  res.json({title, name, text});
});

app.delete('/posts/:id', (req, res) => {
  // app.delete 에 설정한 path 정보에서 id 값을 가져옴
  const id = req.params.id;
  // 글삭제 로직 -> + 는 단항연산자로 parseInt() 없이 숫자형으로 변환해준다
  // filter 를 이용하여 새로운 배열을 만든다 -> 삭제할 때 더 유용한 방법
  const filterPosts = posts.filter((post) => post.id !== +id);  // 다르게 구현하는 방법은 splice(), map(), reduce()
  const isLengthChanged = posts.length !== filterPosts.length;  // 삭제 제대로 되었는지 확인

  posts = filterPosts;

  // 게시글이 삭제된 경우 OK 를 반환하고 빠르게 return 하는 방식 -> 빠른 반환 이라고함
  // 빠른 반환의 경우에는 if/else 를 덜 작성하게 되므로 코드의 가독성을 높혀준다.
  if(isLengthChanged) {
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED");
});

 app.listen(port, () => {
   console.log("server connected..!!!");
 });

// 위예제는 브라우저 만으로 테스트하기가 조금 어렵다. 그러므로 curl 를 사용하여 API 테스트가 가능하다.
// curl 이 제공하는 옵션 => -x(프록시 서버설정), -A(유저 에이전트를 변경), -O(서버의 파일을 이름 변경없이 내려받기), -L(리다이렉트 URL 따라가기)

// curl 를 이용한 API 테스트
// curl -X GET http://localhost:3000 -> posts 배열 가져오기 (게시글 조회)

// -H 는 Header 정보 설정, -d 는 POST 통신시 body 데이터
// curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "title=제목1&name=joungwoo&text=안녕하세요~" http://localhost:3000/posts

// id 를 2로 가지고 있는 게시물 삭제
// curl -X DELETE localhost:3000/posts/2

// REST(Representational State Transfer)ful API 는 REST 구조를 사용하는 API 로,
// HTTP URL 를 통해 자원을 명시하고 HTTP 메소드(POST, GET, PUT, DELETE)를 사용해 자원을 처리한다.

// 또한 일급객체는 값으로 취급할 수 있는 객체를 의미하고, 값으로 취급하면 변수로 할당할 수 있다는 것을 의미한다.
// JS 에서는 함수도 일급객체이므로 변수로 사용할수도, 리턴으로 사용할 수도 무궁무진하게 사용할 수 있다.

// 라우터는 네트워크에서 패킷의 위치를 찾고, 경로를 찾는 의미로 많이 사용한다.
// 이번 챕터에서는 해당 요청을 처리할 함수를 매핑시켜주는 일을 하는 함수의 의미로 사용하였다.

// 익스프레스에서 미들웨어란 HTTP 요청과 응답 사이에 함수를 추가하여 새로운 기능을 추가하는 것을 뜻한다.

