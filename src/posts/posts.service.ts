import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: createPostDto,
      include: { user: true },
    });
    return plainToInstance(PostEntity, post);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.prismaService.$transaction([
      this.prismaService.post.findMany({
        where: { isArchived: false, isDeleted: false },
        skip,
        take: limit,
        orderBy: {
          id: 'desc',
        },
        include: { user: true },
      }),
      this.prismaService.post.count({
        where: { isArchived: false, isDeleted: false },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const posts = data.map((post) => plainToInstance(PostEntity, post));

    return {
      data: posts,
      currentPage: page,
      totalPages,
      itemsPerPage: limit,
      totalItems,
    };
  }

  async findOne(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id, isDeleted: false, isArchived: false },
      include: { user: true },
    });

    return plainToInstance(PostEntity, post);
  }

  async findByBody(body: string) {
    const posts = await this.prismaService.post.findMany({
      where: {
        body: {
          contains: body,
          mode: 'insensitive',
        },
        isDeleted: false,
        isArchived: false,
      },
      include: { user: true },
    });

    return posts.map((post) => plainToInstance(PostEntity, post));
  }

  async archivePost(id: number) {
    const updatedPost = await this.prismaService.post.update({
      where: { id },
      data: { isArchived: true },
      include: { user: true },
    });

    return plainToInstance(PostEntity, updatedPost);
  }

  async unarchivePost(id: number) {
    const updatedPost = await this.prismaService.post.update({
      where: { id },
      data: { isArchived: false },
      include: { user: true },
    });

    return plainToInstance(PostEntity, updatedPost);
  }

  async remove(id: number) {
    const updatedPost = await this.prismaService.post.update({
      where: { id },
      data: { isDeleted: true },
      include: { user: true },
    });

    return plainToInstance(PostEntity, updatedPost);
  }
}
