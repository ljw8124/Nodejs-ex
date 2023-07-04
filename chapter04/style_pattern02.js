function myWork(work) {
  return new Promise((resolve, reject) => {
    resolve(work.toUpperCase());
  })
}

function playGame(work) {
  return new Promise((resolve, reject) => {
    if(work === 'DONE') { // toUpperCase() 로 대문자 처리함
      resolve("GO PLAY GAME!!!");
    } else {
      reject(new Error("DONT GAMING..."));
    }
  })
}

// 프로미스를 중첩해서 사용 => 익숙하지 않아 잘못 사용한 promise 방법
// myWork('done').then(function(result) {
//   playGame(result).then(function(value) {
//     console.log(value);
//   })
// })

// 결과를 then 으로 그냥 넘기는 것이 좋음 -> 어차피 return 을 promise() 로 넘기고 있기 때문에
myWork('done')
  .then(playGame)
  .then(console.log);

// 위의 코드도 나쁘진 않지만, 더 좋은 방법이 js 에 등장하게 되는데, 그것이 바로 async await 이다.