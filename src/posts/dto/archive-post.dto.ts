import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ArchivePostDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  isArchived: boolean;
}
