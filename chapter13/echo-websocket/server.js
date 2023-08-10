const WebSocket = require('ws');                      // ws 패키지 임포트
const server = new WebSocket.Server({ port: 3000 });  // 서버 인스턴스 생성

// 서버접속 이벤트 핸들러
server.on('connection', ws => {
  console.log('[서버 접속 완료]');

  // 클라이언트 접속 시 클라이언트로 메시지를 보냄
  ws.send('[서버 접속 완료]');

  // 클라이언트에서 메시지가 수신된 경우의 이벤트 핸들러
  ws.on('message', message => {
    ws.send(`서버로 부터 응답 ${message}`);
  });

  // 클라이언트 접속 종료 시 이벤트
  ws.on('close', () => {
    console.log('클라이언트 접속 해제');
  });

});

/** WebSocketServer 의 이벤트
 * -close: 서버가 close 될 때 발생하는 이벤트
 * -connection: 핸드세이크가 완료되면 발생하는 이벤트
 * -error: 서버에서 에러가 발생하면 발생하는 이벤트
 * -headers: 응답의 헤더가 핸드쉐이크로 소켓에 기록되지 전에 발생하는 이벤트, 헤더를 보내기전에 검사, 수정을 할 수 있음
 * -listening: 서버가 바인딩되었을 때 발생하는 이벤트
 * -wsClientError: WebSocket 연결이 되기 전에 에러가 나면 발생하는 이벤트
 **/

/** WebSocket 의 이벤트
 * -close: 연결을 닫을 때 발생하는 이벤트
 * -error: 에러가 나면 발생하는 이벤트
 * -message: 메시지를 수신할 때 발생되는 이벤트
 * -open: 서버와 연결이 되면 발생하는 이벤트
 * -ping: 서버에서 ping 을 수신하면 발생
 * -pong: 서버에서 pong 을 수신하면 발생
 * -redirect: 리디렉션을 하기 전에 발생하는 이벤트
 * -unexpected-response: 서버 응답이 예상한 응답이 아닐 때(예시: 401 응답) 발생하는 이벤트
 * -upgrade: 핸드쉐이크의 일부러 서버에서 응답 헤더를 수신할 때 발생하는 이벤트
 */