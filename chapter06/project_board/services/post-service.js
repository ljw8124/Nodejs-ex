const paginator = require("../utils/paginator");

// 글쓰기
async function writePost(collection, post) {
  post.hits = 0;    // 조회수
  post.createdDt = new Date().toISOString();  // 날짜 ISO 포맷으로 저장
  return await collection.insertOne(post);    // 몽고 디비에 post 저장 후 결과 반환
}

async function list(collection, page, search) {
  const perPage = 10;   // 한번에 노출시킬 게시물의 개수

  // title 이 search 와 부분일치하는지 확인
  const query = { title: new RegExp(search, "i") };
  // limit 는 10개만 가져온다는 의미, skip 은 설정된 개수만큼 건너뛴다 (skip)
  // 생성일 역순으로 정렬
  const cursor = collection.find(query, { limit: perPage, skip: (page - 1) * perPage }).sort({    // limit 는 가져올 개수를 정하는 것이고, skip 1~10, 11~20 이런식으로 가져오기 위해서 사용한다.
    createdDt: -1,      // 생성일의 역순으로 가져오기 위해서 -1 을 사용한다.
  });

  // 검색어에 걸리는 게시물의 총합
  const totalCount = await collection.count(query);
  const posts = await cursor.toArray(); // 커서로 받아온 데이터를 리스트로 변경

  // 페이지네이터 생성
  const paginatorObj = paginator({ totalCount, page, perPage: perPage });
  return [posts, paginatorObj];
}

// require() 로 파일 임포트 시 외부로 노출하는 객체
module.exports = {
  writePost,
  list
};