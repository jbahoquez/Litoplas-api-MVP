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
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User} from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserPermissionDto } from '../dto/create-user-permission.dto';
import { UserPermissionEntity } from '../entities/user-permission.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from '../../auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  // @Public()
  @Get()
  getUsers(): Promise<User[]> {
    return this._userService.getUsers();
  }

  @Post()
  @ApiResponse({status:200, description: 'User Created'})
  @ApiResponse({status:404, description: 'Resorses Not Found'})
  //@ApiBody({name:'role'})
  addUser(@Body() body: CreateUserDto): Promise<User> {
    return this._userService.createUser(body);
  }

  @Put('/:id')
  @ApiResponse({status:200, description: 'User Updated'})
  @ApiResponse({status:404, description: 'Resorses Not Found'})
  //@HttpCode(HttpStatus.NO_CONTENT)
  updateUser(@Body() body: UpdateUserDto, @Param('id') id: number): Promise<User> {
    return this._userService.updateUser(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number):Promise<string> {
    await this._userService.deleteUser(id);
    return 'Usuario eliminado';
  }



  @Post('created-permission')
  @ApiResponse({status:200, description: 'User permission Created'})
  @ApiResponse({status:404, description: 'Resorses Not Found'})
  //@ApiBody({name:'role'})
  addUserPermission(@Body() body: CreateUserPermissionDto): Promise<UserPermissionEntity> {
    console.log(body)
    return this._userService.createUserPermission(body);
  }
}
