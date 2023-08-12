import {WebSocketGateway, WebSocketServer, SubscribeMessage} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';

// 웹소켓 서버 설정 데코레이터
// 파리머터로 포트 번호와 옵션을 넘길 수 있음
// 게이트웨이에 네임스페이스 추가
@WebSocketGateway({namespace: 'chat'})
export class ChatGateway {
    // 웹소켓 서버 인스턴스 선언
    @WebSocketServer() server: Server;

    // message 이벤트 구독
    @SubscribeMessage('message')
    handleMessage(socket: Socket, data: any): void {

        const {message, nickname} = data;

        // 접속한 클라이언트들에 메시지 전송
        // socket.io 에서는 모든 클라이언트 인스턴스에 임의의 id 값을 내려준다(20자)
        // this.server.emit('message', `client-${socket.id.substring(4, 5)} : ${data}`);

        // broadcast.emit() 을 이용하면 전송을 요청한 클라이언트를 제외하고 다른 클라이언트들에게 데이터를 전송하므로
        // 채팅을 할 때 내 메시지와 상대방 메시지를 구분하기 쉽다.
        socket.broadcast.emit('message', `${nickname}: ${message}`);
    }

}