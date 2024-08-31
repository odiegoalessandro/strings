import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllPostsByUserResponseDto } from './dto/find-all-posts-by-user.dto';
import { FindAllUsersResponseDto } from './dto/find-all-users-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.users.create({ data: createUserDto });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<FindAllUsersResponseDto> {
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.prismaService.$transaction([
      this.prismaService.users.findMany({
        where: { isDeleted: false },
        skip,
        take: limit,
        orderBy: {
          id: 'desc',
        },
      }),
      this.prismaService.users.count({
        where: { isDeleted: false },
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
    return await this.prismaService.users.findUnique({ where: { id } });
  }

  async findPostsByUser(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<FindAllPostsByUserResponseDto> {
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.prismaService.$transaction([
      this.prismaService.post.findMany({
        where: { userId, isArchived: false, isDeleted: false },
        skip,
        take: limit,
      }),
      this.prismaService.post.count({
        where: { userId, isArchived: false, isDeleted: false },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      currentPage: page,
      itemsPerPage: limit,
      totalItems,
      totalPages,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.users.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
