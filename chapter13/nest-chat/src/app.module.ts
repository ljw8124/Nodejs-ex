import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './app.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway],   // 게이트웨이를 프로바이더로 등록 -> 컨트롤러 개념과 헷갈릴 수 있지만, 다른클래스에 주입해서 사용할 수 있는 프로바이더 이다.
})
export class AppModule {}
