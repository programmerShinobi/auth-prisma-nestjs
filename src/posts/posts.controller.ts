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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import PostControllerInterface from './interface/postsController.interface';
import { CreatePostParamsDto } from './dto/create/createPosts.dto';
import { Response } from 'express';
import PostsControllerDto from './dto/postsController.dto';
import { UserId } from './decorators/user-id.decorator';
import { UserEmail } from './decorators/user-email.decorator';
import { GetPostsParamsDto } from './dto/get/getPosts.dto';

@Controller({
  path: 'posts',
  version: '1'
})
export class PostsController implements PostControllerInterface {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  async getPosts(
    @Query() dto: GetPostsParamsDto,
    @Res() res: Response,
  ): Promise<Response<PostsControllerDto>> {
    const result = await this.postsService.getPosts(dto);
    return res.status(200).send({
      message: "Data has been found",
      data: result
    });
  }

  @Get(':id')
  async getPostById(@Param('id') postId: string, @Res() res: Response): Promise<Response<PostsControllerDto>> {
    const result = await this.postsService.getPostById(postId);
    return res.status(200).send({
      message: "Data has been found",
      data: result
    }) 
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() dto: CreatePostParamsDto,
    @UserEmail() userEmail: string,
    @Res() res: Response
  ): Promise<Response<PostsControllerDto>> {
    const result = await this.postsService.createPost(dto, userEmail);
    return res.status(201).send({
      message: "Data has been created",
      data: result
    })
  }

  @UseGuards(JwtAuthGuard)
  @Put('publish/:id')
  async publishPost(@Param('id') postId: string, @UserId() userId: string, @Res() res: Response): Promise<Response<PostsControllerDto>> {
    const result = await this.postsService.publishPost(postId, userId);
    return res.status(200).send({
      message: "Data has been published",
      data: result
    })  
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') postId: string, @UserId() userId: string, @Res() res: Response): Promise<Response<PostsControllerDto>> {
    await this.postsService.deletePost(postId, userId);
    return res.status(204).send();
  }
}
