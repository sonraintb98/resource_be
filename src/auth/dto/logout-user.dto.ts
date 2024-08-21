import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class LogoutUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
