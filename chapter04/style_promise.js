const DB = [];

function saveDB(user) {
  const oldDBSize = DB.length;
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
  const result = saveDB(user).then(sendEmail).then(getResult);

  // 이 단계에서는 아직 result 가 결과값을 가져오기도 전에 console.log 로 호출했기 때문에 'pending' 형태로 반환한다.
  console.log(result);

  return result;
}

const myUser = { email: 'ljw81242@naver.com', name: 'lee joungwoo2', age: '28 '}

const result = registerByPromise(myUser);

result.then(console.log);


// 여기서 registerByPromise 가 Promise 객체를 반환하므로 then 으로 사용 가능하다.