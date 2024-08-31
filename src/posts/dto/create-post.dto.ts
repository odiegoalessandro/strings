import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'content of your post' })
  @IsString()
  @IsNotEmpty()
  body: string;
}
