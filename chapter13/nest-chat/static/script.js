// socket.io 인스턴스생성
// 네임스페이스 추가
// 네임스페이스는 복잡한 프로그램을 만들 시에 반드시 필요하다고 할 수 있다.
const socket = io('http://localhost:3000/chat');

// 채팅방용 네임스페이스 설정
const roomSocket = io('http://localhost:3000/room');

// 채팅방 초깃값
let currentRoom = '';

// prompt 는 사용자에게 값을 받고 변수에 할당한다.
const nickname = prompt('닉네임을 입력해주세요.');

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', {room, nickname});
}

roomSocket.on("rooms", (dataArr) => {
  console.log(dataArr);

  // 채팅방 갱신시 일단 리스트를 비움
  const roomDiv = document.querySelector('#rooms');

  while(roomDiv.firstChild)  {
    roomDiv.removeChild(roomDiv.firstChild);
  }

  dataArr.forEach((data) => {
    const chatView = document.createElement('li');
    const textNode = document.createTextNode(data);

    chatView.appendChild(textNode);

    const joinBtn = document.createElement('button');
    joinBtn.value = data;
    joinBtn.innerText = 'join';
    joinBtn.addEventListener('click', joinRoom);

    chatView.appendChild(joinBtn);

    roomDiv.append(chatView);
  });

});

// 전송 버튼 클릭시 입력된 글을 message 로 보냄
function sendMessage() {
  if(currentRoom === '') {
    alert('방을 선택해주세요.');
    return;
  }

  const message = document.querySelector('#message').value;
  const data = {message, nickname, room: currentRoom};

  const chatView = document.querySelector('#chat');
  const divEle = document.createElement('div');

  divEle.innerHTML = `나: ${message}`;

  chatView.appendChild(divEle);

  // RoomGateway 로 메시지 보내기
  roomSocket.emit('message', data);
  return false;

}

// 방에 들어가면 기존에 있던 방에서 나가기
function joinRoom(data) {

  const room = data.target.value;

  roomSocket.emit('joinRoom', {room, nickname, toLeaveRoom: currentRoom});

  // 채팅방이동시 기존 대화기록 삭제
  document.querySelector('#chat').innerHTML = '';

  currentRoom = room;

}

socket.on('connect', () => {
  console.log('chat server connect!');
});

roomSocket.on('message', (data) => {

  console.log(data);

  const chatDiv = document.querySelector('#chat');

  const divEle = document.createElement('div');
  const messageNode = document.createTextNode(data.message);

  divEle.append(messageNode);
  chatDiv.appendChild(divEle);

});

// notice 이벤트를 받아서 처리
socket.on('notice', (data) => {
  const noticeView = document.querySelector('#notice');

  const divEle = document.createElement('div');
  const messageNode = document.createTextNode(data.message);

  divEle.append(messageNode);
  noticeView.appendChild(divEle);

});