import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
