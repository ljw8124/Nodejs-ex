// function getRandomInt(
//     min,
//     max)
// {
//   return Math.floor(
//       Math.random()
//       * (max - min)) + min;
// }
//
// console.log(
//     getRandomInt(
//         10, 20
//     )
// );

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

console.log(getRandomInt(10, 20));

// $ npx prettier -w index.js 를 실행하면 위에 주석에 적혀있는 이상한 문법의 코드가
// 아래와 같이 정리된다.

// 그러므로 포매팅을 동일하게 맞추는 것이 가독성과 유용성 측면에서 더 좋다.