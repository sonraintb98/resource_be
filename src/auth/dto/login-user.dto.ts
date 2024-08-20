import { IsEmail, IsString } from '@nestjs/class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
