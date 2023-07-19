import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

interface PostServiceInterface {
  createPost(data: Prisma.PostCreateInput, res: Response): Promise<void>;
  posts(
    params: {
      page: number; limit: number; where?: any; cursor?: Prisma.PostWhereUniqueInput;
      orderBy?: Prisma.PostOrderByWithRelationInput;
    },
    res: Response
  ): Promise<void>;
  post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
    res: Response
  ): Promise<void>;
  publishPost(
    params: {
      where: Prisma.PostWhereUniqueInput;
      data: Prisma.PostUpdateInput;
    },
    res: Response
  ): Promise<void>;
  deletePost(where: Prisma.PostWhereUniqueInput, res: Response): Promise<void>;
}

@Injectable()
export class PostsService implements PostServiceInterface{
  constructor(private prisma: PrismaService) {}

  async createPost(data: Prisma.PostCreateInput, res: Response): Promise<void> {
    await this.prisma.post.create({
      data,
    }).then((result: any) => {
      res.status(HttpStatus.CREATED).send({
        message: "Data has been created",
        data: result
      });
    }).catch((error: any) => {
      res.status(HttpStatus.BAD_REQUEST).send({ message: error });
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

      res.status(HttpStatus.OK).send({
        message: "Data has been found",
        data: { items, totalItems, pageCount }
      });
    }).catch(() => {
      res.status(HttpStatus.NOT_FOUND).send();
    });
  }

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
    res: Response
  ): Promise<void> {
    await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    }).then((result: any) => {
      if (!result) {
        throw new NotFoundException("Data not found")
      }
      res.status(HttpStatus.OK).send({
        message: "Data has been found",
        data: result
      });
    }).catch(() => {
      res.status(HttpStatus.NOT_FOUND).send();
    });
  }

  async publishPost(
    params: {
      where: Prisma.PostWhereUniqueInput;
      data: Prisma.PostUpdateInput;
    },
    res: Response
  ): Promise<void> {
    const { data, where } = params;
    await this.prisma.post.update({
      data,
      where,
    }).then((result: any) => {
      res.status(HttpStatus.ACCEPTED).send({
        message: "Data has been published",
        data: result 
      });
    }).catch((error: any) => {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({ message: error });
    });
    
  }

  async deletePost(where: Prisma.PostWhereUniqueInput, res: Response): Promise<void> {
    await this.prisma.post.delete({
      where,
    }).then((result: any) => {
      res.status(HttpStatus.ACCEPTED).send({
        message: "Data has been deleted",
        data: result
      });
    }).catch((error: any) => {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({ message: error });
    });
  }
}