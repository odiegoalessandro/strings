import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'jonh@example.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '134223' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'john' })
  @IsString()
  @IsNotEmpty()
  username: string;
}
