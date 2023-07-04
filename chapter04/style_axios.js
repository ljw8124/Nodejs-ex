// 복잡한 promise 예제 -> axios 사용( npm install axios )
// url 에서 영화데이터를 가져와서 순위와 제목 출력하기

const axios = require("axios");
const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios
.get(url)                                   // get 요청으로 url 에서 데이터를 가져옴
.then((result) => {
  if(result.status !== 200) {
    throw new Error("요청에 실패하였습니다.");
  }

  if(result.data) {                         // data 가 존재하는지 여부 판단
    return result.data;
  } else {
    throw new Error("데이터가 없습니다.");
  }
})
.then((resultData) => {                     // data 중에서 articleList 가 있는지 판단
  if(!resultData.articleList || resultData.articleList.size == 0) {
    throw new Error("데이터가 없습니다.");
  }
  return resultData.articleList;
})
.then((articleList) => {                    // articleList 를 키,값(title: value, rank: value) 형식으로 리턴
  return articleList.map((article, idx) => {
    return {title: article.title, rank: idx + 1};
  });
})
.then((results) => {                        // article 정보를 console.log() 로 출력
  for(let movieInfo of results) {
    console.log(`[${movieInfo.rank}위 - ${movieInfo.title}]`);
  }
})
.catch((error) => {
  console.log("<<에러발생!!!>>");
  console.error(error);
})