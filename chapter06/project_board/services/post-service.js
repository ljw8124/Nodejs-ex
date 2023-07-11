const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");    // mongoDB 에서 자동으로 만드는 primaryKey

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

// DB 에서 필요한 필드들만 선택해서 가져오는 것을 의미함
// 패스워드를 가져오지 않아도 되므로 패스워드만 빼는 프로젝션을 설정함
const projectionOption = {
  projection: {
    // 프로젝션(투영) 결괏값에서 일부만 가져올 때 사용
    password: 0,
    "comment.password": 0,
  },
};

// 게시글 정보를 가져오는 역할과 가져올 때마다 조회수를 1 증가시키는 역할을 함
async function getDetailPost(collection, id) {
  // 몽고디비 Collection 의 findOneAndUpdate() 함수 사용
  // 게시글을 읽을 때마다 hits(조회수) 를 1 증가
  return await collection.findOneAndUpdate({ _id: ObjectId(id) }, {$inc: { hits: 1}},  // $inc 는 값을 증가시키고 싶을 때 사용하는 연산자이다.
      projectionOption);
}

async function getPostByIdAndPassword(collection, { id, password }) {
  return await collection.findOne({ _id: ObjectId(id), password: password },
      projectionOption);
}

// id 로 게시글 가져오는 함수
async function getPostById(collection, id) {
  return await collection.findOne({ _id: ObjectId(id) }, projectionOption);
}

// 게시글 수정
async function updatePost(collection, id, post) {
  const toUpdatePost = {
    $set: {
      ...post
    },
  };
  return await collection.updateOne({ _id: ObjectId(id) }, toUpdatePost);
}

// require() 로 파일 임포트 시 외부로 노출하는 객체
module.exports = {
  writePost,
  list,
  getDetailPost,
  getPostByIdAndPassword,
  getPostById,
  updatePost,
};