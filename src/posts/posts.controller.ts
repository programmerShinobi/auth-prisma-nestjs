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
import PostControllerInterface from './interface/postsController.interface';
import { CreatePostDto } from './dto/posts.dto';
import { Response } from 'express';

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
  ): Promise<any> {
    return this.postsService.createPost(dto, res);
  }

  @Get()
  async getPaginatedPosts(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) : Promise<any> {
    return this.postsService.getPaginatedPosts(page, limit, res);
  }

  @Get('filter/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) : Promise<any> {
    return this.postsService.getFilteredPosts(page, limit, searchString, res);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string, @Res() res: Response): Promise<any> {
    return this.postsService.post(id, res);
  }

  @UseGuards(JwtAuthGuard)
  @Put('publish/:id')
  async publishPost(@Param('id') id: string, @Res() res: Response): Promise<any> {
    return this.postsService.publishPost(id, res);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string, @Res() res: Response): Promise<any> {
    return this.postsService.deletePost(id, res);
  }
}
