import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
              private readonly jwtService: JwtService){}

  public async validateUser(username: string, password: string){
    const user=await this.userService.getUserBy({
      key:'email',
      value:username
    });

    if(!user) throw new BadRequestException('Resource not fund');
    const match = await bcrypt.compare(password, user.password);
    if(match) return user;

    return null
  }

  generateJWT(user){
    const payload={...user}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
  
}
