import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from '../enums/perminssion.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsArray()
  readonly permissions: Permission[];
}
