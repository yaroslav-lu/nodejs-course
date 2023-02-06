import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  readonly users: string[];
}
