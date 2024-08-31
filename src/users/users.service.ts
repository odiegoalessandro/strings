import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PostEntity } from 'src/posts/entities/post.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllPostsByUserResponseDto } from './dto/find-all-posts-by-user.dto';
import { FindAllUsersResponseDto } from './dto/find-all-users-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

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
    const users = data.map((user) => plainToInstance(UserEntity, user));

    return {
      data: users,
      currentPage: page,
      totalPages,
      itemsPerPage: limit,
      totalItems,
    };
  }

  async findOne(id: number) {
    const user = await this.prismaService.users.findUnique({ where: { id } });
    return plainToInstance(UserEntity, user);
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
        include: { user: true },
      }),
      this.prismaService.post.count({
        where: { userId, isArchived: false, isDeleted: false },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const posts = data.map((post) => plainToInstance(PostEntity, post));

    return {
      data: posts,
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
