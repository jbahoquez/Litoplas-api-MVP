import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'email',
        })
    }
    async validate(username: string, password: string){
        const user = await this.authService.validateUser(username,password);
        if(!user) throw new UnauthorizedException();
        return user;
    }
}