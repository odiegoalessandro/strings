import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.prismaService.post.create({ data: createPostDto });
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
      }),
      this.prismaService.post.count({
        where: { isArchived: false, isDeleted: false },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      currentPage: page,
      totalPages,
      itemsPerPage: limit,
      totalItems,
    };
  }

  async findOne(id: number) {
    return await this.prismaService.post.findUnique({
      where: { id, isDeleted: false, isArchived: false },
    });
  }

  async findByBody(body: string) {
    return await this.prismaService.post.findMany({
      where: {
        body: {
          contains: body,
          mode: 'insensitive',
        },
        isDeleted: false,
        isArchived: false,
      },
    });
  }

  async archivePost(id: number) {
    return await this.prismaService.post.update({
      where: { id },
      data: { isArchived: true },
    });
  }

  async unarchivePost(id: number) {
    return await this.prismaService.post.update({
      where: { id },
      data: { isArchived: false },
    });
  }

  async remove(id: number) {
    return await this.prismaService.post.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
