import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'john' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
