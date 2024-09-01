import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @ApiProperty({ required: false, example: 1725163392 })
  @IsOptional()
  @IsNumber()
  iat?: number;

  @ApiProperty({ required: false, example: 1725249792 })
  @IsOptional()
  @IsNumber()
  exp?: number;
}
