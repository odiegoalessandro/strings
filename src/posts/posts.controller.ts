import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FindAllPostsResponseDto } from './dto/find-all-posts-response.dto';
import { PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<FindAllPostsResponseDto> {
    return this.postsService.findAll(page, limit);
  }

  @Get('body')
  findByBody(@Query('body') body: string): Promise<PostEntity[]> {
    return this.postsService.findByBody(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(+id);
  }
  @Patch(':id/archive')
  async archivePost(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.archivePost(Number(id));
  }

  @Patch(':id/unarchive')
  async unarchivePost(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.unarchivePost(Number(id));
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.remove(+id);
  }
}
