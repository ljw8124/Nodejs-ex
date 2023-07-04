const DB = [];

function saveDB(user) {
  const oldDBSize = DB.length + 1;
  DB.push(user);
  console.log(`save ${user.name} to DB`);

  return new Promise((resolve, reject) => {   // 콜백 대신 promise 객체로 생성

    if(DB.length > oldDBSize) {
      resolve(user);                          // 성공시 user 를 파라미터로 넘기는 함수 실행
    } else {
      reject(new Error(`Save DB Error!!`));
    }
  });
}

function sendEmail(user) {
  console.log(`email to ${user.name}`);

  return new Promise((resolve) => {           // 실패 처리가 없도록 설정
    resolve(user);
  });
}

function getResult(user) {
  return new Promise((resolve) => {
    resolve(`Welcome ${user.name}!! SignIn Complete!!`);
  });
}

function registerByPromise(user) {
  // 비동기 호출이지만 순서를 지켜서 실행됨
  const result = saveDB(user)
      .then(sendEmail)
      .then(getResult)
      .catch(error => new Error(error))
      .finally(() => console.log('process done!!'));

  // 이 단계에서는 아직 result 가 결과값을 가져오기도 전에 console.log 로 호출했기 때문에 'pending' 형태로 반환한다.
  console.log(result);

  return result;
}

const myUser = { email: 'ljw8124@naver.com', name: 'lee joungwoo', age: '28'}

const result = registerByPromise(myUser);

result.then(console.log);


// 여기서 registerByPromise 가 Promise 객체를 반환하므로 then 으로 사용 가능하다.


// ----------------------------------------------------------------------------------------------------

// 동시에 여러 promise 호출하기
//  const allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
//
//  allResult.then(console.log);


// JS 에서 promise 방식은 then() 과 catch() 를 이용하여 체이닝 방식으로 코딩을 해야하기 때문에 만만하지 않다
// 거기에 더 복잡한 로직을 추가하고 예외처리 까지 해야하는 상황이 온다면 코딩하기가 더욱 힘들어진다.