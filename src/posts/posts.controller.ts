import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreatePostDto } from './dto/posts.dto';
import { Response } from 'express';

interface PostControllerInterface {
  createPost(dto: CreatePostDto, res: Response): Promise<void>;
  getPaginatedPosts(res: Response): Promise<void>;
  getFilteredPosts(searchString: string, res: Response,): Promise<void>;
  getPostById(id: string, res: Response): Promise<void>;
  publishPost(id: string, res: Response): Promise<void>;
  deletePost(id: string, res: Response): Promise<void>;
}

@Controller({
  path: 'posts',
  version: '1'
})
export class PostsController implements PostControllerInterface {
  constructor(private readonly postsService: PostsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() dto: CreatePostDto,
    @Res() res: Response
  ): Promise<void> {
    const { title, content, authorEmail } = dto;
    await this.postsService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    }, res);
  }

  @Get()
  async getPaginatedPosts(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) : Promise<void> {
    await this.postsService.posts({
      page,
      limit,
      where: { published: true }
    }, res);
  }

  @Get('filter/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) : Promise<void> {
    await this.postsService.posts({
      page,
      limit,
      where: {
        AND: { published: true },
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          }
        ],
      },
    }, res);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string, @Res() res: Response): Promise<void> {
    await this.postsService.post({ id: id }, res);
  }

  @UseGuards(JwtAuthGuard)
  @Put('publish/:id')
  async publishPost(@Param('id') id: string, @Res() res: Response): Promise<void> {
    await this.postsService.publishPost({
      where: { id: id },
      data: { published: true }
    }, res);
  }

@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string, @Res() res: Response): Promise<void> {
    await this.postsService.deletePost({ id: id }, res);
  }
}
