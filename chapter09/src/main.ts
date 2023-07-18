import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);       // 생성자로 의존성 주입을 할 수가 없어서 get 으로 가져옴
  await app.listen(configService.get("SERVER_PORT")); // configService 사용
}
bootstrap();
