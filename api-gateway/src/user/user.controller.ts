import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('/user')
    createUser(@Body() data: any) {
        return this.userService.createUser(data);
    }

}
