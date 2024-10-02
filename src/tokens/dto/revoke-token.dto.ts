import { IsOptional, IsString } from '@nestjs/class-validator';
import { PickType } from '@nestjs/mapped-types';
import { CreateTokenDto } from './create-token.dto';

export class RevokeTokenDto extends PickType(CreateTokenDto, ['email']) {
  @IsString()
  @IsOptional()
  refreshToken: string;

  @IsString()
  @IsOptional()
  idToken: string;
}
