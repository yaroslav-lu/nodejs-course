import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @IsOptional()
  readonly id: string;

  @ApiProperty({ description: 'User login' })
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
