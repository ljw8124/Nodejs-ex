import {Body, Controller, Get, Post, Request, Res, Response} from '@nestjs/common';
import { CreateUserDto } from "../user/user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    // AuthService 주입
    constructor(private authService: AuthService) {}

    @Post('register')
    // class-validator 가 자동으로 유효성 검증
    async getUser(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto);
        // authService 를 사용해 user 정보 저장
    }

    @Post('login')
    async login(@Request() req, @Response() res) {
        // validateUser 를 이용하여 유저 정보를 추출함
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );

        if(userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false,                    // 브라우저에서만 읽을 수 있도록 -> true 로 설정하는 것이 보안상 더 좋긴함
                maxAge: 1000 * 60 * 60 * 24 * 7,    // 유효기간 설정 1000 은 1초를 의미함 -> 1초 * 60 * 60 * 24 는 하루
            });
        }
        return res.send({message: 'login success'});
    }
}
