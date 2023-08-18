import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, USER_ROLE } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this._userService.getUsers();
  }

  @Post()
  addUser(@Body() body: CreateUserDto): User {
    return this._userService.createUser(body);
  }

  @Put('/:id')
  //@HttpCode(HttpStatus.NO_CONTENT)
  updateUser(@Body() body: CreateUserDto, @Param('id') id: string): User {
    const user = this._userService.getUserById(id);
    if (!user) throw new BadRequestException('User not found');
    //if(!user) throw new ForbiddenException('User not found');
    return this._userService.updateUser(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    const user = this._userService.getUserById(id);
    if (!user) throw new BadRequestException('User not found');

    this._userService.deleteUser(id);
    return 'Usuario eliminado';
  }
}
