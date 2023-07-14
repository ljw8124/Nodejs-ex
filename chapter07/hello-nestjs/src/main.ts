import {NestFactory} from "@nestjs/core";
import {HelloModule} from "./hello.module";

const port = 3000;

// NestJS 시작하는 함수
async function bootstrap() {
    // NestFactory 를 사용해서 NestApplication 을 생성
    const app = await NestFactory.create(HelloModule);

    // 특정 포트로 실행
    await app.listen(port, () => console.log("Server start!!"));
}

bootstrap();

// ts 로 바로 실행하기 이ㅜ해서는 ts-node-dev 라는 패키지가 필요하다.
