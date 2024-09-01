import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'jonh@example.com' })
  @IsString()
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
