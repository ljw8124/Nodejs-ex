import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // 생성자에서 UserService 를 주입받음
    constructor(private userService: UserService) {}

    // 내부 메서드가 비동기 처리 하므로 async 로 선언
    async register(userDto: CreateUserDto) {
        // 이미 가입된 유저가 있는지 체크
        const user = await this.userService.getUser(userDto.email);

        if(user) {
            throw new HttpException(
                '해당 유저가 이미 존재합니다.',
                HttpStatus.BAD_REQUEST,
            );
        }

        // 패스워드 암호화
        const encrytedPassword = bcrypt.hashSync(userDto.password, 10);

        // DB 에 저장, 저장 중 에러가 발생한다면 서버 에러 발생하도록 코딩
        try {
            const user = await this.userService.createUser({
                ...userDto,
                password: encrytedPassword,
            });

            // 회원 가입 후 반환하는 값에는 password 를 주지 않음
            user.password = undefined;

            return user;
        } catch(err) {
            throw new HttpException('서버 에러', 500);
        }
    }
}
