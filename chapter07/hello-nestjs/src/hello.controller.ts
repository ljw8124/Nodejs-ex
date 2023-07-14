// Controller 와 Get 은 함수이면서 데코레이터
import {Controller, Get} from "@nestjs/common";

@Controller()       // 컨트롤러 데코레이터
export class HelloController {
    @Get()
    hello() {
        return "안녕하세요! NestJS 로 만든 첫 번째 애플리케이션 입니다.";
    }
}