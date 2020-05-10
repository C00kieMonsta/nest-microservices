import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    createUser(@Body() data: any) {
        return this.userService.createUser(data);
    }

    @Get(`:username`)
    findByUsername(@Param('username') username: string) {
        return this.userService.getUser(username);
    }

}
