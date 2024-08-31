import { IsInt } from 'class-validator';
import { PostEntity } from '../entities/post.entity';

export class FindAllPostsResponseDto {
  @IsInt()
  currentPage: number;

  @IsInt()
  totalPages: number;

  @IsInt()
  itemsPerPage: number;

  @IsInt()
  totalItems: number;

  data: PostEntity[];
}
