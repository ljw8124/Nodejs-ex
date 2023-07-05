const axios = require("axios");

async function getTop20Movies() { // await 을 사용할 것이기 때문에 async 를 붙힘
  const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";
  try {
    const result = await axios.get(url);

    const { data } = result;  // result 값 중에 data 프로퍼티를 가져옴

    if(!data.articleList || data.articleList.size === 0) {
      throw new Error("데이터가 없습니다.");
    }

    // 데이터를 가져오는 부분
    const movieInfos = data.articleList.map((article, idx) => {
      return { title: article.title, rank: idx + 1}
    });

    // 데이터 출력 부분
    // for(let movieInfo of movieInfos) {
    //   console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
    // }

    movieInfos.forEach((movieInfo) => {
      console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
    });

  } catch(err) {
    throw new Error(err);
  }

}

getTop20Movies();