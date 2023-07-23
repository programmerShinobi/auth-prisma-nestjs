import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create/createPosts.dto'; 
import PostServiceInterface from './interface/postsService.interface';
import { GetPosts } from './dto/get/getPosts.dto';
import { ItemPostDto } from './dto/items/itemsPost.dto';

@Injectable()
export class PostsService implements PostServiceInterface{
  constructor(private prisma: PrismaService) {}
  
  // async posts(
  //   params: {
  //     page: number; limit: number; where?: any; cursor?: Prisma.PostWhereUniqueInput;
  //     orderBy?: Prisma.PostOrderByWithRelationInput;
  //   }
  // ): Promise<any> {
  //   const { page, limit, where, cursor, orderBy } = params;
  //   await this.prisma.post.findMany({
  //     skip: (page - 1) * limit,
  //     take: limit,
  //     cursor,
  //     orderBy,
  //     where,
  //   }).then(async(result: any) => {
  //     const [items, totalItems] = await Promise.all([
  //       result,
  //       this.prisma.post.count({ where }),
  //     ]);

  //     if (totalItems < 1) {
  //       throw new NotFoundException("Data not found")
  //     }

  //     const pageCount = Math.ceil(totalItems / limit);

  //     return {
  //       message: "Data has been found",
  //       data: { items, totalItems, pageCount }
  //     };
  //   }).catch((err) => {
  //     throw new NotFoundException(err.response);
  //   });
  // }

  async getPosts(search: string | null, page: number, limit: number): Promise<GetPosts> {
    let where = {};
    if (search) {
      where = {
        AND: { published: true },
        OR: [
          {
            title: { contains: search },
          },
          {
            content: { contains: search },
          }
        ],
      };
    } else {
      where = {
        AND: { published: true }
      };
    }
    
    try {
      const [items, totalItems] = await Promise.all([
        this.prisma.post.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where,
        }),
        this.prisma.post.count({ where }),
      ]);

      if (totalItems < 1) throw new NotFoundException();

      const pageCount = Math.ceil(totalItems / limit);
      const data: GetPosts = { items, totalItems, pageCount };
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

  async createPost(dto: CreatePostDto, userEmail: string): Promise<ItemPostDto> {
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