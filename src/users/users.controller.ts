import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogoutUserDto } from './dto/logout-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.signup(createUserDto);
    return user;
  }

  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.signin(
      loginUserDto.email,
      loginUserDto.password,
    );
    return user;
  }

  @Post('signout')
  async signout(@Body() body: LogoutUserDto) {
    return await this.usersService.signout(body);
  }

  @Get('getAllUsers')
  async findAll() {
    return this.usersService.getAllUsers();
  }

  @Post('updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    console.log('email:', email);
    return this.usersService.remove(email);
  }
}
