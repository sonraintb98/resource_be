import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsString()
  @IsNotEmpty()
  activated: boolean;

  @IsString()
  @IsNotEmpty()
  role: number;

  @IsString()
  @IsOptional()
  lastLogin?: string;
}
