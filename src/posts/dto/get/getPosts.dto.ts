import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ItemPostDto } from "../items/itemsPost.dto";

export class GetPostsFunctionDto {
  @IsArray()
  items: ItemPostDto[];

  @IsNumber()
  totalItems: number;
  
  @IsNumber()
  pageCount: number;
}

export class GetPostsParamsDto {
  @IsString()
  search: string = '';

  @IsNotEmpty()
  page: number = 1;

  @IsNotEmpty()
  limit: number = 10;
}