import {Injectable} from "@nestjs/common";
import {PassportSerializer} from "@nestjs/passport";
import {UserService} from "../user/user.service";

@Injectable()
// PassportSerializer 상속받음
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) { // UserService 를 주입받음
        super();
    }

    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user.email);     // 세션에 저장할 정보
    }

    async deserializeUser(
        payload: any,
        done: (err: Error, payload: any) => void,
    ): Promise<any> {
        const user = await this.userService.getUser(payload);

        if(!user) {
            done(new Error("NO USER!"), null);
            return;
        }
        const {password, ...userInfo} = user;

        done(null, userInfo);
    }


}