import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    const message = this.configService.get("MESSAGE");
    return message;
  }

  @Get('service-url')
  getServiceUrl(): string {
    console.log(this.configService.get('SERVICE_URL'));
    return this.configService.get('SERVICE_URL');
  }
  // 라우팅 정보
  @Get('db-info')
  getTest(): string {
    console.log(this.configService.get('logLevel'));      // logLevel 터미널에 출력
    console.log(this.configService.get('apiVersion'));    // apiVersion 터미널에 출력
    return this.configService.get('dbInfo');              // 웹브라우저에 dbInfo 표시
  }

  // 확장 변수 테스트
  @Get('server-url')
  getServerUrl(): string {
    return this.configService.get('SERVER_URL');          // 확장 변숫값 읽기
  }
}
