import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payload } from 'src/auth/entities/payload.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FindAllPostsResponseDto } from 'src/posts/dto/find-all-posts-response.dto';
import { FindAllUsersResponseDto } from './dto/find-all-users-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { RequestWithUser } from './entities/user.interface';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ type: FindAllUsersResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<FindAllUsersResponseDto> {
    return this.usersService.findAll(page, limit);
  }

  @ApiResponse({ type: Payload })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getUserProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @ApiResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(+id);
  }

  @ApiResponse({ type: FindAllPostsResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get(':id/posts')
  findPostsByUser(
    @Param('id') id: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.usersService.findPostsByUser(+id, page, limit);
  }

  @ApiResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.remove(+id);
  }
}
