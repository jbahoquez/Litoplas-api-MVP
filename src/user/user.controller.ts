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
  getUsers(): Promise<User[]> {
    return this._userService.getUsers();
  }

  @Post()
  addUser(@Body() body: CreateUserDto): Promise<User> {
    return this._userService.createUser(body);
  }

  @Put('/:id')
  //@HttpCode(HttpStatus.NO_CONTENT)
  updateUser(@Body() body: CreateUserDto, @Param('id') id: number): Promise<User> {
    return this._userService.updateUser(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number):Promise<string> {
    await this._userService.deleteUser(id);
    return 'Usuario eliminado';
  }
}
