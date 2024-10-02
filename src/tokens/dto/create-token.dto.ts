import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateTokenDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsString()
  @IsNotEmpty()
  idToken: string;
}
