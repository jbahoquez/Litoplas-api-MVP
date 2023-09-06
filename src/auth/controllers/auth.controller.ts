import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async Login(@Req() req: Request){
    const user = req.user;
    console.log(user)
    return this.authService.generateJWT(user)
    //Agregate token generation
  }
  
}
