import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsNotEmpty,
  IsAlphanumeric,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username' })
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({ description: 'User password' })
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'User age' })
  @IsNumber()
  @Min(4)
  @Max(130)
  readonly age: number;

  @ApiProperty({ description: 'User group' })
  @IsArray()
  @IsOptional()
  readonly groups: string[];
}
