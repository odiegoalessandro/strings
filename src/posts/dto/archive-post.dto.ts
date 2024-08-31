import { IsBoolean } from 'class-validator';

export class ArchivePostDto {
  @IsBoolean()
  isArchived: boolean;
}
