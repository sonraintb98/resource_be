import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/common/enums/role.enum';
import { PaginationDto } from 'src/shared/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(RoleGuard([Role.Admin]))
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard([Role.Admin]))
  @Get('getAllUsers')
  async findAll(@Query() query: PaginationDto) {
    return this.usersService.getAllUsers(query);
  }

  @UseGuards(RoleGuard([Role.Admin]))
  @Post('updateUser')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  @UseGuards(RoleGuard([Role.Admin]))
  @Delete(':email')
  async remove(@Param('email') email: string) {
    console.log('email:', email);
    return this.usersService.remove(email);
  }
}
