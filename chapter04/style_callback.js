const DB = [];

// 회원 가입 API 함수
function register(user) {
  return saveDB(user, function(user) {      // callback
    return sendEmail(user, function(user) { // callback
      return getResult(user);               // callback
    })
  })
}

// DB 에 user 를 저장하고 콜백함수 실행
function saveDB(user, callback) {
  DB.push(user);
  console.log(`save ${user.name} to DB`);
  if(callback) return callback(user);
}

// DB 저장 후, 이메일 보내고 콜백함수 실행
function sendEmail(user, callback) {
  console.log(`email to ${user.email}!`);
  if(callback) return callback(user);
}

// 모든 프로세스가 끝난 후 실행되는 마지막 단계 함수
function getResult(user) {
  console.log(`Welcome ${user.name}!! SignIn complete!!`);
}

const result = register({
  email: "ljw8124@naver.com",
  password: "1234",
  name: "lee joungwoo"
});

console.log(result);