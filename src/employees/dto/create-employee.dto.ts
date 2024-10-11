import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  birthDay: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  salary: string;

  @IsString()
  @IsNotEmpty()
  workingDay: string;

  @IsString()
  @IsNotEmpty()
  CCCD: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
