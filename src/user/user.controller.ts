import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import {UserService} from './user.service'
import {User, USER_ROLE} from './entity/user.entity'
import {CreateUserDto} from './dto/create-user.dto'


@Controller('user')
export class UserController {

    constructor(private _userService: UserService){}

    @Get()
    getUsers(): User[]{
       return this._userService.getUsers()
    }

    @Post()
    addUser(@Body() body:CreateUserDto): User{
        return this._userService.createUser(body)
    }

    @Put('/:id')
    updateUser(@Body() body: CreateUserDto, @Param('id') id: string) : User{
        const user = this._userService.getUserById(id);
        if(!user) return;
        return this._userService.updateUser(id,body);
            
        
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){
       const user = this._userService.getUserById(id);
       if(user){
            this._userService.deleteUser(id);
            return 'Usuario eliminado'
        }
    }
}
