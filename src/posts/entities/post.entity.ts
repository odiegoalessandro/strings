import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: number;
  body: string;
  isArchived: boolean;
  isDeleted: boolean;
  created_at: Date;
}
