import { NestFactory } from '@nestjs/core';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  await app.listen(3000);
}
bootstrap();

// .html 파일을 직접 열어서 테스트 필요
// NestJS 에서는 정적 파일을 불러오는 기능을 제공하기 때문에, 두 가지 방법으로 가능하다.
// 1. 설정이 간단할 때는 express
// 2. 정밀한 설정을 원할 때는 server-static
