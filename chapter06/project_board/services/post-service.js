// 글쓰기
async function writePost(collection, post) {
  post.hits = 0;    // 조회수
  post.createdDt = new Date().toISOString();  // 날짜 ISO 포맷으로 저장
  return await collection.insertOne(post);    // 몽고 디비에 post 저장 후 결과 반환
}

// require() 로 파일 임포트 시 외부로 노출하는 객체
module.exports = {
  writePost,
};