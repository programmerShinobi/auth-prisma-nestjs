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
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import PostControllerInterface from './interface/postsController.interface';
import { CreatePostDto } from './dto/create/createPosts.dto';
import { Response } from 'express';
import PostsControllerDto from './dto/postsController.dto';


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
  ): Promise<Response<PostsControllerDto>> {
    const result = await this.postsService.createPost(dto);
    return res.status(201).send({
      message: "Data has been created",
      data: result
    })
  }

  @Get()
  async getPaginatedPosts(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) : Promise<Response<PostsControllerDto>> {
    const result = await this.postsService.getPaginatedPosts(page, limit);
    return res.status(200).send({
      message: "Data has been found",
      data: result
    })
  }

  @Get('filter/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) : Promise<Response<PostsControllerDto>> {
    const result = await this.postsService.getFilteredPosts(page, limit, searchString);
    return res.status(200).send({
      message: "Data has been found",
      data: result
    })
  }

  @Get(':id')
  async getPostById(@Param('id') id: string, @Res() res: Response): Promise<Response<PostsControllerDto>> {
    const result = await this.postsService.post(id);
    return res.status(200).send({
      message: "Data has been found",
      data: result
    }) 
  }

  @UseGuards(JwtAuthGuard)
  @Put('publish/:id')
  async publishPost(@Param('id') id: string, @Request() req, @Res() res: Response): Promise<Response<PostsControllerDto>> {
    const result = await this.postsService.publishPost(id, req.user.id);
    return res.status(200).send({
      message: "Data has been published",
      data: result
    })  
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string, @Request() req, @Res() res: Response): Promise<Response<PostsControllerDto>> {
    await this.postsService.deletePost(id, req.user.id);
    return res.status(204).send();
  }
}
