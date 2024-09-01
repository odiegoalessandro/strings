import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, example: 'john132@example.com' })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({ required: false, example: '1341234' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiProperty({ required: false, example: 'john123' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;
}
