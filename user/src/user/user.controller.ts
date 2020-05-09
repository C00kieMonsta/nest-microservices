import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UserService } from './user.service';
import { User } from './user.entity';
import { InsertResult } from 'typeorm';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    // create user
    @MessagePattern({ role: 'user', cmd: 'create' })
    async create(data: any): Promise<InsertResult> {
        const u = new User();
        u.createdAt = new Date();
        u.email = data.email;
        u.password = data.password;
        u.name = data.name;
        u.username = data.username;
        return this.userService.createUser(u);
    }

    // connect
    @MessagePattern({ role: 'user', cmd: 'get' })
    getUser(data: any): Promise<User> {
        return this.userService.findOne({ username: data.username });
    }

    // greetings
    @MessagePattern({ role: 'user', cmd: 'greet' })
    async greet(_: any): Promise<string> {
        return 'Greetings authenticated user';
    }

}
