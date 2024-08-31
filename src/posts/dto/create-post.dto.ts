import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'content of your post' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;
}
