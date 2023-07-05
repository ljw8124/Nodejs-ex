// async 와 await 을 이용한 비동기처리
async function myName() {
  return "joungwoo";
}

// console.log(myName());

async function showName() {
  const name = await myName();  // myName() 이 name 을 가져올 때 까지 기다림
  console.log(name);
}

// console.log(showName());  // showName() 도 async 가 붙었으므로 promise 로 반환한다.

// 비동기로 숫자출력하는 예제
function waitOneSecond(msg) {
  return new Promise((resolve, _) => {            // reject 시키지 않을거라는 것을 _ 로 표현(관습)
      setTimeout(() => resolve(`${msg}`), 1000);
  });
}

async function countOneToTen() {          // 10초 동안 1초마다 메시지 출력
  for(let x of [...Array(10).keys()]) {   // 0부터 9까지 루프를 순회
    // 1초 대기 후 result에 결과값 저장
    let result = await waitOneSecond(`${x + 1}초 대기중...`);
    console.log(result);
  }
  console.log("완료..!!");
}

// 직접 Promise 를 만들고 반환하므로 async 붙여주지 않고 호출 가능
countOneToTen();

// style_axios.js 에서와 달리 then 을 사용하지 않아서 더 읽기 편하고 디버깅하기 간결해졌다.