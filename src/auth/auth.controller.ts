import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LogoutUserDto } from './dto/logout-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.signin(loginUserDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signout(@Body() body: LogoutUserDto) {
    return await this.authService.signout(body);
  }
}
