import http from "k6/http";

// 테스트 옵션을 설정
export const options = {
  vus: 100,           // 가상 유저를 설정하는 항목
  duration: "10s",    // 몇 초동안 테스트를 진행할 것인가 설정
};

export default function() {
  http.get("http://localhost:8000");  // 성능테스트시 실행될 함수. 즉 localhost:8000 에 get 요청을 계속 함
}

// 매수 단순한 서버 테스트로, vus 와 duration 을 변경하면서 테스트하여 예외상황을 대비할 수 있다.
// 자바스크립트는 싱글스레드이지만 동시에 여러 요청을 비동기로 처리할 수도 있다.