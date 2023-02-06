import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationUserQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  loginSubstring: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  limit: number;
}
