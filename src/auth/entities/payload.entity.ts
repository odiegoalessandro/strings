import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Payload {
  @ApiProperty({ example: 1 })
  @IsInt()
  sub: number;

  @ApiProperty({ example: 'john' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
