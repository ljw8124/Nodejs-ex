import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    // 의존성 주입
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async createUser(user): Promise<User> {
        return await this.userRepository.save(user);
    }

    async getUser(email: string) {
        const result = await this.userRepository.findOne({
            where: {email}
        });
        return result;
    }

    async updateUser(email, _user) {
        const user: User = await this.getUser(email);

        console.log(_user);

        user.username = _user.username;
        user.password = _user.password;
        console.log(user);

        await this.userRepository.save(user);
    }

    async deleteUser(email: any) {
        return await this.userRepository.delete({email});
    }

}
