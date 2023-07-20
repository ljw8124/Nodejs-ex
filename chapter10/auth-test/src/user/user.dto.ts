import {IsEmail, IsString} from "class-validator";
// IsEmail 은 이메일인지 검증, IsString 은 문자열이 들어갈 수 있도록 해줌
// 그 밖에... IsEmpty(): null 또는 undefined 인지 검 등 많은 기능이 class-validator 에 내장되어있음

// email, password, username 필드를 만들고 데코레이터 붙이기
export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    username: string;
}

// 업데이트의 유효성 검증 시 사용할 DTO
export class UpdateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}