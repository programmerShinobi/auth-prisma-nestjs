import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { CreatePostDto } from './dto/posts.dto';

interface PostServiceInterface {
  createPost(
    dto: CreatePostDto,
    res: Response
  ): Promise<void>;
  getPaginatedPosts(
    page: number,
    limit: number,
    res: Response
  ): Promise<void>;
  getFilteredPosts(
    page: number,
    limit: number,
    searchString: string,
    res: Response
  ): Promise<void>;
  post(
    idString: string,
    res: Response
  ): Promise<void>;
  publishPost(
    idString: string,
    res: Response
  ): Promise<void>;
  deletePost(idString: string, res: Response): Promise<void>;
}

@Injectable()
export class PostsService implements PostServiceInterface{
  constructor(private prisma: PrismaService) {}

  async createPost(
    dto: CreatePostDto,
    res: Response
  ): Promise<void> {
    const { title, content, authorEmail } = dto;
    const data: Prisma.PostCreateInput = {
      title,
      content,
      author: {
        connect: { email: authorEmail }
      }
    }
    await this.prisma.post.create({
      data,
    }).then((result) => {
      return res.status(HttpStatus.CREATED).send({
        message: "Data has been created",
        data: result
      });
    }).catch((err) => {
      throw new BadRequestException(err.response)
    });
  }
  
  async posts(
    params: {
      page: number; limit: number; where?: any; cursor?: Prisma.PostWhereUniqueInput;
      orderBy?: Prisma.PostOrderByWithRelationInput;
    },
    res: Response
  ): Promise<void> {
    const { page, limit, where, cursor, orderBy } = params;
    await this.prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      cursor,
      orderBy,
      where,
    }).then(async(result: any) => {
      const [items, totalItems] = await Promise.all([
        result,
        this.prisma.post.count({ where }),
      ]);

      if (totalItems < 1) {
        throw new NotFoundException("Data not found")
      }

      const pageCount = Math.ceil(totalItems / limit);

      return res.status(HttpStatus.OK).send({
        message: "Data has been found",
        data: { items, totalItems, pageCount }
      });
    }).catch((err) => {
      throw new NotFoundException(err.response);
    });
  }

  async getPaginatedPosts(
    page: number,
    limit: number,
    res: Response
  ): Promise<void> {
    const where = { published: true };
    await this.prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
    }).then(async(result) => {
      const [items, totalItems] = await Promise.all([
        result,
        this.prisma.post.count({ where }),
      ]);

      if (totalItems < 1) {
        throw new NotFoundException("Data not found")
      }

      const pageCount = Math.ceil(totalItems / limit);

      return res.status(HttpStatus.OK).send({
        message: "Data has been found",
        data: { items, totalItems, pageCount }
      });
    }).catch((err) => {
      throw new NotFoundException(err.response);
    });
  }

  async getFilteredPosts(
    page: number,
    limit: number,
    searchString: string,
    res: Response
  ): Promise<void> {
    const where = { 
      AND: { published: true },
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          }
        ],
     };
    await this.prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
    }).then(async(result: any) => {
      const [items, totalItems] = await Promise.all([
        result,
        this.prisma.post.count({ where }),
      ]);

      if (totalItems < 1) {
        throw new NotFoundException("Data not found")
      }

      const pageCount = Math.ceil(totalItems / limit);

      return res.status(HttpStatus.OK).send({
        message: "Data has been found",
        data: { items, totalItems, pageCount }
      });
    }).catch((err) => {
      throw new NotFoundException(err.response);
    });
  }

  async post(
    idString: string,
    res: Response
  ): Promise<void> {
    const postWhereUniqueInput: Prisma.PostWhereUniqueInput = {id: idString};
    await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    }).then((result: any) => {
      if (!result) {
        throw new NotFoundException("Data not found")
      }
      return res.status(HttpStatus.OK).send({
        message: "Data has been found",
        data: result
      });
    }).catch((err) => {
      throw new NotFoundException(err.response)
    });
  }

  async publishPost(
    idString: string,
    res: Response
  ): Promise<void> {

    const params: {
      where: Prisma.PostWhereUniqueInput;
      data: Prisma.PostUpdateInput;
    } = {
      where: { id: idString },
      data: { published: true }
    }
    const { data, where } = params;
    await this.prisma.post.update({
      data,
      where,
    }).then((result) => {
      return res.status(200).send({
        message: "Data has been published",
        data: result 
      });
    }).catch((err) => {
      throw new BadRequestException(err.response)
    });
    
  }

  async deletePost(idString: string, res: Response): Promise<void> {
    const where: Prisma.PostWhereUniqueInput = { id: idString };
    await this.prisma.post.delete({
      where,
    }).then(() => {
      return res.status(204).send();
    }).catch((err) => {
      throw new BadRequestException(err.response);
    });
  }
}