// 프로미스가 콜백보다는 더 깔끔하지만, 잘못되게 사용할 수 있는 가능성이 더 크다.
// 따라서 성공시와 실패시를 명확하게 구분하기 위해서 then() 과 catch() 를 적절하게 사용해야 한다.

function myWork(work) {
  return new Promise((resolve, reject) => {
    if(work === 'done') {
      resolve('일 끝!!! 게임하자!!');
    } else {
      reject(new Error('일 해야지... 게임못해!!'));
    }
  });
}

// 권장하지 않는 코딩 방식 => 기껏 promise 를 이용하여 코딩했지만, 콜백형식과 다를게 없어진다.
// myWork('done').then(function(value) { console.log(value) }, function(err) {
//   console.error(err);
// });

// 이렇게 또 선언하는 것보다는 catch 로 따로 error 를 받는것이 좋음
myWork('done')
    .then(function(value) { console.log(value); })
    .catch(function(err) { console.error(err); })

