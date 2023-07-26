import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) { // 믹스인(mix-in)이라는 방법 -> 클래스의 일부만 확장하고 싶을 때 사용하는 방법
    constructor(private authService: AuthService) {
        // 기본값이 username 이므로 email 로 변경
        super({usernameField: 'email'});
    }

    // 유저정보의 유효성 검증
    async validate(email: string, password: string): Promise<any> {
        // 유효한 email 과 password 인지 점검
        const user = await this.authService.validateUser(email, password);

        if(!user) {
            return null;    // null 이면 401 에러 발생
        } else {
            return user;
        }

    }
}