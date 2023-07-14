import {Module} from "@nestjs/common";
import {HelloController} from "./hello.controller";

// Module 은 모듈을 설정할 때 사용하는 데코레이터 이다.
// 아래와 같이 설정을 해줄 수 있는데, 여기서는 Controller 설정만 한다.
@Module({
    controllers: [HelloController],
})

export class HelloModule {}