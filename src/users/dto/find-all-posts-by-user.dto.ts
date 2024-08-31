import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { PostEntity } from 'src/posts/entities/post.entity';

export class FindAllPostsByUserResponseDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  currentPage: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  totalPages: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  itemsPerPage: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  totalItems: number;

  @ApiProperty({ type: [PostEntity] })
  data: PostEntity[];
}
