import { IsInt, IsOptional } from '@nestjs/class-validator';
export class PaginationDto {
  @IsInt()
  @IsOptional()
  page: number;

  @IsInt()
  @IsOptional()
  limit: number;

  // un-used
  @IsOptional()
  start: string;
}
