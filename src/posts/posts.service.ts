import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePostParamsDto } from './dto/create/createPosts.dto'; 
import PostServiceInterface from './interface/postsService.interface';
import { GetPostsFunctionDto, GetPostsParamsDto } from './dto/get/getPosts.dto';
import { ItemPostDto } from './dto/items/itemsPost.dto';

@Injectable()
export class PostsService implements PostServiceInterface{
  constructor(private prisma: PrismaService) {}

  async getPosts(dto: GetPostsParamsDto): Promise<GetPostsFunctionDto> {
    const { search, page, limit, cursor, orderBy } = dto;
    const where = search
      ? {
          AND: { published: true },
          OR: [
            { title: { contains: search } },
            { content: { contains: search } },
          ],
        }
      : { AND: { published: true } };

    try {
      const skip = (page - 1) * limit;
      const [items, totalItems] = await Promise.all([
        this.prisma.post.findMany({
          skip,
          take: limit,
          cursor,
          orderBy,
          where,
        }),
        this.prisma.post.count({ where }),
      ]);

      if (totalItems < 1) throw new NotFoundException();

      const pageCount = Math.ceil(totalItems / limit);
      const data: GetPostsFunctionDto = { items, totalItems, pageCount };
      return data;
    } catch (err) {
      throw new NotFoundException(err.response);
    }
  }

  async getPostById(postId: string): Promise<ItemPostDto> {
    const postWhereUniqueInput: Prisma.PostWhereUniqueInput = { id: postId };
    try {
      const result = await this.prisma.post.findUnique({
        where: postWhereUniqueInput,
      });

      if (!result) throw new NotFoundException();
      return result;
    } catch(err) {
      throw new NotFoundException(err.response)
    };
  }

  async createPost(dto: CreatePostParamsDto, userEmail: string): Promise<ItemPostDto> {
    const { title, content } = dto;
    const data: Prisma.PostCreateInput = {
      title,
      content,
      author: {
        connect: { email: userEmail }
      },
    };
    try {
      const result = await this.prisma.post.create({ data });
      return result;
    } catch(err) {
      throw new BadRequestException(err.response)
    };
  }

  async publishPost(postId: string, userId: string): Promise<ItemPostDto> {
    const params: {
      where: Prisma.PostWhereUniqueInput;
      data: Prisma.PostUpdateInput;
    } = {
      where: {
        id: postId,
        authorId: userId
      },
      data: { published: true }
    }
    const { data, where } = params;

    try{
      const result = await this.prisma.post.update({
        data,
        where,
      });

      if (!result) throw new BadRequestException();

      return result;
    } catch (err){
      throw new BadRequestException(err.response)
    }
    
  }

  async deletePost(postId: string, userId: string): Promise<ItemPostDto> {
    const where: Prisma.PostWhereUniqueInput = {
      id: postId,
      authorId: userId
    };
    try {
      const result = await this.prisma.post.delete({
        where,
      });
      if (!result) throw new BadRequestException();
      return result;
    } catch (err)  {
      throw new BadRequestException(err.response);
    };
  }
}