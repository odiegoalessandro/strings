import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';

export class PostEntity implements Post {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'content' })
  body: string;

  @ApiProperty({ example: false })
  isArchived: boolean;

  @ApiProperty({ example: false })
  isDeleted: boolean;

  @ApiProperty({ example: '2024-08-31T02:50:29.691Z' })
  created_at: Date;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ type: UserEntity })
  @ValidateNested()
  @Type(() => UserEntity)
  user: UserEntity;
}
