import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class FindAllUsersResponseDto {
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

  @ApiProperty({ type: [UserEntity] })
  data: UserEntity[];
}
