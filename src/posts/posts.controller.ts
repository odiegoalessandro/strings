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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FindAllPostsResponseDto } from './dto/find-all-posts-response.dto';
import { PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';

@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiResponse({ type: FindAllPostsResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.postsService.findAll(page, limit);
  }

  @ApiResponse({ type: [PostEntity] })
  @UseGuards(JwtAuthGuard)
  @Get('body')
  findByBody(@Query('body') body: string) {
    return this.postsService.findByBody(body);
  }

  @ApiResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Patch(':id/archive')
  async archivePost(@Param('id') id: number) {
    return this.postsService.archivePost(+id);
  }

  @ApiResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Patch(':id/unarchive')
  async unarchivePost(@Param('id') id: number) {
    return this.postsService.unarchivePost(+id);
  }
  @ApiResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
