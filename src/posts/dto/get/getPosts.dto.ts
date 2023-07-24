import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { ItemPostDto } from "../items/itemsPost.dto";
import { Prisma } from "@prisma/client";
import { Type } from "class-transformer";

export class GetPostsFunctionDto {
  @IsArray()
  items: ItemPostDto[];

  @IsNumber()
  totalItems: number;
  
  @IsNumber()
  pageCount: number;
}

export class GetPostsParamsDto {
  @IsOptional()
  @IsString()
  search: string = '';

  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  cursor: Prisma.PostWhereUniqueInput;

  @IsOptional()
  orderBy: Prisma.PostOrderByWithRelationInput = { authorId: 'asc' };
}
