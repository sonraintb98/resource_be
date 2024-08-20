import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.signin(
      loginUserDto.email,
      loginUserDto.password,
    );
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  async getAllRoles() {
    console.log('Hello Son Ngu');
  }
}
