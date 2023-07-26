import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {AuthService} from "./auth.service";

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(private authService: AuthService) {}

    // CanActivate 인터페이스의 메서드
    async canActivate(context: any): Promise<boolean> {
        // 컨텍스트에서 리퀘스트 정보를 가져옴
        const request = context.switchToHttp().getRequest();

        // 쿠키가 있다면, 인증된 것임
        if(request.cookies['login']) {
            return true;
        }
        if(!request.body.email || !request.body.password) {
            return false;
        }

        // 인증 로직은 기존의 authService.validateUser 사용
        const user = await this.authService.validateUser(
            request.body.email,
            request.body.password,
        );

        // 유저 정보가 없으면 false 반환
        if(!user) {
            return false;
        }

        // 있으면 request 에 user 정보를 추가하고 true 반환
        request.user = user;
        return true;
    }

}


// CanActivate 를 구현했으면 가드로 취급한다
// 여기서 주의할 점은 가드 내에서 응답에 쿠키를 설정할 수는 없다는 것이다.
// 또한 가드는 모든 미들웨어의 실행이 끝난 다음에 실행되며, filter 나 pipe 보다는 먼저 실행된다.


// 로그인 시 사용할 가드와 인증 확인 시 사용할 가드를 각각 만듦
// 세션을 저장하는 부분과 세션에서 정보를 읽는 부분은 session.serializer.ts 에 작성 예정
@Injectable()
// AuthGuard 상속
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: any): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;

        // 로컬 스토리지 저장
        const request = context.switchToHttp().getRequest();
        // 세션에 저장
        await super.logIn(request);

        return result;
    }
}

@Injectable()
export class AuthenticateGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        // 세션에서 정보를 읽어서 인증 확인
        return request.isAuthenticated();
    }
}