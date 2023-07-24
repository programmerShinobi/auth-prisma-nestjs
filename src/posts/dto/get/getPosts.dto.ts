import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ItemPostDto } from "../items/itemsPost.dto";
import { Prisma } from "@prisma/client";

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

  @IsNotEmpty()
  page: number = 1;

  @IsNotEmpty()
  limit: number = 10;

  @IsOptional()
  cursor: Prisma.PostWhereUniqueInput;

  @IsOptional()
  orderBy: Prisma.PostOrderByWithRelationInput;
}